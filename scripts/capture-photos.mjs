import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const MEDIA =
  'C:\\Users\\Mian\\AppData\\Local\\Cursor\\AgentStores\\cursor_agent_stores\\bc-d535a8ec-048f-4b5d-87c7-dd7c77f14cbf\\files\\media'
const BASE = 'http://127.0.0.1:5173'
fs.mkdirSync(MEDIA, { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })

await page.goto(BASE, { waitUntil: 'networkidle' })
await page.getByRole('button', { name: 'Order Now' }).click()
await page.waitForTimeout(1200)
await page.waitForSelector('.item-media img')
await page.screenshot({
  path: path.join(MEDIA, 'kungfu-menu-photos.png'),
  fullPage: false,
})

await page.getByRole('tab', { name: 'Canadian Classics' }).click()
await page.waitForTimeout(900)
await page.getByRole('button', { name: 'Order Now' }).click()
await page.waitForTimeout(1000)
await page.screenshot({
  path: path.join(MEDIA, 'kungfu-menu-photos-canadian.png'),
  fullPage: false,
})

await page.locator('.item-card .btn-primary').first().click()
await page.waitForTimeout(300)
await page.getByRole('button', { name: /Cart,/ }).click()
await page.waitForTimeout(500)
await page.screenshot({
  path: path.join(MEDIA, 'kungfu-cart-with-photos.png'),
  fullPage: false,
})

await browser.close()
for (const name of [
  'kungfu-menu-photos.png',
  'kungfu-menu-photos-canadian.png',
  'kungfu-cart-with-photos.png',
]) {
  const p = path.join(MEDIA, name)
  console.log(fs.existsSync(p) ? `OK ${p}` : `MISSING ${p}`)
}
