# Entenda a Decisão — protótipo ilustrativo

Protótipo web navegável, criado para uma oficina de inovação do Poder Judiciário. Ele explica sentenças e acórdãos em linguagem simples para quem não conhece termos jurídicos. A integração com Jus.br / Minha Justiça / CNJ é apenas conceitual.

> **Todos os dados são fictícios.** Não há autenticação real nem backend. Também não há integração com Gov.br, DataJud, Codex ou Balcão Virtual. A única chamada externa é o widget VLibras (tradução para Libras), carregado de `vlibras.gov.br`.

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
| `/processos` | Meus processos (lista com busca), primeira tela após o login |
| `/processos/[id]` | Processo aberto na explicação da **decisão mais recente** |
| `/processos/[id]/decisoes/[decisaoId]` | Explicação de uma decisão específica (ex.: `sentenca`, `acordao`) |
| `/processos/[id]/decisoes/[decisaoId]/original` | Documento original fictício daquela decisão |

A rota define o processo e a decisão selecionados, então cada caso tem um link direto.

## Cenários

A ordem segue o roteiro da demonstração: do caso mais simples ao mais complexo, e cada exemplo mostra uma capacidade do produto.

| # | Processo (título na lista) | Decisões | Situação atual | O que mostra |
| --- | --- | --- | --- | --- |
| 1 | `rescisao-trabalhista` (TRT2) — Rescisão do contrato | Sentença: verbas rescisórias aceitas, dano moral negado (verde) | Sentença publicada, ainda cabe recurso | Entender uma decisão: resultado, motivo, próximo passo, ouvir/Libras |
| 2 | `reclamacao-trabalhista` (TRT6) — Horas extras | Sentença: horas extras negadas (cinza). Acórdão: recurso aceito em parte (verde) | Acórdão publicado | O resultado mudou: navegar entre as duas decisões |
| 3 | `beneficio-previdenciario` (TRF1) — Benefício do INSS | Sentença parcialmente favorável (verde) | Pedido de esclarecimento (embargos de declaração) em análise | Etapa intermediária: o resultado ainda pode mudar |
| 4 | `acao-civel` (TJPE) — Atraso na entrega do imóvel | Sentença aceita em parte (verde). Acórdão com interpretação insegura (âmbar, sem síntese) | Acórdão publicado, sem explicação segura | Saber quando não explicar e encaminhar ao atendimento |

Os textos seguem um limite para caber na demo: manchete curta, no máximo 3 frases por seção e o aviso "pode mudar" sempre que o resultado não for definitivo.

Os documentos originais fictícios citam fundamentos jurídicos reais para dar verossimilhança. Os principais são:

- **Trabalhista:** arts. 74, § 2º, 464, 477, §§ 6º e 8º, 790, 791-A, 818, 852-I e 895 da CLT, art. 18, § 1º, da Lei 8.036/90, Súmulas 126 e 338 do TST e ADI 5766.
- **Previdenciário:** arts. 25, 42, 59 e 60 da Lei 8.213/91, arts. 85, 496 e 1.022 a 1.026 do CPC, Súmula 111 do STJ e STF RE 631.240.
- **Cível:** CDC, art. 43-A da Lei 4.591/64, arts. 402 e 405 do CC, arts. 85, 86 e 334 do CPC e Súmula 43 do STJ.

## Splash após o login

Ao clicar em "Entrar com gov.br", `/processos` mostra um splash de 10 s simulando a IA processando os processos (progresso, etapas e um item por processo). Ele aparece em todo login; recarregar a página sem passar pelo login abre direto. A marca fica em `entenda:login-pendente` (`localStorage`) e é apagada ao fim do splash.

## Avisos por WhatsApp e e-mail

Demonstração: nenhuma mensagem é enviada. As preferências ficam no `localStorage` (`entenda:notificacoes`). WhatsApp e e-mail começam habilitados.

- Na lista de processos, o cartão "Avisos de novidades" tem o interruptor **Todos os processos** (vale para os atuais e para os novos) e, dentro dele, WhatsApp e e-mail.
- Na tela de cada processo, o botão **Avisos** ajusta só aquele processo. Com "Todos os processos" ligado, os interruptores aparecem desabilitados e seguem o ajuste geral; desligando o geral, cada processo volta a ter o seu.

## Navegação pelas decisões

- Na timeline, os atos decisórios (sentenças e acórdãos) são links. Cada um abre a explicação daquela decisão, e a decisão aberta fica destacada ("Explicação aberta").
- Quem abre uma decisão anterior vê o aviso "Existe uma decisão mais recente neste processo", com o botão "Ver decisão mais recente". O cartão de resultado mostra o selo "Decisão anterior" ou "Decisão mais recente".
- Numa decisão anterior, a segunda seção passa a se chamar "O que aconteceu depois?".
- Todos os eventos da timeline mostram o nome técnico do ato logo abaixo do nome em linguagem simples (ex.: "Empresa respondeu", *Contestação*).

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
    app-header.tsx             AppHeader (identidade + botão Libras + controles de fonte/acessibilidade)
    process-sidebar.tsx        ProcessSidebar, ProcessList (busca) e MobileProcessNav (painel recolhível)
    process-metadata.tsx       ProcessMetadata
    process-decision-view.tsx  Tela de explicação de uma decisão (usada pelas duas rotas)
    process-timeline.tsx       ProcessTimeline (decisões clicáveis)
    newer-decision-notice.tsx  Aviso de decisão mais recente
    decision-summary.tsx       DecisionSummary (cinza / verde / âmbar)
    explanation-section.tsx    ExplanationSection (accordions abertos por padrão)
    accessibility-controls.tsx AccessibilityControls (SpeechSynthesis + botão Ver em Libras)
    libras-button.tsx          LibrasButton (aciona o botão flutuante do VLibras)
    libras-icon.tsx            LibrasIcon (ícone de língua de sinais)
    vlibras-widget.tsx         VLibrasWidget (carrega e inicia o VLibras, montado no layout raiz)
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

- **Tribunais dos cenários A e B:** a lista de telas e a imagem de referência indicam TRT6 e TRF1, mas a descrição dos cenários fala em TRT6 e TRF5. Seguimos a referência visual obrigatória (TRT6 / TRF1). Para mudar, basta editar `src/lib/data/processes.ts`.
- **Números de processo:** seguem o formato visual CNJ, mas são inventados. Os dígitos verificadores não foram calculados, para não coincidir com processos reais.
- **Cenário trabalhista:** é o foco principal da demonstração. Tem sentença e acórdão, para mostrar o resultado mudando entre as instâncias.
- **Cenário previdenciário:** traz os embargos de declaração ("Pedido de esclarecimento") em análise depois da sentença. A explicação avisa que o resultado ainda pode mudar e não promete pagamento imediato.
- **Cenário cível:** é o caso em que a IA ficou ambígua. O acórdão é inseguro e não traz nenhuma síntese do resultado. A tela orienta a ler o documento original e a procurar atendimento humano.
- **Timeline:** as etapas futuras aparecem tracejadas e indicadas como possibilidades ("podem não acontecer"). A timeline fica horizontal a partir de 1280 px. Abaixo disso, fica vertical para não apertar até 7 etapas nem causar rolagem horizontal.
- **Áudio:** usa `SpeechSynthesisUtterance` em pt-BR, falando frase por frase. Um único botão alterna entre "Ouvir" e "Parar". Se o navegador não tiver suporte ou nenhuma voz começar em 4 s, aparece uma mensagem.
- **Libras:** usa o widget oficial VLibras (Governo Federal), que traduz o texto da página para Libras com um avatar 3D. É a única dependência externa do protótipo: o script vem de `vlibras.gov.br` e o texto da página é enviado ao serviço para tradução (sem problema aqui, porque os dados são fictícios). O widget é montado no layout raiz, então aparece em todas as telas. Os botões "Ver em Libras" (tela de explicação) e "Libras" (cabeçalho) acionam o botão flutuante do VLibras. Quando o widget abre, nenhum texto fica na tela. Se ele não carregar, aparece um aviso que indica o Balcão Virtual para pedir intérprete. A tradução é automática, pode errar termos jurídicos e não substitui a decisão original nem um intérprete.
- **Avaliação:** o voto fica no `localStorage` por decisão (`entenda:feedback:<processo>-<decisão>`), pode ser alterado ou desfeito e aparece com uma confirmação discreta.
- **Cabeçalho:** o botão "Libras" fica ao lado dos controles e mostra só o ícone em telas pequenas.
- **Botão de acessibilidade do cabeçalho:** abre atalhos ("Ir para o conteúdo", "Ir para Meus processos") e controles de tamanho do texto. A+ / A / A- também ficam visíveis no desktop.
- **Logotipos:** a identidade é reconstruída com texto e faixas decorativas em SVG.
- Sem vermelho para resultados desfavoráveis, sem cálculo de prazos e sem recomendação jurídica.

## Acessibilidade

HTML semântico, link "Pular para o conteúdo", foco visível em toda a interface e `aria-current` no processo e na etapa atuais. Há regiões `aria-live` para busca, áudio, Libras e avaliação. O recurso de Libras (VLibras) está disponível em todas as telas, além da leitura em voz alta, do ajuste de tamanho do texto e do atendimento humano. Os diálogos são acessíveis via Radix, e animações são reduzidas com `prefers-reduced-motion`. O layout foi verificado em 1440 px e 390 px, sem overflow horizontal.