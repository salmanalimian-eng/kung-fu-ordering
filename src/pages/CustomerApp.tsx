import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartDrawer } from '../components/CartDrawer'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { LogoPlaceholder } from '../components/LogoPlaceholder'
import { MenuSection } from '../components/MenuSection'
import { useCart, useCartBounce, useMenu, useSettings } from '../hooks/useStore'
import type { BrandId } from '../types'

export function CustomerApp() {
  const [brand, setBrand] = useState<BrandId>('kungfu')
  const [cartOpen, setCartOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [wipe, setWipe] = useState(0)
  const cart = useCart()
  const menu = useMenu()
  const settings = useSettings()
  const count = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart])
  const bounce = useCartBounce(count)

  const brandName =
    brand === 'kungfu' ? 'Kung Fu Pan Asian' : 'Canadian Classics'
  const tagline = brand === 'kungfu' ? 'Chinese & Thai' : 'Fast Food & Continental'
  const hours = `${settings.openTime} – ${settings.closeTime}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const changeBrand = (b: BrandId) => {
    if (b === brand) return
    setBrand(b)
    setWipe((n) => n + 1)
  }

  return (
    <div className="app-shell" data-brand={brand}>
      {wipe > 0 ? <div key={wipe} className="brand-wipe" aria-hidden /> : null}
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="brand-mark">
          <LogoPlaceholder key={brand} brand={brand} />
          <div className="brand-titles">
            <div key={brand} className="name swap-in">{brandName}</div>
            <div className="tag">{tagline}</div>
          </div>
        </div>
        <div className="header-actions">
          <Link to="/admin" className="admin-link">
            Admin
          </Link>
          <button
            type="button"
            data-cart-btn
            className={`icon-btn ${bounce ? 'bounce' : ''}`}
            aria-label={`Cart, ${count} items`}
            onClick={() => setCartOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6h15l-1.5 9h-12z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="20" r="1.4" fill="currentColor" />
              <circle cx="18" cy="20" r="1.4" fill="currentColor" />
              <path d="M6 6L5 3H2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {count > 0 ? (
              <span key={count} className="badge">
                {count}
              </span>
            ) : null}
          </button>
        </div>
      </header>

      <main>
        <Hero
          brand={brand}
          onBrand={changeBrand}
          hours={hours}
          onOrder={() => {
            document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
          }}
        />
        <MenuSection brand={brand} items={menu} />
      </main>

      <Footer settings={settings} />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} lines={cart} />
    </div>
  )
}
