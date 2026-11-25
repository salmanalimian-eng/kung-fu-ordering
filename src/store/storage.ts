import type { BrandId, CartLine, Order, OrderStatus, Settings } from '../types'
import type { MenuItem } from '../types'
import { MENU } from '../data/menu'

const CART_KEY = 'kf-cart-v1'
const ORDERS_KEY = 'kf-orders-v1'
const SETTINGS_KEY = 'kf-settings-v1'
const MENU_KEY = 'kf-menu-overrides-v1'
const AUTH_KEY = 'kf-admin-auth-v1'
const SEQ_KEY = 'kf-order-seq-v1'

export const DEFAULT_SETTINGS: Settings = {
  openTime: '11:00 am',
  closeTime: '4:00 am',
  whatsapp: '0326-1647961',
  phone2: '0325-8637425',
  deliveryFee: null,
  minOrder: null,
  address:
    'Downtown Imperial Mall, Main Boulevard, Paragon City, Barki Road, Lahore',
}

export const ADMIN_USER = 'admin'
export const ADMIN_PASS = 'kungfu2026'

type Cache = {
  cart: CartLine[]
  orders: Order[]
  settings: Settings
  menu: MenuItem[]
  auth: boolean
}

const cache: Cache = {
  cart: [],
  orders: [],
  settings: { ...DEFAULT_SETTINGS },
  menu: MENU.map((i) => ({ ...i })),
  auth: false,
}

let hydrated = false

function readRaw<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function hydrate() {
  if (hydrated || typeof localStorage === 'undefined') return
  cache.cart = readRaw<CartLine[]>(CART_KEY, [])
  cache.orders = readRaw<Order[]>(ORDERS_KEY, []).sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
  )
  cache.settings = {
    ...DEFAULT_SETTINGS,
    ...readRaw<Partial<Settings>>(SETTINGS_KEY, {}),
  }
  const overrides = readRaw<Record<string, Partial<MenuItem>>>(MENU_KEY, {})
  cache.menu = MENU.map((item) => ({ ...item, ...overrides[item.id] }))
  cache.auth = readRaw<boolean>(AUTH_KEY, false)
  hydrated = true
}

function emit() {
  window.dispatchEvent(new Event('kf-storage'))
}

function persist(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
  emit()
}

function rebuildMenu() {
  const overrides = readRaw<Record<string, Partial<MenuItem>>>(MENU_KEY, {})
  cache.menu = MENU.map((item) => ({ ...item, ...overrides[item.id] }))
}

hydrate()

export function getCart(): CartLine[] {
  hydrate()
  return cache.cart
}

export function setCart(lines: CartLine[]) {
  cache.cart = lines
  persist(CART_KEY, lines)
}

export function addToCart(
  item: MenuItem,
  size: string,
  unitPrice: number,
  qty = 1,
) {
  const cart = [...getCart()]
  const key = `${item.id}::${size}`
  const existing = cart.find((l) => l.key === key)
  if (existing) {
    existing.qty += qty
  } else {
    cart.push({
      key,
      itemId: item.id,
      brand: item.brand,
      name: item.name,
      size,
      unitPrice,
      qty,
    })
  }
  setCart(cart)
  return cart
}

export function updateQty(key: string, qty: number) {
  let cart = getCart()
  if (qty <= 0) {
    cart = cart.filter((l) => l.key !== key)
  } else {
    cart = cart.map((l) => (l.key === key ? { ...l, qty } : l))
  }
  setCart(cart)
  return cart
}

export function removeLine(key: string) {
  const cart = getCart().filter((l) => l.key !== key)
  setCart(cart)
  return cart
}

export function clearCart() {
  setCart([])
}

export function cartTotal(lines = getCart()) {
  return lines.reduce((s, l) => s + l.unitPrice * l.qty, 0)
}

export function getOrders(): Order[] {
  hydrate()
  return cache.orders
}

export function nextOrderNo(): string {
  const seq = readRaw<number>(SEQ_KEY, 1000) + 1
  localStorage.setItem(SEQ_KEY, JSON.stringify(seq))
  return `KF-${seq}`
}

export function placeOrder(input: {
  customerName: string
  phone: string
  address: string
  notes: string
}): Order {
  const lines = getCart()
  const brands = [...new Set(lines.map((l) => l.brand))] as BrandId[]
  const order: Order = {
    id: crypto.randomUUID(),
    orderNo: nextOrderNo(),
    customerName: input.customerName.trim(),
    phone: input.phone.trim(),
    address: input.address.trim(),
    notes: input.notes.trim(),
    payment: 'cod',
    items: lines.map((l) => ({
      name: l.name,
      size: l.size,
      qty: l.qty,
      price: l.unitPrice,
      brand: l.brand,
    })),
    total: cartTotal(lines),
    status: 'received',
    brands,
    createdAt: new Date().toISOString(),
  }
  cache.orders = [order, ...cache.orders]
  persist(ORDERS_KEY, cache.orders)
  clearCart()
  return order
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  cache.orders = getOrders().map((o) => (o.id === id ? { ...o, status } : o))
  persist(ORDERS_KEY, cache.orders)
  return cache.orders
}

export function getSettings(): Settings {
  hydrate()
  return cache.settings
}

export function saveSettings(s: Settings) {
  cache.settings = s
  persist(SETTINGS_KEY, s)
}

export function getMenuItems(): MenuItem[] {
  hydrate()
  return cache.menu
}

export function saveMenuOverride(id: string, patch: Partial<MenuItem>) {
  const overrides = readRaw<Record<string, Partial<MenuItem>>>(MENU_KEY, {})
  overrides[id] = { ...overrides[id], ...patch }
  localStorage.setItem(MENU_KEY, JSON.stringify(overrides))
  rebuildMenu()
  emit()
}

export function isAdminAuthed(): boolean {
  hydrate()
  return cache.auth
}

export function adminLogin(user: string, pass: string): boolean {
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    cache.auth = true
    persist(AUTH_KEY, true)
    return true
  }
  return false
}

export function adminLogout() {
  cache.auth = false
  persist(AUTH_KEY, false)
}

export function subscribeStorage(cb: () => void) {
  const handler = () => cb()
  window.addEventListener('kf-storage', handler)
  window.addEventListener('storage', handler)
  return () => {
    window.removeEventListener('kf-storage', handler)
    window.removeEventListener('storage', handler)
  }
}
