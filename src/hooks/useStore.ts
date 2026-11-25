import { useEffect, useState, useSyncExternalStore } from 'react'
import {
  getCart,
  getOrders,
  getSettings,
  getMenuItems,
  isAdminAuthed,
  subscribeStorage,
} from '../store/storage'
import type { CartLine, MenuItem, Order, Settings } from '../types'

function useLocalSnapshot<T>(getter: () => T): T {
  return useSyncExternalStore(subscribeStorage, getter, getter)
}

export function useCart(): CartLine[] {
  return useLocalSnapshot(getCart)
}

export function useOrders(): Order[] {
  return useLocalSnapshot(getOrders)
}

export function useSettings(): Settings {
  return useLocalSnapshot(getSettings)
}

export function useMenu(): MenuItem[] {
  return useLocalSnapshot(getMenuItems)
}

export function useAdminAuth(): boolean {
  return useLocalSnapshot(isAdminAuthed)
}

export function useCartBounce(count: number) {
  const [bounce, setBounce] = useState(false)
  useEffect(() => {
    if (count <= 0) return
    setBounce(true)
    const t = setTimeout(() => setBounce(false), 450)
    return () => clearTimeout(t)
  }, [count])
  return bounce
}
