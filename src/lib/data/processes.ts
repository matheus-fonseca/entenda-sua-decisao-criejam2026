import type { Process } from "@/lib/types";

/**
 * DADOS FICTÍCIOS DE DEMONSTRAÇÃO.
 * Nomes, números de processo, datas e documentos foram inventados.
 * Não correspondem a pessoas, empregadores ou processos reais.
 */
export const processes: Process[] = [
  {
    id: "reclamacao-trabalhista",
    number: "0001234-56.2024.5.10.0001",
    area: "trabalhista",
    title: "Reclamação Trabalhista",
    court: "TRT da 10ª Região",
    courtShort: "TRT10",
    className: "Reclamação Trabalhista",
    status: "em-andamento",
    statusLabel: "Em andamento",
    parties: [
      { name: "Maria Souza", role: "autor", roleLabel: "Reclamante" },
      { name: "Empresa Alfa Serviços Ltda.", role: "reu", roleLabel: "Reclamada" },
    ],
    currentSituation: "o juiz está analisando um pedido para esclarecer a sentença.",
    events: [
      {
        id: "inicio",
        label: "Processo iniciado",
        date: "10/01/2024",
        status: "concluido",
        description: "Você entrou com a ação na Justiça do Trabalho.",
      },
      {
        id: "defesa",
        label: "Empregador respondeu",
        date: "31/01/2024",
        status: "concluido",
        description: "O empregador apresentou a defesa.",
        technicalName: "Contestação",
      },
      {
        id: "sentenca",
        label: "Decisão",
        date: "15/07/2024",
        status: "concluido",
        description: "O juiz decidiu os pedidos do processo.",
      },
      {
        id: "esclarecimento",
        label: "Pedido de esclarecimento",
        note: "em análise",
        date: "02/08/2024",
        status: "atual",
        description: "Foi pedido ao juiz que esclareça pontos da sentença.",
        technicalName: "Embargos de declaração",
      },
      {
        id: "proximas",
        label: "Próximas etapas",
        status: "futuro",
        description:
          "Dependem da análise do pedido de esclarecimento. Podem incluir recurso ao tribunal.",
      },
    ],
    decision: {
      documentType: "Sentença",
      date: "15/07/2024",
      decidedBy: "o juiz",
      outcome: "negado",
      headline: "O juiz não aceitou seu pedido de horas extras na decisão.",
      subheadline: "Mas a decisão ainda está sendo discutida. O resultado pode mudar.",
      explanation: {
        why: [
          "Você pediu o pagamento de horas extras.",
          "Para aceitar esse pedido, o juiz precisa de provas de que você trabalhou além do horário.",
          "O juiz considerou que não ficou comprovado que você trabalhou além do horário.",
          "Isso não quer dizer que alguém mentiu. Quer dizer que as provas não foram suficientes para o juiz.",
        ],
        whatNext: [
          "Foi feito um pedido de esclarecimento sobre a decisão.",
          "O juiz vai analisar esse pedido. A decisão pode ser mantida ou ajustada.",
          "Depois disso, o processo poderá seguir para outras etapas, como um recurso ao tribunal. Isso não é automático.",
          "Se tiver dúvidas, fale com quem representa você no processo ou com o Balcão Virtual.",
        ],
        glossary: [
          { term: "Embargos de declaração", meaning: "pedido de esclarecimento" },
          { term: "Improcedente", meaning: "pedido não aceito" },
          { term: "Ônus da prova", meaning: "quem precisa provar o que diz" },
        ],
      },
      original: {
        heading: "SENTENÇA",
        sections: [
          {
            title: "I – RELATÓRIO",
            paragraphs: [
              "MARIA SOUZA ajuizou reclamação trabalhista em face de EMPRESA ALFA SERVIÇOS LTDA., ambas qualificadas nos autos, postulando, em síntese, o pagamento de horas extras e reflexos, conforme fatos e fundamentos expostos na petição inicial.",
              "A reclamada apresentou contestação, refutando integralmente os pedidos. Juntaram-se documentos. Ouvidas as partes e uma testemunha. Encerrada a instrução processual. Razões finais remissivas. Propostas conciliatórias rejeitadas.",
            ],
          },
          {
            title: "II – FUNDAMENTAÇÃO",
            paragraphs: [
              "Horas extras. A reclamante alega labor em sobrejornada habitual, sem a devida contraprestação. A reclamada nega o fato e junta controles de jornada com registros variáveis.",
              "Incumbia à reclamante o ônus de comprovar o fato constitutivo do direito alegado, nos termos do art. 818, I, da CLT, encargo do qual não se desvencilhou a contento, porquanto a prova oral produzida mostrou-se frágil e contraditória quanto aos horários efetivamente cumpridos.",
              "Assim, reputam-se válidos os controles de jornada apresentados, inexistindo diferenças a serem apuradas. Julgo improcedente o pedido.",
            ],
          },
          {
            title: "III – DISPOSITIVO",
            paragraphs: [
              "Ante o exposto, nos autos da reclamação trabalhista proposta por MARIA SOUZA em face de EMPRESA ALFA SERVIÇOS LTDA., decido julgar IMPROCEDENTE o pedido de pagamento de horas extras e reflexos, nos termos da fundamentação.",
              "Custas pela reclamante, dispensadas na forma da lei. Intimem-se.",
            ],
          },
        ],
        signature: "Juiz(a) do Trabalho — Vara do Trabalho fictícia (documento demonstrativo)",
      },
    },
  },
  {
    id: "beneficio-previdenciario",
    number: "1005678-90.2023.4.01.3400",
    area: "previdenciario",
    title: "Benefício Previdenciário",
    court: "TRF da 1ª Região",
    courtShort: "TRF1",
    className: "Procedimento Comum Cível",
    status: "decisao",
    statusLabel: "Decisão",
    parties: [
      { name: "Maria Souza", role: "autor", roleLabel: "Autora" },
      { name: "Instituto Nacional do Seguro Social (INSS)", role: "reu", roleLabel: "Réu" },
    ],
    currentSituation: "a sentença foi publicada. O processo ainda pode ter outras etapas.",
    events: [
      {
        id: "inicio",
        label: "Processo iniciado",
        date: "14/03/2023",
        status: "concluido",
        description: "Você entrou com a ação pedindo um benefício do INSS.",
      },
      {
        id: "defesa",
        label: "INSS respondeu",
        date: "05/05/2023",
        status: "concluido",
        description: "O INSS apresentou a defesa dele.",
        technicalName: "Contestação",
      },
      {
        id: "pericia",
        label: "Perícia médica",
        date: "22/06/2023",
        status: "concluido",
        description: "Um médico indicado pela Justiça avaliou sua saúde.",
      },
      {
        id: "sentenca",
        label: "Sentença",
        note: "publicada",
        date: "18/09/2024",
        status: "atual",
        description: "O juiz decidiu os pedidos do processo.",
      },
      {
        id: "proximas",
        label: "Próximas etapas",
        status: "futuro",
        description:
          "Podem incluir recurso ao tribunal ou a etapa de cumprimento da decisão. Nada disso é automático.",
      },
    ],
    decision: {
      documentType: "Sentença",
      date: "18/09/2024",
      decidedBy: "o juiz",
      outcome: "parcial",
      headline: "O juiz aceitou parte do seu pedido.",
      subheadline:
        "Ele reconheceu seu direito ao auxílio por incapacidade temporária. O pedido de aposentadoria não foi aceito.",
      explanation: {
        why: [
          "Você pediu dois benefícios: o auxílio por incapacidade temporária e a aposentadoria por incapacidade permanente.",
          "A perícia médica indicou que você ficou sem condições de trabalhar por um período.",
          "Por isso, o juiz reconheceu seu direito ao auxílio por incapacidade temporária.",
          "A perícia não indicou que a incapacidade é permanente. Por isso, o pedido de aposentadoria não foi aceito.",
        ],
        whatNext: [
          "Esta decisão não significa pagamento imediato.",
          "Você e o INSS ainda podem pedir que o tribunal reveja a decisão. Isso se chama recurso.",
          "Se a decisão for mantida, o processo segue para a etapa em que o benefício é implantado e os valores são calculados.",
          "Não é possível informar aqui quando ou quanto será pago.",
        ],
        glossary: [
          { term: "Procedência parcial", meaning: "parte do pedido foi aceita" },
          { term: "Auxílio-doença", meaning: "nome antigo do auxílio por incapacidade temporária" },
          { term: "Implantação", meaning: "quando o INSS passa a pagar o benefício" },
        ],
      },
      original: {
        heading: "SENTENÇA",
        sections: [
          {
            title: "I – RELATÓRIO",
            paragraphs: [
              "Trata-se de ação ajuizada por MARIA SOUZA em face do INSTITUTO NACIONAL DO SEGURO SOCIAL – INSS, objetivando a concessão de auxílio por incapacidade temporária e, sucessivamente, sua conversão em aposentadoria por incapacidade permanente.",
              "Citado, o INSS apresentou contestação. Realizada perícia médica judicial, com laudo juntado aos autos. É o relatório. Decido.",
            ],
          },
          {
            title: "II – FUNDAMENTAÇÃO",
            paragraphs: [
              "O laudo pericial concluiu pela existência de incapacidade total e temporária para a atividade habitual, com data de início fixada no período indicado, sugerindo reavaliação após tratamento.",
              "Preenchidos os requisitos da qualidade de segurada e da carência, faz jus a parte autora ao auxílio por incapacidade temporária. Ausente, contudo, prova de incapacidade total e permanente, não se acolhe o pedido de aposentadoria por incapacidade permanente.",
            ],
          },
          {
            title: "III – DISPOSITIVO",
            paragraphs: [
              "Ante o exposto, JULGO PARCIALMENTE PROCEDENTE o pedido para condenar o INSS a conceder à parte autora o benefício de auxílio por incapacidade temporária, nos termos da fundamentação, e JULGO IMPROCEDENTE o pedido de aposentadoria por incapacidade permanente.",
              "Valores em atraso a serem apurados na fase de cumprimento, após o trânsito em julgado. Intimem-se.",
            ],
          },
        ],
        signature: "Juiz(a) Federal — Vara Federal fictícia (documento demonstrativo)",
      },
    },
  },
  {
    id: "acao-civel",
    number: "0012345-87.2023.8.17.2001",
    area: "civel",
    title: "Ação Cível",
    court: "TJPE",
    courtShort: "TJPE",
    className: "Procedimento Comum Cível",
    status: "em-andamento",
    statusLabel: "Em andamento",
    parties: [
      { name: "Maria Souza", role: "autor", roleLabel: "Autora" },
      { name: "Construtora Horizonte Ltda.", role: "reu", roleLabel: "Ré" },
    ],
    currentSituation:
      "o tribunal publicou uma decisão sobre o recurso. Ainda não conseguimos explicá-la com segurança.",
    events: [
      {
        id: "inicio",
        label: "Processo iniciado",
        date: "03/04/2023",
        status: "concluido",
        description: "Você entrou com a ação na Justiça Estadual.",
      },
      {
        id: "defesa",
        label: "Empregador respondeu",
        date: "20/05/2023",
        status: "concluido",
        description: "O empregador apresentou a defesa.",
        technicalName: "Contestação",
      },
      {
        id: "sentenca",
        label: "Sentença",
        date: "12/02/2024",
        status: "concluido",
        description: "O juiz decidiu os pedidos do processo.",
      },
      {
        id: "recurso",
        label: "Recurso ao tribunal",
        date: "05/03/2024",
        status: "concluido",
        description: "Foi pedido que o tribunal revisse a sentença.",
        technicalName: "Apelação",
      },
      {
        id: "acordao",
        label: "Decisão do tribunal",
        note: "publicada",
        date: "09/10/2024",
        status: "atual",
        description: "O tribunal decidiu o recurso.",
        technicalName: "Acórdão",
      },
      {
        id: "proximas",
        label: "Próximas etapas",
        status: "futuro",
        description: "Dependem do conteúdo da decisão do tribunal.",
      },
    ],
    decision: {
      documentType: "Acórdão",
      date: "09/10/2024",
      decidedBy: "o tribunal",
      outcome: "inseguro",
      headline: "Ainda não conseguimos explicar esta decisão com segurança.",
      subheadline:
        "Para não passar uma informação errada, não vamos resumir o resultado. Consulte o documento original ou fale com um atendente.",
      explanation: null,
      uncertaintyReasons: [
        "Partes do documento não puderam ser lidas com clareza na cópia digital.",
        "Um resumo automático, neste caso, poderia mudar o sentido da decisão.",
        "Preferimos não mostrar um resultado do que mostrar um resultado errado.",
      ],
      original: {
        heading: "ACÓRDÃO",
        sections: [
          {
            title: "EMENTA",
            paragraphs: [
              "APELAÇÃO CÍVEL. [trecho ilegível na digitalização] CONTRATO. ALEGAÇÃO DE [trecho ilegível]. RECURSO CONHECIDO E [trecho ilegível].",
            ],
          },
          {
            title: "ACÓRDÃO",
            paragraphs: [
              "Vistos, relatados e discutidos estes autos, em que figuram como partes MARIA SOUZA e CONSTRUTORA HORIZONTE LTDA., ACORDAM os integrantes da Câmara Cível fictícia, por [trecho ilegível], em [trecho ilegível na digitalização] ao recurso, nos termos do voto do relator.",
              "Quanto aos demais pontos, [página com baixa qualidade de imagem — conteúdo não reconhecido].",
            ],
          },
        ],
        signature: "Desembargador(a) Relator(a) — Câmara Cível fictícia (documento demonstrativo)",
      },
    },
  },
];
