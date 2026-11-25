import type { MenuItem } from '../types'

/** Local paths under /public/food — dish-matched stock photos. */
export function foodImageFor(item: MenuItem): string {
  const n = item.name.toLowerCase()
  const c = item.category.toLowerCase()

  // —— Deals (match contents) ——
  if (c.includes('chinese deal')) {
    if (n.includes('deal c')) return '/food/hot-sour-soup.jpg'
    if (n.includes('deal d')) return '/food/sandwich.jpg'
    if (n.includes('deal e')) return '/food/drumsticks.jpg'
    return '/food/kung-pao.jpg'
  }
  if (c.includes('burger deal')) {
    if (n.includes('d4') || n.includes('d8')) return '/food/pizza-deal.jpg'
    if (n.includes('d2') || n.includes('d5')) return '/food/fried-chicken-pc.jpg'
    if (n.includes('d3') || n.includes('d7') || n.includes('d9'))
      return '/food/burger-tower.jpg'
    if (n.includes('d1') || n.includes('d6')) return '/food/burger-classic.jpg'
    return '/food/burger-zinger.jpg'
  }
  if (c.includes('pizza deal')) return '/food/pizza-deal.jpg'

  // —— Kung Fu gravies (Chinese chicken-in-sauce / grill) ——
  if (n.includes('shashlik')) return '/food/shashlik.jpg'
  if (n.includes('grill fish')) return '/food/grill-fish-rice.jpg'
  if (
    n.includes('manchurian') ||
    n.includes('kung pao') ||
    n.includes('cashew') ||
    n.includes('almond') ||
    n.includes('schezwan chicken') ||
    n.includes('black pepper') ||
    n.includes('garlic chicken') ||
    n.includes('hot & spicy') ||
    n.includes('hot and spicy') ||
    n.includes('green chilli') ||
    n.includes('chilli dry') ||
    n.includes('dragon') ||
    c.includes('gravies')
  ) {
    return '/food/kung-pao.jpg'
  }

  // —— Rice ——
  if (n.includes('vegetable rice')) return '/food/veg-rice.jpg'
  if (n.includes('egg fried')) return '/food/egg-fried-rice.jpg'
  if (n.includes('chicken fried')) return '/food/chicken-fried-rice.jpg'
  if (n.includes('masala rice')) return '/food/masala-rice.jpg'
  if (n.includes('special rice') || (c === 'rice' && n.includes('special')))
    return '/food/special-rice.jpg'
  if (c === 'rice') return '/food/egg-fried-rice.jpg'

  // —— Chow Mein ——
  if (n.includes('vegetable chow') || n.includes('veg chow'))
    return '/food/veg-chowmein.jpg'
  if (n.includes('thai chow')) return '/food/thai-chowmein.jpg'
  if (n.includes('chow mein') || c.includes('chow mein'))
    return '/food/chicken-chowmein.jpg'

  // —— Appetizers ——
  if (n.includes('honey wing')) return '/food/honey-wings.jpg'
  if (n.includes('finger fish')) return '/food/finger-fish.jpg'
  if (n.includes('drumstick')) return '/food/drumsticks.jpg'

  // —— Pasta ——
  if (n.includes('alfredo') || n.includes('fettuccine')) return '/food/alfredo.jpg'
  if (n.includes('mac and cheese') || n.includes('mac & cheese'))
    return '/food/mac-cheese.jpg'
  if (n.includes('red sauce')) return '/food/red-sauce-pasta.jpg'
  if (n.includes('creamy pasta')) return '/food/creamy-pasta.jpg'
  if (n.includes('crispy fillet pasta') || n.includes('baked'))
    return '/food/baked-pasta.jpg'
  if (c === 'pasta') return '/food/baked-pasta.jpg'

  // —— Soups ——
  if (n.includes('fish cracker')) return '/food/fish-crackers.jpg'
  if (n.includes('hot & sour') || n.includes('hot and sour'))
    return '/food/hot-sour-soup.jpg'
  if (n.includes('corn soup')) return '/food/corn-soup.jpg'
  if (n.includes('schezwan soup')) return '/food/schezwan-soup.jpg'
  if (n.includes('special soup') || c === 'soups') return '/food/special-soup.jpg'

  // —— Pizzas ——
  if (n.includes('lava')) return '/food/pizza-lava.jpg'
  if (n.includes('crown crust') || n.includes('kabab crust') || n.includes('cheese crust') || n.includes('cream / cheese'))
    return '/food/pizza-crust.jpg'
  if (n.includes('pepperoni')) return '/food/pizza-pepperoni.jpg'
  if (n.includes('margherita')) return '/food/pizza-margherita.jpg'
  if (n.includes('bbq') && c.includes('pizza')) return '/food/pizza-bbq.jpg'
  if (n.includes('tikka') && c.includes('pizza')) return '/food/pizza-tikka.jpg'
  if (n.includes('fajita') && c.includes('pizza')) return '/food/pizza-specialty.jpg'
  if (c.includes('calzone')) return '/food/calzone.jpg'
  if (c.includes('pizza')) return '/food/pizza-specialty.jpg'
  if (c.includes('extra topping')) return '/food/cheese-topping.jpg'

  // —— Burgers ——
  if (n.includes('fish') && c.includes('burger')) return '/food/burger-fish.jpg'
  if (n.includes('zinger') || n.includes('sriracha') || n.includes('thunder'))
    return '/food/burger-zinger.jpg'
  if (n.includes('melt')) return '/food/burger-melt.jpg'
  if (n.includes('tower') || n.includes('jumbo') || n.includes('mighty') || n.includes('mightly'))
    return '/food/burger-tower.jpg'
  if (n.includes('beef') || n.includes('smash') || c.includes('smash'))
    return '/food/burger-beef.jpg'
  if (c.includes('burger')) return '/food/burger-classic.jpg'

  // —— Sandwiches ——
  if (n.includes('club')) return '/food/club-sandwich.jpg'
  if (n.includes('pizza sandwich')) return '/food/pizza-sandwich.jpg'
  if (c.includes('sandwich')) return '/food/sandwich.jpg'

  // —— Shawarma / rolls / wraps ——
  if (n.includes('platter shawarma')) return '/food/shawarma-platter.jpg'
  if (c.includes('shawarma') || n.includes('shawarma')) return '/food/shawarma.jpg'
  if (c.includes('paratha')) return '/food/paratha-roll.jpg'
  if (n.includes('wrap-e-dilla') || n.includes('quesadilla')) return '/food/quesadilla.jpg'
  if (c.includes('wrap')) return '/food/wrap.jpg'

  // —— Broast / peri / fried ——
  if (c.includes('broast')) return '/food/broast.jpg'
  if (n.includes('peri peri') || c.includes('peri peri')) return '/food/peri-peri.jpg'
  if (n.includes('tender')) return '/food/chicken-tender.jpg'
  if (n.includes('breast fillet') || n.includes('grilled chicken'))
    return '/food/grilled-chicken-rice.jpg'
  if (c.includes('fried') || c.includes('baked chicken'))
    return '/food/fried-chicken-pc.jpg'

  // —— Fries / wings / snacks ——
  if (n.includes('loaded') || n.includes('beef loaded') || n.includes('cheese loaded'))
    return '/food/loaded-fries.jpg'
  if (n.includes('curly')) return '/food/curly-fries.jpg'
  if (n.includes('waffle')) return '/food/waffle-fries.jpg'
  if (c === 'fries' || n.includes('fries')) return '/food/fries.jpg'
  if (n.includes('bbq') && c.includes('wing')) return '/food/bbq-wings.jpg'
  if (c.includes('hot wing') || n.includes('buffalo') || n.includes('honey mustard'))
    return '/food/hot-wings.jpg'
  if (n.includes('nugget')) return '/food/nuggets.jpg'
  if (n.includes('tempura')) return '/food/tempura.jpg'
  if (c === 'dips' || n.includes('dip')) return '/food/dip.jpg'

  // —— Desserts ——
  if (n.includes('pancake')) return '/food/nutella-pancakes.jpg'
  if (n.includes('french toast')) return '/food/french-toast.jpg'

  // —— Fallbacks by brand category ——
  if (item.brand === 'kungfu') return '/food/kung-pao.jpg'
  return '/food/burger-classic.jpg'
}
