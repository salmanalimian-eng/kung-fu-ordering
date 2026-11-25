export type BrandId = 'kungfu' | 'canadian'

export type OrderStatus =
  | 'received'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'

export interface SizeOption {
  label: string
  price: number
}

export interface MenuItem {
  id: string
  brand: BrandId
  category: string
  name: string
  description?: string
  sizes: SizeOption[]
  isDeal?: boolean
  available?: boolean
}

export interface CartLine {
  key: string
  itemId: string
  brand: BrandId
  name: string
  size: string
  unitPrice: number
  qty: number
}

export interface OrderItem {
  name: string
  size: string
  qty: number
  price: number
  brand: BrandId
}

export interface Order {
  id: string
  orderNo: string
  customerName: string
  phone: string
  address: string
  notes: string
  payment: 'cod'
  items: OrderItem[]
  total: number
  status: OrderStatus
  brands: BrandId[]
  createdAt: string
}

export interface Settings {
  openTime: string
  closeTime: string
  whatsapp: string
  phone2: string
  deliveryFee: number | null
  minOrder: number | null
  address: string
}
