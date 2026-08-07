import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { diagnosticoFranqueabilidade } from '@/src/data/questions';
import { useStore } from '@/src/store';
import { cn } from '@/src/lib/utils';
import { Lock, FileText, ClipboardList, AlertTriangle, ArrowRight, ArrowLeft, CheckCircle2, Phone } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/src/lib/supabase';

export function Diagnostic() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const addResult = useStore(state => state.addResult);
  const results = useStore(state => state.results);

  // Active view tab: 'inicio' | 'questionario'
  const [activeTab, setActiveTab] = useState<'inicio' | 'questionario'>('inicio');

  // Sub-steps inside 'questionario' tab: 
  // 0: Marca, 1: Fin, 2: Ope, 3: Gestao, 4: Mercado, 5: Finalizar
  const [currentStep, setCurrentStep] = useState(0);

  // Form data for Tab 1 (Seus Dados)
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [segment, setSegment] = useState('');
  
  // Custom structured inputs for Operation Time and Revenue
  const [operationTimeValue, setOperationTimeValue] = useState('');
  const [operationTimeUnit, setOperationTimeUnit] = useState<'Anos' | 'Meses'>('Anos');
  
  const [revenueValue, setRevenueValue] = useState('');
  const [revenueUnit, setRevenueUnit] = useState<'Mil' | 'Milhões'>('Mil');
  
  const [ownUnits, setOwnUnits] = useState('1');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);

  // Answers state: questionId -> optionScore
  const [answers, setAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    if (type !== 'franqueabilidade') {
      navigate('/');
    }
  }, [type, navigate]);

  // Questions database
  const questions = diagnosticoFranqueabilidade;

  // Group questions by dimension steps
  const stepsConfig = [
    { id: 'marca', name: 'Marca e Blindagem Jurídica', index: 0 },
    { id: 'fin', name: 'Saúde Econômico-Financeira', index: 1 },
    { id: 'ope', name: 'Operação e Replicabilidade', index: 2 },
    { id: 'gestao', name: 'Gestão, Estrutura e Pessoas', index: 3 },
    { id: 'mercado', name: 'Mercado e Posicionamento', index: 4 }
  ];

  // Validation rules
  const cleanPhone = phone.replace(/\D/g, '');
  const isPhoneValid = cleanPhone.length >= 10 && cleanPhone.length <= 11;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const whitelist = ['joshuafguirado@gmail.com', 'consultoriaricardo@gmail.com'];
  const isWhitelisted = whitelist.includes(email.trim().toLowerCase());
  const emailExists = !isWhitelisted && results.some(r => r.email?.trim().toLowerCase() === email.trim().toLowerCase());

  const isFormValid = () => {
    return (
      clientName.trim() !== '' &&
      companyName.trim() !== '' &&
      isEmailValid &&
      !emailExists &&
      isPhoneValid &&
      city.trim() !== '' &&
      segment.trim() !== '' &&
      operationTimeValue.trim() !== '' &&
      revenueValue.trim() !== '' &&
      parseInt(ownUnits) > 0
    );
  };

  // Compile calculated scores (spreadsheet logic)
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
      categoryMaxScores[c.id] = c.count * 10;
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
      score: Math.round(totalWeightedScore * 10) / 10,
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

  const handleFinish = async () => {
    if (totalAnswered < questions.length) return;

    const { score, categoryScores, categoryMaxScores } = calculateResult(answers);
    const resultId = Math.random().toString(36).substring(7);

    // Formatted operation time and revenue for consistency
    const finalOperationTime = `${operationTimeValue} ${operationTimeUnit === 'Anos' ? 'ano(s)' : 'mês(es)'}`;
    const finalRevenue = `R$ ${revenueValue} ${revenueUnit.toLowerCase()}`;

    const newResult = {
      id: resultId,
      type: 'franqueabilidade' as const,
      clientName,
      companyName,
      email,
      phone: cleanPhone,
      city,
      segment,
      operationTime: finalOperationTime,
      ownUnits: parseInt(ownUnits) || 1,
      revenue: finalRevenue,
      date, // Saves clean YYYY-MM-DD
      score,
      categoryScores,
      categoryMaxScores,
      answers
    };

    // Save locally first as a secure backup
    addResult(newResult);

    // Save to Supabase database if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('diagnostics')
          .insert([{
            id: newResult.id,
            type: newResult.type,
            client_name: newResult.clientName,
            company_name: newResult.companyName,
            email: newResult.email,
            phone: newResult.phone,
            city: newResult.city,
            segment: newResult.segment,
            operation_time: newResult.operationTime,
            own_units: newResult.ownUnits,
            revenue: newResult.revenue,
            date: newResult.date,
            score: newResult.score,
            category_scores: newResult.categoryScores,
            category_max_scores: newResult.categoryMaxScores,
            answers: newResult.answers
          }]);

        if (error) {
          console.error('Error saving to Supabase:', error);
        }
      } catch (err) {
        console.error('Failed to save to Supabase:', err);
      }
    }

    navigate(`/resultado/${resultId}`);
  };

  const currentStepConfig = stepsConfig[currentStep];
  const currentCategoryQuestions = currentStep < 5 
    ? questions.filter(q => q.categoryId === currentStepConfig.id)
    : [];

  const allAnsweredInCurrentStep = currentStep < 5
    ? currentCategoryQuestions.every(q => answers[q.id] !== undefined)
    : true;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Tabs Menu */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-2xl shadow-sm overflow-x-auto scrollbar-none shrink-0">
        <button
          onClick={() => {
            setActiveTab('inicio');
          }}
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
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1A2840]/5 border border-[#1A2840]/10 p-2 shrink-0">
                  <img src="/logo.png" alt="R. Guirado Emblem" className="h-full w-full object-contain" />
                </div>
                <div>
                  <h2 className="font-heading font-black text-base tracking-tight leading-none text-[#1A2840]">
                    R.Guirado
                  </h2>
                  <p className="text-[9px] text-[#F3C012] font-extrabold tracking-widest uppercase mt-0.5">
                    Franchising
                  </p>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1F4761]">PRÉ-DIAGNÓSTICO DE FRANQUIAS</h1>
              <p className="text-gray-500 mt-3 text-sm md:text-base max-w-4xl leading-relaxed">
                Descubra, em poucos minutos, o quanto o seu negócio está preparado para se transformar em uma rede de franquias — e exatamente o que falta para chegar lá.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#1A2840] uppercase tracking-wide border-b border-gray-100 pb-2">Seus Dados</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase">Nome completo</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all text-sm text-[#1A2840]"
                    placeholder="Seu nome"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase">Empresa / Marca</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all text-sm text-[#1A2840]"
                    placeholder="Nome do seu negócio"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase">E-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all text-sm text-[#1A2840]",
                      (email.trim() !== '' && !isEmailValid) || emailExists ? 'border-red-400 bg-red-50/35' : 'border-gray-300'
                    )}
                    placeholder="seuemail@exemplo.com"
                  />
                  {email.trim() !== '' && !isEmailValid && (
                    <span className="text-[10px] text-red-500 font-bold">Por favor, insira um e-mail válido</span>
                  )}
                  {email.trim() !== '' && isEmailValid && emailExists && (
                    <span className="text-[10px] text-red-500 font-bold block">Este e-mail já realizou o pré-diagnóstico. Apenas um teste é permitido por e-mail.</span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase">WhatsApp (com DDD)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all text-sm text-[#1A2840]",
                      phone.trim() !== '' && !isPhoneValid ? 'border-red-400 bg-red-50/35' : 'border-gray-300'
                    )}
                    placeholder="Ex: 44 99966-5711"
                  />
                  {phone.trim() !== '' && !isPhoneValid && (
                    <span className="text-[10px] text-red-500 font-bold">Insira um número de telefone com DDD (10 ou 11 dígitos numéricos)</span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase">Cidade / UF</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all text-sm text-[#1A2840]"
                    placeholder="Ex: Maringá / PR"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase">Segmento de atuação</label>
                  <input
                    type="text"
                    value={segment}
                    onChange={(e) => setSegment(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all text-sm text-[#1A2840]"
                    placeholder="Ex: Alimentação, Estética, Varejo"
                  />
                </div>

                {/* Tempo de operação com seletor anos/meses */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase block">Tempo de operação</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="1"
                      placeholder="Ex: 3"
                      value={operationTimeValue}
                      onChange={(e) => setOperationTimeValue(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all text-sm text-[#1A2840]"
                    />
                    <select
                      value={operationTimeUnit}
                      onChange={(e) => setOperationTimeUnit(e.target.value as 'Anos' | 'Meses')}
                      className="px-3 py-2.5 rounded-xl border border-gray-300 text-[#1A2840] bg-white font-semibold text-sm outline-none cursor-pointer focus:ring-1 focus:ring-[#1F4761]"
                    >
                      <option value="Anos" className="text-[#1A2840]">Ano(s)</option>
                      <option value="Meses" className="text-[#1A2840]">Mês(es)</option>
                    </select>
                  </div>
                </div>

                {/* Faturamento médio com seletor Mil/Milhões */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase block">Faturamento médio mensal por unidade</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ex: 50 ou 1.5"
                      value={revenueValue}
                      onChange={(e) => setRevenueValue(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all text-sm text-[#1A2840]"
                    />
                    <select
                      value={revenueUnit}
                      onChange={(e) => setRevenueUnit(e.target.value as 'Mil' | 'Milhões')}
                      className="px-3 py-2.5 rounded-xl border border-gray-300 text-[#1A2840] bg-white font-semibold text-sm outline-none cursor-pointer focus:ring-1 focus:ring-[#1F4761]"
                    >
                      <option value="Mil" className="text-[#1A2840]">Mil</option>
                      <option value="Milhões" className="text-[#1A2840]">Milhões</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 uppercase">Nº unidades próprias</label>
                    <input
                      type="number"
                      min="1"
                      value={ownUnits}
                      onChange={(e) => setOwnUnits(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all text-sm text-[#1A2840]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 uppercase">Data do preenchimento</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all text-sm text-[#1A2840]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-md font-bold text-[#1A2840] uppercase tracking-wide">Como Funciona</h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
                <li>Vá até a aba «Questionário» e responda às 25 perguntas divididas em 5 etapas baseadas em cada dimensão. Escolha uma opção na lista suspensa de cada linha.</li>
                <li>Não existe resposta certa ou errada — responda com sinceridade, porque o resultado só é útil se refletir a realidade. As pontuações e as classificações ficam ocultas durante o questionário para evitar viés.</li>
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
                Ir para o Questionário <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          /* Tab Questionário split in steps */
          <div className="space-y-6">
            {currentStep < 5 ? (
              /* Steps 0 to 4 (Dimensions evaluation) */
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 gap-2 shrink-0">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1F4761] bg-[#1F4761]/10 px-2.5 py-1 rounded-md">
                      Etapa {currentStep + 1} de 5 • {currentStepConfig.name}
                    </span>
                    <h2 className="text-xl font-bold text-[#1A2840] mt-2">Questões de Franqueabilidade</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gray-400">
                      Progresso Geral: {totalAnswered} de {questions.length} respondidas
                    </span>
                  </div>
                </div>

                {/* Table structure for current category questions */}
                <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm bg-white">
                  <table className="w-full text-left border-collapse min-w-[800px] text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 border-b border-gray-100 font-bold text-xs">
                        <th className="py-4 px-4 w-12 text-center">Nº</th>
                        <th className="py-4 px-4 w-60 text-left">Dimensão</th>
                        <th className="py-4 px-4 w-72 text-left">Item avaliado</th>
                        <th className="py-4 px-4">Sua resposta</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentCategoryQuestions.map((q) => {
                        // Find overall index
                        const overallIdx = questions.findIndex(item => item.id === q.id);
                        const selectedScore = answers[q.id];
                        const selectedOptIndex = q.options.findIndex(opt => opt.score === selectedScore);
                        const selectedVal = selectedOptIndex !== -1 ? selectedOptIndex.toString() : "";

                        return (
                          <tr key={q.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-4 font-semibold text-gray-400 text-center">{overallIdx + 1}</td>
                            <td className="py-4 px-4 font-bold text-left text-gray-700">
                              <span className={cn(
                                "px-2.5 py-1 rounded-md uppercase tracking-wider text-[10px] inline-block text-left",
                                q.categoryId === 'marca' ? 'bg-blue-50 text-blue-700' :
                                q.categoryId === 'fin' ? 'bg-emerald-50 text-emerald-700' :
                                q.categoryId === 'ope' ? 'bg-purple-50 text-purple-700' :
                                q.categoryId === 'gestao' ? 'bg-amber-50 text-amber-700' :
                                'bg-pink-50 text-pink-700'
                              )}>
                                {q.categoryName}
                              </span>
                            </td>
                            <td className="py-4 px-4 font-semibold text-[#1A2840] leading-snug">{q.text}</td>
                            <td className="py-4 px-4">
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
                                  "w-full px-3 py-2 rounded-lg border text-sm font-semibold focus:ring-1 focus:ring-[#1F4761] outline-none bg-white",
                                  selectedVal === "" ? "border-gray-200 text-gray-400" : "border-[#1F4761]/40 text-[#1A2840]"
                                )}
                              >
                                <option value="" className="text-gray-400 bg-white">Selecione uma resposta...</option>
                                {q.options.map((opt, oIdx) => (
                                  <option key={oIdx} value={oIdx} className="text-[#1A2840] bg-white font-medium">
                                    {opt.text}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Progress bar in bottom */}
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mt-4">
                  <div 
                    className="bg-[#1F4761] h-full transition-all duration-300"
                    style={{ width: `${(totalAnswered / questions.length) * 100}%` }}
                  />
                </div>

                {/* Navigation inside steps */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (currentStep > 0) {
                        setCurrentStep(currentStep - 1);
                      } else {
                        setActiveTab('inicio');
                      }
                    }}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Voltar
                  </Button>

                  <Button
                    disabled={!allAnsweredInCurrentStep}
                    onClick={() => {
                      setCurrentStep(currentStep + 1);
                    }}
                    className="gap-2"
                  >
                    Próxima Etapa <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              /* Step 5: Finalizar Diagnóstico Screen */
              <div className="max-w-2xl mx-auto py-10 text-center space-y-8">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-200">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Questionário Concluído</span>
                  <h2 className="text-3xl font-black text-[#1A2840]">TUDO PRONTO!</h2>
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                    Você respondeu com sucesso às 25 perguntas do Pré-Diagnóstico de Franqueabilidade. As notas foram computadas automaticamente e seu parecer estratégico já está pronto para visualização.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-left space-y-3 text-sm text-gray-600 leading-normal">
                  <h4 className="font-bold text-[#1A2840] uppercase text-xs tracking-wider">Resumo do Envio</h4>
                  <p><strong>Nome Completo:</strong> {clientName}</p>
                  <p><strong>Empresa / Marca:</strong> {companyName}</p>
                  <p><strong>Cidade / Estado:</strong> {city}</p>
                  <p><strong>Total de Questões Respondidas:</strong> 25 de 25</p>
                </div>

                {/* Finalize button */}
                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(4)}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Revisar Respostas
                  </Button>
                  <Button
                    onClick={handleFinish}
                    className="gap-2"
                    variant="secondary"
                  >
                    Gerar Meu Pré-Diagnóstico & Plano de Ação <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Extra CTA final support */}
                <div className="pt-8 border-t border-gray-100 flex flex-col items-center space-y-3">
                  <p className="text-xs text-gray-400">Tem alguma dúvida ou gostaria de assistência?</p>
                  <a
                    href="https://wa.me/5544999665711?text=Olá! Estou no site realizando o formulário de Pré-Diagnóstico e gostaria de tirar uma dúvida."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#25D366] hover:underline"
                  >
                    <Phone className="w-4 h-4 fill-[#25D366] stroke-none" /> Chamar Suporte R.Guirado no WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
