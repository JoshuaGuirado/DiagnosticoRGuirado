import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { ProgressBar } from '@/src/components/ui/progress';
import { diagnosticoEmpresarial, diagnosticoFranqueabilidade } from '@/src/data/questions';
import { useStore } from '@/src/store';
import { motion, AnimatePresence } from 'framer-motion';

export function Diagnostic() {
  const { type } = useParams<{ type: 'empresarial' | 'franqueabilidade' }>();
  const navigate = useNavigate();
  const addResult = useStore(state => state.addResult);

  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [niche, setNiche] = useState('');
  const [started, setStarted] = useState(false);
  
  const questions = type === 'empresarial' ? diagnosticoEmpresarial : diagnosticoFranqueabilidade;
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!type || (type !== 'empresarial' && type !== 'franqueabilidade')) {
      navigate('/');
    }
  }, [type, navigate]);

  if (!started) {
    return (
      <div className="max-w-xl mx-auto mt-10 md:mt-20">
        <Card>
          <h2 className="text-2xl font-bold text-[#1A2840] mb-6 text-center">
            {type === 'empresarial' ? 'Diagnóstico Empresarial' : 'Diagnóstico de Franqueabilidade'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nome da Empresa</label>
              <input 
                type="text" 
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all"
                placeholder="Ex: Minha Empresa LTDA"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Telefone (WhatsApp)</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all"
                placeholder="Ex: (11) 99999-9999"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Cidade/Estado</label>
              <input 
                type="text" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all"
                placeholder="Ex: São Paulo / SP"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nicho de Atuação</label>
              <input 
                type="text" 
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] focus:border-transparent outline-none transition-all"
                placeholder="Ex: Alimentação, Serviços, Varejo"
              />
            </div>
            <Button 
              className="w-full mt-4" 
              size="lg"
              disabled={!clientName.trim() || !phone.trim() || !city.trim() || !niche.trim()}
              onClick={() => setStarted(true)}
            >
              Começar Avaliação
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];

  const handleAnswer = (score: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: score };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 400); // Small delay for visual feedback
    } else {
      finishDiagnostic(newAnswers);
    }
  };

  const finishDiagnostic = (finalAnswers: Record<string, number>) => {
    // Calculate results
    let totalScore = 0;
    const categoryScores: Record<string, number> = {};
    const categoryMaxScores: Record<string, number> = {};

    questions.forEach(q => {
      const score = finalAnswers[q.id] || 0;
      totalScore += score;
      
      if (!categoryScores[q.categoryId]) {
        categoryScores[q.categoryId] = 0;
        categoryMaxScores[q.categoryId] = 0;
      }
      categoryScores[q.categoryId] += score;
      categoryMaxScores[q.categoryId] += 5; // Max score per question is 5
    });

    const maxTotal = questions.length * 5;
    const normalizedScore = Math.round((totalScore / maxTotal) * 100);

    const resultId = Math.random().toString(36).substring(7);
    const newResult = {
      id: resultId,
      type: type as 'empresarial' | 'franqueabilidade',
      clientName,
      phone,
      city,
      niche,
      date: new Date().toISOString(),
      score: normalizedScore,
      categoryScores,
      categoryMaxScores,
      answers: finalAnswers
    };

    addResult(newResult);
    navigate(`/resultado/${resultId}`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-4 md:mt-10 pb-10">
      <div className="mb-8 px-2">
        <ProgressBar current={currentStep + 1} total={questions.length} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="min-h-[450px]">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-[#1F4761]/10 text-[#1F4761] text-[10px] font-bold uppercase tracking-widest rounded-lg mb-4">
                {currentQuestion.categoryName}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-[#1A2840] leading-snug">
                {currentQuestion.text}
              </h3>
            </div>

            <div className="flex-1 flex flex-col gap-3 justify-end">
              {currentQuestion.options.map((option, index) => {
                const isSelected = answers[currentQuestion.id] === option.score;
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.score)}
                    className={`text-left w-full px-6 py-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group
                      ${isSelected 
                        ? 'border-[#1F4761] bg-[#1F4761]/5 shadow-sm' 
                        : 'border-[#1A2840]/10 hover:border-[#1F4761]/30 hover:bg-[#F8F0E3]/50'
                      }`}
                  >
                    <span className={`font-medium ${isSelected ? 'text-[#1F4761]' : 'text-[#1A2840]/80'}`}>
                      {option.text}
                    </span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0
                      ${isSelected ? 'border-[#1F4761]' : 'border-gray-300 group-hover:border-[#1F4761]/50'}
                    `}>
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#1F4761]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
