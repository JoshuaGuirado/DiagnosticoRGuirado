import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/src/store';
import { Building2, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Home() {
  const navigate = useNavigate();
  const results = useStore(state => state.results);
  const recentResults = [...results].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Cards */}
      <section className="grid lg:grid-cols-2 gap-8 shrink-0">
        <div 
          className="group relative bg-gray-100 p-1 rounded-[32px] cursor-not-allowed opacity-75"
        >
          <div className="p-6 md:p-8 h-full flex flex-col border border-gray-200 rounded-[28px] bg-gray-50/50">
            <div className="w-14 h-14 bg-gray-200 rounded-2xl flex items-center justify-center mb-6">
              <Building2 className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-500">Diagnóstico Empresarial</h3>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed">
              Análise completa de 360º abrangendo Estratégia, Finanças, Comercial, Operações, RH e Tecnologia.
            </p>
            <div className="mt-auto flex justify-between items-center">
              <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                21 Questões • 7 Pilares
              </div>
              <div className="px-4 py-2 bg-gray-200 text-gray-500 text-xs font-bold rounded-xl">
                Em breve
              </div>
            </div>
          </div>
        </div>

        <div 
          onClick={() => navigate('/diagnostico/franqueabilidade')}
          className="group relative bg-white p-1 rounded-[32px] shadow-soft cursor-pointer hover:-translate-y-1 transition-transform duration-300"
        >
          <div className="p-6 md:p-8 h-full flex flex-col border border-[#1F4761]/10 rounded-[28px]">
            <div className="w-14 h-14 card-gradient rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#1A2840]/20">
              <TrendingUp className="w-7 h-7 text-[#F3C611]" />
            </div>
            <h3 className="text-xl font-bold mb-3">Diagnóstico de Franqueabilidade</h3>
            <p className="text-sm opacity-60 mb-8 leading-relaxed">
              Avaliação técnica para medir o potencial de escalabilidade e replicação do modelo de negócio.
            </p>
            <div className="mt-auto flex justify-between items-center">
              <div className="text-[10px] uppercase tracking-widest font-bold text-[#1F4761]">
                20 Questões • 10 Áreas
              </div>
              <button className="px-6 py-3 bg-[#1A2840] text-white font-bold rounded-xl shadow-lg shadow-[#1A2840]/20 group-hover:scale-105 transition-transform">
                Iniciar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="flex-1 bg-white rounded-[32px] p-6 md:p-8 shadow-soft border border-white flex flex-col min-h-0">
        <div className="flex justify-between items-center mb-6 shrink-0">
          <h4 className="font-bold text-lg">Minhas Atividades Recentes</h4>
          <button 
            onClick={() => navigate('/admin')}
            className="text-[#F3C611] font-bold text-xs uppercase tracking-widest hover:opacity-80"
          >
            Ver todos
          </button>
        </div>
        
        <div className="space-y-4 overflow-y-auto pr-2 pb-2">
          {recentResults.length === 0 ? (
            <div className="text-center py-10 text-gray-500 text-sm">
              Nenhum diagnóstico realizado ainda.
            </div>
          ) : (
            recentResults.map(r => (
              <div key={r.id} className="flex items-center p-4 bg-[#F8F0E3]/50 rounded-2xl border border-[#1F4761]/5">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-[#1A2840] shadow-sm shrink-0">
                  {r.clientName.substring(0, 2).toUpperCase()}
                </div>
                <div className="ml-4 flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{r.clientName}</p>
                  <p className="text-[10px] opacity-60 truncate">
                    {r.type === 'empresarial' ? 'Empresarial' : 'Franqueabilidade'} • Finalizado em {new Date(r.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="text-right mr-6 shrink-0 hidden sm:block">
                  <p className={`text-xs font-bold ${r.score >= 80 ? 'text-green-600' : r.score >= 60 ? 'text-blue-600' : r.score >= 30 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {r.score}/100
                  </p>
                  <p className="text-[9px] opacity-50 uppercase">
                    {r.score >= 80 ? 'Alto Potencial' : r.score >= 60 ? 'Médio' : r.score >= 30 ? 'Atenção' : 'Risco'}
                  </p>
                </div>
                <button 
                  onClick={() => navigate(`/resultado/${r.id}`)}
                  className="w-8 h-8 rounded-lg border border-[#1A2840]/10 flex items-center justify-center cursor-pointer hover:bg-white hover:shadow-sm transition-all shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
