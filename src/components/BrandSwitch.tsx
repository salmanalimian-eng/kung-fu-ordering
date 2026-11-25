import type { BrandId } from '../types'

export function BrandSwitch({
  brand,
  onChange,
}: {
  brand: BrandId
  onChange: (b: BrandId) => void
}) {
  return (
    <div className="brand-switch" data-active={brand} role="tablist" aria-label="Brand">
      <div className="indicator" />
      <button
        type="button"
        role="tab"
        aria-selected={brand === 'kungfu'}
        className={brand === 'kungfu' ? 'active' : ''}
        onClick={() => onChange('kungfu')}
      >
        Kung Fu Pan Asian
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={brand === 'canadian'}
        className={brand === 'canadian' ? 'active' : ''}
        onClick={() => onChange('canadian')}
      >
        Canadian Classics
      </button>
    </div>
  )
}
