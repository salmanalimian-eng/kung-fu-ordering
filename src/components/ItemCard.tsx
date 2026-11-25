import { useState } from 'react'
import { foodImageFor } from '../data/foodImages'
import { formatPrice } from '../data/menu'
import { useInView } from '../hooks/useInView'
import { useCart } from '../hooks/useStore'
import { addToCart, updateQty } from '../store/storage'
import type { MenuItem } from '../types'

/** Small dot that flies from the "Add to Cart" button to the header cart icon. */
function flyToCart(from: HTMLElement) {
  const target = document.querySelector<HTMLElement>('[data-cart-btn]')
  if (!target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const a = from.getBoundingClientRect()
  const b = target.getBoundingClientRect()
  const dot = document.createElement('div')
  dot.className = 'fly-dot'
  dot.style.left = `${a.left + a.width / 2 - 9}px`
  dot.style.top = `${a.top + a.height / 2 - 9}px`
  document.body.appendChild(dot)
  const dx = b.left + b.width / 2 - (a.left + a.width / 2)
  const dy = b.top + b.height / 2 - (a.top + a.height / 2)
  const anim = dot.animate(
    [
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 70}px) scale(1.15)`, opacity: 1, offset: 0.5 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.3)`, opacity: 0.4 },
    ],
    { duration: 650, easing: 'cubic-bezier(0.5, 0, 0.75, 0.4)' },
  )
  anim.onfinish = () => dot.remove()
}

export function ItemCard({ item, index }: { item: MenuItem; index: number }) {
  const [sizeIdx, setSizeIdx] = useState(0)
  const [imgFailed, setImgFailed] = useState(false)
  const cart = useCart()
  const { ref, inView } = useInView<HTMLElement>()
  const size = item.sizes[sizeIdx] ?? item.sizes[0]
  const initial = item.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
  const imageSrc = foodImageFor(item)

  const line = cart.find((l) => l.key === `${item.id}::${size.label}`)

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    addToCart(item, size.label, size.price)
    flyToCart(e.currentTarget)
  }

  return (
    <article
      ref={ref}
      className={`item-card reveal ${inView ? 'in' : ''}`}
      style={{ '--rd': `${(index % 4) * 0.06}s` } as React.CSSProperties}
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
          <div key={size.price} className="item-price price-pop">
            {formatPrice(size.price)}
          </div>
          {line ? (
            <div className="card-stepper" role="group" aria-label={`${item.name} quantity`}>
              <button
                type="button"
                aria-label="Decrease"
                onClick={() => updateQty(line.key, line.qty - 1)}
              >
                −
              </button>
              <span key={line.qty} className="qty-num">
                {line.qty}
              </span>
              <button type="button" aria-label="Increase" onClick={handleAdd}>
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              disabled={item.available === false}
              onClick={handleAdd}
            >
              {item.available === false ? 'Out of stock' : 'Add to Cart'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
