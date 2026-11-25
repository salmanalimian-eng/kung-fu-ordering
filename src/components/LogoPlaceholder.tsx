import type { BrandId } from '../types'

export function LogoPlaceholder({ brand, size = 42 }: { brand: BrandId; size?: number }) {
  const label = brand === 'kungfu' ? 'KF' : 'CC'
  return (
    <div
      className={`logo-placeholder ${brand === 'kungfu' ? 'kf' : 'cc'}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {label}
    </div>
  )
}
