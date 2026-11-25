import { useEffect, useMemo, useState } from 'react'
import { CC_CATEGORIES, KF_CATEGORIES } from '../data/menu'
import type { BrandId, MenuItem } from '../types'
import { DealsCarousel } from './DealsCarousel'
import { ItemCard } from './ItemCard'

export function MenuSection({
  brand,
  items,
  onJumpDeal,
}: {
  brand: BrandId
  items: MenuItem[]
  onJumpDeal?: (item: MenuItem) => void
}) {
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState('')

  const categories = brand === 'kungfu' ? KF_CATEGORIES : CC_CATEGORIES
  const brandItems = useMemo(
    () => items.filter((i) => i.brand === brand && i.available !== false),
    [items, brand],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return brandItems
    return brandItems.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        (i.description?.toLowerCase().includes(q) ?? false),
    )
  }, [brandItems, query])

  const byCategory = useMemo(() => {
    const map = new Map<string, MenuItem[]>()
    for (const cat of categories) {
      const list = filtered.filter((i) => i.category === cat)
      if (list.length) map.set(cat, list)
    }
    return map
  }, [filtered, categories])

  const deals = brandItems.filter((i) => i.isDeal)

  useEffect(() => {
    setActiveCat(categories[0] ?? '')
    setQuery('')
  }, [brand, categories])

  useEffect(() => {
    const cats = [...byCategory.keys()]
    if (!cats.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) {
          setActiveCat(visible.target.id.replace('cat-', ''))
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.4, 0.7] },
    )
    cats.forEach((c) => {
      const el = document.getElementById(`cat-${c}`)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [byCategory])

  const scrollToCat = (cat: string) => {
    setActiveCat(cat)
    document.getElementById(`cat-${cat}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="menu-section" id="menu">
      <div className="section-head">
        <h2>Menu</h2>
        <div className="search-wrap">
          <input
            type="search"
            placeholder="Search items…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search menu"
          />
        </div>
      </div>

      <DealsCarousel
        deals={deals}
        onPick={(item) => {
          onJumpDeal?.(item)
          document.getElementById(`cat-${item.category}`)?.scrollIntoView({
            behavior: 'smooth',
          })
        }}
      />

      <nav className="chips-bar" aria-label="Categories">
        {categories
          .filter((c) => byCategory.has(c) || !query)
          .map((cat) => (
            <button
              key={cat}
              type="button"
              className={`chip ${activeCat === cat ? 'active' : ''}`}
              onClick={() => scrollToCat(cat)}
            >
              {cat}
            </button>
          ))}
      </nav>

      {[...byCategory.entries()].map(([cat, list]) => (
        <div key={cat} className="category-block" id={`cat-${cat}`}>
          <h3>{cat}</h3>
          <div className="menu-grid">
            {list.map((item, idx) => (
              <ItemCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        </div>
      ))}

      {!byCategory.size ? (
        <p style={{ color: 'var(--text-muted)' }}>No items match your search.</p>
      ) : null}
    </section>
  )
}
