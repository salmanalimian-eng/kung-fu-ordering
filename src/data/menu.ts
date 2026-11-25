import type { MenuItem } from '../types'

const kf = (
  category: string,
  name: string,
  sizes: { label: string; price: number }[],
  opts?: Partial<MenuItem>,
): MenuItem => ({
  id: `kf-${category.toLowerCase().replace(/\s+/g, '-')}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  brand: 'kungfu',
  category,
  name,
  sizes,
  available: true,
  ...opts,
})

const cc = (
  category: string,
  name: string,
  sizes: { label: string; price: number }[],
  opts?: Partial<MenuItem>,
): MenuItem => ({
  id: `cc-${category.toLowerCase().replace(/\s+/g, '-')}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  brand: 'canadian',
  category,
  name,
  sizes,
  available: true,
  ...opts,
})

const fixed = (price: number) => [{ label: 'Regular', price }]
const sml = (s: number, m: number, l: number) => [
  { label: 'Small', price: s },
  { label: 'Medium', price: m },
  { label: 'Large', price: l },
]
const smlOpt = (s: number | null, m: number, l: number) =>
  [
    s != null ? { label: 'Small', price: s } : null,
    { label: 'Medium', price: m },
    { label: 'Large', price: l },
  ].filter(Boolean) as { label: string; price: number }[]
const sf = (single: number, family: number) => [
  { label: 'Single', price: single },
  { label: 'Family', price: family },
]
const ml = (m: number, l: number) => [
  { label: 'Medium', price: m },
  { label: 'Large', price: l },
]
const pcs = (five: number, ten: number) => [
  { label: '5 Pc', price: five },
  { label: '10 Pc', price: ten },
]

export const MENU: MenuItem[] = [
  // —— Kung Fu: Chinese Deals ——
  kf('Chinese Deals', 'Deal A', fixed(1200), {
    description: '1 Standard Gravy with Rice + 1 Reg. Coke + 1 Drumstick',
    isDeal: true,
  }),
  kf('Chinese Deals', 'Deal B', fixed(1400), {
    description: '1 Signature Gravy with Rice + 1 Reg. Coke + 1 Drumstick',
    isDeal: true,
  }),
  kf('Chinese Deals', 'Deal C', fixed(700), {
    description: 'Any Soup + 2 Drumsticks',
    isDeal: true,
  }),
  kf('Chinese Deals', 'Deal D', fixed(850), {
    description: 'Sandwich (Tikka / Fajita) + Soup (Hot & Sour / Sweet Corn)',
    isDeal: true,
  }),
  kf('Chinese Deals', 'Deal E', fixed(3600), {
    description: '1 Family Gravy of your choice + 4 Pc Drumsticks + 6 Pc Honey Wings + 1 Coke 1.5 Ltr',
    isDeal: true,
  }),

  // —— Rice ——
  kf('Rice', 'Vegetable Rice', fixed(700)),
  kf('Rice', 'Egg Fried Rice', fixed(750)),
  kf('Rice', 'Chicken Fried Rice', fixed(800)),
  kf('Rice', 'Chicken Masala Rice', fixed(850)),
  kf('Rice', 'Special Rice', fixed(900)),

  // —— Chow Mein ——
  kf('Chow Mein', 'Vegetable Chow Mein', fixed(900)),
  kf('Chow Mein', 'Chicken Chow Mein', fixed(1000)),
  kf('Chow Mein', 'Thai Chow Mein', fixed(1100)),

  // —— Appetizers ——
  kf('Appetizers', 'Drumsticks (4 Pcs)', fixed(700)),
  kf('Appetizers', 'Honey Wings (6 Pcs)', fixed(800)),
  kf('Appetizers', 'Finger Fish (6 Pcs)', fixed(1200)),
  kf('Appetizers', 'Drumsticks (8 Pcs)', fixed(1200)),

  // —— Pasta ——
  kf('Pasta', 'Cheese Fettuccine Alfredo', fixed(1000)),
  kf('Pasta', 'Baked Crispy Fillet Pasta', fixed(1000)),
  kf('Pasta', 'Baked Red Sauce Pasta', fixed(1000)),
  kf('Pasta', 'Baked Mac and Cheese', fixed(1000)),
  kf('Pasta', 'Baked Creamy Pasta', fixed(1000)),

  // —— Standard Gravies ——
  ...[
    'Chicken Manchurian',
    'Black Pepper Chicken',
    'Chicken Shashlik',
    'Schezwan Chicken',
    'Garlic Chicken',
    'Hot & Spicy Chicken',
  ].map((name) =>
    kf('Standard Gravies', name, sf(1100, 2000), {
      description: 'Served with rice',
    }),
  ),

  // —— Signature Gravies ——
  kf('Signature Gravies', 'Special Cashew Chicken', sf(1300, 2500), {
    description: 'Served with rice',
  }),
  kf('Signature Gravies', 'Almond Chicken', sf(1200, 2300), {
    description: 'Served with rice',
  }),
  kf('Signature Gravies', 'Kung Pao Chicken', sf(1200, 2300), {
    description: 'Served with rice',
  }),
  kf('Signature Gravies', 'Green Chilli Chicken', sf(1200, 2300), {
    description: 'Served with rice',
  }),
  kf('Signature Gravies', 'Chicken Chilli Dry', sf(1250, 2400), {
    description: 'Served with rice',
  }),
  kf('Signature Gravies', 'Dragon Chicken', sf(1250, 2400), {
    description: 'Served with rice',
  }),
  kf('Signature Gravies', 'Grill Fish with Garlic Rice', [
    { label: 'Single', price: 1350 },
  ]),

  // —— Soups ——
  kf('Soups', 'Fish Crackers', sf(300, 600)),
  kf('Soups', 'Hot & Sour Soup', sf(400, 1250)),
  kf('Soups', 'Chicken Corn Soup', sf(400, 1250)),
  kf('Soups', 'Schezwan Soup', sf(500, 1400)),
  kf('Soups', 'Kung Fu Special Soup', sf(500, 1400)),

  // —— Canadian: Signature Pizzas ——
  ...[
    'CC Special (Lasagna Pizza)',
    'Creamy Mughlai',
    'Creamy Peri Peri',
    'Supreme',
    'Malai Boti',
    'Beef Pepperoni',
    'Black Pepper',
    'Chapli Kabab',
  ].map((name) => cc('Signature Pizzas', name, sml(700, 1100, 1750))),
  cc('Signature Pizzas', 'Lava Pizza', sml(800, 1200, 1900)),
  cc('Signature Pizzas', 'Crown Crust', smlOpt(null, 1100, 1750)),
  cc('Signature Pizzas', 'Kabab Crust', smlOpt(null, 1300, 2000)),
  cc('Signature Pizzas', 'Cream / Cheese Crust', smlOpt(null, 1300, 2000)),

  // —— Standard Pizzas ——
  ...[
    'Chicken Tikka',
    'Fajita',
    'Peri Peri',
    'Smoked Chicken',
    'Chicken Pepperoni',
    'Chicken BBQ',
    'Hot & Spicy',
    'Margherita',
  ].map((name) => cc('Standard Pizzas', name, sml(600, 1000, 1600))),

  // —— Calzone ——
  ...['Malai Calzone', 'Italian Calzone', 'Smoked Calzone'].map((name) =>
    cc('Calzone Pizza', name, sml(700, 1100, 1750)),
  ),
  cc('Calzone Pizza', 'Beef Calzone', sml(1000, 1500, 2200)),

  // —— Extra topping ——
  cc('Extra Topping', 'Extra Chicken / Cheese', sml(100, 150, 200)),

  // —— Burgers ——
  ...['Crispy Patty', 'Chapli', 'Tikka'].map((name) =>
    cc('Burgers', name, fixed(300)),
  ),
  cc('Burgers', 'Jumbo Patty', fixed(380)),
  cc('Burgers', 'Thunder Fillet', fixed(450)),
  cc('Burgers', 'Zinger', fixed(500)),
  cc('Burgers', 'Sriracha Zinger', fixed(500)),

  // —— Smash Beef ——
  cc('Smash Beef Burger', 'Hand Made Chicken Burger', fixed(600)),
  cc('Smash Beef Burger', 'Chicken Melt', fixed(750)),
  cc('Smash Beef Burger', 'Single Patty Beef', fixed(800)),
  cc('Smash Beef Burger', 'Double Patty Beef', fixed(1100)),
  cc('Smash Beef Burger', 'Single Patty Beef Melt', fixed(1000)),
  cc('Smash Beef Burger', 'Double Patty Beef Melt', fixed(1350)),

  // —— Special Burgers with Fries ——
  ...['CC Special', 'Grill Fish', 'Crispy Fish', 'Mightly Zinger', 'Chicken Fillet Melt'].map(
    (name) => cc('Special Burgers with Fries', name, fixed(800)),
  ),
  ...['Jumbo Tower', 'Grilled Peri', 'Pizza Burger', 'Pizzinger'].map((name) =>
    cc('Special Burgers with Fries', name, fixed(700)),
  ),

  // —— Sandwiches ——
  ...['Tikka', 'Fajita', 'Peri Peri', 'Smoked', 'BBQ', 'Cocktail'].map((name) =>
    cc('Sandwiches', name, fixed(500), { description: 'Served with fries' }),
  ),
  cc('Sandwiches', 'Grilled Peri Peri', fixed(600), { description: 'Served with fries' }),
  cc('Sandwiches', 'Club', fixed(600), { description: 'Served with fries' }),
  cc('Sandwiches', 'Pizza Sandwich', fixed(700), { description: 'Served with fries' }),

  // —— Shawarmas ——
  cc('Shawarmas', 'Chicken Shawarma', fixed(350)),
  cc('Shawarmas', 'Bar BQ Shawarma', fixed(350)),
  cc('Shawarmas', 'Chicken Cheese Shawarma', fixed(400)),
  cc('Shawarmas', 'Zinger Shawarma', fixed(500)),
  cc('Shawarmas', 'Grilled Shawarma', fixed(600)),
  cc('Shawarmas', 'Platter Shawarma', fixed(800)),

  // —— Paratha Rolls ——
  cc('Paratha Rolls', 'Chicken', fixed(400)),
  cc('Paratha Rolls', 'Kabab', fixed(450)),
  cc('Paratha Rolls', 'Bar BQ', fixed(450)),
  cc('Paratha Rolls', 'Crispy', fixed(500)),
  cc('Paratha Rolls', 'Grilled', fixed(600)),
  cc('Paratha Rolls', 'Taco', fixed(600)),
  cc('Paratha Rolls', 'Pizza', fixed(700)),

  // —— Broast ——
  cc('Broast', 'Quarter', fixed(750), {
    description: '1 leg, 1 thigh, 1 bun, 1 garlic dip & fries',
  }),
  cc('Broast', 'Half', fixed(1250)),
  cc('Broast', 'Full', fixed(2400)),

  // —— Peri Peri ——
  cc('Peri Peri Chicken', 'Breast Fillet with Rice', fixed(550)),
  cc('Peri Peri Chicken', 'Chicken Tender with Rice', fixed(550)),
  cc('Peri Peri Chicken', 'Crispy Chicken with Rice', fixed(600)),
  cc('Peri Peri Chicken', 'Peri Peri Grilled Chicken with Rice', [
    { label: 'Quarter', price: 830 },
    { label: 'Half', price: 1250 },
    { label: 'Full', price: 2500 },
  ]),

  // —— Fried / Baked ——
  cc('Fried / Baked Chicken', '1 Pc', fixed(300)),
  cc('Fried / Baked Chicken', '3 Pcs', fixed(800)),
  cc('Fried / Baked Chicken', '9 Pcs & Drink (1 Ltr)', fixed(2000)),

  // —— Dips ——
  ...['Garlic', 'Chipotle', 'Atomic', 'BBQ Dip'].map((name) =>
    cc('Dips', name, fixed(100)),
  ),

  // —— Desserts ——
  cc('Desserts', 'Nutella Pancakes', fixed(699)),
  cc('Desserts', 'Nutella Stuffed French Toast', fixed(799)),

  // —— Wraps ——
  ...['CC Special', 'Peri Peri', 'Crispy', 'BBQ'].map((name) =>
    cc('Wraps', name, ml(650, 850)),
  ),
  cc('Wraps', 'Cheese Wrap-E-Dilla', [
    { label: 'Medium', price: 550 },
    { label: 'Large / 10 Pc', price: 1000 },
  ]),

  // —— Fries ——
  cc('Fries', 'Salty', ml(250, 400)),
  cc('Fries', 'Masala', ml(250, 400)),
  cc('Fries', 'Chicken Cheese Loaded', ml(600, 850)),
  cc('Fries', 'Smokey Loaded', ml(600, 850)),
  cc('Fries', 'Crispy Loaded', ml(600, 850)),
  cc('Fries', 'Beef Loaded', ml(800, 1200)),
  cc('Fries', 'Curly', fixed(500)),
  cc('Fries', 'Waffle', fixed(500)),

  // —— Hot Wings ——
  ...['Hot', 'BBQ', 'Honey Mustard', 'Buffalo', 'Peri Peri'].map((name) =>
    cc('Hot Wings', name, pcs(450, 800)),
  ),

  // —— Snacks ——
  cc('Snacks', 'Nuggets', pcs(250, 500)),
  cc('Snacks', 'Chicken Tempura', pcs(250, 500)),

  // —— Burger Deals ——
  cc('Burger Deals', 'Burger D0', fixed(650), {
    description: '1 Zinger Burger + Fries + Drink (345 ml)',
    isDeal: true,
  }),
  cc('Burger Deals', 'Burger D1', fixed(450), {
    description: '1 Crispy Patty Burger + Fries + Drink (345 ml)',
    isDeal: true,
  }),
  cc('Burger Deals', 'Burger D2', fixed(850), {
    description: '1 Zinger Burger + Fries + 1 Fried Chicken Pc + Drink (345 ml)',
    isDeal: true,
  }),
  cc('Burger Deals', 'Burger D3', fixed(800), {
    description: '1 Jumbo Tower Burger + Fries + Drink (345 ml)',
    isDeal: true,
  }),
  cc('Burger Deals', 'Burger D4', fixed(1200), {
    description: '1 Small Pizza + 1 Zinger Burger + Fries + Drink (345 ml)',
    isDeal: true,
  }),
  cc('Burger Deals', 'Burger D5', fixed(1650), {
    description: '2 Zinger Burgers + Fries + 2 Fried Chicken Pcs + 2 Drinks (345 ml)',
    isDeal: true,
  }),
  cc('Burger Deals', 'Burger D6', fixed(550), {
    description: 'Jumbo Patty Burger + Fries + Drink (345 ml)',
    isDeal: true,
  }),
  cc('Burger Deals', 'Burger D7', fixed(2000), {
    description: '4 Zinger Burgers + Fries + Drink (1 ltr)',
    isDeal: true,
  }),
  cc('Burger Deals', 'Burger D8', fixed(2150), {
    description: '1 Medium Pizza + 2 Zinger Burgers + Fries + Drink (1 ltr)',
    isDeal: true,
  }),
  cc('Burger Deals', 'Burger D9', fixed(2800), {
    description: '6 Zinger Burgers + Drink (1.5 ltr)',
    isDeal: true,
  }),

  // —— Pizza Deals ——
  cc('Pizza Deals', 'Pizza D10', fixed(1150), {
    description: '2 Personal Pan Pizzas + Drink (0.5 ltr)',
    isDeal: true,
  }),
  cc('Pizza Deals', 'Pizza D11', fixed(1900), {
    description: '2 Medium Pizzas + Drink (1 ltr)',
    isDeal: true,
  }),
  cc('Pizza Deals', 'Pizza D12', fixed(3150), {
    description: '2 Large Pizzas + Drink (1.5 ltr)',
    isDeal: true,
  }),
  cc('Pizza Deals', 'Pizza D13', fixed(1300), {
    description: '2 Special Personal Pan Pizzas + Drink (0.5 ltr)',
    isDeal: true,
  }),
  cc('Pizza Deals', 'Pizza D14', fixed(2050), {
    description: '2 Special Medium Pizzas + Drink (1 ltr)',
    isDeal: true,
  }),
  cc('Pizza Deals', 'Pizza D15', fixed(3350), {
    description: '2 Special Large Pizzas + Drink (1.5 ltr)',
    isDeal: true,
  }),
  cc('Pizza Deals', 'Pizza D16', fixed(2800), {
    description: '1 Large Pizza + 1 Medium Pizza + Drink (1.5 ltr)',
    isDeal: true,
  }),
  cc('Pizza Deals', 'Pizza D17', fixed(1750), {
    description: '1 Medium Pizza + 1 Small Pizza + Drink (1 ltr)',
    isDeal: true,
  }),
]

export const KF_CATEGORIES = [
  'Chinese Deals',
  'Rice',
  'Chow Mein',
  'Appetizers',
  'Pasta',
  'Standard Gravies',
  'Signature Gravies',
  'Soups',
]

export const CC_CATEGORIES = [
  'Burger Deals',
  'Pizza Deals',
  'Signature Pizzas',
  'Standard Pizzas',
  'Calzone Pizza',
  'Burgers',
  'Smash Beef Burger',
  'Special Burgers with Fries',
  'Sandwiches',
  'Shawarmas',
  'Paratha Rolls',
  'Broast',
  'Peri Peri Chicken',
  'Fried / Baked Chicken',
  'Wraps',
  'Fries',
  'Hot Wings',
  'Snacks',
  'Dips',
  'Desserts',
  'Extra Topping',
]

export function formatPrice(n: number) {
  return `Rs ${n.toLocaleString('en-PK')}`
}
