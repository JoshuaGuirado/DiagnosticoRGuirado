import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '@/src/store';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell,
  PieChart, Pie
} from 'recharts';
import { Download, ChevronLeft, Building2, TrendingUp, CheckCircle2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { diagnosticoEmpresarial, diagnosticoFranqueabilidade } from '../data/questions';

export function Result() {
  const { id } = useParams<{ id: string }>();
  const results = useStore(state => state.results);
  const result = results.find(r => r.id === id);
  const reportRef = useRef<HTMLDivElement>(null);

  if (!result) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Resultado não encontrado</h2>
        <Link to="/"><Button>Voltar ao Início</Button></Link>
      </div>
    );
  }

  const { type, score, categoryScores, categoryMaxScores } = result;
  
  // Format data for charts
  const chartData = Object.keys(categoryScores).map(key => {
    const nameMap: Record<string, string> = {
      pe: 'Planej. Estratégico', fin: 'Financeiro', com: 'Comercial', mkt: 'Marketing',
      ope: 'Operações', rh: 'RH', tec: 'Tecnologia',
      mod: 'Modelo', ren: 'Rentabilidade', pad: 'Padronização', mar: 'Marca',
      pro: 'Processos', equ: 'Equipe', exp: 'Expansão', mer: 'Mercado'
    };
    const percentage = Math.round((categoryScores[key] / categoryMaxScores[key]) * 100);
    return { subject: nameMap[key] || key, A: percentage, fullMark: 100 };
  });

  // Calculate classifications
  let classification = { text: '', color: '', bg: '', hex: '' };
  if (type === 'empresarial') {
    if (score <= 30) classification = { text: 'Empresa em Risco', color: 'text-red-600', bg: 'bg-red-100', hex: '#ef4444' };
    else if (score <= 60) classification = { text: 'Empresa em Estruturação', color: 'text-yellow-600', bg: 'bg-yellow-100', hex: '#eab308' };
    else if (score <= 80) classification = { text: 'Empresa Organizada', color: 'text-blue-600', bg: 'bg-blue-100', hex: '#3b82f6' };
    else classification = { text: 'Pronta para Expansão', color: 'text-green-600', bg: 'bg-green-100', hex: '#22c55e' };
  } else {
    if (score <= 30) classification = { text: 'Não Franqueável', color: 'text-red-600', bg: 'bg-red-100', hex: '#ef4444' };
    else if (score <= 60) classification = { text: 'Potencial Baixo', color: 'text-yellow-600', bg: 'bg-yellow-100', hex: '#eab308' };
    else if (score <= 80) classification = { text: 'Potencial Médio', color: 'text-blue-600', bg: 'bg-blue-100', hex: '#3b82f6' };
    else classification = { text: 'Alto Potencial para Franquia', color: 'text-green-600', bg: 'bg-green-100', hex: '#22c55e' };
  }

  const sortedCategories = [...chartData].sort((a, b) => b.A - a.A);
  const strongest = sortedCategories.slice(0, 2).map(c => c.subject).join(' e ');
  const weakest = sortedCategories.slice(-2).map(c => c.subject).join(' e ');
  
  let summaryText = '';
  
  if (type === 'empresarial') {
    if (score < 40) {
      summaryText = `A empresa apresenta fragilidades estruturais gerais, com urgência de ação em ${weakest}. É necessário um plano de reestruturação focado no básico bem feito antes de pensar em crescimento.`;
    } else if (sortedCategories[0]?.A < 50) {
      summaryText = `A empresa apresenta baixo nível de maturidade geral. Embora ${strongest} tenham um desempenho ligeiramente melhor, a fragilidade em ${weakest} exige atenção imediata.`;
    } else {
      summaryText = `A empresa possui boa estrutura em ${strongest}, porém apresenta fragilidade em ${weakest}. Recomenda-se fortalecer a base de ${weakest} para sustentar o crescimento.`;
    }
  } else {
    if (score < 40) {
       summaryText = `A empresa ainda não apresenta os requisitos mínimos para formatação de franquia, precisando focar urgentemente na estruturação de ${weakest}. O modelo de negócio precisa amadurecer.`;
    } else if (sortedCategories[0]?.A < 50) {
       summaryText = `A empresa possui maturidade incipiente. Apesar de leve destaque em ${strongest}, as lacunas críticas em ${weakest} impedem uma expansão segura no momento.`;
    } else {
       summaryText = `A empresa apresenta elevado potencial e pontos fortes significativos em ${strongest}. Recomenda-se evoluir e padronizar ${weakest} antes de iniciar a expansão em rede.`;
    }
  }

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    try {
      const width = reportRef.current.scrollWidth;
      const height = reportRef.current.scrollHeight;
      const dataUrl = await toPng(reportRef.current, { 
        cacheBust: true, 
        pixelRatio: 2,
        width,
        height,
        style: { transform: 'none' }
      });
      
      const img = new Image();
      img.src = dataUrl;
      await new Promise(resolve => { img.onload = resolve; });
      
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [width, height]
      });
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
      pdf.save(`Diagnostico_${result.clientName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
    }
  };

  const getBarColor = (value: number) => {
    if (value <= 30) return '#ef4444';
    if (value <= 60) return '#eab308';
    if (value <= 80) return '#3b82f6';
    return '#22c55e';
  };

  const gaugeData = [
    { name: 'Score', value: score, fill: classification.hex },
    { name: 'Empty', value: 100 - score, fill: '#f3f4f6' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center mb-8">
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-2 -ml-4">
            <ChevronLeft className="w-4 h-4" /> Voltar
          </Button>
        </Link>
        <Button onClick={handleExportPDF} className="gap-2">
          <Download className="w-4 h-4" /> Exportar PDF
        </Button>
      </div>

      <div ref={reportRef} className="bg-white rounded-[32px] p-8 md:p-12 shadow-soft border border-white space-y-12">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-gray-100 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full border-2 border-[#1A2840] flex items-center justify-center text-[#1A2840] font-bold text-sm">
                R
              </div>
              <span className="text-gray-500 font-semibold uppercase tracking-wider text-sm">R. Guirado Consultoria</span>
            </div>
            <h1 className="text-3xl font-bold text-[#1A2840] mt-4">{result.clientName}</h1>
            <p className="text-gray-500 mt-2 font-medium">
              {type === 'empresarial' ? 'Diagnóstico Empresarial' : 'Diagnóstico de Franqueabilidade'}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-gray-600">
              {result.phone && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-400">WhatsApp:</span> {result.phone}
                </div>
              )}
              {result.city && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-400">Local:</span> {result.city}
                </div>
              )}
              {result.niche && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-400">Nicho:</span> {result.niche}
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-400">Data:</span> {new Date(result.date).toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>
          {type === 'empresarial' && (
            <div className="text-right">
              <div className="text-5xl font-bold text-[#1A2840]">{score}
                <span className="text-2xl text-gray-400">/100</span>
              </div>
              <div className={`mt-3 inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${classification.bg} ${classification.color}`}>
                {classification.text}
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div>
          <h2 className="text-xl font-bold text-[#1A2840] mb-4">Parecer Executivo</h2>
          <p className="text-gray-700 leading-relaxed text-lg border-l-4 border-[#F3C611] pl-6 py-2 bg-gray-50 rounded-r-xl">
            {summaryText}
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {type === 'empresarial' ? (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-center text-[#1A2840]">Radar de Maturidade</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="Pontuação" dataKey="A" stroke="#1F4761" fill="#1F4761" fillOpacity={0.2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-center text-[#1A2840]">Desempenho por Área (%)</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 12 }} width={100} />
                      <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="A" radius={[0, 4, 4, 0]} barSize={20}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBarColor(entry.A)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4 flex flex-col items-center justify-center">
                <h3 className="text-lg font-bold text-center text-[#1A2840] mb-6">Velocímetro de Potencial</h3>
                <div className="relative w-[300px] h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={gaugeData}
                        cx="50%"
                        cy="100%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={90}
                        outerRadius={120}
                        stroke="none"
                        dataKey="value"
                      >
                        {gaugeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute bottom-0 left-0 w-full flex flex-col items-center">
                    <span className="text-5xl font-bold text-[#1A2840]">{score}</span>
                    <span className={`text-sm font-semibold mt-2 px-3 py-1 rounded-full ${classification.bg} ${classification.color}`}>
                      {classification.text}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#1A2840] mb-6 text-center">Detalhamento por Área</h3>
                <div className="grid grid-cols-2 gap-3">
                  {chartData.map((item, i) => (
                    <div key={i} className="bg-gray-50 px-4 py-3 rounded-xl flex items-center justify-between border border-gray-100">
                      <span className="font-medium text-gray-700 text-sm">{item.subject}</span>
                      <span className={`font-bold text-sm ${getBarColor(item.A) === '#ef4444' ? 'text-red-600' : getBarColor(item.A) === '#eab308' ? 'text-yellow-600' : getBarColor(item.A) === '#3b82f6' ? 'text-blue-600' : 'text-green-600'}`}>
                        {item.A}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Detailed Answers Section */}
        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-xl font-bold text-[#1A2840] mb-6">Detalhamento das Respostas</h3>
          <div className="space-y-6">
            {(type === 'empresarial' ? diagnosticoEmpresarial : diagnosticoFranqueabilidade).map((q, index) => {
              const answerScore = result.answers[q.id] || 0;
              const selectedOption = q.options.find(opt => opt.score === answerScore);
              
              return (
                <div key={q.id} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold bg-white px-2 py-1 rounded text-gray-500 border border-gray-200">
                          {q.categoryName}
                        </span>
                        <span className="text-xs font-semibold text-gray-400">Questão {index + 1}</span>
                      </div>
                      <p className="font-semibold text-[#1A2840] text-base leading-snug mb-3">
                        {q.text}
                      </p>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#22c55e] mt-0.5 shrink-0" />
                        <p className="text-gray-600 text-sm font-medium">
                          {selectedOption?.text || "Não respondida"}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 bg-white rounded-lg px-4 py-3 border border-gray-100 flex flex-col items-center justify-center min-w-[80px]">
                      <span className="text-xs text-gray-400 font-semibold mb-1">Nota</span>
                      <span className={`text-2xl font-bold ${answerScore >= 4 ? 'text-green-600' : answerScore >= 3 ? 'text-blue-600' : answerScore >= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {answerScore}
                      </span>
                      <span className="text-[10px] text-gray-400 mt-1">/ 5</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-[#1A2840] text-white p-8 rounded-2xl mt-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
            <TrendingUp className="text-[#F3C611]" /> Próximos Passos
          </h3>
          <p className="text-gray-300">
            Com base nestes resultados, recomendamos o agendamento de uma reunião estratégica 
            com a equipe da R. Guirado para elaboração de um plano de ação direcionado para os pontos críticos identificados.
          </p>
        </div>
      </div>
    </div>
  );
}
