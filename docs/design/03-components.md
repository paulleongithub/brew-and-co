# Brew & Co — Especificação de Componentes

Implementações de referência (TypeScript + React 19 + Tailwind v4) em [`components/`](./components). São
componentes de apresentação puros — sem chamadas de rede, sem estado de aplicação — prontos para copiar para
`app/components/` quando o time começar a construir as telas reais.

Inventário:

1. [Button](#button)
2. [IconBubble](#iconbubble)
3. [RatingBadge](#ratingbadge)
4. [PriceTag](#pricetag)
5. [RoastMeter](#roastmeter)
6. [SectionEyebrow](#sectioneyebrow)
7. [FeatureListItem](#featurelistitem)
8. [AvatarStack](#avatarstack)
9. [ProductCard](#productcard)
10. [Navbar](#navbar)
11. [CTAPanel](#ctapanel)

---

## Button

**Arquivo:** [`components/Button.tsx`](./components/Button.tsx)

Ação principal da interface. Sempre pílula (`rounded-pill`), nunca cantos retos.

**Variantes**

| Variante | Fundo | Texto | Uso |
|---|---|---|---|
| `primary` | `espresso-950` | `crema` | Uma por seção — "Comprar", "Confirmar pedido" |
| `accent` | `rust` | `espresso-950` (bold) | CTA que precisa competir visualmente com o hero (ex.: banner de campanha) |
| `outline` | transparente, borda `espresso-200` | `espresso-950` | Ação secundária ("Ver cardápio") |
| `ghost` | transparente | `espresso-800`, sublinhado no hover | Ação terciária / link inline |

**Anatomia:** rótulo (`body-md`, 500) + `IconBubble` opcional à direita (chip circular menor, cor `rust` em
`primary`, `espresso-950` em `accent`) — reflete o botão "Buy Now" com chip de seta da referência, mas com o
selo de cor da Brew & Co.

**Estados:** `default` → `hover` (eleva 2px + `shadow-warm-md`, chip gira 12°) → `active` (retorna a 0, escurece
fundo um passo: `rust`→`rust-600`, `espresso-950` mantém) → `focus-visible` (anel 2px `rust`, offset 2px) →
`disabled` (opacidade 45%, sem hover, `cursor-not-allowed`).

**Tamanhos:** `sm` (36px altura, `body-sm`), `md` (48px, `body-md` — padrão), `lg` (56px, `body-lg`).

**Acessibilidade:** área de toque mínima 44px mesmo em `sm` (padding compensa); nunca só ícone sem
`aria-label`; ordem de leitura é rótulo → ícone.

---

## IconBubble

**Arquivo:** [`components/IconBubble.tsx`](./components/IconBubble.tsx)

Container circular para ícone — usado sozinho (lista de features) ou dentro de `Button`.

**Variantes de fundo:** `cream` (padrão, sobre fundo escuro/foto), `crema` (sobre fundo `cream`), `rust`,
`espresso-950`. Ícone herda contraste automático (`espresso-950` sobre fundos claros, `crema`/`honey` sobre
`espresso-950`).

**Tamanhos:** `sm` 32px, `md` 44px (padrão), `lg` 56px. Traço do ícone sempre 1.5–1.75px (ver guia de estilo §6).

---

## RatingBadge

**Arquivo:** [`components/RatingBadge.tsx`](./components/RatingBadge.tsx)

Chip flutuante branco (`crema`) com estrela `honey` preenchida + nota em `mono-price`. Usado sobre fotografia de
produto (canto do disco de cor) e dentro de `ProductCard`.

**Anatomia:** `crema` pill, `shadow-warm-sm`, ícone de estrela 14px cor `honey` com contorno `espresso-950`
1px (garante contraste mesmo sobre fundos claros — ver §2.1 do guia: honey sozinho falha AA sobre claro), nota
numérica `mono-price` cor `espresso-950`.

**Acessibilidade:** `aria-label="Avaliação: 4.6 de 5 estrelas"` no container — o glifo de estrela é
`aria-hidden`.

---

## PriceTag

**Arquivo:** [`components/PriceTag.tsx`](./components/PriceTag.tsx)

Preço em destaque (`mono-price` ou `display-md` conforme contexto), símbolo de moeda separado do valor por
espaço fino, cor `espresso-950`. Variante `compact` (dentro de card) usa `mono-price`; variante `hero` usa
`display-md` em Fraunces para o preço "herói" da página de produto.

---

## RoastMeter

**Arquivo:** [`components/RoastMeter.tsx`](./components/RoastMeter.tsx) · assinatura visual da marca — ver
[guia de estilo §7](./01-style-guide.md#7-assinatura-visual-o-roast-ring-e-o-roast-meter).

**Anatomia:** trilho horizontal `rounded-pill`, altura 6px, fundo `espresso-100`, dividido em 3 segmentos
(Clara / Média / Escura). O preenchimento vai de `honey` (clara) → `rust` (média) → `espresso-800` (escura),
acompanhado **sempre** de um rótulo textual (`caption`, `espresso-600`) — nunca só cor.

```
Torra ●───────○───────○  Clara
Torra ●───────●───────○  Média
Torra ●───────●───────●  Escura
```

**Props:** `level: "light" | "medium" | "dark"`, `label?: string` (padrão: gerado a partir do `level`).

**Estados:** entra no viewport → preenchimento anima de 0 a N segmentos via `scaleX` a partir da esquerda,
`420ms`, `ease-brew`, uma única vez (`IntersectionObserver`, respeita `prefers-reduced-motion`).

**Acessibilidade:** `role="img"` com `aria-label="Torra: Média"` no container; segmentos individuais são
puramente visuais (`aria-hidden`).

---

## SectionEyebrow

**Arquivo:** [`components/SectionEyebrow.tsx`](./components/SectionEyebrow.tsx)

Rótulo pequeno acima de um título de seção (`label` token: 13px, 600, uppercase, +6% tracking), cor `rust` ou
`moss`, com um traço horizontal curto de 16px à esquerda na mesma cor. Usar com moderação — não repetir a
numeração (`01 / 02 / 03`) a menos que o conteúdo seja de fato uma sequência ordenada (ver guia de princípios).

---

## FeatureListItem

**Arquivo:** [`components/FeatureListItem.tsx`](./components/FeatureListItem.tsx)

Linha `IconBubble` + título (`body-md`, 600) + descrição (`body-sm`, `espresso-600`) — equivalente funcional às
linhas "Sippy cups / Donut / Cookies" da referência, com iconografia e paleta próprias da Brew & Co.

**Layout:** `flex` horizontal, `gap-4`, `IconBubble` tamanho `md`; empilha em coluna única em qualquer largura
(não depende de grid).

---

## AvatarStack

**Arquivo:** [`components/AvatarStack.tsx`](./components/AvatarStack.tsx)

Prova social: avatares circulares sobrepostos (`-space-x-2`), borda `crema` 2px, mais um chip circular `rust`
com ícone (ex. coração) à esquerda do grupo — equivalente ao badge flutuante da referência.

**Props:** `avatars: { src: string; alt: string }[]`, `max?: number` (padrão 3 — excedente vira chip
`+N` em `espresso-100`).

**Acessibilidade:** cada avatar mantém `alt` individual; o grupo tem `aria-label="Pedido por N clientes"` quando
usado como prova social agregada.

---

## ProductCard

**Arquivo:** [`components/ProductCard.tsx`](./components/ProductCard.tsx)

Composição principal de listagem — equivalente aos três cards (Caramel Ribbon / Strawberry Funnel / Caramel
Frappuccino) da referência, remontado com os tokens da Brew & Co.

**Anatomia (topo → base):**
1. Foto do produto sobre disco de cor (`rust` ou `moss`, alternando por posição — nunca duas cores vívidas
   adjacentes na mesma grade), com `RatingBadge` sobreposto no canto inferior direito do disco.
2. Nome do produto (`display-md`, Fraunces).
3. `RoastMeter` (nível vem dos dados do produto).
4. Rodapé: `PriceTag` (`compact`) à esquerda, botão `ghost` "Adicionar ao pedido +" à direita.

**Estados:** `hover` eleva o card inteiro 4px + `shadow-warm-md`; a foto ganha leve `scale(1.03)` (contida por
`overflow-hidden` no disco, para não vazar do card).

**Responsivo:** grade `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, `gap-6`.

**Acessibilidade:** card inteiro não é um único link gigante (evita "link ambíguo" para leitor de tela) — o nome
do produto é o link real; o botão "Adicionar ao pedido" é uma ação separada e explícita.

---

## Navbar

**Arquivo:** [`components/Navbar.tsx`](./components/Navbar.tsx)

Fundo `cream` (mesmo do body — sem "cartão" de navbar), logotipo à esquerda, links (`label` token) ao centro,
busca (`crema`, `rounded-pill`, ícone à esquerda) + ícone de carrinho com badge `rust` de contagem à direita.

**Responsivo:** abaixo de `lg`, links colapsam em menu (não especificado aqui — fora do escopo deste MVP de
componentes; ver nota em `Navbar.tsx`).

**Acessibilidade:** link ativo marcado com `aria-current="page"` e sublinhado `rust` de 2px (não depende só de
cor); campo de busca tem `<label>` associado visualmente oculto (`sr-only`), não apenas `placeholder`.

---

## CTAPanel

**Arquivo:** [`components/CTAPanel.tsx`](./components/CTAPanel.tsx)

Painel escuro (`espresso-950`) de largura total, `rounded-card` só no topo (ele "ancora" a base da viewport,
como o cartão preto da referência) — usado para destacar uma segunda vitrine de produtos ou uma chamada final de
conversão. Título em `crema`, descrição em `espresso-200`, `Button` variante `accent` (`rust`) para máximo
contraste sobre o fundo escuro.
