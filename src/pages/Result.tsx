import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '@/src/store';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import { Download, ChevronLeft, Lock, FileText, ClipboardList, TrendingUp, Star, Phone, CheckCircle2, AlertTriangle, MessageSquare } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { diagnosticoFranqueabilidade } from '../data/questions';
import { cn } from '@/src/lib/utils';
import { supabase, isSupabaseConfigured } from '@/src/lib/supabase';

// Timezone-agnostic date formatter
const formatDateString = (dateStr: string) => {
  if (!dateStr) return '';
  const parts = dateStr.split('T')[0].split('-');
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts;
  return `${day}/${month}/${year}`;
};

export function Result() {
  const { id } = useParams<{ id: string }>();
  const results = useStore(state => state.results);
  const updateResultRating = useStore(state => state.updateResultRating);
  const addResult = useStore(state => state.addResult);

  const localResult = results.find(r => r.id === id);
  const [dbResult, setDbResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(!localResult);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (localResult) {
      setLoading(false);
      return;
    }

    const fetchResult = async () => {
      if (isSupabaseConfigured && supabase && id) {
        try {
          const { data, error } = await supabase
            .from('diagnostics')
            .select('*')
            .eq('id', id)
            .single();

          if (error) {
            console.error('Error fetching from Supabase:', error);
            setErrorMsg('Não foi possível encontrar o resultado no servidor.');
          } else if (data) {
            const mappedResult = {
              id: data.id,
              type: data.type,
              clientName: data.client_name,
              companyName: data.company_name,
              email: data.email,
              phone: data.phone,
              city: data.city,
              segment: data.segment,
              operationTime: data.operation_time,
              ownUnits: data.own_units,
              revenue: data.revenue,
              date: data.date,
              score: Number(data.score),
              categoryScores: data.category_scores,
              categoryMaxScores: data.category_max_scores,
              answers: data.answers,
              feedbackRating: data.feedback_rating
            };
            addResult(mappedResult);
            setDbResult(mappedResult);
          }
        } catch (err) {
          console.error('Failed to fetch from Supabase:', err);
          setErrorMsg('Erro de conexão ao buscar o resultado.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id, localResult, addResult]);

  const result = localResult || dbResult;

  const handleRate = async (rating: number) => {
    if (!result) return;
    updateResultRating(result.id, rating);
    if (dbResult) {
      setDbResult({ ...dbResult, feedbackRating: rating });
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('diagnostics')
          .update({ feedback_rating: rating })
          .eq('id', result.id);
      } catch (err) {
        console.error('Failed to update rating in Supabase:', err);
      }
    }
  };

  const reportRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<'resultado' | 'plano' | 'inicio' | 'respostas'>('resultado');
  const [ratingHover, setRatingHover] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  if (loading) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border shadow-sm flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1F4761]"></div>
        <p className="text-gray-500 font-semibold">Carregando resultado do pré-diagnóstico...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-[#1A2840]">{errorMsg || 'Resultado não encontrado'}</h2>
        <Link to="/"><Button>Voltar ao Início</Button></Link>
      </div>
    );
  }

  const { clientName, companyName, email, phone, city, segment, operationTime, ownUnits, revenue, date, answers } = result;

  // Lógica de cálculo ponderado idêntica à planilha
  const getCalculatedMetrics = () => {
    const categories = [
      { id: 'marca', name: 'Marca e Blindagem Jurídica', weight: 0.20, count: 5 },
      { id: 'fin', name: 'Saúde Econômico-Financeira', weight: 0.25, count: 6 },
      { id: 'ope', name: 'Operação e Replicabilidade', weight: 0.25, count: 6 },
      { id: 'gestao', name: 'Gestão, Estrutura e Pessoas', weight: 0.15, count: 4 },
      { id: 'mercado', name: 'Mercado e Posicionamento', weight: 0.15, count: 4 },
    ];

    let calculatedOverallScore = 0;
    const rows = categories.map(cat => {
      const catQuestions = diagnosticoFranqueabilidade.filter(q => q.categoryId === cat.id);
      const maxScore = cat.count * 10;
      
      let obtainedScore = 0;
      catQuestions.forEach(q => {
        obtainedScore += answers[q.id] || 0;
      });

      const aproveitamento = maxScore > 0 ? obtainedScore / maxScore : 0;
      const contribution = aproveitamento * cat.weight;
      
      calculatedOverallScore += contribution * 100;

      return {
        id: cat.id,
        name: cat.name,
        obtained: obtainedScore,
        max: maxScore,
        aproveitamento: Math.round(aproveitamento * 1000) / 10,
        weight: cat.weight * 100,
        contribution: Math.round(contribution * 1000) / 10
      };
    });

    return {
      rows,
      overallScore: Math.round(calculatedOverallScore * 10) / 10
    };
  };

  const { rows: dimensionRows, overallScore } = getCalculatedMetrics();

  // Classificações com base na pontuação geral
  let classification = { text: '', color: '', bg: '', hex: '', description: '' };
  if (overallScore <= 30) {
    classification = {
      text: 'RISCO CRÍTICO',
      color: 'text-red-600',
      bg: 'bg-red-50 border-red-200',
      hex: '#ef4444',
      description: 'Seu negócio apresenta fragilidades estruturais críticas que inviabilizam a formatação de uma franquia no momento. É recomendável focar todos os esforços operacionais e financeiros em estabilizar e validar o modelo de negócio próprio antes de planejar qualquer expansão.'
    };
  } else if (overallScore <= 60) {
    classification = {
      text: 'EM PREPARAÇÃO',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50 border-yellow-200',
      hex: '#f3c611',
      description: 'Seu negócio tem fundamentos consistentes e já dá sinais claros de potencial para virar rede. Restam ajustes relevantes — normalmente concentrados em documentação, padronização e engenharia financeira do modelo. É o estágio em que a consultoria costuma gerar o maior salto de valor em menor tempo.'
    };
  } else if (overallScore <= 80) {
    classification = {
      text: 'POTENCIAL AVANÇADO',
      color: 'text-blue-600',
      bg: 'bg-blue-50 border-blue-200',
      hex: '#3b82f6',
      description: 'O seu negócio possui excelente maturidade de processos e uma marca forte. Está muito próximo de se tornar uma franqueadora de sucesso. Resta realizar a formatação jurídica formal (COF e Contratos) e estruturar a equipe básica de suporte para iniciar a expansão com total segurança.'
    };
  } else {
    classification = {
      text: 'PRONTA PARA EXPANSÃO',
      color: 'text-green-600',
      bg: 'bg-green-50 border-green-200',
      hex: '#22c55e',
      description: 'Excelente potencial para virar franquia. A operação é madura, altamente replicável e consolidada em todas as frentes. Seu negócio está 100% pronto para iniciar o processo de formatação e expansão nacional acelerada.'
    };
  }

  // Contagem de pontos de bloqueio (score <= 3)
  const blockingPointsCount = diagnosticoFranqueabilidade.filter(q => (answers[q.id] !== undefined && answers[q.id] <= 3)).length;

  // Formatar dados para o gráfico de Radar
  const chartData = dimensionRows.map(row => ({
    subject: row.name.split(' ')[0], // Apenas a primeira palavra para ficar limpo no gráfico
    A: row.aproveitamento,
    fullMark: 100
  }));

  // Geração de mensagem automática para WhatsApp
  const whatsappNumber = '5544999665711';
  const whatsappMessage = encodeURIComponent(
    `Olá! Acabei de realizar o Pré-Diagnóstico de Franqueabilidade no site da R.Guirado Consultoria.\n\n` +
    `*Empresa:* ${companyName || 'Minha Empresa'}\n` +
    `*Responsável:* ${clientName}\n` +
    `*Índice de Franqueabilidade:* ${overallScore}%\n` +
    `*Classificação:* ${classification.text}\n` +
    `*Pontos de Bloqueio Crítico:* ${blockingPointsCount}\n\n` +
    `Gostaria de agendar uma conversa com um especialista para debater os próximos passos e o meu Plano de Ação.`
  );

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const width = 1000;
      const height = reportRef.current.scrollHeight;
      
      const dataUrl = await toPng(reportRef.current, { 
        cacheBust: true, 
        pixelRatio: 2,
        width,
        height,
        style: { 
          transform: 'none',
          position: 'static',
          left: 'auto',
          top: 'auto'
        }
      });
      
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [width, height]
      });
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
      pdf.save(`Diagnostico_${(companyName || clientName).replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const getSituationStyle = (score: number | undefined) => {
    if (score === undefined) return { label: 'Pendente', bg: 'bg-gray-100 text-gray-500 border-gray-200' };
    if (score <= 3) return { label: 'BLOQUEIO CRÍTICO', bg: 'bg-red-50 text-red-600 border-red-200 font-bold' };
    if (score <= 6) return { label: 'Prioridade média', bg: 'bg-yellow-50 text-yellow-600 border-yellow-200 font-medium' };
    return { label: 'Consolidado', bg: 'bg-green-50 text-green-600 border-green-200 font-medium' };
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-2 shrink-0">
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-2 -ml-2">
            <ChevronLeft className="w-4 h-4" /> Voltar
          </Button>
        </Link>
        <Button onClick={handleExportPDF} className="gap-2" disabled={isExporting}>
          <Download className="w-4 h-4" /> {isExporting ? 'Gerando...' : 'Exportar PDF'}
        </Button>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-2xl shadow-sm overflow-x-auto scrollbar-none shrink-0">
        <button
          onClick={() => setActiveTab('resultado')}
          className={cn(
            "flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all cursor-pointer",
            activeTab === 'resultado'
              ? "border-[#1F4761] text-[#1F4761] bg-gray-50/50"
              : "border-transparent text-gray-500 hover:text-[#1F4761]"
          )}
        >
          <TrendingUp className="w-4 h-4" /> Resultado
        </button>

        <button
          onClick={() => setActiveTab('plano')}
          className={cn(
            "flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all cursor-pointer",
            activeTab === 'plano'
              ? "border-[#1F4761] text-[#1F4761] bg-gray-50/50"
              : "border-transparent text-gray-500 hover:text-[#1F4761]"
          )}
        >
          <ClipboardList className="w-4 h-4" /> Plano de Ação
        </button>

        <button
          onClick={() => setActiveTab('inicio')}
          className={cn(
            "flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all cursor-pointer",
            activeTab === 'inicio'
              ? "border-[#1F4761] text-[#1F4761] bg-gray-50/50"
              : "border-transparent text-gray-500 hover:text-[#1F4761]"
          )}
        >
          <FileText className="w-4 h-4" /> Dados do Cliente
        </button>

        <button
          onClick={() => setActiveTab('respostas')}
          className={cn(
            "flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all cursor-pointer",
            activeTab === 'respostas'
              ? "border-[#1F4761] text-[#1F4761] bg-gray-50/50"
              : "border-transparent text-gray-500 hover:text-[#1F4761]"
          )}
        >
          <CheckCircle2 className="w-4 h-4" /> Respostas
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-b-2xl shadow-soft p-6 md:p-10 border-t border-gray-100 min-h-[500px]">
        {activeTab === 'inicio' && (
          <div className="space-y-8">
            <h3 className="text-lg font-bold text-[#1A2840] uppercase tracking-wide border-b border-gray-100 pb-2">Dados Cadastrados</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100 text-sm">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase block">Nome Completo</span>
                <span className="font-semibold text-gray-700 block mt-1">{clientName}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase block">Empresa / Marca</span>
                <span className="font-semibold text-gray-700 block mt-1">{companyName || '-'}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase block">E-mail</span>
                <span className="font-semibold text-gray-700 block mt-1">{email || '-'}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase block">WhatsApp</span>
                <span className="font-semibold text-gray-700 block mt-1">{phone}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase block">Cidade / UF</span>
                <span className="font-semibold text-gray-700 block mt-1">{city}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase block">Segmento de atuação</span>
                <span className="font-semibold text-gray-700 block mt-1">{segment || '-'}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase block">Tempo de operação</span>
                <span className="font-semibold text-gray-700 block mt-1">{operationTime || '-'}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase block">Nº de unidades próprias</span>
                <span className="font-semibold text-gray-700 block mt-1">{ownUnits || '-'}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase block">Faturamento médio</span>
                <span className="font-semibold text-gray-700 block mt-1">{revenue || '-'}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase block">Data do preenchimento</span>
                <span className="font-semibold text-gray-700 block mt-1">{formatDateString(date)}</span>
              </div>
            </div>

            <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100 text-sm">
              <h3 className="text-md font-bold text-[#1A2840] uppercase tracking-wide">Como Funcionou</h3>
              <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                <li>O preenchimento foi realizado na aba «Questionário», onde foram respondidas as 25 perguntas avaliando o modelo de negócio próprio do cliente.</li>
                <li>A pontuação ponderada foi calculada baseando-se no aproveitamento individual de cada área e seus respectivos pesos de mercado.</li>
                <li>As dimensões possuem pesos distintos: Marca (20%), Saúde Financeira (25%), Operação (25%), Gestão (15%), Mercado (15%).</li>
              </ol>
            </div>
          </div>
        )}

        {activeTab === 'respostas' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#1A2840] uppercase tracking-wide border-b border-gray-100 pb-2">Tabela de Respostas e Pontuações</h3>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm bg-white">
              <table className="w-full text-left border-collapse min-w-[800px] text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 border-b border-gray-100 font-bold">
                    <th className="py-4 px-4 w-12 text-center">Nº</th>
                    <th className="py-4 px-2 w-48 text-left">Dimensão</th>
                    <th className="py-4 px-4 w-64 text-left">Item avaliado</th>
                    <th className="py-4 px-4">Resposta Escolhida</th>
                    <th className="py-4 px-4 w-20 text-center">Pontos</th>
                    <th className="py-4 px-4 w-44">Situação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {diagnosticoFranqueabilidade.map((q, idx) => {
                    const score = answers[q.id];
                    const selectedOption = q.options.find(opt => opt.score === score);
                    const situation = getSituationStyle(score);

                    return (
                      <tr key={q.id} className="hover:bg-gray-50/50">
                        <td className="py-3.5 px-4 font-semibold text-gray-400 text-center">{idx + 1}</td>
                        <td className={cn(
                          "py-3.5 px-2 text-xs font-bold uppercase text-left",
                          q.categoryId === 'marca' ? 'text-blue-700' :
                          q.categoryId === 'fin' ? 'text-emerald-700' :
                          q.categoryId === 'ope' ? 'text-purple-700' :
                          q.categoryId === 'gestao' ? 'text-amber-700' :
                          'text-pink-700'
                        )}>
                          {q.categoryName}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-[#1A2840] leading-snug">{q.text}</td>
                        <td className="py-3.5 px-4 text-gray-600 text-xs leading-relaxed">{selectedOption?.text || '-'}</td>
                        <td className="py-3.5 px-4 font-bold text-center text-[#1A2840]">{score}</td>
                        <td className="py-3.5 px-4">
                          <span className={cn(
                            "inline-block px-2.5 py-0.5 rounded-full text-[11px] border text-center min-w-[120px]",
                            situation.bg
                          )}>
                            {situation.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'resultado' && (
          <div className="space-y-10">
            {/* Index Header */}
            <div className="grid md:grid-cols-3 gap-6 items-center border-b border-gray-100 pb-8">
              <div className="md:col-span-2 space-y-3">
                <img src="/logo-full.png" alt="R. Guirado Logo" className="h-10 w-auto object-contain" />
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pré-Diagnóstico Finalizado</span>
                  <h1 className="text-3xl font-extrabold text-[#1A2840]">{companyName || clientName}</h1>
                  <p className="text-sm text-gray-500">Segmento: {segment} • Realizado em {formatDateString(date)}</p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-6 bg-[#1A2840] text-white p-5 rounded-2xl">
                <div className="text-left">
                  <span className="text-[10px] opacity-60 font-bold block uppercase tracking-wide">ÍNDICE DE FRANQUEABILIDADE</span>
                  <span className="text-4xl font-extrabold text-[#F3C611]">{overallScore}%</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] opacity-60 font-bold block uppercase tracking-wide">RESULTADO</span>
                  <span className="text-xs font-bold bg-[#F3C611]/25 text-[#F3C611] px-2.5 py-1 rounded-full block mt-1">VÁLIDO</span>
                </div>
              </div>
            </div>

            {/* Performance table and Recharts Radar chart */}
            <div className="grid lg:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className="text-md font-bold text-[#1A2840] uppercase tracking-wide border-b border-gray-100 pb-2">Desempenho por Dimensão</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                        <th className="py-3 px-2 text-left">Dimensão</th>
                        <th className="py-3 px-3 text-center">Pontos obtidos</th>
                        <th className="py-3 px-3 text-center">Aproveitamento (%)</th>
                        <th className="py-3 px-3 text-center">Peso (%)</th>
                        <th className="py-3 px-3 text-center">Contribuição (%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                      {dimensionRows.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50/50">
                          <td className="py-3 px-2 text-left text-gray-800 font-bold">{row.name}</td>
                          <td className="py-3 px-3 text-center">{row.obtained} / {row.max}</td>
                          <td className="py-3 px-3 text-center">{row.aproveitamento}%</td>
                          <td className="py-3 px-3 text-center text-gray-400">{row.weight}%</td>
                          <td className="py-3 px-3 text-center text-[#1F4761] font-bold">{row.contribution}%</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 font-bold text-gray-800 border-t border-gray-200">
                        <td className="py-3 px-2 text-left font-extrabold text-[#1A2840]">TOTAL</td>
                        <td className="py-3 px-3 text-center">
                          {dimensionRows.reduce((a, b) => a + b.obtained, 0)} / 250
                        </td>
                        <td className="py-3 px-3 text-center">
                          {Math.round((dimensionRows.reduce((a, b) => a + b.obtained, 0) / 250) * 1000) / 10}%
                        </td>
                        <td className="py-3 px-3 text-center text-gray-400">100%</td>
                        <td className="py-3 px-3 text-center text-[#1A2840] font-extrabold text-sm">{overallScore}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Radar chart */}
              <div className="flex flex-col items-center justify-center bg-gray-50/50 border border-gray-100 rounded-2xl p-6 min-h-[300px]">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Radar de Desempenho</h4>
                <div className="w-full h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 600 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="Aproveitamento" dataKey="A" stroke="#1F4761" fill="#1F4761" fillOpacity={0.15} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Classification Card */}
            <div className={cn("p-6 rounded-2xl border-l-4 shadow-sm border", classification.bg)}>
              <span className="text-[10px] font-extrabold uppercase tracking-widest block opacity-75">Classificação do Negócio</span>
              <h3 className={cn("text-xl font-black mt-1 uppercase tracking-wide", classification.color)}>{classification.text}</h3>
              <p className="text-gray-700 leading-relaxed text-sm mt-3">{classification.description}</p>
            </div>

            {/* Critical Blocking Points */}
            {blockingPointsCount > 0 ? (
              <div className="p-6 bg-red-50/50 border border-red-200/50 rounded-2xl flex gap-4">
                <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-red-700 uppercase tracking-wide">Pontos de Bloqueio Críticos</h4>
                  <p className="text-xs text-red-600 leading-relaxed mt-2">
                    Foram identificados <strong>{blockingPointsCount} ponto(s) de bloqueio crítico</strong>. São itens avaliados que, isoladamente, impedem a formatação e expansão segura de uma rede de franquias — independentemente da sua nota geral no índice. Eles estão detalhados com a indicação vermelha de <strong>BLOQUEIO CRÍTICO</strong> na aba <strong>Plano de Ação</strong> e precisam ser sanados antes de qualquer outra iniciativa.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-green-50/50 border border-green-200/50 rounded-2xl flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-green-700 uppercase tracking-wide">Sem Bloqueios Críticos</h4>
                  <p className="text-xs text-green-600 leading-relaxed mt-2">
                    Nenhum ponto de bloqueio crítico foi identificado no seu diagnóstico. Isso significa que o modelo possui uma base sólida e não apresenta gargalos jurídicos ou operacionais imediatos que impeçam o processo de formatação.
                  </p>
                </div>
              </div>
            )}

            {/* Premium CTA Contact Screen */}
            <div className="bg-[#1A2840] border border-[#1F4761]/30 rounded-3xl p-8 text-center text-white space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#1F4761]/25 rounded-full blur-3xl pointer-events-none"></div>
              <div className="max-w-xl mx-auto space-y-4 relative z-10">
                <span className="text-[10px] font-extrabold text-[#F3C611] uppercase tracking-widest block">Consultoria Especializada</span>
                <h3 className="text-xl md:text-2xl font-black tracking-wide uppercase">Quer agendar uma reunião com os especialistas?</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Transforme este pré-diagnóstico em um plano executivo real, com prazos, responsáveis e orçamentos claros. Fale diretamente com a equipe da R.Guirado Consultoria pelo WhatsApp. Clique no botão abaixo para iniciar o contato com um de nossos colaboradores.
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold py-3.5 px-8 rounded-xl shadow-lg transition-transform active:scale-95 text-sm"
                  >
                    <Phone className="w-4.5 h-4.5 fill-white stroke-none" /> Entre em contato já
                  </a>
                </div>
                <p className="text-[10px] text-white/50 pt-1">Suporte WhatsApp: 44 99966-5711 • R.Guirado Consultoria</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'plano' && (
          <div className="space-y-10">
            {/* Header info */}
            <div className="border-b border-gray-100 pb-4 shrink-0">
              <h2 className="text-xl font-bold text-[#1A2840]">PLANO DE AÇÃO — GERADO AUTOMATICAMENTE</h2>
              <p className="text-xs text-gray-400 mt-1">As recomendações abaixo mudam conforme suas respostas. Comece pelos itens sinalizados como bloqueio crítico.</p>
            </div>

            {/* Action Plan Table */}
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm bg-white">
              <table className="w-full text-left border-collapse min-w-[950px] text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 border-b border-gray-100 font-bold">
                    <th className="py-4 px-4 w-12 text-center">Nº</th>
                    <th className="py-4 px-4 w-52 text-left">Item avaliado</th>
                    <th className="py-4 px-4 w-60">Sua resposta</th>
                    <th className="py-4 px-4 w-16 text-center">Pontos</th>
                    <th className="py-4 px-4 w-40 text-center">Prioridade</th>
                    <th className="py-4 px-4">O que fazer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {diagnosticoFranqueabilidade.map((q, idx) => {
                    const score = answers[q.id];
                    const selectedOption = q.options.find(opt => opt.score === score);
                    const situation = getSituationStyle(score);

                    return (
                      <tr key={q.id} className={cn(
                        "hover:bg-gray-50/50",
                        score !== undefined && score <= 3 ? "bg-red-50/10" : ""
                      )}>
                        <td className="py-4 px-4 font-semibold text-gray-400 text-center">{idx + 1}</td>
                        <td className="py-4 px-4 font-bold text-left text-[#1A2840] leading-snug">{q.text}</td>
                        <td className="py-4 px-4 text-xs text-gray-600 leading-relaxed">{selectedOption?.text || '-'}</td>
                        <td className="py-4 px-4 font-bold text-center text-[#1A2840]">{score}</td>
                        <td className="py-4 px-4 text-center">
                          <span className={cn(
                            "inline-block px-2 py-0.5 rounded-full text-[10px] border text-center font-bold min-w-[120px]",
                            situation.bg
                          )}>
                            {situation.label}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-xs text-gray-500 leading-relaxed font-medium">
                          {selectedOption?.recommendation || 'Responda para obter a recomendação.'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* WhatsApp Integration & Rating Stars */}
            <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
              {/* WhatsApp Contact Box */}
              <div className="bg-[#F8F0E3]/70 border border-[#1F4761]/10 p-6 rounded-2xl flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-[#1A2840] text-sm uppercase tracking-wide">Quer agendar uma reunião com os especialistas?</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Transforme este diagnóstico em um plano estratégico real para estruturar sua franquia de forma lucrativa e segura. Entre em contato direto com a equipe R.Guirado.
                  </p>
                </div>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 px-6 rounded-xl shadow-md transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 fill-white stroke-none" /> Entre em contato já
                </a>
              </div>

              {/* Feedback Stars Box */}
              <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl flex flex-col justify-center items-center text-center space-y-4">
                <h3 className="font-bold text-[#1A2840] text-sm">Gostou do pré-diagnóstico? Deixe sua avaliação!</h3>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const currentRating = result.feedbackRating || 0;
                    const isStarred = (ratingHover !== null ? ratingHover : currentRating) >= star;
                    return (
                      <button
                        key={star}
                        onClick={() => handleRate(star)}
                        onMouseEnter={() => setRatingHover(star)}
                        onMouseLeave={() => setRatingHover(null)}
                        className="cursor-pointer focus:outline-none transition-transform active:scale-90"
                      >
                        <Star className={cn(
                          "w-8 h-8 transition-colors",
                          isStarred ? "text-[#F3C611] fill-[#F3C611]" : "text-gray-300"
                        )} />
                      </button>
                    );
                  })}
                </div>
                {result.feedbackRating ? (
                  <p className="text-xs text-green-600 font-bold">Obrigado pelo seu feedback! Nota {result.feedbackRating}/5 recebida.</p>
                ) : (
                  <p className="text-xs text-gray-400">Sua avaliação ajuda a melhorar nossa ferramenta.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action button to finalize and return home */}
      <div className="flex justify-center pt-6 pb-2 shrink-0">
        <Link to="/">
          <Button size="lg" className="bg-[#1F4761] hover:bg-[#1A2840] text-white font-extrabold px-8 py-4 rounded-xl shadow-md transition-all gap-2 text-sm cursor-pointer">
            <CheckCircle2 className="w-4 h-4" /> Finalizar Teste
          </Button>
        </Link>
      </div>

      {/* Hidden container for rendering the consolidated PDF document */}
      <div 
        ref={reportRef} 
        style={{ 
          position: 'absolute', 
          left: '-9999px', 
          top: '-9999px', 
          width: '1000px', 
          backgroundColor: '#ffffff', 
          color: '#1A2840',
          padding: '40px 60px'
        }}
        className="font-sans space-y-12"
      >
        {/* PDF Page 1: Executive Dashboard */}
        <div className="space-y-10">
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-gray-100 pb-6">
            <div className="space-y-3">
              <img src="/logo-full.png" alt="R. Guirado Logo" className="h-12 w-auto object-contain" />
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">RELATÓRIO PRÉ-DIAGNÓSTICO</span>
                <h1 className="text-3xl font-black text-[#1A2840] mt-1">{companyName || clientName}</h1>
                <p className="text-sm text-[#1F4761] font-semibold">R.Guirado Consultoria de Franquias</p>
              </div>
            </div>
            <div className="bg-[#1A2840] text-white px-6 py-4 rounded-xl text-center min-w-[200px]">
              <span className="text-[9px] opacity-60 font-bold block uppercase">ÍNDICE DE FRANQUEABILIDADE</span>
              <span className="text-3xl font-black text-[#F3C611]">{overallScore}%</span>
            </div>
          </div>

          {/* Client Details Grid */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Dados Cadastrados</h3>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl border text-xs">
              <div><strong>Nome Completo:</strong> {clientName}</div>
              <div><strong>Empresa / Marca:</strong> {companyName || '-'}</div>
              <div><strong>E-mail:</strong> {email || '-'}</div>
              <div><strong>WhatsApp:</strong> {phone}</div>
              <div><strong>Cidade / UF:</strong> {city}</div>
              <div><strong>Segmento:</strong> {segment || '-'}</div>
              <div><strong>Tempo de Operação:</strong> {operationTime || '-'}</div>
              <div><strong>Unidades Próprias:</strong> {ownUnits || '-'}</div>
              <div><strong>Faturamento Médio:</strong> {revenue || '-'}</div>
              <div><strong>Data do Diagnóstico:</strong> {formatDateString(date)}</div>
            </div>
          </div>

          {/* Performance Table & Radar Chart Grid */}
          <div className="grid grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Desempenho por Dimensão</h3>
              <div className="border rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 font-bold border-b">
                      <th className="py-2.5 px-2 text-left">Dimensão</th>
                      <th className="py-2.5 px-3 text-center">Pontos obtidos</th>
                      <th className="py-2.5 px-3 text-center">Aproveitamento (%)</th>
                      <th className="py-2.5 px-3 text-center">Peso (%)</th>
                      <th className="py-2.5 px-3 text-center">Contribuição (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y font-medium text-gray-700">
                    {dimensionRows.map((row, i) => (
                      <tr key={i}>
                        <td className="py-2.5 px-2 text-left font-bold text-gray-800">{row.name}</td>
                        <td className="py-2.5 px-3 text-center">{row.obtained} / {row.max}</td>
                        <td className="py-2.5 px-3 text-center">{row.aproveitamento}%</td>
                        <td className="py-2.5 px-3 text-center text-gray-400">{row.weight}%</td>
                        <td className="py-2.5 px-3 text-center text-[#1F4761] font-bold">{row.contribution}%</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-bold text-gray-800 border-t-2">
                      <td className="py-2.5 px-2 text-left font-extrabold text-[#1A2840]">TOTAL</td>
                      <td className="py-2.5 px-3 text-center">{dimensionRows.reduce((a, b) => a + b.obtained, 0)} / 250</td>
                      <td className="py-2.5 px-3 text-center">{Math.round((dimensionRows.reduce((a, b) => a + b.obtained, 0) / 250) * 1000) / 10}%</td>
                      <td className="py-2.5 px-3 text-center text-gray-400">100%</td>
                      <td className="py-2.5 px-3 text-center text-[#1A2840] font-extrabold text-sm">{overallScore}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Radar chart in PDF */}
            <div className="flex flex-col items-center justify-center bg-gray-50/50 border border-gray-100 rounded-xl p-4 h-[260px]">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Radar de Desempenho</h4>
              <div style={{ width: '400px', height: '200px' }} className="flex items-center justify-center">
                <RadarChart width={400} height={200} cx="50%" cy="50%" outerRadius="65%" data={chartData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 9, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Aproveitamento" dataKey="A" stroke="#1F4761" fill="#1F4761" fillOpacity={0.15} />
                </RadarChart>
              </div>
            </div>
          </div>

          {/* Classification & Blocking */}
          <div className="space-y-4">
            <div className={cn("p-5 rounded-xl border-l-4 border bg-gray-50", classification.hex === '#ef4444' ? 'border-l-red-500' : classification.hex === '#f3c611' ? 'border-l-yellow-500' : 'border-l-green-500')}>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-gray-400">Parecer Geral</span>
              <h3 className={cn("text-lg font-black mt-0.5", classification.color)}>{classification.text}</h3>
              <p className="text-gray-700 leading-relaxed text-xs mt-2">{classification.description}</p>
            </div>

            {blockingPointsCount > 0 && (
              <div className="p-5 bg-red-50 border border-red-200 rounded-xl">
                <h4 className="text-xs font-bold text-red-700 uppercase tracking-wide">PONTOS DE BLOQUEIO CRÍTICOS IDENTIFICADOS ({blockingPointsCount})</h4>
                <p className="text-[11px] text-red-600 leading-relaxed mt-1">
                  Existem itens operacionais ou jurídicos no seu negócio que representam barreiras severas (Bloqueios Críticos) para a replicação do modelo de forma segura no mercado de franquias. Eles devem ser tratados com prioridade máxima.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Page Break / Section 2: Detailed Action Plan */}
        <div style={{ pageBreakBefore: 'always', paddingTop: '40px' }} className="space-y-6">
          <div className="border-b-2 border-gray-100 pb-3">
            <h2 className="text-lg font-black text-[#1A2840] uppercase">Roteiro do Plano de Ação Personalizado</h2>
            <p className="text-[10px] text-gray-400 mt-0.5">Mapeamento de recomendações gerado de acordo com as respostas autodeclaradas.</p>
          </div>

          <table className="w-full text-left border-collapse text-[10px] border">
            <thead>
              <tr className="bg-gray-100 text-gray-500 border-b font-bold">
                <th className="py-2 px-2 w-8 text-center border">Nº</th>
                <th className="py-2 px-2 w-32 border text-left">Dimensão</th>
                <th className="py-2 px-2 w-48 border text-left">Item avaliado</th>
                <th className="py-2 px-2 w-12 text-center border">Nota</th>
                <th className="py-2 px-2 border">O que fazer (Recomendação de Consultoria)</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium text-gray-700">
              {diagnosticoFranqueabilidade.map((q, idx) => {
                const score = answers[q.id];
                const selectedOption = q.options.find(opt => opt.score === score);

                return (
                  <tr key={q.id} className={cn(score !== undefined && score <= 3 ? "bg-red-50/20" : "")}>
                    <td className="py-2 px-2 text-center border">{idx + 1}</td>
                    <td className="py-2 px-2 border text-gray-400 uppercase text-[8px] font-extrabold text-left">{q.categoryName}</td>
                    <td className="py-2 px-2 border font-bold text-gray-800 text-left">{q.text}</td>
                    <td className="py-2 px-2 text-center border font-bold">{score}</td>
                    <td className="py-2 px-2 border text-gray-600 leading-normal text-[9px]">
                      {selectedOption?.recommendation || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="border-t pt-4 text-center text-[9px] text-gray-400">
            Relatório gerado em {formatDateString(date)} • R.Guirado Consultoria de Franquias. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </div>
  );
}
