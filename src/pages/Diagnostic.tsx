import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { diagnosticoFranqueabilidade } from '@/src/data/questions';
import { useStore } from '@/src/store';
import { cn } from '@/src/lib/utils';
import { Lock, FileText, ClipboardList, TrendingUp, AlertTriangle } from 'lucide-react';

export function Diagnostic() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const addResult = useStore(state => state.addResult);

  // Tabs state: 'inicio' | 'questionario' | 'resultado' | 'plano'
  const [activeTab, setActiveTab] = useState<'inicio' | 'questionario'>('inicio');

  // Form data for Tab 1 (Seus Dados)
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [segment, setSegment] = useState('');
  const [operationTime, setOperationTime] = useState('');
  const [ownUnits, setOwnUnits] = useState('1');
  const [revenue, setRevenue] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);

  // Answers state: questionId -> optionScore
  const [answers, setAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    if (type !== 'franqueabilidade') {
      navigate('/');
    }
  }, [type, navigate]);

  // Questions and categories configuration
  const questions = diagnosticoFranqueabilidade;

  // Validation for Tab 1
  const isFormValid = () => {
    return (
      clientName.trim() !== '' &&
      companyName.trim() !== '' &&
      email.trim() !== '' &&
      phone.trim() !== '' &&
      city.trim() !== '' &&
      segment.trim() !== '' &&
      operationTime.trim() !== '' &&
      revenue.trim() !== ''
    );
  };

  // Category index calculation helper (matching spreadsheet logic)
  const calculateResult = (currentAnswers: Record<string, number>) => {
    const categories = [
      { id: 'marca', weight: 0.20, count: 5 },
      { id: 'fin', weight: 0.25, count: 6 },
      { id: 'ope', weight: 0.25, count: 6 },
      { id: 'gestao', weight: 0.15, count: 4 },
      { id: 'mercado', weight: 0.15, count: 4 },
    ];

    const categoryScores: Record<string, number> = {};
    const categoryMaxScores: Record<string, number> = {};
    let totalWeightedScore = 0;

    categories.forEach(c => {
      categoryScores[c.id] = 0;
      categoryMaxScores[c.id] = c.count * 10; // Max score per question is 10
    });

    questions.forEach(q => {
      const score = currentAnswers[q.id];
      if (score !== undefined) {
        categoryScores[q.categoryId] += score;
      }
    });

    categories.forEach(c => {
      const score = categoryScores[c.id];
      const max = categoryMaxScores[c.id];
      const aproveitamento = max > 0 ? score / max : 0;
      totalWeightedScore += aproveitamento * c.weight * 100;
    });

    return {
      score: Math.round(totalWeightedScore * 10) / 10, // Round to 1 decimal place (e.g. 55.2)
      categoryScores,
      categoryMaxScores
    };
  };

  const handleSelectAnswer = (questionId: string, score: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: score
    }));
  };

  const totalAnswered = Object.keys(answers).filter(k => answers[k] !== undefined).length;
  const rawScoreSum = Object.values(answers).reduce((a, b) => a + b, 0);

  const handleFinish = () => {
    if (totalAnswered < questions.length) return;

    const { score, categoryScores, categoryMaxScores } = calculateResult(answers);
    const resultId = Math.random().toString(36).substring(7);

    const newResult = {
      id: resultId,
      type: 'franqueabilidade' as const,
      clientName,
      companyName,
      email,
      phone,
      city,
      segment,
      operationTime,
      ownUnits: parseInt(ownUnits) || 1,
      revenue,
      date,
      score,
      categoryScores,
      categoryMaxScores,
      answers
    };

    addResult(newResult);
    navigate(`/resultado/${resultId}`);
  };

  // Helper for pill color in table
  const getSituationStyle = (score: number | undefined) => {
    if (score === undefined) return { label: 'Pendente', bg: 'bg-gray-100 text-gray-500 border-gray-200' };
    if (score <= 3) return { label: 'BLOQUEIO CRÍTICO', bg: 'bg-red-50 text-red-600 border-red-200 font-bold' };
    if (score <= 6) return { label: 'Prioridade média', bg: 'bg-yellow-50 text-yellow-600 border-yellow-200 font-medium' };
    return { label: 'Consolidado', bg: 'bg-green-50 text-green-600 border-green-200 font-medium' };
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Tabs Menu */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-2xl shadow-sm overflow-x-auto scrollbar-none shrink-0">
        <button
          onClick={() => setActiveTab('inicio')}
          className={cn(
            "flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all cursor-pointer",
            activeTab === 'inicio'
              ? "border-[#1F4761] text-[#1F4761] bg-gray-50/50"
              : "border-transparent text-gray-500 hover:text-[#1F4761]"
          )}
        >
          <FileText className="w-4 h-4" /> Início
        </button>

        <button
          disabled={!isFormValid()}
          onClick={() => isFormValid() && setActiveTab('questionario')}
          className={cn(
            "flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all",
            !isFormValid() ? "opacity-50 cursor-not-allowed text-gray-400" : "cursor-pointer",
            activeTab === 'questionario'
              ? "border-[#1F4761] text-[#1F4761] bg-gray-50/50"
              : isFormValid() ? "border-transparent text-gray-500 hover:text-[#1F4761]" : "text-gray-400"
          )}
        >
          <ClipboardList className="w-4 h-4" /> Questionário
        </button>

        <button
          disabled
          className="flex items-center gap-2 px-6 py-4 text-sm font-bold text-gray-400 border-b-2 border-transparent cursor-not-allowed"
        >
          <Lock className="w-3.5 h-3.5" /> Resultado
        </button>

        <button
          disabled
          className="flex items-center gap-2 px-6 py-4 text-sm font-bold text-gray-400 border-b-2 border-transparent cursor-not-allowed"
        >
          <Lock className="w-3.5 h-3.5" /> Plano de Ação
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-b-2xl shadow-soft p-6 md:p-10 border-t border-gray-100 min-h-[500px]">
        {activeTab === 'inicio' ? (
          <div className="space-y-10">
            {/* Header Title */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-[#1A2840] font-bold text-xs uppercase tracking-widest leading-none mb-2">R.Guirado Consultoria</h2>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1F4761]">PRÉ-DIAGNÓSTICO DE FRANQUIAS</h1>
              <p className="text-gray-500 mt-3 text-sm md:text-base max-w-4xl leading-relaxed">
                Descubra, em poucos minutos, o quanto o seu negócio está preparado para se transformar em uma rede de franquias — e exatamente o que falta para chegar lá.
              </p>
            </div>

            {/* Grid Form */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#1A2840] uppercase tracking-wide border-b border-gray-100 pb-2">Seus Dados</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase">Nome completo</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all text-sm"
                    placeholder="Seu nome"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase">Empresa / Marca</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all text-sm"
                    placeholder="Nome do seu negócio"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase">E-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all text-sm"
                    placeholder="seuemail@exemplo.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase">WhatsApp (com DDD)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all text-sm"
                    placeholder="44 99999-9999"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase">Cidade / UF</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all text-sm"
                    placeholder="Ex: Maringá / PR"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase">Segmento de atuação</label>
                  <input
                    type="text"
                    value={segment}
                    onChange={(e) => setSegment(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all text-sm"
                    placeholder="Ex: Alimentação, Estética, Varejo"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase">Tempo de operação</label>
                  <input
                    type="text"
                    value={operationTime}
                    onChange={(e) => setOperationTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all text-sm"
                    placeholder="Ex: 2 anos"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 uppercase">Nº unidades próprias</label>
                    <input
                      type="number"
                      min="1"
                      value={ownUnits}
                      onChange={(e) => setOwnUnits(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 uppercase">Faturamento médio / un.</label>
                    <input
                      type="text"
                      value={revenue}
                      onChange={(e) => setRevenue(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Ex: R$ 50 mil"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase">Data do preenchimento</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-md font-bold text-[#1A2840] uppercase tracking-wide">Como Funciona</h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
                <li>Vá até a aba «Questionário» e responda às 25 perguntas escolhendo uma opção na lista suspensa de cada linha. Não existe resposta certa ou errada — responda com sinceridade, porque o resultado só é útil se refletir a realidade.</li>
                <li>A pontuação é calculada automaticamente. Cada pergunta vale de 0 a 10 pontos e cada dimensão tem um peso diferente, porque nem todos os fatores pesam igual na decisão de franquear.</li>
                <li>Na aba «Resultado» você verá seu Índice de Franqueabilidade (0 a 100), sua classificação, o desempenho por dimensão e os gráficos comparativos.</li>
                <li>Na aba «Plano de Ação» o sistema gera, para cada item, a recomendação correspondente à sua resposta — um roteiro do que precisa ser resolvido antes de franquear.</li>
              </ol>
            </div>

            {/* Important / LGPD */}
            <div className="space-y-4">
              <div className="flex gap-3 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                <AlertTriangle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 leading-relaxed font-medium">
                  <strong>IMPORTANTE:</strong> este é um instrumento de pré-diagnóstico, de caráter indicativo e autodeclaratório. Ele não substitui um diagnóstico de franqueabilidade completo, que envolve verificação documental, análise financeira detalhada e avaliação jurídica da marca e dos contratos. Serve para revelar, com rapidez e honestidade, onde estão as suas maiores lacunas.
                </p>
              </div>

              <p className="text-[10px] text-gray-400 leading-normal">
                Ao preencher e enviar este material, você concorda que a R.Guirado Consultoria utilize os dados informados para contato e envio da análise, nos termos da LGPD (Lei 13.709/2018). Seus dados não são compartilhados com terceiros.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end pt-4 border-t border-gray-100">
              <Button
                size="lg"
                disabled={!isFormValid()}
                onClick={() => setActiveTab('questionario')}
                className="gap-2"
              >
                Ir para o Questionário
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 shrink-0">
              <div>
                <h2 className="text-xl font-bold text-[#1A2840]">QUESTIONÁRIO DE FRANQUEABILIDADE</h2>
                <p className="text-xs text-gray-400 mt-1">Escolha uma opção na coluna "Sua resposta" para cada um dos 25 itens.</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold bg-[#1F4761]/10 text-[#1F4761] px-3 py-1.5 rounded-full">
                  {totalAnswered} de {questions.length} respondidas
                </span>
              </div>
            </div>

            {/* Table layout */}
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm bg-white">
              <table className="w-full text-left border-collapse min-w-[900px] text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 border-b border-gray-100 font-bold">
                    <th className="py-4 px-4 w-12 text-center">Nº</th>
                    <th className="py-4 px-4 w-48">Dimensão</th>
                    <th className="py-4 px-4 w-64">Item avaliado</th>
                    <th className="py-4 px-4">Sua resposta</th>
                    <th className="py-4 px-4 w-20 text-center">Pontos</th>
                    <th className="py-4 px-4 w-44">Situação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {questions.map((q, idx) => {
                    const selectedScore = answers[q.id];
                    const selectedOptIndex = q.options.findIndex(opt => opt.score === selectedScore);
                    const selectedVal = selectedOptIndex !== -1 ? selectedOptIndex.toString() : "";
                    const situation = getSituationStyle(selectedScore);

                    return (
                      <tr key={q.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-gray-400 text-center">{idx + 1}</td>
                        <td className="py-3.5 px-4 font-semibold text-gray-700 text-xs">
                          <span className={cn(
                            "px-2.5 py-1 rounded-md uppercase tracking-wider text-[10px]",
                            q.categoryId === 'marca' ? 'bg-blue-50 text-blue-700' :
                            q.categoryId === 'fin' ? 'bg-emerald-50 text-emerald-700' :
                            q.categoryId === 'ope' ? 'bg-purple-50 text-purple-700' :
                            q.categoryId === 'gestao' ? 'bg-amber-50 text-amber-700' :
                            'bg-pink-50 text-pink-700'
                          )}>
                            {q.categoryName}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-[#1A2840]">{q.text}</td>
                        <td className="py-3.5 px-4">
                          <select
                            value={selectedVal}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === "") {
                                handleSelectAnswer(q.id, undefined as any);
                              } else {
                                const option = q.options[parseInt(val)];
                                handleSelectAnswer(q.id, option.score);
                              }
                            }}
                            className={cn(
                              "w-full px-3 py-2 rounded-lg border text-sm focus:ring-1 focus:ring-[#1F4761] outline-none bg-white",
                              selectedVal === "" ? "border-gray-300 text-gray-400" : "border-[#1F4761]/40 text-[#1A2840]"
                            )}
                          >
                            <option value="">Selecione uma resposta...</option>
                            {q.options.map((opt, oIdx) => (
                              <option key={oIdx} value={oIdx}>
                                {opt.text} ({opt.score} pts)
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-center text-[#1A2840]">
                          {selectedScore !== undefined ? selectedScore : '-'}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={cn(
                            "inline-block px-2.5 py-1 rounded-full text-xs border text-center min-w-[120px]",
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

            {/* Footer Summary */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-[#1A2840] text-white p-5 rounded-2xl mt-6 gap-4">
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-center sm:text-left justify-center sm:justify-start">
                <div>
                  <span className="text-xs opacity-60 block">PONTUAÇÃO BRUTA</span>
                  <span className="text-xl font-bold text-[#F3C611]">{rawScoreSum} <span className="text-xs font-normal opacity-75">/ 250 pontos</span></span>
                </div>
                <div className="border-l border-white/10 pl-6 hidden sm:block">
                  <span className="text-xs opacity-60 block">RESPOSTAS</span>
                  <span className="text-xl font-bold">{totalAnswered} <span className="text-xs font-normal opacity-75">de {questions.length} respondidas</span></span>
                </div>
              </div>
              <div>
                <Button
                  variant="secondary"
                  disabled={totalAnswered < questions.length}
                  onClick={handleFinish}
                  className="w-full sm:w-auto"
                >
                  Finalizar Diagnóstico
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
