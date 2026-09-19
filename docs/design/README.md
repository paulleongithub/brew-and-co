# Brew & Co — Sistema de Design

Sistema de design completo da Brew & Co, derivado da análise do código-base atual (Next.js 16 · React 19 ·
TypeScript · Tailwind CSS v4 com configuração CSS-first) e da referência visual em
[`docs/references/1.png`](../references/1.png). A referência foi usada apenas como **estudo estrutural**
(hero dividido em duas colunas, produto sobre disco de cor, cartão escuro na base, badges flutuantes de prova
social) — toda a identidade visual (cor, tipografia, forma, assinatura) é original da Brew & Co, sem reuso de
marca, logotipo ou paleta de terceiros.

## Como navegar

| Documento | Conteúdo |
|---|---|
| [`01-style-guide.md`](./01-style-guide.md) | Personagem de marca, paleta e contraste, tipografia, grade, forma/elevação, assinatura visual, movimento, acessibilidade, voz |
| [`02-design-tokens.md`](./02-design-tokens.md) | Como os tokens se conectam à stack (Tailwind v4 `@theme`), passo a passo de integração |
| [`03-components.md`](./03-components.md) | Especificação de cada componente: anatomia, variantes, estados, responsividade, acessibilidade |
| [`tokens/tokens.css`](./tokens/tokens.css) | Tokens prontos para colar em `app/globals.css` |
| [`tokens/tokens.json`](./tokens/tokens.json) | Mesmos valores em formato plano, agnóstico de plataforma (fonte da verdade) |
| [`components/`](./components) | Implementações de referência em TSX (React 19 + Tailwind v4), type-checadas e lintadas com a config do projeto |

## Fundamentos em uma página

- **Cor:** `cream`/`crema` (fundo e superfície) + rampa neutra `espresso` (texto) + um único acento vívido por
  composição — `rust` (primário), `moss` (secundário) ou `honey` (avaliação/destaque em fundo escuro).
- **Tipografia:** Fraunces (display, com caráter) + Inter (corpo/UI) + Geist Mono (dados/preço — já presente no
  projeto).
- **Forma:** pílula em botões/busca/badges, `28px` em cards/painéis — nunca cantos retos.
- **Assinatura:** *Roast Meter*, indicador proprietário de intensidade de torra presente em todo card de
  produto (ver [guia de estilo §7](./01-style-guide.md#7-assinatura-visual-o-roast-ring-e-o-roast-meter)) —
  implementado em [`components/RoastMeter.tsx`](./components/RoastMeter.tsx).

## Status de integração

Os arquivos deste diretório são autocontidos e **não alteram** `app/layout.tsx`, `app/globals.css` ou
`app/page.tsx` — o app ainda está no boilerplate do `create-next-app`. Quando o time decidir construir a home
real, o caminho é:

1. Colar `tokens/tokens.css` em `app/globals.css` (ver passo a passo em
   [`02-design-tokens.md`](./02-design-tokens.md#como-integrar)).
2. Registrar as fontes Fraunces/Inter em `app/layout.tsx` via `next/font/google`.
3. Copiar os componentes necessários de `components/` para `app/components/` (ou outro diretório de UI que o
   projeto adotar) e montar as telas com eles.

## Verificação

Os componentes de referência foram validados contra a configuração real do projeto:

```
npx tsc --noEmit                          # 0 erros
npx eslint docs/design/components         # 0 erros, 0 avisos
```
