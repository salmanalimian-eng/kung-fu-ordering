import { useState } from 'react'
import { foodImageFor } from '../data/foodImages'
import { formatPrice } from '../data/menu'
import { addToCart } from '../store/storage'
import type { MenuItem } from '../types'

export function ItemCard({ item, index }: { item: MenuItem; index: number }) {
  const [sizeIdx, setSizeIdx] = useState(0)
  const [imgFailed, setImgFailed] = useState(false)
  const size = item.sizes[sizeIdx] ?? item.sizes[0]
  const initial = item.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
  const imageSrc = foodImageFor(item)

  return (
    <article
      className="item-card"
      style={{ animationDelay: `${Math.min(index, 8) * 0.04}s` }}
    >
      <div className="item-media">
        {!imgFailed ? (
          <img
            src={imageSrc}
            alt={item.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span>{initial || '•'}</span>
        )}
      </div>
      <div className="item-body">
        <h4>{item.name}</h4>
        {item.description ? <p className="item-desc">{item.description}</p> : null}
        {item.sizes.length > 1 ? (
          <div className="size-row" role="group" aria-label="Size">
            {item.sizes.map((s, i) => (
              <button
                key={s.label}
                type="button"
                className={`size-btn ${i === sizeIdx ? 'active' : ''}`}
                onClick={() => setSizeIdx(i)}
              >
                {s.label}
              </button>
            ))}
          </div>
        ) : null}
        <div className="item-actions">
          <div className="item-price">{formatPrice(size.price)}</div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            disabled={item.available === false}
            onClick={() => addToCart(item, size.label, size.price)}
          >
            {item.available === false ? 'Out of stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  )
}
