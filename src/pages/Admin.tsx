import React, { useState, useEffect } from 'react';
import { useStore } from '@/src/store';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Link } from 'react-router-dom';
import { Search, Trash2, ExternalLink, BarChart3, Users, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/src/lib/supabase';

export function Admin() {
  const { results, deleteResult, isAdminAuthenticated, setAdminAuthenticated } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [password, setPassword] = useState('');
  
  const [dbResults, setDbResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  const fetchDbResults = async () => {
    if (!isAdminAuthenticated || !isSupabaseConfigured || !supabase) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('diagnostics')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching admin data:', error);
      } else if (data) {
        const mapped = data.map(item => ({
          id: item.id,
          type: item.type,
          clientName: item.client_name,
          companyName: item.company_name,
          email: item.email,
          phone: item.phone,
          city: item.city,
          segment: item.segment,
          operationTime: item.operation_time,
          ownUnits: item.own_units,
          revenue: item.revenue,
          date: item.date,
          score: Number(item.score),
          categoryScores: item.category_scores,
          categoryMaxScores: item.category_max_scores,
          answers: item.answers,
          feedbackRating: item.feedback_rating
        }));
        setDbResults(mapped);
      }
    } catch (err) {
      console.error('Failed to fetch admin data from Supabase:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchDbResults();
    }
  }, [isAdminAuthenticated]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este pré-diagnóstico do banco de dados?')) {
      return;
    }

    // Delete locally
    deleteResult(id);
    setDbResults(prev => prev.filter(r => r.id !== id));

    // Delete remotely in Supabase
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('diagnostics')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Error deleting from Supabase:', error);
        }
      } catch (err) {
        console.error('Failed to delete from Supabase:', err);
      }
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-center text-[#1A2840] mb-6">Acesso Administrativo</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Senha de Acesso</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && password === 'admin123') {
                    setAdminAuthenticated(true);
                  }
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1F4761] outline-none transition-all"
                placeholder="Digite a senha"
              />
            </div>
            <Button 
              className="w-full" 
              onClick={() => {
                if (password === 'admin123') {
                  setAdminAuthenticated(true);
                } else {
                  alert('Senha incorreta!');
                }
              }}
            >
              Acessar
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const displayResults = isSupabaseConfigured ? dbResults : results;

  const filteredResults = displayResults.filter(r => 
    r.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.type.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Stats
  const total = displayResults.length;
  const avgScore = total > 0 ? Math.round(displayResults.reduce((acc, r) => acc + r.score, 0) / total) : 0;
  const readyToExpand = displayResults.filter(r => r.type === 'empresarial' && r.score >= 81).length;
  const franchisable = displayResults.filter(r => r.type === 'franqueabilidade' && r.score >= 81).length;

  return (
    <div className="space-y-8">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Total de Pré-Diagnósticos</p>
          <h3 className="text-3xl font-bold text-[#1A2840]">{total}</h3>
        </Card>
        
        <Card>
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Média Geral</p>
          <h3 className="text-3xl font-bold text-[#1A2840]">{avgScore}<span className="text-lg text-gray-400">/100</span></h3>
        </Card>

        <Card>
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Prontas p/ Expansão</p>
          <h3 className="text-3xl font-bold text-[#1A2840]">{readyToExpand}</h3>
        </Card>

        <Card>
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <ExternalLink className="w-5 h-5" />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Franqueáveis (Alto Pot.)</p>
          <h3 className="text-3xl font-bold text-[#1A2840]">{franchisable}</h3>
        </Card>
      </div>

      {/* List */}
      <Card className="p-0">
        <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-bold text-[#1A2840]">Histórico</h2>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar empresa ou tipo..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4761] text-sm transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                <th className="px-6 md:px-8 py-4 font-medium">Empresa</th>
                <th className="px-6 md:px-8 py-4 font-medium">Tipo</th>
                <th className="px-6 md:px-8 py-4 font-medium">Data</th>
                <th className="px-6 md:px-8 py-4 font-medium text-center">Score</th>
                <th className="px-6 md:px-8 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin text-[#1F4761]" />
                      <span>Carregando pré-diagnósticos do Supabase...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredResults.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Nenhum pré-diagnóstico encontrado.
                  </td>
                </tr>
              ) : (
                filteredResults.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 md:px-8 py-4">
                      <div className="font-semibold text-[#1A2840]">{r.clientName}</div>
                    </td>
                    <td className="px-6 md:px-8 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium ${
                        r.type === 'empresarial' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {r.type === 'empresarial' ? 'Empresarial' : 'Franqueabilidade'}
                      </span>
                    </td>
                    <td className="px-6 md:px-8 py-4 text-gray-500 text-sm">
                      {new Date(r.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 md:px-8 py-4">
                      <div className="flex justify-center">
                        <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm ${
                          r.score >= 80 ? 'bg-green-100 text-green-700' : 
                          r.score >= 60 ? 'bg-blue-100 text-blue-700' : 
                          r.score >= 30 ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-red-100 text-red-700'
                        }`}>
                          {r.score}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/resultado/${r.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Ver Resultado">
                            <ExternalLink className="w-4 h-4 text-gray-500 hover:text-[#1F4761]" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0" 
                          onClick={() => handleDelete(r.id)}
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
