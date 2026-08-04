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
  // Modelo de Negócio (2)
  { 
    id: "frq_mod_1", 
    categoryId: "mod", 
    categoryName: "Modelo de Negócio", 
    text: "O modelo de negócio já se provou rentável e possui histórico de sucesso comprovado?",
    options: [
      { text: "Ainda estamos testando o modelo, operando no prejuízo", score: 0 },
      { text: "Abrimos recentemente, ainda não temos histórico longo", score: 1 },
      { text: "Somos rentáveis em alguns meses, outros não", score: 2 },
      { text: "Negócio rentável, com pelo menos 1 ano de sucesso comprovado", score: 3 },
      { text: "Altamente rentável, histórico consolidado por vários anos", score: 4 },
      { text: "Case de sucesso absurdo, com consistência incrível ao longo de anos", score: 5 },
    ]
  },
  { 
    id: "frq_mod_2", 
    categoryId: "mod", 
    categoryName: "Modelo de Negócio", 
    text: "O negócio tem capacidade de ser replicado em diferentes regiões mantendo a mesma essência?",
    options: [
      { text: "Depende exclusivamente de uma habilidade técnica rara do dono", score: 0 },
      { text: "Muito complexo para replicar, exige fornecedores super locais e específicos", score: 1 },
      { text: "Pode ser replicado, mas perderia muita qualidade", score: 2 },
      { text: "Replicável, mas com curva de aprendizado alta", score: 3 },
      { text: "Modelo facilmente replicável em outras cidades", score: 4 },
      { text: "Processos perfeitamente desenhados para replicação 'plug and play' em qualquer lugar", score: 5 },
    ]
  },

  // Rentabilidade (2)
  { 
    id: "frq_ren_1", 
    categoryId: "ren", 
    categoryName: "Rentabilidade", 
    text: "A margem de lucro líquido da operação permite o pagamento de royalties e ainda sobra uma boa rentabilidade?",
    options: [
      { text: "A margem é tão apertada que qualquer taxa mataria o lucro", score: 0 },
      { text: "Sobram no máximo 5 a 8% no final", score: 1 },
      { text: "Sobram cerca de 10 a 12% antes de royalties", score: 2 },
      { text: "Margem saudável, suporta bem os royalties de mercado", score: 3 },
      { text: "Margem de lucro excelente, muito atrativa mesmo com taxas", score: 4 },
      { text: "Margem de lucro líquida estelar, garantindo prosperidade rápida para o franqueado", score: 5 },
    ]
  },
  { 
    id: "frq_ren_2", 
    categoryId: "ren", 
    categoryName: "Rentabilidade", 
    text: "O prazo de retorno do investimento (Payback) é atrativo para investidores em comparação ao mercado?",
    options: [
      { text: "Demora mais de 4-5 anos para retornar", score: 0 },
      { text: "Retorno entre 36 e 48 meses", score: 1 },
      { text: "Retorno entre 24 e 36 meses", score: 2 },
      { text: "Retorno entre 18 e 24 meses (Padrão de mercado)", score: 3 },
      { text: "Retorno rápido, entre 12 e 18 meses", score: 4 },
      { text: "Payback recorde, menos de 12 meses", score: 5 },
    ]
  },

  // Padronização (2)
  { 
    id: "frq_pad_1", 
    categoryId: "pad", 
    categoryName: "Padronização", 
    text: "A arquitetura, o layout e a comunicação visual da empresa seguem um padrão rígido?",
    options: [
      { text: "Nenhum padrão, a loja/escritório foi montada de improviso", score: 0 },
      { text: "Temos um logotipo, mas as cores e móveis não seguem um padrão", score: 1 },
      { text: "Temos uma identidade visual básica aplicada", score: 2 },
      { text: "Projeto arquitetônico existe, mas com adaptações soltas", score: 3 },
      { text: "Projeto arquitetônico e visual merchandising bem definidos e padronizados", score: 4 },
      { text: "Manual de arquitetura impecável, garantindo experiência idêntica em cada m²", score: 5 },
    ]
  },
  { 
    id: "frq_pad_2", 
    categoryId: "pad", 
    categoryName: "Padronização", 
    text: "A experiência do cliente (jornada de compra) é padronizada e idêntica, independente de quem atende?",
    options: [
      { text: "Cada atendente faz do seu jeito, dependemos de 'estrelas'", score: 0 },
      { text: "O dono atende bem, os funcionários atendem mal", score: 1 },
      { text: "Temos um guia rápido, mas a variação ainda é grande", score: 2 },
      { text: "A equipe segue um padrão na maior parte do tempo", score: 3 },
      { text: "Jornada mapeada, script seguido, atendimento consistente", score: 4 },
      { text: "Experiência Disney: cada etapa é coreografada e idêntica independente de quem atenda", score: 5 },
    ]
  },

  // Marca (2)
  { 
    id: "frq_mar_1", 
    categoryId: "mar", 
    categoryName: "Marca", 
    text: "A marca possui registro (ou pedido protocolado e sem oposição) no INPI?",
    options: [
      { text: "Nunca checamos isso", score: 0 },
      { text: "Outra empresa usa o mesmo nome, não sabemos se dá problema", score: 1 },
      { text: "Entramos com o pedido recentemente", score: 2 },
      { text: "Pedido em andamento avançado, sem oposição", score: 3 },
      { text: "Marca registrada e certificado concedido", score: 4 },
      { text: "Marca registrada em múltiplas classes e totalmente blindada legalmente", score: 5 },
    ]
  },
  { 
    id: "frq_mar_2", 
    categoryId: "mar", 
    categoryName: "Marca", 
    text: "A marca possui força comercial, engajamento e é reconhecida na sua região de atuação?",
    options: [
      { text: "Ninguém conhece a marca fora do nosso círculo", score: 0 },
      { text: "Conhecida apenas na nossa rua/bairro", score: 1 },
      { text: "Temos alguns clientes fieis, mas sem força em rede", score: 2 },
      { text: "Boa reputação regional e nas redes sociais", score: 3 },
      { text: "Marca forte, gera desejo e atrai clientes facilmente na região", score: 4 },
      { text: "Marca altamente desejada, pessoas já pedem que abramos franquias na cidade delas", score: 5 },
    ]
  },

  // Financeiro (2)
  { 
    id: "frq_fin_1", 
    categoryId: "fin", 
    categoryName: "Financeiro", 
    text: "A empresa possui capital de giro suficiente para investir na expansão e estrutura de suporte inicial?",
    options: [
      { text: "Estamos sem caixa nenhum", score: 0 },
      { text: "Vivemos mês a mês, sem sobra para investir", score: 1 },
      { text: "Poderíamos juntar um pouco de dinheiro para começar devagar", score: 2 },
      { text: "Temos caixa para pagar a formatação da franquia", score: 3 },
      { text: "Temos caixa para formatar e estruturar uma equipe básica de suporte", score: 4 },
      { text: "Caixa robusto para investir pesadamente em expansão, marketing e equipe de ponta", score: 5 },
    ]
  },
  { 
    id: "frq_fin_2", 
    categoryId: "fin", 
    categoryName: "Financeiro", 
    text: "Os custos operacionais de uma unidade foram minuciosamente mapeados e simulados para novos franqueados?",
    options: [
      { text: "Não sabemos nossos próprios custos direito", score: 0 },
      { text: "Temos uma ideia aproximada do custo de montagem", score: 1 },
      { text: "Mapeamos os custos, mas falta precisão e variação por região", score: 2 },
      { text: "Temos uma planilha razoável com custos de implantação e operação", score: 3 },
      { text: "Custos bem mapeados em uma DRE simulada para o franqueado", score: 4 },
      { text: "Estudo financeiro cirúrgico, prevendo diversos cenários e tributações", score: 5 },
    ]
  },

  // Processos (2) -> REPLACED MANUALS QUESTION AS REQUESTED
  { 
    id: "frq_pro_1", 
    categoryId: "pro", 
    categoryName: "Processos", 
    text: "Os processos estão mapeados, formalizados e funcionam na prática?",
    options: [
      { text: "Tudo está na cabeça do dono", score: 0 },
      { text: "Temos documentos que fizemos anos atrás e não usamos", score: 1 },
      { text: "Apenas parte da operação está mapeada (ex: financeiro ou comercial)", score: 2 },
      { text: "Processos existem e são razoavelmente seguidos no dia a dia", score: 3 },
      { text: "Processos formais e vivos na empresa, base para treinamentos", score: 4 },
      { text: "Cultura absoluta de processos: auditados, otimizados e à prova de falhas", score: 5 },
    ]
  },
  { 
    id: "frq_pro_2", 
    categoryId: "pro", 
    categoryName: "Processos", 
    text: "Os processos operacionais são simples o suficiente para serem ensinados a pessoas sem experiência prévia no setor?",
    options: [
      { text: "Impossível, requer anos de estudo técnico e prática", score: 0 },
      { text: "Muito complexos, leva meses para formar alguém", score: 1 },
      { text: "Complexidade média, exige talento específico", score: 2 },
      { text: "Relativamente simples, mas o treinamento dura semanas", score: 3 },
      { text: "Processo fácil de ensinar, em 1 ou 2 semanas a pessoa está apta", score: 4 },
      { text: "Processos 'à prova de idiotas', simplificados e automatizados ao extremo", score: 5 },
    ]
  },

  // Equipe (2)
  { 
    id: "frq_equ_1", 
    categoryId: "equ", 
    categoryName: "Equipe", 
    text: "Existe (ou foi projetada) uma equipe dedicada exclusivamente ao suporte contínuo dos franqueados (SAF)?",
    options: [
      { text: "Nenhuma, os donos fariam tudo sozinhos no Whatsapp", score: 0 },
      { text: "Alocaríamos alguém da nossa operação atual quando der tempo", score: 1 },
      { text: "Pensamos em contratar alguém no futuro para isso", score: 2 },
      { text: "Projeto de SAF definido e orçado para o início da expansão", score: 3 },
      { text: "Já temos alguém focado (ou contratado) para gestão da rede", score: 4 },
      { text: "SAF estruturado com consultores de campo, auditores e suporte contínuo de alta performance", score: 5 },
    ]
  },
  { 
    id: "frq_equ_2", 
    categoryId: "equ", 
    categoryName: "Equipe", 
    text: "A equipe de liderança tem o perfil consultivo necessário para apoiar o sucesso dos parceiros franqueados?",
    options: [
      { text: "Somos muito técnicos (fazemos), não sabemos ensinar ou liderar", score: 0 },
      { text: "Focamos apenas em mandar, perfil muito autoritário", score: 1 },
      { text: "Liderança razoável, mas pouca experiência em consultoria de negócios", score: 2 },
      { text: "Bons líderes, com disposição genuína de ajudar", score: 3 },
      { text: "Perfil forte de desenvolvimento de pessoas e gestão de conflitos", score: 4 },
      { text: "Líderes de classe mundial, verdadeiros mentores de negócios para os franqueados", score: 5 },
    ]
  },

  // Tecnologia (2)
  { 
    id: "frq_tec_1", 
    categoryId: "tec", 
    categoryName: "Tecnologia", 
    text: "O software de gestão atual permite integração de dados e visão consolidada pela franqueadora?",
    options: [
      { text: "Não usamos software", score: 0 },
      { text: "Nosso sistema é local e não permite acesso externo", score: 1 },
      { text: "Sistema básico em nuvem, mas sem portal de franqueadora", score: 2 },
      { text: "Sistema permite integração, mas precisaríamos pagar/desenvolver", score: 3 },
      { text: "Sistema pronto para o modelo de franquias com BI para a franqueadora", score: 4 },
      { text: "Stack tecnológico de ponta, visão em tempo real de todas as métricas da rede", score: 5 },
    ]
  },
  { 
    id: "frq_tec_2", 
    categoryId: "tec", 
    categoryName: "Tecnologia", 
    text: "A tecnologia da empresa protege os dados sensíveis dos clientes e está aderente à LGPD em escala de rede?",
    options: [
      { text: "Não sabemos o que é LGPD", score: 0 },
      { text: "Dados ficam espalhados em cadernos e Whatsapp", score: 1 },
      { text: "Temos um sistema, mas acessos não são bem controlados", score: 2 },
      { text: "Controles básicos de segurança e permissões de acesso", score: 3 },
      { text: "Sistema em conformidade com as regras de proteção de dados", score: 4 },
      { text: "Segurança de nível corporativo e adequação impecável à LGPD", score: 5 },
    ]
  },

  // Expansão (2)
  { 
    id: "frq_exp_1", 
    categoryId: "exp", 
    categoryName: "Expansão", 
    text: "Existe um perfil de franqueado ideal (Persona) documentado para o processo de seleção?",
    options: [
      { text: "Venderíamos para qualquer um que tiver dinheiro", score: 0 },
      { text: "Queremos alguém 'esforçado'", score: 1 },
      { text: "Temos algumas ideias sobre não querer investidores puros", score: 2 },
      { text: "Perfil definido informalmente", score: 3 },
      { text: "Persona clara: conhecemos o perfil financeiro, psicológico e técnico ideal", score: 4 },
      { text: "Filtro altamente seletivo, matriz de competências definida para aprovação", score: 5 },
    ]
  },
  { 
    id: "frq_exp_2", 
    categoryId: "exp", 
    categoryName: "Expansão", 
    text: "O plano de expansão (estudo de territórios, viabilidade e metas de abertura) está definido?",
    options: [
      { text: "Não, só queremos abrir onde aparecer oportunidade", score: 0 },
      { text: "Vamos tentar abrir nas cidades vizinhas", score: 1 },
      { text: "Temos uma meta de 'abrir 10 unidades', mas sem embasamento", score: 2 },
      { text: "Estudo inicial de viabilidade em algumas praças", score: 3 },
      { text: "Geomarketing básico feito e plano de expansão em ondas definido", score: 4 },
      { text: "Estratégia territorial detalhada, com mapeamento demográfico e logístico otimizado", score: 5 },
    ]
  },

  // Mercado (2)
  { 
    id: "frq_mer_1", 
    categoryId: "mer", 
    categoryName: "Mercado", 
    text: "O mercado de atuação do negócio está em crescimento e possui demanda comprovada em outras praças?",
    options: [
      { text: "Mercado em declínio e saturado", score: 0 },
      { text: "É uma moda passageira (onda curta)", score: 1 },
      { text: "Mercado estável, mas muito local e cultural", score: 2 },
      { text: "Mercado sólido com demanda constante", score: 3 },
      { text: "Mercado em crescimento acelerado no país inteiro", score: 4 },
      { text: "Oceano azul ou nicho trilionário em expansão contínua", score: 5 },
    ]
  },
  { 
    id: "frq_mer_2", 
    categoryId: "mer", 
    categoryName: "Mercado", 
    text: "A empresa possui diferenciais competitivos fortes que a protegem contra a cópia fácil por concorrentes locais?",
    options: [
      { text: "Somos iguais a qualquer concorrente da esquina", score: 0 },
      { text: "Diferencial é só 'qualidade e atendimento'", score: 1 },
      { text: "Temos algumas exclusividades pequenas de produto", score: 2 },
      { text: "Bom custo-benefício e marca conhecida", score: 3 },
      { text: "Diferencial claro de negócio, tecnologia ou fornecimento exclusivo", score: 4 },
      { text: "Barreira de entrada altíssima (moat), impossível de ser copiado com facilidade", score: 5 },
    ]
  },
];
