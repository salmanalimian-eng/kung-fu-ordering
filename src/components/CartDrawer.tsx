import { useState } from 'react'
import { formatPrice } from '../data/menu'
import {
  cartTotal,
  placeOrder,
  removeLine,
  updateQty,
} from '../store/storage'
import type { CartLine, Order, OrderStatus } from '../types'

type View = 'cart' | 'checkout' | 'confirm'

const STATUS_FLOW: OrderStatus[] = [
  'received',
  'preparing',
  'out_for_delivery',
  'delivered',
]

export function CartDrawer({
  open,
  onClose,
  lines,
}: {
  open: boolean
  onClose: () => void
  lines: CartLine[]
}) {
  const [view, setView] = useState<View>('cart')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [order, setOrder] = useState<Order | null>(null)

  const total = cartTotal(lines)

  const resetToCart = () => {
    setView('cart')
    setError('')
  }

  const handleClose = () => {
    onClose()
    if (view === 'confirm') {
      setTimeout(() => {
        setView('cart')
        setOrder(null)
        setName('')
        setPhone('')
        setAddress('')
        setNotes('')
      }, 300)
    }
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError('Name, phone, and address are required.')
      return
    }
    if (!lines.length) {
      setError('Cart is empty.')
      return
    }
    const created = placeOrder({
      customerName: name,
      phone,
      address,
      notes,
    })
    setOrder(created)
    setView('confirm')
    setError('')
  }

  return (
    <>
      <div
        className={`overlay ${open ? 'open' : ''}`}
        onClick={handleClose}
        aria-hidden={!open}
      />
      <aside
        className={`cart-drawer ${open ? 'open' : ''}`}
        aria-hidden={!open}
        aria-label="Cart"
      >
        <div className="drawer-head">
          <h2>
            {view === 'cart' && 'Your Cart'}
            {view === 'checkout' && 'Checkout'}
            {view === 'confirm' && 'Order Placed'}
          </h2>
          <button type="button" className="icon-btn" onClick={handleClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
        </div>

        {view === 'cart' && (
          <>
            <div className="drawer-body">
              {!lines.length ? (
                <div className="empty-cart">Your cart is empty. Add something delicious.</div>
              ) : (
                lines.map((line) => (
                  <div key={line.key} className="cart-line">
                    <div>
                      <strong>{line.name}</strong>
                      <div className="meta">
                        {line.size} · {formatPrice(line.unitPrice)} ·{' '}
                        {line.brand === 'kungfu' ? 'Kung Fu' : 'Canadian'}
                      </div>
                      <div className="qty-row" style={{ marginTop: 8 }}>
                        <button
                          type="button"
                          onClick={() => updateQty(line.key, line.qty - 1)}
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span>{line.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(line.key, line.qty + 1)}
                          aria-label="Increase"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          onClick={() => removeLine(line.key)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <strong>{formatPrice(line.unitPrice * line.qty)}</strong>
                  </div>
                ))
              )}
            </div>
            <div className="drawer-foot">
              <div className="total-row">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!lines.length}
                onClick={() => setView('checkout')}
              >
                Checkout
              </button>
            </div>
          </>
        )}

        {view === 'checkout' && (
          <div className="checkout-panel drawer-body">
            <form className="form-grid" onSubmit={submit}>
              <label>
                Name
                <input value={name} onChange={(e) => setName(e.target.value)} required />
              </label>
              <label>
                Phone
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  inputMode="tel"
                />
              </label>
              <label>
                Delivery address
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  required
                />
              </label>
              <label>
                Notes (optional)
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
              </label>
              <div className="payment-note">Payment: Cash on Delivery (COD)</div>
              <div className="total-row">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              {error ? <p style={{ color: 'var(--accent)', margin: 0 }}>{error}</p> : null}
              <button type="submit" className="btn btn-primary">
                Place Order
              </button>
              <button type="button" className="btn btn-ghost" onClick={resetToCart}>
                Back to Cart
              </button>
            </form>
          </div>
        )}

        {view === 'confirm' && order && (
          <div className="confirm-panel drawer-body">
            <p>Thanks, {order.customerName}!</p>
            <div className="order-no">{order.orderNo}</div>
            <p>We received your order. Track status below.</p>
            <div className="status-track">
              {STATUS_FLOW.map((s, i) => {
                const currentIdx = STATUS_FLOW.indexOf(order.status)
                const cls =
                  i < currentIdx ? 'done' : i === currentIdx ? 'current' : ''
                return (
                  <span key={s} className={`status-step ${cls}`}>
                    {s.replace(/_/g, ' ')}
                  </span>
                )
              })}
            </div>
            <p className="meta">Total {formatPrice(order.total)} · COD</p>
            <button type="button" className="btn btn-primary" onClick={handleClose}>
              Done
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
