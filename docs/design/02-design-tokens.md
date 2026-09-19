# Brew & Co — Design Tokens

Fonte da verdade dos valores: [`tokens/tokens.json`](./tokens/tokens.json) (formato plano, agnóstico de
plataforma). Projeção para a stack atual: [`tokens/tokens.css`](./tokens/tokens.css).

## Por que este formato

O projeto usa **Tailwind CSS v4 com configuração CSS-first** (`@theme` em `app/globals.css`, sem
`tailwind.config.js` — confirmado em `app/globals.css:1-13`). Os tokens são declarados como variáveis CSS dentro
de um bloco `@theme`, e o Tailwind gera as utilities correspondentes automaticamente:

| Namespace do token | Utilities geradas |
|---|---|
| `--color-*` | `bg-*`, `text-*`, `border-*`, `ring-*`, `fill-*`, `stroke-*` |
| `--font-*` | `font-*` (família) |
| `--radius-*` | `rounded-*` |
| `--shadow-*` | `shadow-*` |
| `--ease-*` / `--duration-*` | `ease-*` / `duration-*` |

Ou seja: `--color-rust: #D96B3B;` dentro de `@theme` passa a existir como `bg-rust`, `text-rust`, `border-rust`
em qualquer componente, sem plugin adicional.

## Como integrar

1. Abra `app/globals.css`.
2. Cole o conteúdo de [`tokens/tokens.css`](./tokens/tokens.css) logo abaixo de `@import "tailwindcss";` (pode
   conviver com os tokens `--color-background` / `--color-foreground` do template inicial, ou substituí-los —
   recomendamos substituir, já que a Brew & Co não usa dark mode automático por `prefers-color-scheme` no MVP).
3. Registre as duas fontes novas em `app/layout.tsx` com `next/font/google` e exponha as variáveis CSS que os
   tokens esperam (`--font-fraunces`, `--font-inter`):

```tsx
// app/layout.tsx
import { Fraunces, Inter, Geist_Mono } from "next/font/google";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
```

   e aplique as três variáveis na tag `<html>`, como já é feito hoje com `geistSans`/`geistMono`.

4. Nenhuma outra mudança é necessária — os componentes de referência em [`components/`](./components) já usam
   apenas classes utilitárias baseadas nesses tokens (`bg-cream`, `text-espresso-950`, `rounded-pill`, etc.).

> Este documento **não** altera `app/layout.tsx`/`app/globals.css`/`app/page.tsx` automaticamente — a página
> inicial atual é o boilerplate do `create-next-app` e a integração é uma decisão do time de produto sobre
> quando substituí-la. Os arquivos em `docs/design/` são a fonte pronta para essa adoção.

## Tabela de referência rápida

### Cor

| Token Tailwind | Hex | Papel |
|---|---|---|
| `cream` | `#F3ECE0` | Fundo de página |
| `crema` | `#FBF6EC` | Superfície elevada |
| `espresso-950` … `espresso-100` | `#1A1310` → `#EDE4D8` | Rampa de texto/borda neutra (tinta quente) |
| `rust` / `rust-600` | `#D96B3B` / `#B85428` | Acento primário / hover |
| `moss` / `moss-600` | `#4B5E45` / `#37432F` | Acento secundário / hover |
| `honey` | `#E8A93C` | Acento terciário (avaliação, destaque em fundo escuro) |
| `danger` | `#C0392B` | Erro |

### Tipografia, raio, sombra, movimento

Ver tabelas completas em [`01-style-guide.md`](./01-style-guide.md#3-tipografia) — os nomes de token
(`display-2xl`, `radius-card`, `shadow-warm-md`, `ease-brew`, …) são os mesmos usados em `tokens.css`/
`tokens.json` e nas especificações de componente.

## Convenção de nomenclatura

- Tokens de **paleta** (`rust`, `moss`, `espresso-950`) descrevem a cor em si — usados na definição visual.
- Tokens **semânticos** (`surface`, `ink`, `accent`, `success`) descrevem a intenção e apontam para um token de
  paleta (ver bloco `@theme` final em `tokens.css`). Prefira os semânticos ao escrever componentes de produto
  (ex.: `bg-surface` em vez de `bg-cream`) — se a marca girar a paleta no futuro, só o mapeamento muda, não cada
  componente.
- Os componentes de referência em `components/` usam os tokens de paleta diretamente por serem *a definição* do
  sistema; código de aplicação (telas, features) deve preferir os semânticos.
