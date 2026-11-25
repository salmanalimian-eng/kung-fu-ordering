import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const MEDIA =
  'C:\\Users\\Mian\\AppData\\Local\\Cursor\\AgentStores\\cursor_agent_stores\\bc-d535a8ec-048f-4b5d-87c7-dd7c77f14cbf\\files\\media'
const BASE = 'http://127.0.0.1:5173'
fs.mkdirSync(MEDIA, { recursive: true })

// clear prior webm fragments
for (const f of fs.readdirSync(MEDIA)) {
  if (f.endsWith('.webm')) fs.unlinkSync(path.join(MEDIA, f))
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  recordVideo: { dir: MEDIA, size: { width: 1280, height: 800 } },
})
const page = await context.newPage()

await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(900)
await page.screenshot({ path: path.join(MEDIA, 'kungfu-home.png'), fullPage: false })

await page.getByRole('tab', { name: 'Canadian Classics' }).click()
await page.waitForTimeout(700)
await page.screenshot({
  path: path.join(MEDIA, 'kungfu-brand-canadian.png'),
  fullPage: false,
})

await page.getByRole('tab', { name: 'Kung Fu Pan Asian' }).click()
await page.waitForTimeout(500)
await page.getByRole('button', { name: 'Order Now' }).click()
await page.waitForTimeout(800)
await page.screenshot({ path: path.join(MEDIA, 'kungfu-menu.png'), fullPage: false })

const addBtn = page.locator('.item-card .btn-primary').first()
await addBtn.scrollIntoViewIfNeeded()
await addBtn.click()
await page.waitForTimeout(250)
await addBtn.click()
await page.waitForTimeout(250)
await page.getByRole('button', { name: /Cart,/ }).click()
await page.waitForTimeout(600)
await page.screenshot({ path: path.join(MEDIA, 'kungfu-cart.png'), fullPage: false })

await page.getByRole('button', { name: 'Checkout' }).click()
await page.waitForTimeout(400)
await page.locator('.checkout-panel input').nth(0).fill('Demo Customer')
await page.locator('.checkout-panel input').nth(1).fill('03001234567')
await page.locator('.checkout-panel textarea').nth(0).fill('Downtown Imperial Mall, Paragon City')
await page.locator('.checkout-panel textarea').nth(1).fill('Ring doorbell')
await page.screenshot({ path: path.join(MEDIA, 'kungfu-checkout.png'), fullPage: false })
await page.getByRole('button', { name: 'Place Order' }).click()
await page.waitForTimeout(700)
await page.screenshot({
  path: path.join(MEDIA, 'kungfu-order-confirm.png'),
  fullPage: false,
})

await page.goto(`${BASE}/admin`, { waitUntil: 'networkidle' })
await page.getByLabel('Username').fill('admin')
await page.getByLabel('Password').fill('kungfu2026')
await page.getByRole('button', { name: 'Sign in' }).click()
await page.waitForTimeout(800)
await page.screenshot({
  path: path.join(MEDIA, 'kungfu-admin-orders.png'),
  fullPage: false,
})

await context.close()
await browser.close()

const files = fs.readdirSync(MEDIA).filter((f) => f.endsWith('.webm'))
if (files.length) {
  const newest = files
    .map((f) => ({ f, t: fs.statSync(path.join(MEDIA, f)).mtimeMs }))
    .sort((a, b) => b.t - a.t)[0].f
  fs.renameSync(path.join(MEDIA, newest), path.join(MEDIA, 'kungfu-demo.webm'))
}

for (const name of [
  'kungfu-home.png',
  'kungfu-brand-canadian.png',
  'kungfu-menu.png',
  'kungfu-cart.png',
  'kungfu-checkout.png',
  'kungfu-order-confirm.png',
  'kungfu-admin-orders.png',
  'kungfu-demo.webm',
]) {
  const p = path.join(MEDIA, name)
  console.log(fs.existsSync(p) ? `OK ${p}` : `MISSING ${p}`)
}
