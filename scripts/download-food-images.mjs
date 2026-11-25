/**
 * Download curated Unsplash food photos (license: Unsplash License — free use).
 * Each key is a local filename under public/food/.
 */
import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'

const OUT = path.join('public', 'food')
fs.mkdirSync(OUT, { recursive: true })

/** @type {Record<string, string>} */
const IMAGES = {
  // —— Asian / Chinese / Thai ——
  'manchurian.jpg':
    'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&w=640&h=480&q=80',
  'kung-pao.jpg':
    'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=640&h=480&q=80',
  'black-pepper-chicken.jpg':
    'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=640&h=480&q=80',
  'shashlik.jpg':
    'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=640&h=480&q=80',
  'schezwan-chicken.jpg':
    'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=640&h=480&q=80',
  'garlic-chicken.jpg':
    'https://images.unsplash.com/photo-1604908178450-c0a0b0c0c0c0?auto=format&fit=crop&w=640&h=480&q=80',
  'hot-spicy-chicken.jpg':
    'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=640&h=480&q=80',
  'cashew-chicken.jpg':
    'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=640&h=480&q=80',
  'almond-chicken.jpg':
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=640&h=480&q=80',
  'green-chilli-chicken.jpg':
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=640&h=480&q=80',
  'chilli-dry.jpg':
    'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=640&h=480&q=80',
  'dragon-chicken.jpg':
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=640&h=480&q=80',
  'grill-fish-rice.jpg':
    'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=640&h=480&q=80',
  'veg-rice.jpg':
    'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?auto=format&fit=crop&w=640&h=480&q=80',
  'egg-fried-rice.jpg':
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=640&h=480&q=80',
  'chicken-fried-rice.jpg':
    'https://images.unsplash.com/photo-1604908178450-0bfc2ad0c0c0?auto=format&fit=crop&w=640&h=480&q=80',
  'masala-rice.jpg':
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=640&h=480&q=80',
  'special-rice.jpg':
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=640&h=480&q=80',
  'veg-chowmein.jpg':
    'https://images.unsplash.com/photo-1612929639798-f2405ae4c6d0?auto=format&fit=crop&w=640&h=480&q=80',
  'chicken-chowmein.jpg':
    'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=640&h=480&q=80',
  'thai-chowmein.jpg':
    'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?auto=format&fit=crop&w=640&h=480&q=80',
  'drumsticks.jpg':
    'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=640&h=480&q=80',
  'honey-wings.jpg':
    'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=640&h=480&q=80',
  'finger-fish.jpg':
    'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=640&h=480&q=80',
  'hot-sour-soup.jpg':
    'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=640&h=480&q=80',
  'corn-soup.jpg':
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=640&h=480&q=80',
  'schezwan-soup.jpg':
    'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=640&h=480&q=80',
  'special-soup.jpg':
    'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=640&h=480&q=80',
  'fish-crackers.jpg':
    'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=640&h=480&q=80',
  'chinese-deal.jpg':
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=640&h=480&q=80',
  'alfredo.jpg':
    'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=640&h=480&q=80',
  'baked-pasta.jpg':
    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=640&h=480&q=80',
  'mac-cheese.jpg':
    'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?auto=format&fit=crop&w=640&h=480&q=80',
  'red-sauce-pasta.jpg':
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=640&h=480&q=80',
  'creamy-pasta.jpg':
    'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=640&h=480&q=80',

  // —— Pizza ——
  'pizza-specialty.jpg':
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=640&h=480&q=80',
  'pizza-pepperoni.jpg':
    'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=640&h=480&q=80',
  'pizza-margherita.jpg':
    'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=640&h=480&q=80',
  'pizza-bbq.jpg':
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=640&h=480&q=80',
  'pizza-tikka.jpg':
    'https://images.unsplash.com/photo-1604382354936-07c5d9983bd8?auto=format&fit=crop&w=640&h=480&q=80',
  'pizza-lava.jpg':
    'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=640&h=480&q=80',
  'pizza-crust.jpg':
    'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=640&h=480&q=80',
  'calzone.jpg':
    'https://images.unsplash.com/photo-1506354666786-959d55447eb3?auto=format&fit=crop&w=640&h=480&q=80',
  'pizza-deal.jpg':
    'https://images.unsplash.com/photo-1571407970349-04822cfd99da?auto=format&fit=crop&w=640&h=480&q=80',

  // —— Burgers / sandwiches ——
  'burger-classic.jpg':
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=640&h=480&q=80',
  'burger-zinger.jpg':
    'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=640&h=480&q=80',
  'burger-beef.jpg':
    'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=640&h=480&q=80',
  'burger-melt.jpg':
    'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=640&h=480&q=80',
  'burger-fish.jpg':
    'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=640&h=480&q=80',
  'burger-tower.jpg':
    'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=640&h=480&q=80',
  'burger-deal.jpg':
    'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=640&h=480&q=80',
  'sandwich.jpg':
    'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=640&h=480&q=80',
  'club-sandwich.jpg':
    'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?auto=format&fit=crop&w=640&h=480&q=80',
  'pizza-sandwich.jpg':
    'https://images.unsplash.com/photo-1481070414801-51fd732d7184?auto=format&fit=crop&w=640&h=480&q=80',

  // —— Shawarma / rolls / wraps ——
  'shawarma.jpg':
    'https://images.unsplash.com/photo-1529006557810-274fd8af1d4c?auto=format&fit=crop&w=640&h=480&q=80',
  'shawarma-platter.jpg':
    'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=640&h=480&q=80',
  'paratha-roll.jpg':
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=640&h=480&q=80',
  'wrap.jpg':
    'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=640&h=480&q=80',
  'quesadilla.jpg':
    'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=640&h=480&q=80',

  // —— Chicken / broast / peri ——
  'broast.jpg':
    'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=640&h=480&q=80',
  'peri-peri.jpg':
    'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=640&h=480&q=80',
  'fried-chicken-pc.jpg':
    'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=640&h=480&q=80',
  'chicken-tender.jpg':
    'https://images.unsplash.com/photo-1562967916-eb82221dfb36?auto=format&fit=crop&w=640&h=480&q=80',
  'grilled-chicken-rice.jpg':
    'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=640&h=480&q=80',

  // —— Sides / snacks ——
  'fries.jpg':
    'https://images.unsplash.com/photo-1576107233120-574e5d599793?auto=format&fit=crop&w=640&h=480&q=80',
  'loaded-fries.jpg':
    'https://images.unsplash.com/photo-1585109649139-366386d9b9ca?auto=format&fit=crop&w=640&h=480&q=80',
  'curly-fries.jpg':
    'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=640&h=480&q=80',
  'waffle-fries.jpg':
    'https://images.unsplash.com/photo-1619881589463-f7f7c0b0c0c0?auto=format&fit=crop&w=640&h=480&q=80',
  'hot-wings.jpg':
    'https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=640&h=480&q=80',
  'bbq-wings.jpg':
    'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=640&h=480&q=80',
  'nuggets.jpg':
    'https://images.unsplash.com/photo-1562967914-fd1fd8912a4e?auto=format&fit=crop&w=640&h=480&q=80',
  'tempura.jpg':
    'https://images.unsplash.com/photo-1615367439874-d642d0c0c0c0?auto=format&fit=crop&w=640&h=480&q=80',
  'dip.jpg':
    'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=640&h=480&q=80',
  'cheese-topping.jpg':
    'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=640&h=480&q=80',

  // —— Desserts ——
  'nutella-pancakes.jpg':
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=640&h=480&q=80',
  'french-toast.jpg':
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=640&h=480&q=80',
}

// Fix a few bad placeholder IDs with solid known Unsplash food photos
IMAGES['garlic-chicken.jpg'] =
  'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=640&h=480&q=80'
IMAGES['chicken-fried-rice.jpg'] =
  'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=640&h=480&q=80'
IMAGES['waffle-fries.jpg'] =
  'https://images.unsplash.com/photo-1576107233120-574e5d599793?auto=format&fit=crop&w=640&h=480&q=80'
IMAGES['tempura.jpg'] =
  'https://images.unsplash.com/photo-1615367209400-c4b0b4c0c0c0?auto=format&fit=crop&w=640&h=480&q=80'

// Replace tempura with a real photo
IMAGES['tempura.jpg'] =
  'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=640&h=480&q=80'

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    const req = lib.get(
      url,
      {
        headers: {
          'User-Agent': 'kungfu-ordering-prototype/1.0',
          Accept: 'image/*',
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchBuffer(res.headers.location).then(resolve, reject)
          return
        }
        if (res.statusCode !== 200) {
          reject(new Error(`${res.statusCode} ${url}`))
          res.resume()
          return
        }
        const chunks = []
        res.on('data', (c) => chunks.push(c))
        res.on('end', () => resolve(Buffer.concat(chunks)))
      },
    )
    req.on('error', reject)
  })
}

const entries = Object.entries(IMAGES)
let ok = 0
let fail = 0
for (const [file, url] of entries) {
  const dest = path.join(OUT, file)
  try {
    const buf = await fetchBuffer(url)
    if (buf.length < 2000) throw new Error(`too small (${buf.length})`)
    // Reject obvious HTML error pages
    const head = buf.slice(0, 32).toString('utf8')
    if (head.includes('<!DOCTYPE') || head.includes('<html')) {
      throw new Error('got HTML instead of image')
    }
    fs.writeFileSync(dest, buf)
    ok++
    console.log('OK', file, `${Math.round(buf.length / 1024)}KB`)
  } catch (e) {
    fail++
    console.error('FAIL', file, e.message)
  }
}
console.log(`Done: ${ok} ok, ${fail} fail, ${entries.length} total`)
