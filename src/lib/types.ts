/**
 * Tipos de domínio do protótipo "Entenda sua Decisão".
 * Pensados para que os dados demonstrativos possam ser substituídos
 * futuramente por uma API, sem alterar os componentes.
 */

export type ProcessArea = "trabalhista" | "previdenciario" | "civel";

export type ProcessStatus = "em-andamento" | "decisao" | "arquivado";

export type PartyRole = "autor" | "reu";

export interface Party {
  name: string;
  role: PartyRole;
  /** Nome do papel como aparece no processo (ex.: "Reclamante", "Ré"). */
  roleLabel: string;
}

/** concluido = já aconteceu; atual = situação de agora; futuro = pode acontecer. */
export type EventStatus = "concluido" | "atual" | "futuro";

export interface ProcessEvent {
  id: string;
  /** Nome da etapa em linguagem cidadã. */
  label: string;
  /** Data no formato DD/MM/AAAA (fictícia). Ausente para etapas futuras. */
  date?: string;
  status: EventStatus;
  /** Complemento curto, ex.: "em análise". */
  note?: string;
  /** Explicação curta da etapa, usada como descrição acessível. */
  description: string;
  /** Nome técnico, quando diferente do nome cidadão. */
  technicalName?: string;
}

export type DocumentType = "Sentença" | "Acórdão";

/**
 * negado   → pedido não aceito (cartão cinza neutro)
 * parcial  → pedido aceito em parte (cartão verde suave)
 * inseguro → não foi possível interpretar com segurança (cartão âmbar suave)
 */
export type DecisionOutcome = "negado" | "parcial" | "inseguro";

export interface GlossaryTerm {
  term: string;
  meaning: string;
}

export interface Explanation {
  /** "Por que o juiz decidiu assim?" — frases curtas. */
  why: string[];
  /** "O que pode acontecer agora?" — frases curtas, sem recomendação jurídica. */
  whatNext: string[];
  glossary?: GlossaryTerm[];
}

export interface OriginalDocument {
  heading: string;
  sections: { title: string; paragraphs: string[] }[];
  signature: string;
}

export interface Decision {
  documentType: DocumentType;
  date: string;
  /** Quem decidiu, em linguagem simples ("o juiz", "o tribunal"). */
  decidedBy: string;
  outcome: DecisionOutcome;
  headline: string;
  subheadline: string;
  /** null quando a interpretação não é segura: nenhuma síntese é exibida. */
  explanation: Explanation | null;
  /** Motivos pelos quais não há explicação (apenas no cenário inseguro). */
  uncertaintyReasons?: string[];
  original: OriginalDocument;
}

export interface Process {
  /** Identificador usado na URL. */
  id: string;
  number: string;
  area: ProcessArea;
  /** Título curto exibido na lista. */
  title: string;
  court: string;
  courtShort: string;
  className: string;
  status: ProcessStatus;
  statusLabel: string;
  parties: Party[];
  /** Frase do destaque "Agora:". */
  currentSituation: string;
  events: ProcessEvent[];
  decision: Decision;
}
