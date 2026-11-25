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

  return (
    <section className="hero" aria-label="Hero">
      <div className="floating-food" aria-hidden>
        {floats.map((label) => (
          <div key={label} className="float-item" data-label={label} />
        ))}
      </div>
      <div className="hero-inner">
        <BrandSwitch brand={brand} onChange={onBrand} />
        <h1 className="hero-brand">{title}</h1>
        <p className="hero-sub">{tagline}</p>
        <div className="hero-meta">
          <div className="hours-pill">Open {hours}</div>
        </div>
        <div className="cta-row">
          <button type="button" className="btn btn-primary" onClick={onOrder}>
            Order Now
          </button>
          <a className="btn btn-ghost" href="#menu">
            View Menu
          </a>
        </div>
      </div>
    </section>
  )
}
