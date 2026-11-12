import type { Process } from "@/lib/types";

/**
 * DADOS FICTÍCIOS DE DEMONSTRAÇÃO.
 * Nomes, números de processo, datas e documentos foram inventados.
 * Não correspondem a pessoas, empresas ou processos reais.
 * Os fundamentos jurídicos citados nos documentos originais são reais e foram
 * usados apenas para dar verossimilhança aos textos demonstrativos.
 */
export const processes: Process[] = [
  // ─────────────────────────────────────────────────────────────
  // 1) TRABALHISTA — só sentença (parcialmente procedente). Exemplo mais simples da demo.
  //    Rito sumaríssimo (arts. 852-A e seguintes da CLT), audiência una.
  //    Verbas rescisórias: art. 477, §§ 6º e 8º, CLT (prazo e multa). Prova do pagamento:
  //    art. 464 CLT; ônus do empregador quanto ao fato extintivo: art. 818, II, CLT.
  //    Multa de 40% do FGTS: art. 18, § 1º, da Lei 8.036/90.
  // ─────────────────────────────────────────────────────────────
  {
    id: "rescisao-trabalhista",
    number: "0001010-22.2025.5.02.0031",
    area: "trabalhista",
    title: "Rescisão do contrato",
    court: "TRT da 10ª Região (Pernambuco)",
    courtShort: "TRT10",
    className: "Reclamação Trabalhista (rito sumaríssimo)",
    status: "decisao",
    statusLabel: "Decisão",
    parties: [
      { name: "Maria Souza", role: "autor", roleLabel: "Reclamante" },
      { name: "Comércio Beta Ltda.", role: "reu", roleLabel: "Reclamada" },
    ],
    events: [
      {
        id: "inicio",
        label: "Processo iniciado",
        technicalName: "Petição inicial",
        date: "10/02/2025",
        status: "concluido",
        description: "Você entrou com a ação na Justiça do Trabalho.",
      },
      {
        id: "audiencia",
        label: "Audiência",
        technicalName: "Audiência una",
        date: "14/04/2025",
        status: "concluido",
        description: "A empresa apresentou a defesa e o juiz ouviu as partes.",
      },
      {
        id: "sentenca",
        label: "Decisão do juiz",
        technicalName: "Sentença",
        date: "23/06/2025",
        status: "atual",
        description: "O juiz decidiu os pedidos do processo.",
        decisionId: "sentenca",
      },
      {
        id: "proximas",
        label: "Próximas etapas",
        technicalName: "Recurso ordinário ou liquidação",
        status: "futuro",
        description: "Pode haver recurso ao tribunal ou o cálculo dos valores. Nada disso é automático.",
      },
    ],
    decisions: [
      {
        id: "sentenca",
        documentType: "Sentença",
        date: "23/06/2025",
        decidedBy: "o juiz",
        outcome: "parcial",
        headline: "O juiz mandou a empresa pagar sua rescisão.",
        subheadline: "A empresa deve pagar o que faltava, com multa pelo atraso. Ainda cabe recurso, então o resultado pode mudar.",
        explanation: {
          why: [
            "Você foi dispensada sem justa causa e não recebeu a rescisão.",
            "A empresa não provou que pagou. Por isso, o juiz mandou pagar os valores e a multa por atraso.",
            "O pedido de indenização por dano moral não foi aceito.",
          ],
          whatNext: [
            "Você ou a empresa ainda podem recorrer ao tribunal. Por isso, o resultado pode mudar.",
            "Se ninguém recorrer, os valores serão calculados em uma etapa própria do processo.",
            "Não é possível informar aqui quando ou quanto será pago.",
          ],
        },
        original: {
          heading: "SENTENÇA",
          sections: [
            {
              title: "I – RELATÓRIO",
              paragraphs: [
                "Dispensado o relatório, nos termos do art. 852-I da CLT (rito sumaríssimo). MARIA SOUZA ajuizou reclamação trabalhista em face de COMÉRCIO BETA LTDA., postulando o pagamento das verbas rescisórias decorrentes da dispensa sem justa causa, da multa do art. 477, § 8º, da CLT, da indenização de 40% do FGTS e de compensação por danos morais.",
              ],
            },
            {
              title: "II – FUNDAMENTAÇÃO",
              paragraphs: [
                "Verbas rescisórias. Incontroversa a dispensa sem justa causa. A reclamada alega ter quitado as verbas rescisórias, mas não apresenta recibo de pagamento, prova que lhe incumbia (arts. 464 e 818, II, da CLT). Devidos o saldo de salário, o aviso prévio indenizado, as férias proporcionais acrescidas de um terço e o 13º salário proporcional.",
                "Multa do art. 477, § 8º, da CLT. Não observado o prazo do § 6º do mesmo artigo, é devida a multa equivalente a um salário da reclamante.",
                "FGTS. Devida a indenização de 40% sobre os depósitos do FGTS (art. 18, § 1º, da Lei 8.036/90).",
                "Danos morais. O atraso no pagamento das verbas rescisórias, por si só, não configura ofensa a direito da personalidade, ausente prova de repercussão que ultrapasse o inadimplemento. Improcedente.",
                "Justiça gratuita. Deferida, nos termos do art. 790, § 3º, da CLT.",
              ],
            },
            {
              title: "III – DISPOSITIVO",
              paragraphs: [
                "Ante o exposto, julgo PARCIALMENTE PROCEDENTES os pedidos formulados por MARIA SOUZA em face de COMÉRCIO BETA LTDA. para condenar a reclamada ao pagamento de saldo de salário, aviso prévio indenizado, férias proporcionais acrescidas de um terço, 13º salário proporcional, multa do art. 477, § 8º, da CLT e indenização de 40% do FGTS, nos termos da fundamentação, e julgo IMPROCEDENTE o pedido de compensação por danos morais.",
                "Valores a serem apurados em liquidação. Honorários advocatícios de sucumbência recíproca, nos termos do art. 791-A da CLT, observada a ADI 5766 quanto à reclamante. Custas pela reclamada. Intimem-se.",
              ],
            },
          ],
          signature: "Juiz(a) do Trabalho — Vara do Trabalho fictícia de São Paulo (documento demonstrativo)",
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 2) TRABALHISTA — sentença (improcedente) e acórdão (reforma parcial)
  //    Rito ordinário. RO: art. 895, I, CLT (8 dias úteis).
  //    Ônus da prova: art. 818, I, CLT. Controles de jornada: art. 74, §2º, CLT
  //    e Súmula 338, I, TST. Recurso de revista não reexamina provas (Súmula 126, TST).
  // ─────────────────────────────────────────────────────────────
  {
    id: "reclamacao-trabalhista",
    number: "0001234-56.2024.5.10.0001",
    area: "trabalhista",
    title: "Horas extras",
    court: "TRT da 10ª Região (Pernambuco)",
    courtShort: "TRT10",
    className: "Reclamação Trabalhista",
    status: "decisao",
    statusLabel: "Decisão",
    parties: [
      { name: "Maria Souza", role: "autor", roleLabel: "Reclamante" },
      { name: "Empresa Alfa Serviços Ltda.", role: "reu", roleLabel: "Reclamada" },
    ],
    events: [
      {
        id: "inicio",
        label: "Processo iniciado",
        technicalName: "Petição inicial",
        date: "10/01/2024",
        status: "concluido",
        description: "Você entrou com a ação na Justiça do Trabalho.",
      },
      {
        id: "defesa",
        label: "Empregador respondeu",
        technicalName: "Contestação",
        date: "31/01/2024",
        status: "concluido",
        description: "Na primeira audiência, o empregador apresentou a defesa dele.",
      },
      {
        id: "audiencia",
        label: "Audiência",
        technicalName: "Audiência de instrução",
        date: "10/04/2024",
        status: "concluido",
        description: "O juiz ouviu as partes e a testemunha.",
      },
      {
        id: "sentenca",
        label: "Decisão do juiz",
        technicalName: "Sentença",
        date: "15/07/2024",
        status: "concluido",
        description: "O juiz decidiu os pedidos do processo.",
        decisionId: "sentenca",
      },
      {
        id: "recurso",
        label: "Recurso ao tribunal",
        technicalName: "Recurso ordinário",
        date: "24/07/2024",
        status: "concluido",
        description: "Você pediu que o tribunal revisse a sentença.",
      },
      {
        id: "acordao",
        label: "Decisão do tribunal",
        technicalName: "Acórdão",
        date: "18/03/2025",
        status: "atual",
        description: "O tribunal decidiu o recurso.",
        decisionId: "acordao",
      },
      {
        id: "proximas",
        label: "Próximas etapas",
        technicalName: "Recurso de revista ou liquidação",
        status: "futuro",
        description: "Podem incluir um recurso ao TST ou o cálculo dos valores. Nada disso é automático.",
      },
    ],
    decisions: [
      {
        id: "sentenca",
        documentType: "Sentença",
        date: "15/07/2024",
        decidedBy: "o juiz",
        outcome: "negado",
        headline: "O juiz não aceitou seu pedido de horas extras.",
        subheadline: "Ele entendeu que faltaram provas de que você trabalhou além do horário.",
        explanation: {
          why: [
            "Você pediu o pagamento de horas extras.",
            "A empresa apresentou registros de ponto, e o juiz os considerou válidos.",
            "Para o juiz, a testemunha não foi suficiente para provar o contrário.",
          ],
          whatNext: [
            "Você recorreu ao tribunal.",
            "O tribunal mudou parte deste resultado. Veja a decisão mais recente.",
          ],
        },
        original: {
          heading: "SENTENÇA",
          sections: [
            {
              title: "I – RELATÓRIO",
              paragraphs: [
                "MARIA SOUZA ajuizou reclamação trabalhista em face de EMPRESA ALFA SERVIÇOS LTDA., ambas qualificadas nos autos, postulando, em síntese, o pagamento de horas extras e reflexos, além dos benefícios da justiça gratuita.",
                "Em audiência inicial, rejeitada a primeira proposta conciliatória, a reclamada apresentou contestação, refutando os pedidos. Na audiência de instrução, foram ouvidas as partes e uma testemunha indicada pela reclamante. Encerrada a instrução processual. Razões finais remissivas. Rejeitada a última proposta conciliatória.",
              ],
            },
            {
              title: "II – FUNDAMENTAÇÃO",
              paragraphs: [
                "Horas extras. A reclamante alega labor em sobrejornada habitual, sem a devida contraprestação. A reclamada nega o fato e junta controles de jornada com registros variáveis.",
                "Incumbia à reclamante o ônus de comprovar o fato constitutivo do direito alegado, nos termos do art. 818, I, da CLT, encargo do qual não se desvencilhou a contento, porquanto a prova oral produzida mostrou-se frágil quanto aos horários efetivamente cumpridos.",
                "Assim, reputam-se válidos os controles de jornada apresentados, inexistindo diferenças a serem apuradas. Julgo improcedente o pedido.",
                "Justiça gratuita. Deferem-se à reclamante os benefícios da justiça gratuita, nos termos do art. 790, §§ 3º e 4º, da CLT.",
              ],
            },
            {
              title: "III – DISPOSITIVO",
              paragraphs: [
                "Ante o exposto, nos autos da reclamação trabalhista proposta por MARIA SOUZA em face de EMPRESA ALFA SERVIÇOS LTDA., decido julgar IMPROCEDENTE o pedido de pagamento de horas extras e reflexos, nos termos da fundamentação.",
                "Honorários advocatícios de sucumbência pela reclamante, cuja exigibilidade fica suspensa por ser beneficiária da justiça gratuita (art. 791-A, § 4º, da CLT, nos termos da ADI 5766). Custas pela reclamante, das quais fica isenta. Intimem-se.",
              ],
            },
          ],
          signature: "Juiz(a) do Trabalho — Vara do Trabalho fictícia (documento demonstrativo)",
        },
      },
      {
        id: "acordao",
        documentType: "Acórdão",
        date: "18/03/2025",
        decidedBy: "o tribunal",
        outcome: "parcial",
        headline: "O tribunal mudou parte da decisão do juiz.",
        subheadline: "Agora você tem direito a horas extras em parte do período. Ainda pode haver recurso, então o resultado pode mudar.",
        explanation: {
          why: [
            "Em parte do período, a empresa não apresentou os registros de ponto.",
            "Sem esses registros, vale o horário que você informou, confirmado pela testemunha.",
            "No período com registros válidos, o tribunal manteve a decisão do juiz.",
          ],
          whatNext: [
            "Ainda pode haver recurso ao TST, mas só em casos específicos.",
            "Se a decisão for mantida, os valores serão calculados em uma etapa própria.",
            "Não é possível informar aqui quando ou quanto será pago.",
          ],
        },
        original: {
          heading: "ACÓRDÃO",
          sections: [
            {
              title: "EMENTA",
              paragraphs: [
                "RECURSO ORDINÁRIO DA RECLAMANTE. HORAS EXTRAS. EMPREGADORA COM MAIS DE VINTE EMPREGADOS. AUSÊNCIA PARCIAL DOS CONTROLES DE JORNADA. SÚMULA 338, I, DO TST. A não apresentação injustificada dos controles de frequência gera presunção relativa de veracidade da jornada declinada na inicial, a qual pode ser elidida por prova em contrário. Presunção corroborada pela prova testemunhal. Recurso parcialmente provido.",
              ],
            },
            {
              title: "RELATÓRIO",
              paragraphs: [
                "Recurso ordinário interposto pela reclamante, MARIA SOUZA, contra a sentença que julgou improcedente o pedido de horas extras formulado em face de EMPRESA ALFA SERVIÇOS LTDA. Contrarrazões apresentadas. Dispensada a remessa dos autos ao Ministério Público do Trabalho. É o relatório.",
              ],
            },
            {
              title: "VOTO",
              paragraphs: [
                "Admissibilidade. Conheço do recurso, porque tempestivo e preenchidos os demais pressupostos de admissibilidade.",
                "Mérito. Incontroverso que a reclamada conta com mais de vinte empregados, estando obrigada ao registro da jornada (art. 74, § 2º, da CLT). Verifica-se, contudo, que não foram juntados os controles de jornada relativos a parte do período contratual. Quanto a esse lapso, aplica-se o entendimento consolidado na Súmula 338, I, do TST, presumindo-se verdadeira a jornada declinada na inicial, presunção não elidida e, ao contrário, corroborada pela prova testemunhal.",
                "Quanto ao período em que juntados os registros, mantém-se a sentença, por ausência de prova capaz de infirmá-los.",
              ],
            },
            {
              title: "DISPOSITIVO",
              paragraphs: [
                "ACORDAM os integrantes da Turma fictícia do Tribunal Regional do Trabalho da 10ª Região, por unanimidade, conhecer do recurso ordinário da reclamante e, no mérito, dar-lhe PARCIAL PROVIMENTO para condenar a reclamada ao pagamento de horas extras e reflexos relativos ao período sem controles de jornada, nos termos do voto. Valores a serem apurados em liquidação. Honorários advocatícios de sucumbência pela reclamada quanto à parcela acolhida (art. 791-A da CLT).",
              ],
            },
          ],
          signature: "Desembargador(a) Relator(a) — Turma fictícia (documento demonstrativo)",
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 3) PREVIDENCIÁRIO — sentença parcialmente procedente + embargos em análise
  //    Interesse de agir: prévio requerimento administrativo (STF, RE 631.240).
  //    Benefícios: arts. 42 e 59 a 63 da Lei 8.213/91 (nomes da EC 103/2019).
  //    Embargos de declaração: arts. 1.022 a 1.026 do CPC (interrompem o prazo recursal).
  // ─────────────────────────────────────────────────────────────
  {
    id: "beneficio-previdenciario",
    number: "1005678-90.2023.4.01.3400",
    area: "previdenciario",
    title: "Benefício do INSS",
    court: "TRF da 1ª Região",
    courtShort: "TRF1",
    className: "Procedimento Comum Cível",
    status: "em-andamento",
    statusLabel: "Em andamento",
    parties: [
      { name: "Maria Souza", role: "autor", roleLabel: "Autora" },
      { name: "Instituto Nacional do Seguro Social (INSS)", role: "reu", roleLabel: "Réu" },
    ],
    events: [
      {
        id: "inicio",
        label: "Processo iniciado",
        technicalName: "Petição inicial",
        date: "14/03/2023",
        status: "concluido",
        description: "Depois de o INSS negar seu pedido, você entrou com a ação na Justiça Federal.",
      },
      {
        id: "defesa",
        label: "INSS respondeu",
        technicalName: "Contestação",
        date: "05/05/2023",
        status: "concluido",
        description: "O INSS apresentou a defesa dele.",
      },
      {
        id: "pericia",
        label: "Perícia médica",
        technicalName: "Perícia judicial",
        date: "22/06/2023",
        status: "concluido",
        description: "Um médico indicado pela Justiça avaliou sua saúde.",
      },
      {
        id: "sentenca",
        label: "Decisão do juiz",
        technicalName: "Sentença",
        date: "18/09/2024",
        status: "concluido",
        description: "O juiz decidiu os pedidos do processo.",
        decisionId: "sentenca",
      },
      {
        id: "esclarecimento",
        label: "Pedido de esclarecimento",
        technicalName: "Embargos de declaração",
        note: "em análise",
        date: "24/09/2024",
        status: "atual",
        description: "Foi pedido ao juiz que esclareça pontos da sentença.",
      },
      {
        id: "proximas",
        label: "Próximas etapas",
        technicalName: "Julgamento dos embargos e possível apelação",
        status: "futuro",
        description:
          "Dependem da resposta do juiz ao pedido de esclarecimento. Pode haver recurso ao tribunal. Nada disso é automático.",
      },
    ],
    decisions: [
      {
        id: "sentenca",
        documentType: "Sentença",
        date: "18/09/2024",
        decidedBy: "o juiz",
        outcome: "parcial",
        headline: "O juiz concedeu o auxílio, mas não a aposentadoria.",
        subheadline: "Foi pedido um esclarecimento ao juiz sobre a sentença. Por isso, o resultado ainda pode mudar.",
        explanation: {
          why: [
            "A perícia mostrou que você ficou sem condições de trabalhar por um tempo, mas pode se recuperar.",
            "Por isso, o juiz concedeu o auxílio por incapacidade temporária.",
            "A aposentadoria exige incapacidade permanente, que a perícia não confirmou.",
          ],
          whatNext: [
            "O juiz vai responder ao pedido de esclarecimento e pode manter ou ajustar a sentença.",
            "Depois, você e o INSS ainda podem recorrer ao tribunal.",
            "Os valores atrasados são pagos em etapa própria. Não é possível informar aqui quando.",
          ],
        },
        original: {
          heading: "SENTENÇA",
          sections: [
            {
              title: "I – RELATÓRIO",
              paragraphs: [
                "Trata-se de ação de procedimento comum ajuizada por MARIA SOUZA em face do INSTITUTO NACIONAL DO SEGURO SOCIAL – INSS, após o indeferimento administrativo do requerimento de benefício, objetivando a concessão de auxílio por incapacidade temporária e, sucessivamente, de aposentadoria por incapacidade permanente.",
                "Citado, o INSS apresentou contestação, sustentando a ausência de incapacidade laboral. Realizada perícia médica judicial, com laudo juntado aos autos, sobre o qual as partes se manifestaram. É o relatório. Decido.",
              ],
            },
            {
              title: "II – FUNDAMENTAÇÃO",
              paragraphs: [
                "O laudo pericial concluiu pela existência de incapacidade total e temporária para a atividade habitual desde a data do requerimento administrativo, com prognóstico de recuperação mediante tratamento.",
                "Comprovadas a qualidade de segurada e a carência exigida (art. 25, I, da Lei 8.213/91), faz jus a parte autora ao auxílio por incapacidade temporária (art. 59 da Lei 8.213/91). Ausente prova de incapacidade total e permanente, insuscetível de reabilitação, não se acolhe o pedido sucessivo de aposentadoria por incapacidade permanente (art. 42 da Lei 8.213/91).",
                "Considerando o prognóstico pericial, fixa-se a data de cessação do benefício nos termos do art. 60, § 8º, da Lei 8.213/91, ressalvada a possibilidade de pedido de prorrogação na via administrativa.",
              ],
            },
            {
              title: "III – DISPOSITIVO",
              paragraphs: [
                "Ante o exposto, JULGO PARCIALMENTE PROCEDENTE o pedido para condenar o INSS a conceder à parte autora o benefício de auxílio por incapacidade temporária, com data de início na data do requerimento administrativo e data de cessação fixada conforme a fundamentação, e JULGO IMPROCEDENTE o pedido de aposentadoria por incapacidade permanente.",
                "As parcelas vencidas serão pagas após o trânsito em julgado, mediante requisição de pagamento, com correção monetária e juros na forma da lei. Honorários advocatícios pelo INSS, a serem fixados na liquidação (art. 85, § 4º, II, do CPC), observada a Súmula 111 do STJ. Sentença não sujeita à remessa necessária (art. 496, § 3º, I, do CPC). Intimem-se.",
              ],
            },
          ],
          signature: "Juiz(a) Federal — Vara Federal fictícia da Seção Judiciária do DF (documento demonstrativo)",
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 4) CÍVEL — sentença parcialmente procedente + acórdão com interpretação insegura
  //    Atraso na entrega de imóvel (relação de consumo). Audiência de conciliação:
  //    art. 334 do CPC. Aluguéis pagos = danos emergentes (art. 402 do CC).
  //    Juros desde a citação (art. 405 do CC); correção desde o desembolso (Súmula 43 do STJ).
  //    Sucumbência recíproca: art. 86 do CPC; vedada a compensação (art. 85, § 14).
  // ─────────────────────────────────────────────────────────────
  {
    id: "acao-civel",
    number: "0012345-87.2023.8.17.2001",
    area: "civel",
    title: "Atraso na entrega do imóvel",
    court: "Tribunal de Justiça de Pernambuco",
    courtShort: "TJPE",
    className: "Procedimento Comum Cível",
    status: "decisao",
    statusLabel: "Decisão",
    parties: [
      { name: "Maria Souza", role: "autor", roleLabel: "Autora" },
      { name: "Construtora Horizonte Ltda.", role: "reu", roleLabel: "Ré" },
    ],
    events: [
      {
        id: "inicio",
        label: "Processo iniciado",
        technicalName: "Petição inicial",
        date: "03/04/2023",
        status: "concluido",
        description: "Você entrou com a ação na Justiça Estadual.",
      },
      {
        id: "conciliacao",
        label: "Tentativa de acordo",
        technicalName: "Audiência de conciliação",
        date: "15/05/2023",
        status: "concluido",
        description: "As partes se reuniram para tentar um acordo, que não aconteceu.",
      },
      {
        id: "defesa",
        label: "A outra parte respondeu",
        technicalName: "Contestação",
        date: "05/06/2023",
        status: "concluido",
        description: "A construtora apresentou a defesa dela.",
      },
      {
        id: "sentenca",
        label: "Decisão do juiz",
        technicalName: "Sentença",
        date: "19/02/2024",
        status: "concluido",
        description: "O juiz decidiu os pedidos do processo.",
        decisionId: "sentenca",
      },
      {
        id: "recurso",
        label: "Recurso ao tribunal",
        technicalName: "Apelação",
        date: "08/03/2024",
        status: "concluido",
        description: "Foi pedido que o tribunal revisse a sentença.",
      },
      {
        id: "acordao",
        label: "Decisão do tribunal",
        technicalName: "Acórdão",
        date: "09/10/2024",
        status: "atual",
        description: "O tribunal decidiu o recurso.",
        decisionId: "acordao",
      },
      {
        id: "proximas",
        label: "Próximas etapas",
        technicalName: "Recursos ou cumprimento de sentença",
        status: "futuro",
        description: "Dependem do conteúdo da decisão do tribunal.",
      },
    ],
    decisions: [
      {
        id: "sentenca",
        documentType: "Sentença",
        date: "19/02/2024",
        decidedBy: "o juiz",
        outcome: "parcial",
        headline: "O juiz aceitou parte do seu pedido.",
        subheadline:
          "Ele reconheceu que houve atraso na entrega do imóvel. O pedido de indenização por dano moral não foi aceito.",
        explanation: {
          why: [
            "O imóvel foi entregue depois até do prazo extra de 180 dias do contrato.",
            "Por isso, a construtora deve devolver o que você gastou com aluguel no atraso.",
            "O pedido de dano moral não foi aceito.",
          ],
          whatNext: [
            "Houve recurso e o tribunal já decidiu.",
            "Ainda não conseguimos explicar essa decisão com segurança.",
          ],
        },
        original: {
          heading: "SENTENÇA",
          sections: [
            {
              title: "I – RELATÓRIO",
              paragraphs: [
                "MARIA SOUZA ajuizou ação de indenização em face de CONSTRUTORA HORIZONTE LTDA., alegando atraso na entrega de unidade imobiliária adquirida na planta e postulando o ressarcimento dos aluguéis pagos no período de atraso e compensação por danos morais.",
                "Realizada audiência de conciliação, sem acordo (art. 334 do CPC). A ré apresentou contestação, atribuindo o atraso a fatores alheios à sua vontade. Houve réplica. É o relatório. Decido.",
              ],
            },
            {
              title: "II – FUNDAMENTAÇÃO",
              paragraphs: [
                "A relação entre as partes é de consumo, aplicando-se o Código de Defesa do Consumidor. É válida a cláusula de tolerância de 180 dias prevista no contrato (art. 43-A da Lei 4.591/64). Restou incontroverso, porém, que a entrega da unidade ocorreu após o fim desse prazo, sem prova de caso fortuito ou força maior.",
                "Configurada a mora da ré, impõe-se o ressarcimento dos aluguéis comprovadamente despendidos pela autora no período, a título de danos emergentes (art. 402 do CC).",
                "O mero inadimplemento contratual, contudo, não enseja, por si só, dano moral indenizável, à míngua de demonstração de ofensa a direito da personalidade que ultrapasse o mero aborrecimento.",
              ],
            },
            {
              title: "III – DISPOSITIVO",
              paragraphs: [
                "Ante o exposto, JULGO PARCIALMENTE PROCEDENTES os pedidos para condenar a ré a ressarcir os aluguéis comprovadamente pagos pela autora entre o fim do prazo de tolerância e a efetiva entrega da unidade, com correção monetária desde cada desembolso (Súmula 43 do STJ) e juros de mora desde a citação (art. 405 do CC), e JULGO IMPROCEDENTE o pedido de compensação por danos morais.",
                "Diante da sucumbência recíproca, custas e honorários serão distribuídos proporcionalmente entre as partes (art. 86 do CPC), vedada a compensação dos honorários (art. 85, § 14, do CPC). Intimem-se.",
              ],
            },
          ],
          signature: "Juiz(a) de Direito — Vara Cível fictícia (documento demonstrativo)",
        },
      },
      {
        id: "acordao",
        documentType: "Acórdão",
        date: "09/10/2024",
        decidedBy: "o tribunal",
        outcome: "inseguro",
        headline: "Ainda não conseguimos explicar esta decisão com segurança.",
        subheadline:
          "Para não passar uma informação errada, não vamos resumir o resultado. Consulte o documento original ou fale com um atendente.",
        explanation: null,
        uncertaintyReasons: [
          "Partes do documento estão ilegíveis na cópia digital.",
          "Não foi possível saber se o tribunal manteve ou mudou a sentença.",
          "Preferimos não mostrar um resultado a mostrar um resultado errado.",
        ],
        original: {
          heading: "ACÓRDÃO",
          sections: [
            {
              title: "EMENTA",
              paragraphs: [
                "APELAÇÃO CÍVEL. DIREITO DO CONSUMIDOR. PROMESSA DE COMPRA E VENDA DE IMÓVEL. ATRASO NA ENTREGA. [trecho ilegível na digitalização]. DANOS MORAIS. [trecho ilegível]. RECURSO CONHECIDO E [trecho ilegível].",
              ],
            },
            {
              title: "ACÓRDÃO",
              paragraphs: [
                "Vistos, relatados e discutidos estes autos de Apelação Cível, em que figuram como partes MARIA SOUZA e CONSTRUTORA HORIZONTE LTDA., ACORDAM os Desembargadores integrantes da Câmara Cível fictícia do Tribunal de Justiça do Estado de Pernambuco, por [trecho ilegível], em [trecho ilegível na digitalização] ao recurso, nos termos do voto do relator.",
                "Quanto aos honorários recursais (art. 85, § 11, do CPC), [página com baixa qualidade de imagem — conteúdo não reconhecido].",
              ],
            },
          ],
          signature: "Desembargador(a) Relator(a) — Câmara Cível fictícia (documento demonstrativo)",
        },
      },
    ],
  },
];
