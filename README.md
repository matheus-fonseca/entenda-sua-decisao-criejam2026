# Entenda sua Decisão — protótipo ilustrativo

Protótipo web navegável, criado para uma oficina de inovação do Poder Judiciário. Ele explica sentenças e acórdãos em linguagem simples para quem não conhece termos jurídicos. A integração com Jus.br / Minha Justiça / CNJ é apenas conceitual.

> **Todos os dados são fictícios.** Não há autenticação real nem backend. Também não há integração com Gov.br, DataJud, Codex ou Balcão Virtual.

## Como executar

Requisitos: Node.js 20.9+ (testado com Node 22) e npm.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build && npm start   # versão de produção local
```

## Rotas

| Rota | Tela |
| --- | --- |
| `/` | Login demonstrativo ("Entrar com Gov.br (demonstração)" apenas navega) |
| `/processos` | Meus processos (lista com busca) |
| `/processos/reclamacao-trabalhista` | Cenário A: trabalhista, pedido negado com pedido de esclarecimento em análise (selecionado após o login) |
| `/processos/beneficio-previdenciario` | Cenário B: previdenciário, sentença parcialmente favorável |
| `/processos/acao-civel` | Cenário C: cível, interpretação insegura (sem síntese) |
| `/processos/[id]/decisao-original` | Documento original fictício |

A rota define o processo selecionado, então cada caso tem um link direto.

## Deploy na Vercel

**Pelo painel:** envie o repositório ao GitHub/GitLab e, em <https://vercel.com/new>, importe o projeto. A Vercel detecta o Next.js sozinha. Não é preciso configurar variáveis de ambiente.

**Pela CLI:**

```bash
npm i -g vercel
vercel            # cria um deploy de pré-visualização
vercel --prod     # publica em produção
```

## Estrutura

```
src/
  app/                         rotas (App Router)
  components/
    app-header.tsx             AppHeader (identidade + controles de fonte/acessibilidade)
    process-sidebar.tsx        ProcessSidebar, ProcessList (busca) e MobileProcessNav (painel recolhível)
    process-metadata.tsx       ProcessMetadata
    process-timeline.tsx       ProcessTimeline (+ destaque "Agora")
    decision-summary.tsx       DecisionSummary (cinza / verde / âmbar)
    explanation-section.tsx    ExplanationSection (accordions abertos por padrão)
    accessibility-controls.tsx AccessibilityControls (SpeechSynthesis + avatar)
    avatar-demo-modal.tsx      Demonstração do avatar (identificada como demonstração)
    feedback-widget.tsx        FeedbackWidget (localStorage)
    human-support-modal.tsx    HumanSupportModal (Balcão Virtual, sem integração)
    ui/                        componentes shadcn/ui
  lib/
    types.ts                   Process, Party, ProcessEvent, Decision, Explanation…
    data/processes.ts          dados demonstrativos (substituíveis por API)
    processes.ts               camada de acesso aos dados
  hooks/                       useLocalStorage, useFontScale
```

Para trocar os dados por uma API, basta reimplementar as funções de `src/lib/processes.ts`, mantendo os tipos de `src/lib/types.ts`.

## Decisões tomadas (itens indefinidos ou conflitantes)

- **Tribunais dos cenários A e B:** a lista de telas e a imagem de referência indicam TRT10 e TRF1, mas a descrição dos cenários fala em TRT6 e TRF5. Seguimos a referência visual obrigatória (TRT10 / TRF1). Para mudar, basta editar `src/lib/data/processes.ts`.
- **Números de processo:** seguem o formato visual CNJ, mas são inventados. Os dígitos verificadores não foram calculados, para não coincidir com processos reais.
- **Cenário cível:** o documento é um acórdão, para mostrar os dois tipos de documento. Por ser inseguro, não traz nenhuma síntese do resultado. A tela orienta a ler o documento original e a procurar atendimento humano.
- **Timeline:** as etapas futuras aparecem tracejadas e indicadas como possibilidades ("podem não acontecer"). No celular, a timeline fica vertical para evitar rolagem horizontal.
- **Áudio:** usa `SpeechSynthesisUtterance` em pt-BR, falando frase por frase. Um único botão alterna entre "Ouvir" e "Parar". Se o navegador não tiver suporte ou nenhuma voz começar em 4 s, aparece uma mensagem.
- **Avatar:** abre um modal marcado "Demonstração · sem vídeo real", com ilustração estática e o texto que seria apresentado.
- **Avaliação:** o voto fica no `localStorage` (`entenda:feedback:<id>`), pode ser alterado ou desfeito e aparece com uma confirmação discreta.
- **Botão de acessibilidade do cabeçalho:** abre atalhos ("Ir para o conteúdo", "Ir para Meus processos") e controles de tamanho do texto. A+ / A / A- também ficam visíveis no desktop.
- **Logotipos:** a identidade é reconstruída com texto e faixas decorativas em SVG. Não usamos logotipos oficiais.
- Sem vermelho para resultados desfavoráveis, sem cálculo de prazos e sem recomendação jurídica.

## Acessibilidade

HTML semântico, link "Pular para o conteúdo", foco visível em toda a interface e `aria-current` no processo e na etapa atuais. Há regiões `aria-live` para busca, áudio e avaliação. Os diálogos são acessíveis via Radix, e animações são reduzidas com `prefers-reduced-motion`. O layout foi verificado em 1440 px e 390 px, sem overflow horizontal.
