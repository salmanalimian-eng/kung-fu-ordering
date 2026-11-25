import { useRef } from 'react'
import type { BrandId } from '../types'
import { BrandSwitch } from './BrandSwitch'

export function Hero({
  brand,
  onBrand,
  onOrder,
  hours,
}: {
  brand: BrandId
  onBrand: (b: BrandId) => void
  onOrder: () => void
  hours: string
}) {
  const floatRef = useRef<HTMLDivElement>(null)
  const title =
    brand === 'kungfu' ? 'Kung Fu Pan Asian' : 'Canadian Classics'
  const tagline =
    brand === 'kungfu'
      ? 'Chinese & Thai — fusion of flavors, made to order.'
      : 'Fast Food & Continental — classics done bold.'

  const floats =
    brand === 'kungfu'
      ? ['Rice', 'Gravy', 'Soup']
      : ['Pizza', 'Burger', 'Wings']

  // Subtle mouse parallax on the floating bubbles (desktop only, CSS vars → no re-render).
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = floatRef.current
    if (!el) return
    const r = e.currentTarget.getBoundingClientRect()
    el.style.setProperty('--px', `${((e.clientX - r.left) / r.width - 0.5).toFixed(3)}`)
    el.style.setProperty('--py', `${((e.clientY - r.top) / r.height - 0.5).toFixed(3)}`)
  }

  return (
    <section className="hero" aria-label="Hero" onMouseMove={onMove}>
      <div className="floating-food" aria-hidden ref={floatRef}>
        {floats.map((label) => (
          <div key={`${brand}-${label}`} className="float-slot">
            <div className="float-item" data-label={label} />
          </div>
        ))}
      </div>
      <div className="hero-inner">
        <BrandSwitch brand={brand} onChange={onBrand} />
        <h1 key={`t-${brand}`} className="hero-brand">
          {title}
        </h1>
        <p key={`s-${brand}`} className="hero-sub">
          {tagline}
        </p>
        <div className="hero-meta">
          <div className="hours-pill">Open {hours}</div>
        </div>
        <div className="cta-row">
          <button type="button" className="btn btn-primary btn-pulse" onClick={onOrder}>
            Order Now
          </button>
          <a className="btn btn-ghost" href="#menu">
            View Menu
          </a>
        </div>
      </div>
      <a className="scroll-hint" href="#menu" aria-label="Scroll to menu">
        <span />
      </a>
    </section>
  )
}
