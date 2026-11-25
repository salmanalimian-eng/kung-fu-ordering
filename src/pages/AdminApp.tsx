import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../data/menu'
import { useAdminAuth, useMenu, useOrders, useSettings } from '../hooks/useStore'
import {
  ADMIN_PASS,
  ADMIN_USER,
  adminLogin,
  adminLogout,
  saveMenuOverride,
  saveSettings,
  updateOrderStatus,
} from '../store/storage'
import type { OrderStatus, Settings } from '../types'

type Tab = 'orders' | 'menu' | 'deals' | 'settings'

const STATUSES: OrderStatus[] = [
  'received',
  'preparing',
  'out_for_delivery',
  'delivered',
  'cancelled',
]

function playAlert() {
  try {
    const ctx = new AudioContext()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o.frequency.value = 880
    g.gain.value = 0.08
    o.connect(g)
    g.connect(ctx.destination)
    o.start()
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35)
    o.stop(ctx.currentTime + 0.4)
  } catch {
    /* ignore */
  }
}

export function AdminApp() {
  const authed = useAdminAuth()
  const orders = useOrders()
  const menu = useMenu()
  const settings = useSettings()
  const [tab, setTab] = useState<Tab>('orders')
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [loginError, setLoginError] = useState('')
  const [settingsForm, setSettingsForm] = useState<Settings>(settings)
  const knownIds = useRef<Set<string>>(new Set())
  const primed = useRef(false)

  useEffect(() => {
    setSettingsForm(settings)
  }, [settings])

  useEffect(() => {
    if (!authed) return
    if (!primed.current) {
      knownIds.current = new Set(orders.map((o) => o.id))
      primed.current = true
      return
    }
    const fresh = orders.filter((o) => !knownIds.current.has(o.id))
    if (fresh.length) {
      playAlert()
      fresh.forEach((o) => knownIds.current.add(o.id))
    }
  }, [orders, authed])

  if (!authed) {
    return (
      <div className="admin-login">
        <form
          className="login-card form-grid"
          onSubmit={(e) => {
            e.preventDefault()
            if (adminLogin(user.trim(), pass)) {
              setLoginError('')
            } else {
              setLoginError('Invalid username or password.')
            }
          }}
        >
          <h1>Admin Login</h1>
          <p>
            Prototype credentials: <code>{ADMIN_USER}</code> / <code>{ADMIN_PASS}</code>
          </p>
          <label>
            Username
            <input value={user} onChange={(e) => setUser(e.target.value)} autoComplete="username" />
          </label>
          <label>
            Password
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          {loginError ? <p style={{ color: '#d9261c', margin: 0 }}>{loginError}</p> : null}
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
          <Link to="/" className="btn btn-ghost">
            Back to site
          </Link>
        </form>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-shell">
        <nav className="admin-nav">
          <h2>KF Admin</h2>
          {(
            [
              ['orders', 'Live Orders'],
              ['menu', 'Menu Manager'],
              ['deals', 'Deals Manager'],
              ['settings', 'Settings'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={tab === id ? 'active' : ''}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
          <Link to="/">View site</Link>
          <button
            type="button"
            onClick={() => {
              adminLogout()
              primed.current = false
            }}
          >
            Log out
          </button>
        </nav>

        <main className="admin-main">
          {tab === 'orders' && (
            <>
              <h1>Live Orders</h1>
              {!orders.length ? (
                <p className="stub-note">No orders yet. Place one from the customer site.</p>
              ) : (
                <div className="order-list">
                  {orders.map((order, idx) => (
                    <article
                      key={order.id}
                      className={`order-card ${idx === 0 && order.status === 'received' ? 'new' : ''}`}
                    >
                      <div className="order-top">
                        <div>
                          <strong>{order.orderNo}</strong>
                          <div style={{ fontSize: '0.85rem', color: '#9aa3b2' }}>
                            {new Date(order.createdAt).toLocaleString('en-PK', {
                              timeZone: 'Asia/Karachi',
                            })}{' '}
                            (Asia/Karachi)
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {order.brands.map((b) => (
                            <span key={b} className={`brand-tag ${b}`}>
                              {b === 'kungfu' ? 'Kung Fu' : 'Canadian Classics'}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p>
                        <strong>{order.customerName}</strong> · {order.phone}
                      </p>
                      <p style={{ color: '#9aa3b2' }}>{order.address}</p>
                      {order.notes ? <p>Notes: {order.notes}</p> : null}
                      <ul>
                        {order.items.map((it, i) => (
                          <li key={i}>
                            {it.qty}× {it.name} ({it.size}) — {formatPrice(it.price * it.qty)}
                          </li>
                        ))}
                      </ul>
                      <div className="order-top">
                        <strong>Total {formatPrice(order.total)} · COD</strong>
                        <select
                          className="status-select"
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value as OrderStatus)
                          }
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s.replace(/_/g, ' ')}
                            </option>
                          ))}
                        </select>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}

          {tab === 'menu' && (
            <>
              <h1>Menu Manager</h1>
              <p className="stub-note">
                Phase 2 stub: toggle availability and note price edits. Full CRUD + image upload
                lands in Phase 3.
              </p>
              {menu.map((item) => (
                <div key={item.id} className="menu-admin-row">
                  <div>
                    <strong>{item.name}</strong>
                    <div style={{ fontSize: '0.8rem', color: '#9aa3b2' }}>
                      {item.brand} · {item.category} ·{' '}
                      {item.sizes.map((s) => `${s.label} ${formatPrice(s.price)}`).join(' / ')}
                    </div>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={item.available !== false}
                      onChange={(e) =>
                        saveMenuOverride(item.id, { available: e.target.checked })
                      }
                    />
                    Available
                  </label>
                </div>
              ))}
            </>
          )}

          {tab === 'deals' && (
            <>
              <h1>Deals Manager</h1>
              <p className="stub-note">
                Phase 2 stub: deals mirror menu items marked as deals. Edit contents/prices in Phase
                3 with backend.
              </p>
              {menu
                .filter((i) => i.isDeal)
                .map((deal) => (
                  <div key={deal.id} className="menu-admin-row">
                    <div>
                      <strong>{deal.name}</strong>
                      <div style={{ fontSize: '0.8rem', color: '#9aa3b2' }}>
                        {deal.description}
                      </div>
                    </div>
                    <strong>{formatPrice(deal.sizes[0].price)}</strong>
                  </div>
                ))}
            </>
          )}

          {tab === 'settings' && (
            <>
              <h1>Settings</h1>
              <form
                className="form-grid"
                style={{ maxWidth: 480 }}
                onSubmit={(e) => {
                  e.preventDefault()
                  saveSettings(settingsForm)
                }}
              >
                <label>
                  Open time
                  <input
                    value={settingsForm.openTime}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, openTime: e.target.value })
                    }
                  />
                </label>
                <label>
                  Close time
                  <input
                    value={settingsForm.closeTime}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, closeTime: e.target.value })
                    }
                  />
                </label>
                <label>
                  WhatsApp
                  <input
                    value={settingsForm.whatsapp}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, whatsapp: e.target.value })
                    }
                  />
                </label>
                <label>
                  Phone 2
                  <input
                    value={settingsForm.phone2}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, phone2: e.target.value })
                    }
                  />
                </label>
                <label>
                  Address
                  <textarea
                    rows={3}
                    value={settingsForm.address}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, address: e.target.value })
                    }
                  />
                </label>
                <p className="stub-note">
                  Delivery fee and minimum order are open questions — left unset for Phase 2.
                </p>
                <button type="submit" className="btn btn-primary">
                  Save settings
                </button>
              </form>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
