import { foodImageFor } from '../data/foodImages'
import { formatPrice } from '../data/menu'
import type { MenuItem } from '../types'

export function DealsCarousel({
  deals,
  onPick,
}: {
  deals: MenuItem[]
  onPick: (item: MenuItem) => void
}) {
  if (!deals.length) return null
  const loop = [...deals, ...deals]

  return (
    <div className="deals-strip">
      <div className="section-head">
        <h2>Deals</h2>
      </div>
      <div className="deals-viewport">
        <div className="deals-track auto">
          {loop.map((deal, i) => (
            <article
              key={`${deal.id}-${i}`}
              className="deal-card"
              onClick={() => onPick(deal)}
              onKeyDown={(e) => e.key === 'Enter' && onPick(deal)}
              role="button"
              tabIndex={0}
            >
              <div className="deal-media">
                <img src={foodImageFor(deal)} alt={deal.name} loading="lazy" />
              </div>
              <h3 className="deal-name">{deal.name}</h3>
              <p className="deal-desc">{deal.description}</p>
              <div className="deal-price">{formatPrice(deal.sizes[0].price)}</div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
