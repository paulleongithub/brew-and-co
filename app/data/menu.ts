export type RoastLevel = "light" | "medium" | "dark";

export interface MenuItem {
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  roastLevel?: RoastLevel;
  /** Featured rating for the homepage "Popular picks" showcase only. */
  rating?: number;
}

export interface MenuCategory {
  slug: string;
  title: string;
  items: MenuItem[];
}

export const menu: MenuCategory[] = [
  {
    slug: "specialty-coffee",
    title: "Specialty Coffee",
    items: [
      {
        slug: "espresso",
        name: "Espresso",
        description: "Double shot, pulled to order.",
        price: 2.6,
        image: "/images/menu/espresso.webp",
        roastLevel: "dark",
      },
      {
        slug: "flat-white",
        name: "Flat White",
        description: "Steamed whole milk over a ristretto base.",
        price: 3.4,
        image: "/images/menu/flat-white.webp",
        roastLevel: "medium",
        rating: 4.9,
      },
      {
        slug: "filter-v60",
        name: "Filter V60",
        description: "Single-origin, changes weekly — ask what's pouring.",
        price: 3.6,
        image: "/images/menu/filter-v60.webp",
        roastLevel: "light",
      },
      {
        slug: "cappuccino",
        name: "Cappuccino",
        description: "Equal parts espresso, steamed milk and foam.",
        price: 3.3,
        image: "/images/menu/cappuccino.webp",
        roastLevel: "medium",
      },
      {
        slug: "oat-latte",
        name: "Oat Latte",
        description: "Espresso, steamed oat milk, latte art on top.",
        price: 3.8,
        image: "/images/menu/oat-latte.webp",
        roastLevel: "medium",
      },
      {
        slug: "cold-brew",
        name: "Cold Brew",
        description: "Steeped for sixteen hours, served over ice.",
        price: 3.9,
        image: "/images/menu/cold-brew.webp",
        roastLevel: "dark",
        rating: 4.8,
      },
    ],
  },
  {
    slug: "fresh-pastries",
    title: "Fresh Pastries",
    items: [
      {
        slug: "butter-croissant",
        name: "Butter Croissant",
        description: "Laminated fresh every morning.",
        price: 3.2,
        image: "/images/menu/butter-croissant.webp",
        rating: 4.8,
      },
      {
        slug: "pain-au-chocolat",
        name: "Pain au Chocolat",
        description: "Two batons of dark chocolate, all butter.",
        price: 3.4,
        image: "/images/menu/pain-au-chocolat.webp",
      },
      {
        slug: "mixed-berry-scone",
        name: "Mixed Berry Scone",
        description: "Clotted cream and jam on the side.",
        price: 3.1,
        image: "/images/menu/mixed-berry-scone.webp",
      },
      {
        slug: "lemon-poppy-seed-cake",
        name: "Lemon & Poppy Seed Cake",
        description: "Sliced to order, glazed.",
        price: 3.5,
        image: "/images/menu/lemon-poppy-seed-cake.webp",
      },
      {
        slug: "chocolate-brownie",
        name: "70% Chocolate Brownie",
        description: "Fudgy centre, sea salt flake.",
        price: 3.3,
        image: "/images/menu/chocolate-brownie.webp",
      },
      {
        slug: "banana-bread",
        name: "Banana Bread",
        description: "Sam's grandmother's recipe.",
        price: 3.2,
        image: "/images/menu/banana-bread.webp",
      },
    ],
  },
  {
    slug: "light-lunches",
    title: "Light Lunches",
    items: [
      {
        slug: "chicken-avocado-sandwich",
        name: "Chicken & Avocado Sandwich",
        description: "Sourdough, lemon yoghurt dressing.",
        price: 6.8,
        image: "/images/menu/chicken-avocado-sandwich.webp",
      },
      {
        slug: "avocado-poached-egg-toast",
        name: "Avocado & Poached Egg Toast",
        description: "Sourdough, chilli oil, feta.",
        price: 7.2,
        image: "/images/menu/avocado-poached-egg-toast.webp",
        rating: 4.7,
      },
      {
        slug: "chickpea-feta-salad",
        name: "Chickpea & Feta Salad",
        description: "Roast peppers, herbs, olive oil.",
        price: 6.5,
        image: "/images/menu/chickpea-feta-salad.webp",
      },
      {
        slug: "soup-of-the-day",
        name: "Soup of the Day",
        description: "Ask at the counter — changes daily.",
        price: 5.9,
        image: "/images/menu/soup-of-the-day.webp",
      },
      {
        slug: "spinach-goats-cheese-quiche",
        name: "Spinach & Goat's Cheese Quiche",
        description: "Served with a side salad.",
        price: 6.6,
        image: "/images/menu/spinach-goats-cheese-quiche.webp",
      },
    ],
  },
];

export function findMenuItem(slug: string): MenuItem | undefined {
  for (const category of menu) {
    const item = category.items.find((entry) => entry.slug === slug);
    if (item) return item;
  }
  return undefined;
}

export function popularItems(): MenuItem[] {
  return menu
    .flatMap((category) => category.items)
    .filter((item): item is MenuItem & { rating: number } => item.rating !== undefined)
    .sort((a, b) => b.rating - a.rating);
}
