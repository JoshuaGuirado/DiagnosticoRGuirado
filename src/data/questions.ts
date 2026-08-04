export type Option = {
  text: string;
  score: number;
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
      { text: "Não há pedido de registro / não sei informar", score: 0, recommendation: "Bloqueio jurídico crítico. Franquear uma marca sem registro ou com impedimento expõe o franqueador e toda a rede ao risco de ter que mudar de nome. Realize uma busca de anterioridade imediatamente e faça o depósito." },
      { text: "Pedido depositado, porém com oposição ou indeferido", score: 2, recommendation: "Bloqueio jurídico. Franquear uma marca sem registro concedido expõe o franqueador e toda a rede a riscos jurídicos de disputas com terceiros. Depósito no INPI e busca de anterioridade são o primeiro passo, antes de qualquer outra frente." },
      { text: "Pedido depositado, aguardando exame, sem oposição", score: 6, recommendation: "Situação sob acompanhamento. O processo está tramitando normalmente, mas a concessão ainda não é definitiva. Monitore o andamento do pedido até a decisão final do INPI." },
      { text: "Marca registrada em uma classe (NCL) pertinente", score: 8, recommendation: "Marca protegida na classe principal. Recomenda-se expandir a proteção para outras classes relacionadas de atuação e serviços para blindar totalmente o modelo." },
      { text: "Marca registrada em todas as classes de atuação e expansão", score: 10, recommendation: "Ativo de marca consolidado. Registro concedido pelo INPI, garantindo exclusividade nacional para a exploração da marca e segurança total para o franqueador e franqueados." }
    ]
  },
  { 
    id: "frq_marca_2", 
    categoryId: "marca", 
    categoryName: "Marca e Blindagem Jurídica", 
    text: "Regularidade jurídica, fiscal e trabalhista da empresa",
    options: [
      { text: "Há passivos relevantes ou pendências que desconheço em extensão", score: 0, recommendation: "Bloqueio crítico. Pendências financeiras graves trazem riscos patrimoniais diretos para a rede. É urgente realizar uma auditoria legal e renegociar ou parcelar os débitos." },
      { text: "Existem pendências pontuais em negociação", score: 4, recommendation: "Regularize as pendências abertas e faça um raio-x de contingências. O franqueador seguro resolve suas pendências antes de iniciar a expansão, pois o investidor qualificado pede certidões antes de assinar." },
      { text: "Empresa regular, mas sem revisão jurídica formal recente", score: 7, recommendation: "Nível satisfatório de regularidade. Recomenda-se realizar uma auditoria jurídica preventiva para garantir que contratos civis e trabalhistas atuais estejam robustos antes da expansão." },
      { text: "Empresa regular, com certidões negativas e revisão jurídica em dia", score: 10, recommendation: "Excelente nível de conformidade jurídica. A regularidade total da empresa transmite segurança jurídica e credibilidade para potenciais franqueados e parceiros comerciais." }
    ]
  },
  { 
    id: "frq_marca_3", 
    categoryId: "marca", 
    categoryName: "Marca e Blindagem Jurídica", 
    text: "Titularidade dos demais ativos (domínio, redes sociais, receitas, sistemas, layout)",
    options: [
      { text: "Não sei quem detém formalmente esses ativos", score: 0, recommendation: "Risco de segurança operacional severo. Mapeie imediatamente a titularidade dos domínios, códigos de sistemas e layout, e regularize-os em nome do CNPJ." },
      { text: "Estão dispersos entre sócios, ex-sócios ou terceiros", score: 3, recommendation: "Risco de segurança. Transfira a titularidade de todos os domínios, redes sociais e marcas para o CNPJ da franqueadora para evitar bloqueios ou disputas futuras." },
      { text: "Em nome da empresa, sem documentação formal de cessão", score: 6, recommendation: "Formalização parcial. Elabore termos de cessão e contratos de transferência de propriedade de todos os ativos intangíveis para consolidar legalmente no CNPJ da franqueadora." },
      { text: "Todos em nome da empresa, com contratos e cessões formalizados", score: 10, recommendation: "Ativos consolidados na PJ, exatamente como um franqueador precisa estar para licenciar a marca e transferir tecnologia com segurança jurídica para a rede." }
    ]
  },
  { 
    id: "frq_marca_4", 
    categoryId: "marca", 
    categoryName: "Marca e Blindagem Jurídica", 
    text: "Identidade visual e manual de marca",
    options: [
      { text: "Precisa ser reformulada / não temos padrão definido", score: 0, recommendation: "Identidade visual fraca. A ausência de padrão estético impede a replicação visual. É essencial contratar uma agência para redesenhar a marca e criar um padrão profissional." },
      { text: "Temos logomarca e cores, sem manual", score: 4, recommendation: "Você tem os elementos básicos de logo e cores, falta o manual de identidade que garante que a 10ª unidade seja idêntica à primeira — um dos entregáveis mais rápidos de resolver." },
      { text: "Manual de marca básico (logo, cores, tipografia)", score: 7, recommendation: "Manual de marca ativo, mas incompleto. Avance no detalhamento dos manuais de visual merchandising e layouts arquitetônicos para expandir com fidelidade visual." },
      { text: "Manual completo: fachada, interior, uniforme, embalagem, digital e frota", score: 10, recommendation: "Manual de identidade robusto. O padrão visual está perfeitamente protegido e documentado, facilitando a replicação da marca em qualquer ponto de venda." }
    ]
  },
  { 
    id: "frq_marca_5", 
    categoryId: "marca", 
    categoryName: "Marca e Blindagem Jurídica", 
    text: "Preparo documental para franquear (COF e contrato — Lei 13.966/2019)",
    options: [
      { text: "Não conheço as exigências da Lei de Franquias", score: 0, recommendation: "Bloqueio legal crítico. O desconhecimento da Lei de Franquias impede a expansão estruturada. É urgente buscar assessoria jurídica especializada para entender os deveres do franqueador." },
      { text: "Conheço superficialmente, nada elaborado", score: 3, recommendation: "A Circular de Oferta de Franquia é obrigatória e deve ser entregue 10 dias antes da assinatura ou pagamento. Sem ela, o contrato é anulável e os valores devolvidos corrigidos. Contrate assessoria." },
      { text: "Temos minutas em elaboração ou modelos genéricos de internet", score: 6, recommendation: "Risco jurídico. Modelos genéricos não protegem a sua operação específica. Contrate um escritório especializado em franquias para redigir a COF, pré-contrato e contrato sob medida." },
      { text: "COF e contrato elaborados sob medida por especialista", score: 10, recommendation: "Conformidade legal impecável. Os instrumentos de COF e Contrato estão totalmente de acordo com a legislação vigente, mitigando litígios e protegendo os direitos do franqueador." }
    ]
  },

  // 2. Saúde Econômico-Financeira (6 itens)
  { 
    id: "frq_fin_1", 
    categoryId: "fin", 
    categoryName: "Saúde Econômico-Financeira", 
    text: "Lucratividade líquida da operação",
    options: [
      { text: "Resultados oscilantes entre lucro e prejuízo / não sei informar", score: 0, recommendation: "Negócio inviável para franquias no momento. Franquear prejuízo ou oscilação é proibido na prática. Concentre todos os esforços em ajustar custos e receitas na operação própria primeiro." },
      { text: "Lucro líquido abaixo de 8%", score: 3, recommendation: "Não se franquia uma empresa que ainda não provou que dá lucro. Antes de expandir, o caminho é reestruturar margem, custo e precificação na própria operação." },
      { text: "Lucro líquido entre 8% e 15%", score: 6, recommendation: "Margem operacional aceitável. Ajuste a eficiência do plano de contas para buscar margens superiores a 15%, o que torna o modelo muito mais atrativo para novos parceiros." },
      { text: "Lucro líquido entre 15% e 25%", score: 8, recommendation: "Margem operacional muito saudável e atrativa. Esse patamar demonstra alta sustentabilidade do negócio e facilita a atração de franqueados qualificados." },
      { text: "Lucro líquido acima de 25%", score: 10, recommendation: "Lucratividade excelente. Essa alta performance financeira é o maior atrativo para novos investidores e facilita enormemente a venda das primeiras franquias." }
    ]
  },
  { 
    id: "frq_fin_2", 
    categoryId: "fin", 
    categoryName: "Saúde Econômico-Financeira", 
    text: "Prazo de retorno do investimento (payback) da unidade",
    options: [
      { text: "Acima de 48 meses ou não sei calcular", score: 0, recommendation: "Retorno excessivamente longo ou sem cálculo confiável. Esse prazo afasta investidores no mercado de franquias. É necessário otimizar o Capex (custo de montagem) para reduzir o payback da unidade." },
      { text: "Entre 37 e 48 meses", score: 3, recommendation: "Payback longo. O investidor de franquias moderno busca prazos menores. Trabalhe em parcerias homologadas com fornecedores de obras para reduzir o investimento inicial." },
      { text: "Entre 25 e 36 meses", score: 6, recommendation: "Payback aceitável, mas não é diferencial competitivo. Revisar investimento inicial e período da unidade piloto pode encurtar esse prazo de retorno." },
      { text: "Entre 13 e 24 meses", score: 8, recommendation: "Prazo de retorno muito competitivo. Esse intervalo é altamente atraente para investidores e se enquadra nas melhores práticas do mercado de franquias nacional." },
      { text: "Até 12 meses", score: 10, recommendation: "Payback recorde, menos de 12 meses. A recuperação rápida do capital investido gera alta liquidez e serve como excelente argumento comercial para a expansão em escala." }
    ]
  },
  { 
    id: "frq_fin_3", 
    categoryId: "fin", 
    categoryName: "Saúde Econômico-Financeira", 
    text: "Capacidade do modelo de suportar royalties e fundo de propaganda",
    options: [
      { text: "Nunca simulei isso", score: 0, recommendation: "Este é o teste decisivo e o mais ignorado. Se a unidade não gera margem para pagar franqueador sem quebrar o franqueado, o modelo de negócio não é franqueável na configuração atual." },
      { text: "Simulei e o resultado do franqueado ficaria inviável", score: 2, recommendation: "Gargalo financeiro crítico. O modelo precisa ser reformulado: reduza custos operacionais, renegocie com fornecedores ou reposicione os preços para abrir espaço para as taxas da franqueadora." },
      { text: "O modelo suporta até 3% de royalties", score: 5, recommendation: "Limitação financeira. Royalties baixos limitam a capacidade da franqueadora de dar suporte pós-venda de qualidade. Reveja a estrutura tributária e precificação para viabilizar taxas mais sustentáveis." },
      { text: "O modelo suporta de 4% a 6% de royalties mais fundo de propaganda", score: 8, recommendation: "Margem de contribuição equilibrada. Esse patamar permite remunerar a franqueadora adequadamente sem sufocar o franqueado." },
      { text: "Suporta royalties, fundo de propaganda e ainda mantém margem atrativa ao franqueado", score: 10, recommendation: "Equilíbrio financeiro consolidado. A robustez da margem de lucro permite alimentar a franqueadora com royalties saudáveis sem sufocar a operação do franqueado." }
    ]
  },
  { 
    id: "frq_fin_4", 
    categoryId: "fin", 
    categoryName: "Saúde Econômico-Financeira", 
    text: "Controle financeiro e indicadores de gestão",
    options: [
      { text: "Não acompanho DRE, CMV ou ponto de equilíbrio", score: 0, recommendation: "Desorganização financeira crítica. Separe as contas imediatamente e adote um software financeiro. O franqueador precisa ser exemplo de compliance and rigor financeiro." },
      { text: "Controle informal, por conta bancária e planilhas soltas", score: 3, recommendation: "Controles deficientes. A falta de padronização impede auditoria de rede. Implemente um ERP integrado e passe a fechar a DRE de forma profissional todo mês." },
      { text: "DRE mensal, com alguns indicadores acompanhados", score: 7, recommendation: "Os controles existem, mas ainda não formam um painel de rede. Padronizar o plano de contas agora evita retrabalho quando houver várias unidades." },
      { text: "DRE, CMV, ticket médio, ponto de equilíbrio e fluxo de caixa acompanhados mensalmente", score: 10, recommendation: "Gestão financeira de alto nível. Com dados confiáveis em mãos, o franqueador consegue tomar decisões ágeis e apoiar o franqueado na otimização de custos e margens." }
    ]
  },
  { 
    id: "frq_fin_5", 
    categoryId: "fin", 
    categoryName: "Saúde Econômico-Financeira", 
    text: "Investimento inicial estimado por unidade franqueada",
    options: [
      { text: "Não sei estimar", score: 0, recommendation: "Gargalo crítico. É necessário detalhar os custos de implantação (obra, máquinas, taxas, capital de giro) para que o investidor tenha previsibilidade total do capital necessário." },
      { text: "Acima de R$ 500 mil", score: 3, recommendation: "Capex muito elevado. O ticket de entrada alto restringe o funil de candidatos a grandes investidores. Busque alternativas para baratear a implantação ou criar modelos compactos." },
      { text: "Entre R$ 300 mil e R$ 500 mil", score: 6, recommendation: "O ticket de entrada exige um candidato de maior porte e ciclo de venda mais longo. Vale a pena estudar formatos alternativos (quiosque, contêiner, home based) para acelerar a expansão." },
      { text: "Entre R$ 150 mil e R$ 300 mil", score: 8, recommendation: "Investimento inicial na média de mercado, muito equilibrado. Esse valor atrai investidores de classe média e permite a entrega de uma estrutura física robusta e de qualidade." },
      { text: "Entre R$ 70 mil e R$ 150 mil", score: 9, recommendation: "Posicionamento atraente e de baixo risco relativo. Facilita muito a captação rápida de novos parceiros devido ao menor comprometimento de capital." },
      { text: "Até R$ 70 mil (microfranquia)", score: 10, recommendation: "Excelente posicionamento para expansão rápida. O investimento de menor porte atrai uma massa maior de potenciais franqueados, mas requer um processo seletivo ainda mais rigoroso." }
    ]
  },
  { 
    id: "frq_fin_6", 
    categoryId: "fin", 
    categoryName: "Saúde Econômico-Financeira", 
    text: "Fôlego de caixa do franqueador para estruturar a expansão",
    options: [
      { text: "Não há recursos disponíveis para investir na formatação", score: 0, recommendation: "Falta de caixa para expandir. Expandir sem fôlego de caixa gera dependência perigosa de taxas de franquia. Consiga investidores ou acumule lucros próprios para formatar com qualidade." },
      { text: "Menos de R$ 20 mil", score: 3, recommendation: "Capital muito enxuto. Pode comprometer o marketing inicial e a contratação de profissionais para suporte. Recomenda-se buscar linhas de crédito ou parceiros estratégicos." },
      { text: "Entre R$ 20 mil e R$ 50 mil", score: 6, recommendation: "Fôlego inicial limitado. Permite apenas estruturar a formatação jurídica e manuais simples. Foque em crescimento orgânico no começo de forma muito planejada." },
      { text: "Entre R$ 50 mil e R$ 120 mil", score: 8, recommendation: "Capital adequado para estruturar os primeiros ciclos de expansão e formatação sem depender da taxa de franquia. Mantenha os custos enxutos." },
      { text: "Acima de R$ 120 mil", score: 10, recommendation: "Excelente liquidez. O capital próprio permite montar a franqueadora com qualidade, investindo em marketing de atração e consultoria de campo antes de vender as primeiras unidades." }
    ]
  },

  // 3. Operação e Replicabilidade (6 itens)
  { 
    id: "frq_ope_1", 
    categoryId: "ope", 
    categoryName: "Operação e Replicabilidade", 
    text: "Unidade piloto",
    options: [
      { text: "Tenho apenas a ideia, sem operação em funcionamento", score: 0, recommendation: "Inexistência de piloto. É impossível franquear uma ideia sem testá-la na prática. Monte e opere a unidade piloto por pelo menos 12 meses antes de pensar em expansão." },
      { text: "Tenho a matriz, mas em formato diferente do que pretendo franquear", score: 3, recommendation: "Unidade piloto desalinhada. O piloto precisa ter a mesma cara, tamanho e processos da franquia. Ajuste o layout e a operação da matriz para espelhar o modelo franqueado." },
      { text: "Tenho a matriz idêntica ao modelo a ser franqueado", score: 6, recommendation: "O modelo piloto existe, mas ainda não foi validado fora da área do dono. Rodar o piloto no formato final de forma delegada evita corrigir o erro em dez unidades ao mesmo tempo." },
      { text: "Tenho filial idêntica ao modelo, operando há mais de 12 meses", score: 8, recommendation: "Modelo com validação consistente. A operação continuada do modelo padrão fora do ponto principal atesta a solidez dos processos comerciais." },
      { text: "Tenho unidade piloto independente, testada e lucrativa por mais de 12 meses", score: 10, recommendation: "Modelo amplamente testado e lucrativo de forma autônoma. A validação independente traz segurança extrema e comprova a força do conceito." }
    ]
  },
  { 
    id: "frq_ope_2", 
    categoryId: "ope", 
    categoryName: "Operação e Replicabilidade", 
    text: "Padronização e formalização dos processos",
    options: [
      { text: "Não há processos definidos", score: 0, recommendation: "Caos operacional. A falta de padrão impede a transferência de know-how. Comece mapeando as tarefas críticas (venda, preparo, atendimento) e escrevendo guias simples passo a passo." },
      { text: "Os processos existem na prática, mas não estão escritos", score: 3, recommendation: "Processos informais. A falta de formalização dificulta o treinamento da rede. Inicie a redação de manuais operacionais práticos para evitar desvios no padrão da marca." },
      { text: "Formalizados, porém desatualizados ou pouco usados", score: 6, recommendation: "Há material de partida. Transformá-lo em manuais de rede estruturados — com padrão, indicador e checklist de auditoria — é o passo que torna a operação replicável." },
      { text: "Manuais operacionais formalizados, atualizados e aplicados no dia a dia", score: 10, recommendation: "Processos maduros e padronizados. O negócio roda como uma engrenagem, facilitando o treinamento rápido do franqueado e garantindo a qualidade da marca na rede." }
    ]
  },
  { 
    id: "frq_ope_3", 
    categoryId: "ope", 
    categoryName: "Operação e Replicabilidade", 
    text: "Transferibilidade do know-how (curva de aprendizado)",
    options: [
      { text: "Depende de talento raro ou de anos de experiência específica", score: 0, recommendation: "Baixa transferibilidade. Se o negócio exige habilidades raras de formação demorada, a replicação é lenta. Simplifique processos e use tecnologia para diminuir a dependência técnica." },
      { text: "Exige mais de 90 dias de treinamento e acompanhamento intenso", score: 3, recommendation: "Treinamento excessivamente longo. Aumenta os custos de suporte da franqueadora. Simplifique o fluxo de trabalho e crie rotinas de treinamento visual para acelerar a formação." },
      { text: "Treinamento de 30 a 90 dias com suporte estruturado", score: 7, recommendation: "A transferência é viável, mas custa tempo e dinheiro. Trilha de treinamento de 30 a 90 dias com apoio remoto reduzem essa curva de aprendizado." },
      { text: "Operação simples de ensinar, dominada em até 30 dias", score: 10, recommendation: "Excelente transferibilidade de know-how. A curva de aprendizado rápida barateia a implantação da franquia e atrai investidores de diversos perfis profissionais." }
    ]
  },
  { 
    id: "frq_ope_4", 
    categoryId: "ope", 
    categoryName: "Operação e Replicabilidade", 
    text: "Tecnologia e sistemas de gestão",
    options: [
      { text: "Não utilizo sistema de gestão", score: 0, recommendation: "Gargalo tecnológico crítico. Implemente um sistema ERP integrado. O controle operacional de uma rede de franquias é impossível sem centralização e integração de dados." },
      { text: "Sistema de mercado usado parcialmente, só na minha unidade", score: 3, recommendation: "Uso de software limitado. O sistema deve estar pronto para auditorias e integração com faturamentos da rede. Mapeie novas ferramentas multi-unidades." },
      { text: "Sistema de mercado bem utilizado, com dados confiáveis", score: 6, recommendation: "O sistema atende hoje, mas não a uma rede. Avalie migração ou módulo de franquias da primeira unidade — trocar depois custa muito mais." },
      { text: "Sistema pronto para consolidar dados de várias unidades", score: 8, recommendation: "Stack tecnológico em estágio avançado. A infraestrutura em nuvem permite consolidar faturamento e auditar financeiramente a rede de maneira integrada." },
      { text: "Sistema integrado de rede, com painel do franqueador e auditoria remota", score: 10, recommendation: "Infraestrutura de tecnologia madura. Facilita o acompanhamento remoto do faturamento e o compliance fiscal das unidades franqueadas em tempo real." }
    ]
  },
  { 
    id: "frq_ope_5", 
    categoryId: "ope", 
    categoryName: "Operação e Replicabilidade", 
    text: "Cadeia de suprimentos e fornecedores homologados",
    options: [
      { text: "Não tenho fornecedores homologados", score: 0, recommendation: "Risco de desabastecimento da rede. Centralize compras e negocie acordos nacionais. Se o franqueado não tiver onde comprar os insumos com preço competitivo, o negócio perde o sentido." },
      { text: "Fornecedores locais, sem contrato ou homologação", score: 3, recommendation: "Fornecedores restritos. Inviabiliza a abertura de unidades distantes de sua cidade. Homologue fornecedores regionais ou nacionais para viabilizar logística de expansão." },
      { text: "Fornecedores regionais homologados", score: 6, recommendation: "Logística regional ativa. Bom para iniciar a expansão em praças vizinhas, mas requer mapeamento nacional antes de abrir regiões distantes." },
      { text: "Fornecedores nacionais homologados, com contrato e escala", score: 9, recommendation: "Cadeia madura. Essa escala de fornecedores nacionais homologados também vira argumento comercial e fonte de receita homologada para o franqueador." },
      { text: "Cadeia nacional homologada, com redundância de fornecedores críticos", score: 10, recommendation: "Abastecimento blindado. A distribuição exclusiva garante a qualidade do produto e cria um modelo de receita recorrente muito sólido para a franqueadora." }
    ]
  },
  { 
    id: "frq_ope_6", 
    categoryId: "ope", 
    categoryName: "Operação e Replicabilidade", 
    text: "Padrão de ponto e projeto arquitetônico",
    options: [
      { text: "Não há padrão definido de ponto ou layout", score: 0, recommendation: "Sem padrão arquitetônico. É fundamental contratar um arquiteto especializado em varejo para criar um projeto padrão e memorial descritivo dos materiais." },
      { text: "Padrão definido informalmente, sem projeto técnico", score: 4, recommendation: "Há um padrão definido informalmente, falta o pacote técnico que o franqueado consegue executar sozinho em sua cidade — projeto, memorial e custo de obra estimado." },
      { text: "Projeto arquitetônico básico assinado por profissional", score: 7, recommendation: "Padrão estético desenhado, mas sem especificações construtivas completas. Crie um caderno de obras com memorial para dar clareza orçamentária ao franqueado." },
      { text: "Projeto completo, com memorial, fluxo operacional, custo de obra e critérios de escolha de ponto", score: 10, recommendation: "Padrão de arquitetura consolidado. Permite orçamentos rápidos e garante a replicação visual idêntica da marca em qualquer cidade do país." }
    ]
  },

  // 4. Gestão, Estrutura e Pessoas (4 itens)
  { 
    id: "frq_gestao_1", 
    categoryId: "gestao", 
    categoryName: "Gestão, Estrutura e Pessoas", 
    text: "Dependência de pessoa-chave",
    options: [
      { text: "A operação depende integralmente de mim", score: 0, recommendation: "Dono-dependência crítica. Franquear um negócio centralizado no fundador é impossível. O primeiro passo é delegar a operação e capacitar gerentes para tocar a rotina diária." },
      { text: "Depende bastante de mim ou de um profissional específico", score: 4, recommendation: "A delegação começou, mas a rede exigirá você inteiro na expansão. Preparar sucessão operacional agora libera seu tempo de forma completa para o papel estratégico de franqueador." },
      { text: "Depende pouco: há gestor formado e delegação real", score: 8, recommendation: "Estrutura operacional autônoma. A gerência formada garante que o ponto consiga rodar sem intervenção diária dos donos, o que é ótimo chamariz comercial." },
      { text: "Não há dependência: a operação roda com autonomia e indicadores", score: 10, recommendation: "Autonomia plena. A liderança própria e processos gerenciais consolidados garantem uma transição suave do fundador para a gestão macro da franqueadora." }
    ]
  },
  { 
    id: "frq_gestao_2", 
    categoryId: "gestao", 
    categoryName: "Gestão, Estrutura e Pessoas", 
    text: "Estrutura para dar suporte à rede (backoffice de franquia)",
    options: [
      { text: "Não pensei nisso ainda", score: 0, recommendation: "Inexistência de suporte. Atender franqueados exige uma equipe de consultoria de campo e suporte. Desenhe o organograma da franqueadora antes de iniciar a expansão." },
      { text: "Farei tudo sozinho, acumulando com a operação atual", score: 3, recommendation: "Risco de gargalo. O acúmulo de funções pelo franqueador compromete a qualidade do suporte inicial e a própria gestão da matriz. Planeje delegação de papéis." },
      { text: "Tenho uma pessoa que poderá assumir parte do suporte", score: 6, recommendation: "Estrutura mínima viável para as primeiras unidades. Tenho uma pessoa que poderá assumir parte do suporte, mas defina o ponto de virada de contratação." },
      { text: "Tenho ou terei equipe dedicada a expansão, treinamento e consultoria de campo", score: 10, recommendation: "Suporte corporativo consolidado. A presença de uma equipe multidisciplinar ativa garante atendimento de qualidade e reduz a mortalidade das franquias." }
    ]
  },
  { 
    id: "frq_gestao_3", 
    categoryId: "gestao", 
    categoryName: "Gestão, Estrutura e Pessoas", 
    text: "Planejamento estratégico e metas de expansão",
    options: [
      { text: "Não tenho objetivos definidos", score: 0, recommendation: "Crescimento desordenado à vista. Sem planejamento de expansão, a marca corre o risco de aceitar franqueados distantes e difíceis de atender. Defina praças-alvo imediatamente." },
      { text: "Tenho uma noção geral de onde quero chegar", score: 3, recommendation: "Metas genéricas. Desenhe um plano territorial para mapear praças-alvo por densidade demográfica, evitando expansão geograficamente dispersa e insustentável." },
      { text: "Objetivos claros, porém não formalizados", score: 6, recommendation: "A direção existe, falta o plano territorial. Objetivos claros de expansão, porém não formalizados. Definir praças-alvo, ritmo e critério de seleção evita conflitos." },
      { text: "Planejamento formalizado: metas por ano, praças-alvo, indicadores e plano de expansão territorial", score: 10, recommendation: "Estratégia de expansão madura. O crescimento mapeado protege a marca, viabiliza a logística de abastecimento e foca os esforços de venda nas cidades corretas." }
    ]
  },
  { 
    id: "frq_gestao_4", 
    categoryId: "gestao", 
    categoryName: "Gestão, Estrutura e Pessoas", 
    text: "Perfil do empresário para o papel de franqueador",
    options: [
      { text: "Tenho resistência em abrir informações e dividir o controle", score: 0, recommendation: "Perfil incompatível com franquias. Franquear exige transparência total de custos e repasse de controle operacional. Trabalhe a mentalidade de cooperação." },
      { text: "Tenho dúvidas sobre lidar com sócios de operação e cobranças", score: 3, recommendation: "Dúvidas de gestão. O franqueador atua como consultor e auditor de terceiros. Recomenda-se realizar mentorias de gestão de redes de negócios para adquirir bagagem." },
      { text: "Estou disposto, mas sem experiência em gerir relacionamento de rede", score: 7, recommendation: "Postura adequada, faltando repertório de gestão de rede. Estou disposto, mas sem experiência em gerir relacionamento de rede. Formação específica ajuda." },
      { text: "Estou preparado para ensinar, auditar, cobrar e conviver com a autonomia do franqueado", score: 10, recommendation: "Perfil ideal. A liderança consultiva e o foco em parcerias ganha-ganha aceleram o crescimento e constroem um ecossistema de rede muito saudável." }
    ]
  },

  // 5. Mercado e Posicionamento (4 itens)
  { 
    id: "frq_mercado_1", 
    categoryId: "mercado", 
    categoryName: "Mercado e Posicionamento", 
    text: "Ciclo de vida do setor de atuação",
    options: [
      { text: "Declínio: produtos substitutos ganhando espaço", score: 0, recommendation: "Setor desafiador. Franquear em mercados saturados ou decrescentes exige um modelo disruptivo de baixo custo ou diferenciais extremos para atrair investidores." },
      { text: "Introdução: novidade ainda com dificuldade de crescer", score: 4, recommendation: "Nicho em validação. O produto é muito inovador, mas o mercado ainda não absorve com facilidade. Consolide a marca própria para demonstrar estabilidade comercial." },
      { text: "Maturidade: estagnação com baixo crescimento", score: 6, recommendation: "Mercado consolidado com crescimento lento. Exige diferenciais de preço ou experiência do cliente superiores para roubar fatias de concorrentes estabelecidos." },
      { text: "Crescimento: empresa e concorrentes crescem", score: 10, recommendation: "Setor em expansão acelerada — o cenário mais favorável para captar franqueados e obter crédito comercial no ciclo de expansão da marca." }
    ]
  },
  { 
    id: "frq_mercado_2", 
    categoryId: "mercado", 
    categoryName: "Mercado e Posicionamento", 
    text: "Diferenciais competitivos reconhecidos pelo cliente",
    options: [
      { text: "Só qualidade ou atendimento, como todo concorrente", score: 0, recommendation: "Commoditização crítica. A falta de diferenciais claros mata a atratividade do modelo. Foque em branding, embalagens, tecnologia ou experiências exclusivas de atendimento." },
      { text: "Dois diferenciais claros", score: 4, recommendation: "Diferenciais competitivos existem, mas precisam ser estruturados e transformados em proposta de valor comercial comunicável ao consumidor e ao candidato a franqueado." },
      { text: "Três ou mais diferenciais reconhecidos pelos clientes", score: 8, recommendation: "Diferenciais robustos na praça atual. Garanta que estes diferenciais sejam replicados integralmente nas novas franquias sem perda de qualidade operacional." },
      { text: "Três ou mais diferenciais, sendo ao menos um exclusivo e difícil de copiar", score: 10, recommendation: "Barreira competitiva sólida. Ter diferenciais robustos protegidos por contratos de exclusividade ou patente protege o faturamento da rede contra cópias fáceis." }
    ]
  },
  { 
    id: "frq_mercado_3", 
    categoryId: "mercado", 
    categoryName: "Mercado e Posicionamento", 
    text: "Marketing, presença digital e reputação",
    options: [
      { text: "Não há plano nem presença digital estruturada", score: 0, recommendation: "Marketing defasado. Uma marca invisível digitalmente não vende franquias nem atrai clientes. Invista em uma agência especializada e estruture sua presença online." },
      { text: "Presença nas redes sem plano nem constância", score: 3, recommendation: "Branding amador. A falta de constância digital afeta a reputação da rede. Profissionalize a gestão de conteúdo e crie campanhas ativas de atração." },
      { text: "Plano parcial, com ações digitais recorrentes", score: 6, recommendation: "Boa base. Plano parcial de marketing com ações recorrentes. Falta transformar o marketing em ativo de rede com verba de fundo de propaganda e kit de abertura." },
      { text: "Plano completo (on e off) conduzido por especialistas", score: 9, recommendation: "Estrutura avançada de atração. A marca utiliza múltiplos canais de atração, o que facilita o suporte comercial de marketing local aos franqueados." },
      { text: "Plano completo, com resultados comprovados e reputação positiva monitorada", score: 10, recommendation: "Marketing forte e atrativo. A força digital da marca gera demanda espontânea de clientes para as novas lojas e barateia o marketing de atração de franqueados." }
    ]
  },
  { 
    id: "frq_mercado_4", 
    categoryId: "mercado", 
    categoryName: "Mercado e Posicionamento", 
    text: "Validação de demanda por franquias da sua marca",
    options: [
      { text: "Nunca recebi interesse de terceiros em abrir uma unidade", score: 0, recommendation: "Sem demanda espontânea. Será necessário fazer um investimento ativo em publicidade e portais de franquia para atrair os primeiros candidatos a franqueados." },
      { text: "Recebi manifestações esporádicas de conhecidos", score: 4, recommendation: "Há sinal de mercado. Recebi manifestações esporádicas de conhecidos. Estruturar canal de captação e critério de seleção evita vender para candidato errado." },
      { text: "Recebo pedidos com frequência, de pessoas de fora do meu círculo", score: 8, recommendation: "Forte tração comercial espontânea. Indica que o modelo atrai investidores independentes. Organize o funil de seleção para aprovar os melhores perfis." },
      { text: "Recebo pedidos recorrentes, inclusive de outras cidades ou estados", score: 10, recommendation: "Demanda validada e aquecida. Fila de espera de candidatos interessados permite ao franqueador ser extremamente seletivo na aprovação dos primeiros parceiros." }
    ]
  }
];
