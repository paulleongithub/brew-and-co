# Brew & Co — Guia de Estilo

> Referência visual: [`docs/references/1.png`](../references/1.png) — landing page de e-commerce de bebidas, usada como
> referência **estrutural** (hero dividido, disco de cor atrás do produto, cartão escuro de rodapé, chips de
> avaliação flutuantes). A identidade visual abaixo é original da Brew & Co: nenhuma cor, tipografia, logotipo ou
> texto do material de referência é reaproveitado — apenas o raciocínio de layout.

## 1. Personagem da marca

Brew & Co é uma torrefação/cafeteria de bairro com processo artesanal, não uma rede genérica de "coffee-to-go".
A linguagem visual precisa parecer **feita à mão, mas precisa** — como um pacote de café de especialidade: papel
kraft, tinta de torra, um único acento vívido.

**Três palavras que guiam toda decisão:** *quente, precisa, sem pressa.*

| Fazemos | Não fazemos |
|---|---|
| Uma cor de acento usada com intenção (torra) | Paleta arco-íris de categorias |
| Serifada com caráter no display, grotesca neutra no corpo | A mesma sans genérica em tudo |
| Sombras tingidas de espresso | Sombras cinza padrão de UI kit |
| Fotografia de produto real, disco de cor como palco | Ilustração 3D genérica / gradientes roxo-azul |
| Micro-interação com propósito (hover, reveal de torra) | Animação decorativa sem função |

## 2. Cor

A paleta parte do próprio produto: grão verde → torra → crema. Não usamos o verde-esmeralda/laranja de rede de
café conhecida — a Brew & Co usa **terracota queimado (rust)** como acento único e **musgo** como secundário,
ambos extraídos de folha e grão, não de branding corporativo.

| Token | Hex | Papel |
|---|---|---|
| `cream` | `#F3ECE0` | Fundo de página — creme quente, como espuma de leite |
| `crema` | `#FBF6EC` | Superfície elevada — cards, inputs, barra de busca |
| `espresso-950` | `#1A1310` | Texto principal, botões primários, painéis escuros |
| `espresso-800` | `#3A2E27` | Texto secundário |
| `espresso-600` | `#6B584B` | Texto terciário / ícones inativos |
| `espresso-400` | `#9C8879` | Placeholders |
| `espresso-200` | `#D8CBBD` | Bordas, divisores |
| `espresso-100` | `#EDE4D8` | Fills sutis, hover de superfície |
| `rust` (acento 1) | `#D96B3B` | CTA, disco do hero, badges de destaque |
| `rust-600` | `#B85428` | Hover/active do acento primário |
| `moss` (acento 2) | `#4B5E45` | Tags, "orgânico", estados de sucesso |
| `moss-600` | `#37432F` | Hover/active do acento secundário |
| `honey` (acento 3) | `#E8A93C` | Estrelas de avaliação, destaques sobre fundo escuro |
| `danger` | `#C0392B` | Erro, ações destrutivas |

**Regra de uso:** no máximo **uma** cor de acento vívido por composição (rust *ou* moss *ou* honey dominando).
As outras duas aparecem apenas em elementos pequenos (ícone, chip, estrela). Isso evita o efeito "confete" comum
em páginas geradas automaticamente.

### 2.1 Contraste (WCAG 2.1 AA)

| Combinação | Razão | Resultado | Uso permitido |
|---|---|---|---|
| `espresso-950` sobre `cream` | 15.8:1 | ✅ AAA | Texto de qualquer tamanho |
| `moss` sobre `cream` | 6.0:1 | ✅ AA | Texto normal e pequeno |
| `honey` sobre `espresso-950` | 8.9:1 | ✅ AAA | Texto/ícones sobre painel escuro |
| `rust` sobre branco/`crema` | 3.5:1 | ⚠️ Só "large text" (≥ 24px ou 19px bold) e ícones/UI | Não usar para texto pequeno |
| `honey` sobre `cream`/`crema` | 1.9:1 | ❌ Reprovado | Nunca usar honey como texto sobre fundo claro |

`rust` e `honey` são **cores de acento**, não de texto sobre claro. Em botões `rust`, o rótulo é sempre
`espresso-950` ou branco em peso bold/large — nunca texto pequeno em `rust` puro sobre fundo claro.

## 3. Tipografia

Duas famílias, papéis bem separados — sem terceira fonte "decorativa".

| Papel | Família | Fonte | Por quê |
|---|---|---|---|
| Display (headline, nome de produto, preço grande) | **Fraunces** (variável) | `next/font/google` | Serifa old-style com curvas quentes e "ink traps" nos eixos `opsz`/`SOFT`/`WONK` — remete a rótulo de pacote de café impresso, sem virar script decorativo |
| Corpo (parágrafo, nav, botão, formulário) | **Inter** | `next/font/google` | Grotesca neutra, alta legibilidade em UI, contraste deliberado com a serifa do display |
| Dado/mono (preço, avaliação numérica, % de torra) | **Geist Mono** | já configurada em `app/layout.tsx` | Números tabulares — reaproveita a fonte que o projeto já carrega, sem custo extra |

Em telas grandes (hero), ative os eixos variáveis do Fraunces para o desenho de exibição mais expressivo:

```css
.display-hero {
  font-variation-settings: "opsz" 72, "SOFT" 0, "WONK" 1;
}
```

### 3.1 Escala tipográfica

| Token | Tamanho / altura de linha | Peso | Uso |
|---|---|---|---|
| `display-2xl` | 72px / 1.03 | 600 | Headline do hero (desktop) |
| `display-xl` | 48px / 1.08 | 600 | Título de seção |
| `display-lg` | 36px / 1.15 | 600 | Headline do hero (mobile), títulos de card grande |
| `display-md` | 24px / 1.25 | 600 | Nome de produto, título de card |
| `body-lg` | 18px / 1.6 | 400 | Texto de introdução/lede |
| `body-md` | 16px / 1.6 | 400 | Corpo padrão |
| `body-sm` | 14px / 1.55 | 400 | Legendas, texto auxiliar |
| `label` | 13px / 1.2 | 600, +6% tracking, uppercase | Item de navegação, eyebrow de seção |
| `caption` | 12px / 1.4 | 500 | Metadados, timestamps |
| `mono-price` | 18px / 1, tabular-nums | 500 | Preços, `4.6 ★`, `12%` |

Tracking negativo (`-0.01em` a `-0.02em`) só nos tamanhos `display-*`; nunca em `body-*` (prejudica legibilidade
em texto corrido).

## 4. Layout e grade

- Container principal: `max-width: 1280px`, padding lateral fluido `clamp(1.25rem, 4vw, 4rem)`.
- Grade de 12 colunas em desktop (`≥1024px`); hero usa split assimétrico **7/5** (conteúdo/produto), não 50/50 —
  dá ao texto espaço para respirar sem empurrar a foto do produto para fora do campo de visão.
- Espaçamento segue a escala padrão do Tailwind (múltiplos de 4px); seções usam `py-24`/`py-32` em desktop,
  `py-16` em mobile.
- Cards de produto ficam em grade responsiva `1 → 2 → 3` colunas (`mobile → tablet → desktop`).

## 5. Forma e elevação

- **Raio:** `pill` (999px) em botões, busca e badges; `card` (28px) em painéis e cards — nunca cantos retos nem
  `radius: 4px` genérico de admin. A curva generosa é parte da voz "artesanal, sem pressa".
- **Sombra:** sempre tingida de espresso (`rgba(26,19,16, …)`), nunca cinza puro (`rgba(0,0,0, …)`) — reforça a
  paleta quente mesmo em detalhes que o usuário não nota conscientemente.
- **Disco de cor** (`rust` ou `moss`, 90–110% do tamanho da foto): palco atrás de toda fotografia de produto —
  ver assinatura visual na seção 7.

## 6. Iconografia e imagem

- Ícones: traço (`stroke`), peso 1.5–1.75px, cantos levemente arredondados — família neutra tipo Lucide/Phosphor.
  Nunca ícones preenchidos sólidos (competem com o disco de cor atrás da foto).
- Fotografia de produto: fundo removido, luz quente, sombra de contato suave própria — sempre sobre o "disco de
  torra" (seção 7), nunca flutuando livre sobre o fundo cream.
- Avatares (prova social): círculo, borda `crema` de 2px, sobrepostos em `-8px` quando empilhados.

## 7. Assinatura visual: o "Roast Ring" e o "Roast Meter"

O elemento que torna a Brew & Co reconhecível à distância, sem depender de logotipo:

1. **Roast Ring** — um arco tracejado fino (`stroke-dasharray`), 1 a 2px, na cor `espresso-200` ou `rust`,
   contornando parcialmente (270°, não um círculo fechado) o disco de cor atrás da fotografia de produto — evoca
   o traçado de um moedor/timer de torra. É decorativo e sutil; nunca compete com a foto.
2. **Roast Meter** — barra horizontal de 3 segmentos (Clara / Média / Escura) que acompanha *todo* card de
   produto, com rótulo textual sempre visível (não depende só de cor). É o único elemento de "dado" proprietário
   da marca — nenhum outro cafeteria-template usa esse indicador. Especificação completa em
   [`03-components.md`](./03-components.md#roast-meter).

Use os dois com moderação: o Roast Ring aparece só no hero e em destaques de produto; o Roast Meter aparece em
todo card, mas nunca duplicado dentro do mesmo cartão.

## 8. Movimento

- Curva padrão: `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease-brew`) — aceleração rápida, chegada macia, como líquido
  assentando na xícara.
- Hover de botão/card: elevação (`translateY(-2px)` a `-4px`) + sombra `warm-md`, `150–220ms`.
- Entrada do hero: fade + translateY de 12px, stagger de 60–80ms entre headline → descrição → preço → CTA.
- Roast Meter: o preenchimento anima (`scaleX` da esquerda) quando entra no viewport, `420ms`, uma vez só.
- Sempre respeitar `prefers-reduced-motion: reduce` — nesse caso, remova transform/duração e troque por
  `opacity` instantâneo.

## 9. Acessibilidade — checklist

- Contraste mínimo AA em todo texto (ver tabela da seção 2.1); `rust` e `honey` nunca como cor de texto pequeno
  sobre fundo claro.
- Foco visível em todo elemento interativo: anel de 2px `rust` com offset de 2px sobre `cream`/`crema`, e anel
  `honey` sobre fundo `espresso-950` (mantém contraste em ambos os fundos).
- Roast Meter e badges de avaliação sempre com rótulo textual/`aria-label` — cor nunca é o único veículo de
  informação.
- Área de toque mínima de 44×44px em botões e ícones clicáveis, mesmo quando o ícone visual é menor.
- Movimento condicionado a `prefers-reduced-motion`.

## 10. Voz e microcopy

- Verbos no imperativo, do ponto de vista de quem usa: "Adicionar ao pedido", não "Item adicionado com sucesso
  ao carrinho do sistema".
- Nomes de produto em português claro, sem jargão de marketing ("Torrado devagar em pequenos lotes" em vez de
  "Premium Artisan Experience").
- Erros descrevem o que aconteceu e o que fazer, sem tom de desculpa: "Não foi possível confirmar o pedido.
  Verifique o pagamento e tente novamente." — nunca "Ops! Algo deu errado 😢".
- Estados vazios convidam à ação: "Seu carrinho está vazio — explore a torra da semana." em vez de apenas
  "Nenhum item".
