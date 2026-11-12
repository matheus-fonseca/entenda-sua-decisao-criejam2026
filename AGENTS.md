<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Projeto

"Entenda a Decisão" é um protótipo web ilustrativo, feito para uma oficina de inovação do Judiciário. Ele explica sentenças e acórdãos em linguagem simples para leigos. **Todos os dados são fictícios**: não há backend, autenticação real nem integração com Gov.br, DataJud, Jus.br ou Balcão Virtual. O README.md descreve rotas, cenários e decisões de produto; consulte-o antes de mudar comportamento.

Stack: Next.js 16 (App Router, React 19, Turbopack), TypeScript estrito, Tailwind CSS 4, shadcn/ui (`radix-nova`) com Radix e ícones `lucide-react`. Deploy na Vercel, sem variáveis de ambiente.

## Comandos

```bash
npm run dev      # http://localhost:3000
npm run lint     # ESLint (core-web-vitals + typescript)
npm run build    # também faz a checagem de tipos
```

Não há testes automatizados. Antes de concluir uma mudança, rode `npm run lint` e `npm run build`. Para mudanças de UI, confira a tela no navegador em ~1440 px e ~390 px (sem rolagem horizontal).

## Next.js neste projeto

- `next.config.ts` ativa `cacheComponents` e `partialPrefetching`. Leia os guias em `node_modules/next/dist/docs/01-app/02-guides/` (ex.: `migrating-to-cache-components.md`, `adopting-partial-prefetching.md`) antes de mexer em cache, dados dinâmicos ou prefetch. Não use as APIs antigas (`unstable_cache`, `export const dynamic`, `revalidate` etc.) sem conferir a documentação.
- `params` é uma `Promise`: use `await params`. Tipe páginas e layouts com os helpers globais `PageProps<"/rota">` e `LayoutProps<"/rota">`, sem declarar interfaces à mão.
- As páginas de processo são pré-renderizadas com `generateStaticParams` (`getProcessIds`, `getDecisionParams`) e usam `notFound()` para ids inexistentes.
- O Tailwind é carregado pela regra de `turbopack.rules` em `next.config.ts`. Não remova essa regra.
- A pasta `src/app/processos/[id]/decisoes/[decisaoId]/` serve as decisões anteriores. A decisão mais recente usa a URL do processo (`/processos/[id]`). Use `decisionHref()` e `originalDocumentHref()` em vez de montar URLs à mão.

## Arquitetura

- **Dados:** `src/lib/data/processes.ts` guarda os cenários fictícios. `src/lib/types.ts` define o modelo. `src/lib/processes.ts` é a **única** camada de acesso aos dados. Páginas e componentes não importam `data/processes.ts` diretamente.
- **Server Components por padrão.** Só são `"use client"` os componentes com estado, efeitos ou APIs do navegador: sidebar com busca, modais, controles de acessibilidade, avaliação e os hooks. Ao passar dados para um client component, envie só o necessário (como `getProcessListItems()`, que devolve um resumo enxuto).
- `ProcessDecisionView` é a tela de explicação, usada pelas duas rotas de decisão.
- O estado do navegador fica no `localStorage` por `useLocalStorage` (`useSyncExternalStore`, com fallback em memória). As chaves usam o prefixo `entenda:` (`entenda:font-scale`, `entenda:feedback:<processo>-<decisão>`).
- `src/components/ui/` é gerado pelo shadcn (`components.json`). Adicione componentes com `npx shadcn@latest add <nome>`. Edite os arquivos gerados só quando necessário.
- Alias `@/*` aponta para `src/*`. Importe `cn` de `@/lib/utils`.

## Regras de conteúdo e produto

Estas regras fazem parte do propósito do protótipo. Não as quebre ao editar textos ou dados:

- **Linguagem simples**, em pt-BR, com frases curtas. Cada ato da timeline traz o nome em linguagem cidadã e, como dica, o nome técnico.
- **Sem recomendação jurídica**, sem cálculo de prazos e sem promessa de resultado. A explicação sempre avisa que não substitui a decisão original.
- **Sem vermelho** para resultados desfavoráveis. Os resultados usam cartões cinza (`negado`), verde (`parcial`) e âmbar (`inseguro`).
- Quando `Decision.explanation` é `null` (interpretação insegura), **nenhuma síntese do resultado** é exibida. A tela orienta a ler o original e a buscar atendimento humano.
- Decisões anteriores mostram o aviso de decisão mais recente, e a segunda seção se chama "O que aconteceu depois?".
- Todo dado novo é inventado e deve ficar identificado como demonstração (use o `PrototypeBadge`). Não use logotipos oficiais, nem nomes ou números de processos reais. Os fundamentos jurídicos citados nos documentos originais, porém, devem ser reais.
- Ao alterar um cenário, atualize a tabela de cenários do README.md.

## Acessibilidade

É requisito central do produto, não um extra:

- HTML semântico, `aria-current` na etapa e no processo atuais, regiões `aria-live` para busca, áudio e avaliação, e foco visível em tudo que for interativo.
- O link "Pular para o conteúdo" aponta para `#conteudo`. Cada página precisa ter um `<main id="conteudo">`.
- Respeite `prefers-reduced-motion`.
- O tamanho do texto é controlado pelo `font-size` da raiz (`useFontScale`). Use `rem` e utilitários do Tailwind, evitando `px` fixo em texto, para que A+ / A / A- funcionem.
- Não crie interação que dependa só da cor ou só do mouse (a dica do nome técnico, por exemplo, também precisa funcionar com teclado e em telas de toque).

## Estilo de código

- Use os tokens de cor do tema em `src/app/globals.css` (`brand`, `navy`, `success`, `warn`, `neutral-soft`, `surface`…). Não escreva hex solto nos componentes.
- Fontes: `font-sans` (Noto Sans) para texto e `font-heading` (Barlow Semi Condensed) para títulos.
- Comentários e textos de interface em português. Identificadores de domínio, como `decisionHref` e `ProcessEvent`, seguem o padrão já existente (código em inglês; ids de URL e conteúdo em português).
- Siga o estilo dos arquivos vizinhos: componentes nomeados e exportados, comentário curto (`/** … */`) só onde o motivo não é óbvio, e sem abstrações novas sem necessidade.
- Commits seguem o padrão do histórico: Conventional Commits em português (`feat:`, `fix:`, `refactor:`, `chore:`), com verbo na 3ª pessoa (ex.: `feat: mostra nomes técnicos da timeline…`).
