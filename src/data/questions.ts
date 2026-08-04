export type Option = {
  text: string;
  score: number;
  recommendation?: string;
};

export type Question = {
  id: string;
  categoryId: string;
  categoryName: string;
  text: string;
  options: Option[];
};

export const diagnosticoEmpresarial: Question[] = [
  // Planejamento Estratégico (3)
  { 
    id: "emp_pe_1", 
    categoryId: "pe", 
    categoryName: "Planejamento Estratégico", 
    text: "A empresa possui um planejamento estratégico formalizado para os próximos anos?",
    options: [
      { text: "Não possuímos planejamento, apagamos incêndios diários", score: 0 },
      { text: "Temos algumas ideias e metas informais", score: 1 },
      { text: "Temos um planejamento básico, mas raramente é consultado", score: 2 },
      { text: "Temos um plano e revisamos esporadicamente", score: 3 },
      { text: "Temos um planejamento anual claro e acompanhamos frequentemente", score: 4 },
      { text: "Planejamento estruturado, com metas e OKRs acompanhados rigorosamente", score: 5 },
    ]
  },
  { 
    id: "emp_pe_2", 
    categoryId: "pe", 
    categoryName: "Planejamento Estratégico", 
    text: "As metas da empresa são claras, quantificáveis e compartilhadas com toda a equipe?",
    options: [
      { text: "Não temos metas definidas", score: 0 },
      { text: "Apenas os sócios sabem das metas", score: 1 },
      { text: "Metas existem, mas não são claras para todos", score: 2 },
      { text: "A liderança conhece as metas, mas a equipe operacional não", score: 3 },
      { text: "A maioria da equipe conhece suas metas e indicadores", score: 4 },
      { text: "Todos conhecem suas metas, acompanham e são cobrados por elas", score: 5 },
    ]
  },
  { 
    id: "emp_pe_3", 
    categoryId: "pe", 
    categoryName: "Planejamento Estratégico", 
    text: "A missão, visão e valores da empresa estão definidos e vivos na cultura do dia a dia?",
    options: [
      { text: "Nunca definimos isso", score: 0 },
      { text: "Temos definido apenas na cabeça dos fundadores", score: 1 },
      { text: "Está no papel, mas não aplicamos no dia a dia", score: 2 },
      { text: "Temos divulgado, mas não reflete totalmente a realidade", score: 3 },
      { text: "Nossa cultura é forte e a equipe entende bem os valores", score: 4 },
      { text: "Contratamos, demitimos e tomamos decisões com base em nossos valores", score: 5 },
    ]
  },
  
  // Financeiro (3)
  { 
    id: "emp_fin_1", 
    categoryId: "fin", 
    categoryName: "Financeiro", 
    text: "O fluxo de caixa é atualizado e projetado para os próximos meses?",
    options: [
      { text: "Não fazemos controle de caixa", score: 0 },
      { text: "Anotamos entradas e saídas de forma bem básica", score: 1 },
      { text: "Temos controle do presente, mas sem projeção futura", score: 2 },
      { text: "Projetamos para as próximas semanas apenas", score: 3 },
      { text: "Temos projeção clara para os próximos meses", score: 4 },
      { text: "Fluxo de caixa rigoroso, com cenários otimistas e pessimistas projetados", score: 5 },
    ]
  },
  { 
    id: "emp_fin_2", 
    categoryId: "fin", 
    categoryName: "Financeiro", 
    text: "A empresa possui DRE (Demonstrativo de Resultados) e apura o lucro mensalmente?",
    options: [
      { text: "Não sabemos se damos lucro ou prejuízo", score: 0 },
      { text: "Achamos que damos lucro porque sobra dinheiro na conta", score: 1 },
      { text: "Fazemos uma apuração informal, mas sem estrutura de DRE", score: 2 },
      { text: "Temos DRE, mas atrasa ou tem dados não muito confiáveis", score: 3 },
      { text: "Apuramos o DRE todo mês e analisamos o resultado", score: 4 },
      { text: "DRE impecável, analisado mensalmente para tomada de decisões estratégicas", score: 5 },
    ]
  },
  { 
    id: "emp_fin_3", 
    categoryId: "fin", 
    categoryName: "Financeiro", 
    text: "A margem de contribuição e o ponto de equilíbrio do negócio são conhecidos com precisão?",
    options: [
      { text: "Não conhecemos esses termos", score: 0 },
      { text: "Temos uma noção muito por cima dos custos", score: 1 },
      { text: "Sabemos o ponto de equilíbrio, mas não temos margem de contribuição clara", score: 2 },
      { text: "Temos esses números, mas não usamos na precificação", score: 3 },
      { text: "Conhecemos bem nossa margem e ponto de equilíbrio", score: 4 },
      { text: "Dominamos esses indicadores e os usamos diariamente para estratégias de vendas", score: 5 },
    ]
  },

  // Comercial (3)
  { 
    id: "emp_com_1", 
    categoryId: "com", 
    categoryName: "Comercial", 
    text: "O processo de vendas (funil de vendas) é estruturado, documentado e seguido pela equipe?",
    options: [
      { text: "Não temos processo de vendas", score: 0 },
      { text: "Cada vendedor faz do seu próprio jeito", score: 1 },
      { text: "Temos um processo básico, mas não é documentado", score: 2 },
      { text: "Processo existe, mas nem todos seguem ou preenchem", score: 3 },
      { text: "Funil claro, equipe treinada e acompanhada frequentemente", score: 4 },
      { text: "Funil otimizado, script de vendas de alta conversão e auditoria constante", score: 5 },
    ]
  },
  { 
    id: "emp_com_2", 
    categoryId: "com", 
    categoryName: "Comercial", 
    text: "A empresa utiliza um sistema de CRM para gestão do relacionamento com clientes e prospecções?",
    options: [
      { text: "Usamos apenas papel e caneta", score: 0 },
      { text: "Controlamos em cadernos ou WhatsApp", score: 1 },
      { text: "Usamos planilhas de Excel", score: 2 },
      { text: "Temos CRM, mas é mal alimentado", score: 3 },
      { text: "CRM é bem utilizado pela maior parte da equipe", score: 4 },
      { text: "CRM é o coração das vendas, tudo está lá de forma impecável", score: 5 },
    ]
  },
  { 
    id: "emp_com_3", 
    categoryId: "com", 
    categoryName: "Comercial", 
    text: "As taxas de conversão de vendas e metas individuais são medidas constantemente?",
    options: [
      { text: "Não medimos conversão, apenas o total vendido", score: 0 },
      { text: "Temos uma vaga ideia da conversão geral", score: 1 },
      { text: "Medimos às vezes, quando as vendas caem", score: 2 },
      { text: "Acompanhamos mensalmente as métricas principais", score: 3 },
      { text: "Acompanhamos semanalmente e damos feedbacks", score: 4 },
      { text: "Gestão diária de indicadores e melhoria contínua na taxa de conversão", score: 5 },
    ]
  },

  // Marketing (3)
  { 
    id: "emp_mkt_1", 
    categoryId: "mkt", 
    categoryName: "Marketing", 
    text: "O posicionamento da marca e o público-alvo (ICP) estão claramente definidos?",
    options: [
      { text: "Vendemos para qualquer um que quiser comprar", score: 0 },
      { text: "Temos uma ideia geral de quem compra", score: 1 },
      { text: "Temos um público-alvo definido, mas a comunicação não foca nele", score: 2 },
      { text: "Conhecemos bem nosso público e tentamos nos posicionar", score: 3 },
      { text: "Posicionamento claro e focado no ICP", score: 4 },
      { text: "Somos autoridade no nosso nicho, o cliente ideal nos procura pelo nosso posicionamento", score: 5 },
    ]
  },
  { 
    id: "emp_mkt_2", 
    categoryId: "mkt", 
    categoryName: "Marketing", 
    text: "Existe um processo ativo, recorrente e previsível de geração de leads (tráfego, inbound, outbound)?",
    options: [
      { text: "Dependemos 100% de indicação boca-a-boca", score: 0 },
      { text: "Fazemos postagens esperando que alguém compre", score: 1 },
      { text: "Fazemos anúncios de vez em quando", score: 2 },
      { text: "Temos campanhas ativas, mas o custo e volume oscilam muito", score: 3 },
      { text: "Geramos leads de forma consistente todos os meses", score: 4 },
      { text: "Máquina de aquisição previsível, lucrativa e escalável", score: 5 },
    ]
  },
  { 
    id: "emp_mkt_3", 
    categoryId: "mkt", 
    categoryName: "Marketing", 
    text: "O branding, a identidade visual e a comunicação nas redes sociais são consistentes e profissionais?",
    options: [
      { text: "Não temos identidade visual definida", score: 0 },
      { text: "Comunicação bem amadora, feita internamente sem padrão", score: 1 },
      { text: "Temos um logo legal, mas as redes sociais são desorganizadas", score: 2 },
      { text: "Nossa imagem é boa, mas postamos com pouca consistência", score: 3 },
      { text: "Mantemos um bom padrão visual e constância nas redes", score: 4 },
      { text: "Branding fortíssimo, design premium e comunicação altamente engajadora", score: 5 },
    ]
  },

  // Operações (3)
  { 
    id: "emp_ope_1", 
    categoryId: "ope", 
    categoryName: "Operações", 
    text: "Os processos internos e o passo a passo da entrega do produto/serviço estão documentados (POPs)?",
    options: [
      { text: "Nada documentado, tudo está na cabeça dos donos", score: 0 },
      { text: "Temos alguns rascunhos informais", score: 1 },
      { text: "Parte está documentada, mas desatualizada", score: 2 },
      { text: "Temos POPs, mas a equipe consulta raramente", score: 3 },
      { text: "Processos bem documentados e utilizados nos treinamentos", score: 4 },
      { text: "Manuais vivos, melhorados constantemente e seguidos à risca por todos", score: 5 },
    ]
  },
  { 
    id: "emp_ope_2", 
    categoryId: "ope", 
    categoryName: "Operações", 
    text: "Existe um controle de qualidade eficiente para garantir que o cliente receba o que comprou sem falhas?",
    options: [
      { text: "Não fazemos controle, só resolvemos quando o cliente reclama", score: 0 },
      { text: "Temos muitos problemas e refações frequentes", score: 1 },
      { text: "Fazemos uma checagem rápida antes de entregar", score: 2 },
      { text: "Temos um padrão, mas ainda acontecem falhas recorrentes", score: 3 },
      { text: "Controle de qualidade rigoroso, raras falhas", score: 4 },
      { text: "Processo à prova de erros, satisfação altíssima medida por NPS", score: 5 },
    ]
  },
  { 
    id: "emp_ope_3", 
    categoryId: "ope", 
    categoryName: "Operações", 
    text: "A operação consegue rodar de forma escalável, sem depender exclusivamente da presença dos sócios?",
    options: [
      { text: "Se o sócio sair, a empresa para no mesmo dia", score: 0 },
      { text: "Sócios resolvem tudo, centralização extrema", score: 1 },
      { text: "A equipe faz o básico, mas qualquer problema pede pro dono", score: 2 },
      { text: "A empresa roda alguns dias sozinha, mas com queda de performance", score: 3 },
      { text: "Sócios estão focados na gestão, a operação roda quase sozinha", score: 4 },
      { text: "Empresa auto-gerenciável, sócios focados puramente no estratégico", score: 5 },
    ]
  },

  // RH (3)
  { 
    id: "emp_rh_1", 
    categoryId: "rh", 
    categoryName: "RH", 
    text: "O organograma da empresa é claro e as descrições de cargo (funções) estão bem definidas?",
    options: [
      { text: "Todo mundo faz um pouco de tudo, sem definição", score: 0 },
      { text: "Não tem organograma, mas as pessoas sabem mais ou menos o que fazer", score: 1 },
      { text: "Cargos definidos de forma verbal, sem formalização", score: 2 },
      { text: "Temos organograma, mas funções ainda se misturam", score: 3 },
      { text: "Organograma e descrições de cargo claros e documentados", score: 4 },
      { text: "Cada membro sabe exatamente seu papel, responsabilidades e métricas", score: 5 },
    ]
  },
  { 
    id: "emp_rh_2", 
    categoryId: "rh", 
    categoryName: "RH", 
    text: "Existe uma rotina estruturada de feedback, avaliação de desempenho e treinamentos para a equipe?",
    options: [
      { text: "Não fazemos nada disso", score: 0 },
      { text: "Só damos feedback quando alguém erra feio (bronca)", score: 1 },
      { text: "Feedback eventual e informal", score: 2 },
      { text: "Temos algumas avaliações e treinamentos esporádicos", score: 3 },
      { text: "Ciclos de feedback regulares e plano de treinamentos", score: 4 },
      { text: "Cultura forte de feedback 1:1, PDI e trilha de capacitação contínua", score: 5 },
    ]
  },
  { 
    id: "emp_rh_3", 
    categoryId: "rh", 
    categoryName: "RH", 
    text: "A empresa possui um plano de cargos e salários ou uma política clara de crescimento e bonificação?",
    options: [
      { text: "Não, ninguém sabe se ou como pode crescer", score: 0 },
      { text: "Damos aumento apenas se o funcionário ameaçar sair", score: 1 },
      { text: "Pagamos comissões, mas sem regra clara de promoção", score: 2 },
      { text: "Temos algumas regras de bônus, mas o crescimento não é claro", score: 3 },
      { text: "Política de bonificação justa e plano de carreira estruturado", score: 4 },
      { text: "Meritocracia total: caminho de crescimento transparente e altamente motivador", score: 5 },
    ]
  },

  // Tecnologia (2)
  { 
    id: "emp_tec_1", 
    categoryId: "tec", 
    categoryName: "Tecnologia", 
    text: "A empresa utiliza um sistema de gestão (ERP) integrado para gerenciar todas as áreas?",
    options: [
      { text: "Não usamos nenhum sistema, tudo manual", score: 0 },
      { text: "Planilhas e controles muito descentralizados", score: 1 },
      { text: "Temos um sistema, mas atende apenas o financeiro ou estoque", score: 2 },
      { text: "ERP implantado, mas usamos apenas as funções básicas", score: 3 },
      { text: "ERP bem utilizado, integrando a maioria das áreas", score: 4 },
      { text: "Operação 100% no sistema, integração completa e processos automatizados", score: 5 },
    ]
  },
  { 
    id: "emp_tec_2", 
    categoryId: "tec", 
    categoryName: "Tecnologia", 
    text: "Existem painéis de indicadores (dashboards de BI) com dados confiáveis para tomada de decisão em tempo real?",
    options: [
      { text: "Não acompanhamos indicadores", score: 0 },
      { text: "Montamos relatórios na mão quando precisamos", score: 1 },
      { text: "Temos alguns relatórios do sistema, mas são confusos", score: 2 },
      { text: "Usamos planilhas consolidadas, atualizadas semanalmente", score: 3 },
      { text: "Temos dashboards bons e consultamos regularmente", score: 4 },
      { text: "Cultura Data-Driven: painéis em tempo real guiando todas as decisões estratégicas", score: 5 },
    ]
  },
];

export const diagnosticoFranqueabilidade: Question[] = [
  // 1. Marca e Blindagem Jurídica (5 itens)
  { 
    id: "frq_marca_1", 
    categoryId: "marca", 
    categoryName: "Marca e Blindagem Jurídica", 
    text: "Registro da marca no INPI",
    options: [
      { text: "Marca sem registro ou pesquisa prévia", score: 0, recommendation: "Bloqueio jurídico crítico. Franquear uma marca sem registro ou com impedimento expõe o franqueador e toda a rede ao risco de ter que mudar de nome. Realize uma busca de anterioridade imediatamente e faça o depósito." },
      { text: "Pedido depositado, porém com oposição ou indeferido", score: 2, recommendation: "Bloqueio jurídico. Franquear uma marca sem registro concedido expõe o franqueador e toda a rede a riscos jurídicos de disputas com terceiros. Depósito no INPI e busca de anterioridade são o primeiro passo, antes de qualquer outra frente." },
      { text: "Pedido em andamento, sem oposição", score: 6, recommendation: "Situação sob acompanhamento. O processo está tramitando normalmente, mas a concessão ainda não é definitiva. Monitore o andamento do pedido até a decisão final do INPI." },
      { text: "Marca registrada e deferida pelo INPI", score: 10, recommendation: "Ativo de marca consolidado. Registro concedido pelo INPI, garantindo exclusividade nacional para a exploração da marca e segurança total para o franqueador e franqueados." }
    ]
  },
  { 
    id: "frq_marca_2", 
    categoryId: "marca", 
    categoryName: "Marca e Blindagem Jurídica", 
    text: "Regularidade jurídica, fiscal e trabalhista da empresa",
    options: [
      { text: "Passivos fiscais ou trabalhistas graves que ameaçam a continuidade da empresa", score: 0, recommendation: "Bloqueio crítico. Pendências financeiras graves trazem riscos patrimoniais diretos para a rede. É urgente realizar uma auditoria legal e renegociar ou parcelar os débitos." },
      { text: "Existem pendências pontuais em negociação", score: 4, recommendation: "Regularize as pendências abertas e faça um raio-x de contingências. O franqueador seguro resolve suas pendências antes de iniciar a expansão, pois o investidor qualificado pede certidões antes de assinar." },
      { text: "Empresa em dia, com pouquíssimas pendências operacionais sob controle", score: 7, recommendation: "Nível satisfatório de regularidade. Continue acompanhando e garanta que não haja novas pendências trabalhistas ou fiscais que possam manchar a reputação da marca." },
      { text: "Regularidade absoluta, com certidões negativas totalmente limpas (C&D)", score: 10, recommendation: "Excelente nível de conformidade jurídica. A regularidade total da empresa transmite segurança jurídica e credibilidade para potenciais franqueados e parceiros comerciais." }
    ]
  },
  { 
    id: "frq_marca_3", 
    categoryId: "marca", 
    categoryName: "Marca e Blindagem Jurídica", 
    text: "Titularidade dos demais ativos (domínio, redes sociais, receitas, sistemas, layout)",
    options: [
      { text: "Ativos de propriedade pessoal dos sócios ou de terceiros, sem contratos", score: 2, recommendation: "Risco de segurança operacional. Transfira a titularidade de todos os domínios, redes sociais e marcas para o CNPJ da franqueadora para evitar bloqueios ou disputas futuras." },
      { text: "Alguns ativos em nome da empresa, outros pertencem a pessoas físicas ou terceiros", score: 5, recommendation: "Formalização parcial. Mapeie todos os ativos intangíveis do negócio e elabore termos de cessão e contratos de transferência de propriedade para a pessoa jurídica." },
      { text: "Todos em nome da empresa, com contratos e cessões formalizados", score: 10, recommendation: "Ativos consolidados na PJ, exatamente como um franqueador precisa estar para licenciar a marca e transferir tecnologia com segurança jurídica para a rede." }
    ]
  },
  { 
    id: "frq_marca_4", 
    categoryId: "marca", 
    categoryName: "Marca e Blindagem Jurídica", 
    text: "Identidade visual e manual de marca",
    options: [
      { text: "Não possuímos identidade visual estruturada ou profissional", score: 0, recommendation: "Identidade visual fraca. A ausência de padrão estético impede a replicação visual. É essencial contratar uma agência para redesenhar a marca e criar um padrão profissional." },
      { text: "Temos logomarca e cores, sem manual", score: 4, recommendation: "Você tem os elementos básicos de logo e cores, falta o manual de identidade que garante que a 10ª unidade seja idêntica à primeira — um dos entregáveis mais rápidos de resolver." },
      { text: "Temos identidade visual e manual básico de marca formalizado", score: 7, recommendation: "Manual de marca ativo. Garanta que o manual seja amplamente divulgado entre designers e fornecedores parceiros para que toda peça publicitária siga o padrão corporativo." },
      { text: "Manual completo de identidade visual detalhado e padronizado em todas as frentes", score: 10, recommendation: "Manual de identidade robusto. O padrão visual está perfeitamente protegido e documentado, facilitando a replicação da marca em qualquer ponto de venda." }
    ]
  },
  { 
    id: "frq_marca_5", 
    categoryId: "marca", 
    categoryName: "Marca e Blindagem Jurídica", 
    text: "Preparo documental para franquear (COF e contrato — Lei 13.966/2019)",
    options: [
      { text: "Não temos conhecimento legal sobre a Lei de Franquias ou documentos necessários", score: 0, recommendation: "Bloqueio legal crítico. O desconhecimento da Lei de Franquias impede a expansão estruturada. É urgente buscar assessoria jurídica especializada para entender os deveres do franqueador." },
      { text: "Conheço superficialmente, nada elaborado", score: 3, recommendation: "A Circular de Oferta de Franquia é obrigatória e deve ser entregue 10 dias antes da assinatura ou pagamento. Sem ela, o contrato é anulável e os valores devolvidos corrigidos. Contrate assessoria." },
      { text: "Temos rascunhos de contratos, mas necessitam de revisão e alinhamento com a nova lei de franquias", score: 6, recommendation: "Necessidade de atualização. Revise os rascunhos dos contratos e a COF sob a ótica da Lei 13.966/2019, inserindo as regras de cotas, territórios e taxas específicas." },
      { text: "Documentação completa (COF, pré-contrato e contrato) atualizada juridicamente", score: 10, recommendation: "Conformidade legal impecável. Os instrumentos de COF e Contrato estão totalmente de acordo com a legislação vigente, mitigando litígios e protegendo os direitos do franqueador." }
    ]
  },

  // 2. Saúde Econômico-Financeira (6 itens)
  { 
    id: "frq_fin_1", 
    categoryId: "fin", 
    categoryName: "Saúde Econômico-Financeira", 
    text: "Lucratividade líquida da operação",
    options: [
      { text: "Margem de lucro líquido negativa (operando em prejuízo)", score: 0, recommendation: "Negócio inviável para franquias no momento. Franquear prejuízo é proibido na prática. Concentre todos os esforços em ajustar custos e receitas na operação própria primeiro." },
      { text: "Lucro líquido abaixo de 8%", score: 3, recommendation: "Não se franquia uma empresa que ainda não provou que dá lucro. Antes de expandir, o caminho é reestruturar margem, custo e precificação na própria operação." },
      { text: "Lucro líquido saudável entre 10% e 15%", score: 7, recommendation: "Margem operacional boa. Garanta a sustentabilidade desse resultado ao longo do ano para demonstrar aos potenciais franqueados uma operação estável e rentável." },
      { text: "Lucro líquido excelente acima de 20%", score: 10, recommendation: "Lucratividade excelente. Essa alta performance financeira é o maior atrativo para novos investidores e facilita enormemente a venda das primeiras franquias." }
    ]
  },
  { 
    id: "frq_fin_2", 
    categoryId: "fin", 
    categoryName: "Saúde Econômico-Financeira", 
    text: "Prazo de retorno do investimento (payback) da unidade",
    options: [
      { text: "Retorno do investimento estimado acima de 48 meses", score: 2, recommendation: "Retorno excessivamente longo. Esse prazo afasta investidores no mercado de franquias. É necessário otimizar o Capex (custo de montagem) para reduzir o payback da unidade." },
      { text: "Entre 25 e 36 meses", score: 6, recommendation: "Payback aceitável, mas não é diferencial competitivo. Revisar investimento inicial e período da unidade piloto pode encurtar esse prazo de retorno." },
      { text: "Retorno rápido estimado entre 18 e 24 meses", score: 9, recommendation: "Prazo de retorno muito competitivo. Esse intervalo é altamente atraente para investidores e se enquadra nas melhores práticas do mercado de franquias nacional." },
      { text: "Retorno ultra rápido estimado em menos de 18 meses", score: 10, recommendation: "Payback recorde, menos de 18 meses. A recuperação rápida do capital investido gera alta liquidez e serve como excelente argumento comercial para a expansão em escala." }
    ]
  },
  { 
    id: "frq_fin_3", 
    categoryId: "fin", 
    categoryName: "Saúde Econômico-Financeira", 
    text: "Capacidade do modelo de suportar royalties e fundo de propaganda",
    options: [
      { text: "Nunca simulei isso", score: 0, recommendation: "Este é o teste decisivo e o mais ignorado. Se a unidade não gera margem para pagar franqueador sem quebrar o franqueado, o modelo de negócio não é franqueável na configuração atual." },
      { text: "A margem é muito apertada; a cobrança de royalties inviabilizaria o lucro do franqueado", score: 3, recommendation: "Gargalo financeiro crítico. O modelo precisa ser reformulado: reduza custos operacionais, renegocie com fornecedores ou reposicione os preços para abrir espaço para as taxas da franqueadora." },
      { text: "O modelo comporta royalties moderados, mas exige alto volume de vendas para compensar", score: 6, recommendation: "Estudo financeiro necessário. Estruture royalties progressivos ou baseados em percentuais fixos sobre o faturamento, mas monitore de perto a saúde de caixa do franqueado nos meses mais fracos." },
      { text: "O modelo comporta perfeitamente royalties e fundo de propaganda padrão, mantendo o franqueado altamente lucrativo", score: 10, recommendation: "Equilíbrio financeiro consolidado. A robustez da margem de lucro permite alimentar a franqueadora com royalties saudáveis sem sufocar a operação do franqueado." }
    ]
  },
  { 
    id: "frq_fin_4", 
    categoryId: "fin", 
    categoryName: "Saúde Econômico-Financeira", 
    text: "Controle financeiro e indicadores de gestão",
    options: [
      { text: "Não temos controle financeiro estruturado; misturamos contas pessoais e da empresa", score: 0, recommendation: "Desorganização financeira crítica. Separe as contas imediatamente e adote um software financeiro. O franqueador precisa ser exemplo de compliance e rigor financeiro." },
      { text: "DRE mensal, com alguns indicadores acompanhados", score: 7, recommendation: "Os controles existem, mas ainda não formam um painel de rede. Padronizar o plano de contas agora evita retrabalho quando houver várias unidades." },
      { text: "Controles rígidos com DRE, fluxo de caixa diário e KPIs estratégicos acompanhados mensalmente", score: 10, recommendation: "Gestão financeira de alto nível. Com dados confiáveis em mãos, o franqueador consegue tomar decisões ágeis e apoiar o franqueado na otimização de custos e margens." }
    ]
  },
  { 
    id: "frq_fin_5", 
    categoryId: "fin", 
    categoryName: "Saúde Econômico-Financeira", 
    text: "Investimento inicial estimado por unidade franqueada",
    options: [
      { text: "Investimento inicial estimado acima de R$ 500 mil", score: 3, recommendation: "Capex muito elevado. O ticket de entrada alto restringe o funil de candidatos a grandes investidores. Busque alternativas para baratear a implantação ou criar modelos compactos." },
      { text: "Entre R$ 300 mil e R$ 500 mil", score: 6, recommendation: "O ticket de entrada exige um candidato de maior porte e ciclo de venda mais longo. Vale a pena estudar formatos alternativos (quiosque, contêiner, home based) para acelerar a expansão." },
      { text: "Entre R$ 150 mil e R$ 300 mil", score: 10, recommendation: "Investimento inicial na média de mercado, muito equilibrado. Esse valor atrai investidores de classe média e permite a entrega de uma estrutura física robusta e de qualidade." }
    ]
  },
  { 
    id: "frq_fin_6", 
    categoryId: "fin", 
    categoryName: "Saúde Econômico-Financeira", 
    text: "Fôlego de caixa do franqueador para estruturar a expansão",
    options: [
      { text: "Sem reservas financeiras; dependemos da venda imediata de franquias", score: 2, recommendation: "Subcapitalização perigosa. Expandir sem fôlego de caixa gera dependência de taxas de franquia, o que leva à venda para franqueados inadequados. Consiga capital ou estabilize o caixa próprio." },
      { text: "Entre R$ 50 mil e R$ 120 mil", score: 8, recommendation: "Capital adequado para estruturar os primeiros ciclos de expansão e formatação sem depender da taxa de franquia. Mantenha os custos enxutos." },
      { text: "Fôlego de caixa robusto, acima de R$ 120 mil dedicados à expansão", score: 10, recommendation: "Excelente liquidez. O capital próprio permite montar a franqueadora com qualidade, investindo em marketing de atração e consultoria de campo antes de vender as primeiras unidades." }
    ]
  },

  // 3. Operação e Replicabilidade (6 itens)
  { 
    id: "frq_ope_1", 
    categoryId: "ope", 
    categoryName: "Operação e Replicabilidade", 
    text: "Unidade piloto",
    options: [
      { text: "Não temos uma unidade operacional em funcionamento", score: 0, recommendation: "Inexistência de piloto. É impossível franquear uma ideia sem testá-la na prática. Monte e opere a unidade piloto por pelo menos 12 meses antes de pensar em expansão." },
      { text: "Tenho a matriz idêntica ao modelo a ser franqueado", score: 6, recommendation: "O modelo piloto existe, mas ainda não foi validado fora da área do dono. Rodar o piloto no formato final de forma delegada evita corrigir o erro em dez unidades ao mesmo tempo." },
      { text: "Múltiplas unidades próprias funcionando com sucesso no formato padrão", score: 10, recommendation: "Modelo amplamente testado. A validação do conceito em diferentes pontos próprios traz segurança extrema e comprova a força do modelo comercial da marca." }
    ]
  },
  { 
    id: "frq_ope_2", 
    categoryId: "ope", 
    categoryName: "Operação e Replicabilidade", 
    text: "Padronização e formalização dos processos",
    options: [
      { text: "Sem processos documentados; cada funcionário executa do próprio jeito", score: 0, recommendation: "Caos operacional. A falta de padrão impede a transferência de know-how. Comece mapeando as tarefas críticas (venda, preparo, atendimento) e escrevendo guias simples passo a passo." },
      { text: "Formalizados, porém desatualizados ou pouco usados", score: 6, recommendation: "Há material de partida. Transformá-lo em manuais de rede estruturados — com padrão, indicador e checklist de auditoria — é o passo que torna a operação replicável." },
      { text: "Processos totalmente atualizados e documentados em manuais de operação vivos", score: 10, recommendation: "Processos maduros e padronizados. O negócio roda como uma engrenagem, facilitando o treinamento rápido do franqueado e garantindo a qualidade da marca na rede." }
    ]
  },
  { 
    id: "frq_ope_3", 
    categoryId: "ope", 
    categoryName: "Operação e Replicabilidade", 
    text: "Transferibilidade do know-how (curva de aprendizado)",
    options: [
      { text: "Operação complexa exigindo anos de formação acadêmica ou técnica específica do operador", score: 2, recommendation: "Baixa transferibilidade. Se o negócio exige habilidades raras de formação demorada, a replicação é lenta. Simplifique processos e use tecnologia para diminuir a dependência técnica." },
      { text: "Treinamento de 30 a 90 dias com suporte estruturado", score: 7, recommendation: "A transferência é viável, mas custa tempo e dinheiro. Trilha de treinamento de 30 a 90 dias com apoio remoto reduzem essa curva de aprendizado." },
      { text: "Operação simples, transferível com treinamento prático de 7 a 15 dias", score: 10, recommendation: "Excelente transferibilidade de know-how. A curva de aprendizado rápida barateia a implantação da franquia e atrai investidores de diversos perfis profissionais." }
    ]
  },
  { 
    id: "frq_ope_4", 
    categoryId: "ope", 
    categoryName: "Operação e Replicabilidade", 
    text: "Tecnologia e sistemas de gestão",
    options: [
      { text: "Não utilizamos sistemas integrados; controles manuais ou em planilhas desconexas", score: 2, recommendation: "Gargalo tecnológico crítico. Implemente um sistema ERP integrado. O controle operacional de uma rede de franquias é impossível sem centralização e integração de dados." },
      { text: "Sistema de mercado bem utilizado, com dados confiáveis", score: 6, recommendation: "O sistema atende hoje, mas não a uma rede. Avalie migração ou módulo de franquias da primeira unidade — trocar depois custa muito mais." },
      { text: "Stack tecnológico homologado e em nuvem, pronto para integração de lojas", score: 10, recommendation: "Infraestrutura de tecnologia madura. Facilita o acompanhamento remoto do faturamento e o compliance fiscal das unidades franqueadas em tempo real." }
    ]
  },
  { 
    id: "frq_ope_5", 
    categoryId: "ope", 
    categoryName: "Operação e Replicabilidade", 
    text: "Cadeia de suprimentos e fornecedores homologados",
    options: [
      { text: "Dependemos de fornecedores ultra locais; sem escala ou contratos comerciais", score: 2, recommendation: "Risco de desabastecimento da rede. Centralize compras e negocie acordos nacionais. Se o franqueado não tiver onde comprar os insumos com preço competitivo, o negócio perde o sentido." },
      { text: "Fornecedores nacionais homologados, com contrato e escala", score: 9, recommendation: "Cadeia madura. Essa escala de fornecedores nacionais homologados também vira argumento comercial e fonte de receita homologada para o franqueador." },
      { text: "Logística e distribuição própria ou parceira exclusiva atendendo todo o Brasil", score: 10, recommendation: "Abastecimento blindado. A distribuição exclusiva garante a qualidade do produto e cria um modelo de receita recorrente muito sólido para a franqueadora." }
    ]
  },
  { 
    id: "frq_ope_6", 
    categoryId: "ope", 
    categoryName: "Operação e Replicabilidade", 
    text: "Padrão de ponto e projeto arquitetônico",
    options: [
      { text: "Montamos nossa loja de improviso, sem projetos de arquitetura ou engenharia", score: 0, recommendation: "Sem padrão arquitetônico. É fundamental contratar um arquiteto especializado em varejo para criar um projeto padrão e memorial descritivo dos materiais." },
      { text: "Padrão definido informalmente, sem projeto técnico", score: 4, recommendation: "Há um padrão definido informalmente, falta o pacote técnico que o franqueado consegue executar sozinho em sua cidade — projeto, memorial e custo de obra estimado." },
      { text: "Projeto arquitetônico completo e padronizado em 2D e 3D, com especificações executivas", score: 10, recommendation: "Padrão de arquitetura consolidado. Permite orçamentos rápidos e garante a replicação visual idêntica da marca em qualquer cidade do país." }
    ]
  },

  // 4. Gestão, Estrutura e Pessoas (4 itens)
  { 
    id: "frq_gestao_1", 
    categoryId: "gestao", 
    categoryName: "Gestão, Estrutura e Pessoas", 
    text: "Dependência de pessoa-chave",
    options: [
      { text: "O negócio depende 100% da presença física e da tomada de decisão diária do fundador", score: 0, recommendation: "Dono-dependência crítica. Franquear um negócio centralizado no fundador é impossível. O primeiro passo é delegar a operação e capacitar gerentes para tocar a rotina diária." },
      { text: "Depende bastante de mim ou de um profissional específico", score: 4, recommendation: "A delegação começou, mas a rede exigirá você inteiro na expansão. Preparar sucessão operacional agora libera seu tempo de forma completa para o papel estratégico de franqueador." },
      { text: "Operação roda sozinha sob liderança de um gerente; donos focados no estratégico", score: 9, recommendation: "Excelente autonomia operacional. O modelo de auto-gerenciamento da unidade própria serve como prova social para investidores de que o negócio é gerível à distância." },
      { text: "Negócio 100% autônomo e profissionalizado, com processos gerenciais claros", score: 10, recommendation: "Autonomia plena. A liderança própria e processos gerenciais consolidados garantem uma transição suave do fundador para a gestão macro da franqueadora." }
    ]
  },
  { 
    id: "frq_gestao_2", 
    categoryId: "gestao", 
    categoryName: "Gestão, Estrutura e Pessoas", 
    text: "Estrutura para dar suporte à rede (backoffice de franquia)",
    options: [
      { text: "Não temos pessoas ou infraestrutura de backoffice planejada", score: 0, recommendation: "Inexistência de suporte. Atender franqueados exige uma equipe de consultoria de campo e suporte. Desenhe o organograma da franqueadora antes de iniciar a expansão." },
      { text: "Tenho uma pessoa que poderá assumir parte do suporte", score: 6, recommendation: "Estrutura mínima viável para as primeiras unidades. Tenho uma pessoa que poderá assumir parte do suporte, mas defina o ponto de virada de contratação." },
      { text: "Estrutura corporativa própria de suporte montada e ativa para expansão", score: 10, recommendation: "Suporte corporativo consolidado. A presença de uma equipe multidisciplinar ativa garante atendimento de qualidade e reduz a mortalidade das franquias." }
    ]
  },
  { 
    id: "frq_gestao_3", 
    categoryId: "gestao", 
    categoryName: "Gestão, Estrutura e Pessoas", 
    text: "Planejamento estratégico e metas de expansão",
    options: [
      { text: "Não temos metas de expansão nem planejamento territorial", score: 2, recommendation: "Crescimento desordenado à vista. Sem planejamento de expansão, a marca corre o risco de aceitar franqueados distantes e difíceis de atender. Defina praças-alvo imediatamente." },
      { text: "Objetivos claros, porém não formalizados", score: 6, recommendation: "A direção existe, falta o plano territorial. Objetivos claros de expansão, porém não formalizados. Definir praças-alvo, ritmo e critério de seleção evita conflitos." },
      { text: "Plano estratégico de expansão territorial estruturado com base em geomarketing e metas", score: 10, recommendation: "Estratégia de expansão madura. O crescimento mapeado protege a marca, viabiliza a logística de abastecimento e foca os esforços de venda nas cidades corretas." }
    ]
  },
  { 
    id: "frq_gestao_4", 
    categoryId: "gestao", 
    categoryName: "Gestão, Estrutura e Pessoas", 
    text: "Perfil do empresário para o papel de franqueador",
    options: [
      { text: "Não tenho interesse em atuar na gestão de rede; prefiro focar na operação interna", score: 2, recommendation: "Desalinhamento de perfil. O papel do franqueador é ensinar e dar suporte, não operar. Avalie a contratação de um CEO ou diretor de franquias para liderar a expansão." },
      { text: "Estou disposto, mas sem experiência em gerir relacionamento de rede", score: 7, recommendation: "Postura adequada, faltando repertório de gestão de rede. Estou disposto, mas sem experiência em gerir relacionamento de rede. Formação específica ajuda." },
      { text: "Experiente em gestão de parcerias corporativas e com visão clara do papel do franqueador", score: 10, recommendation: "Perfil ideal. A liderança consultiva e o foco em parcerias ganha-ganha aceleram o crescimento e constroem um ecossistema de rede muito saudável." }
    ]
  },

  // 5. Mercado e Posicionamento (4 itens)
  { 
    id: "frq_mercado_1", 
    categoryId: "mercado", 
    categoryName: "Mercado e Posicionamento", 
    text: "Ciclo de vida do setor de atuação",
    options: [
      { text: "Setor maduro ou em declínio acentuado; concorrência esmagadora por preço", score: 2, recommendation: "Setor desafiador. Franquear em mercados saturados ou decrescentes exige um modelo disruptivo de baixo custo ou diferenciais extremos para atrair investidores." },
      { text: "Setor emergente (novidade), com alta demanda mas sem estabilidade histórica", score: 6, recommendation: "Setor dinâmico. A novidade atrai investidores rápidos, mas requer cuidado para garantir que a demanda não seja apenas um modismo passageiro. Consolide o modelo." },
      { text: "Crescimento: empresa e concorrentes crescem", score: 10, recommendation: "Setor em expansão acelerada — o cenário mais favorável para captar franqueados e obter crédito comercial no ciclo de expansão da marca." }
    ]
  },
  { 
    id: "frq_mercado_2", 
    categoryId: "mercado", 
    categoryName: "Mercado e Posicionamento", 
    text: "Diferenciais competitivos reconhecidos pelo cliente",
    options: [
      { text: "Diferenciais fracos; concorrentes oferecem produtos idênticos na mesma praça", score: 2, recommendation: "Commoditização crítica. A falta de diferenciais claros mata a atratividade do modelo. Foque em branding, embalagens, tecnologia ou experiências exclusivas de atendimento." },
      { text: "Dois diferenciais claros", score: 4, recommendation: "Diferenciais competitivos existem, mas precisam ser estruturados e transformados em proposta de valor comunicável ao consumidor e ao candidato a franqueado." },
      { text: "Diferenciais robustos protegidos por contratos de exclusividade ou patente", score: 10, recommendation: "Barreira competitiva sólida. Ter diferenciais robustos protegidos por contratos de exclusividade ou patente protege o faturamento da rede contra cópias fáceis." }
    ]
  },
  { 
    id: "frq_mercado_3", 
    categoryId: "mercado", 
    categoryName: "Mercado e Posicionamento", 
    text: "Marketing, presença digital e reputação",
    options: [
      { text: "Marketing inativo; sem presença profissional nas redes sociais ou anúncios", score: 0, recommendation: "Marketing defasado. Uma marca invisível digitalmente não vende franquias nem atrai clientes. Invista em uma agência especializada e estruture sua presença online." },
      { text: "Plano parcial, com ações digitais recorrentes", score: 6, recommendation: "Boa base. Plano parcial de marketing com ações recorrentes. Falta transformar o marketing em ativo de rede com verba de fundo de propaganda e kit de abertura." },
      { text: "Autoridade digital no setor, com marca amplamente reconhecida e leads ativos", score: 10, recommendation: "Marketing forte e atrativo. A força digital da marca gera demanda espontânea de clientes para as novas lojas e barateia o marketing de atração de franqueados." }
    ]
  },
  { 
    id: "frq_mercado_4", 
    categoryId: "mercado", 
    categoryName: "Mercado e Posicionamento", 
    text: "Validação de demanda por franquias da sua marca",
    options: [
      { text: "Ninguém nunca demonstrou interesse em abrir filiais ou franquias da marca", score: 2, recommendation: "Sem demanda espontânea. Será necessário fazer um investimento ativo em publicidade e portais de franquia para atrair os primeiros candidatos a franqueados." },
      { text: "Recebi manifestações esporádicas de conhecidos", score: 4, recommendation: "Há sinal de mercado. Recebi manifestações esporádicas de conhecidos. Estruturar canal de captação e critério de seleção evita vender para candidato errado." },
      { text: "Fila de espera de candidatos interessados em abrir franquias em diversas cidades", score: 10, recommendation: "Demanda validada e aquecida. Fila de espera de candidatos interessados permite ao franqueador ser extremamente seletivo na aprovação dos primeiros parceiros." }
    ]
  }
];
