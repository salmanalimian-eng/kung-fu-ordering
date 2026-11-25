import type { Settings } from '../types'
import { LogoPlaceholder } from './LogoPlaceholder'

export function Footer({ settings }: { settings: Settings }) {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <LogoPlaceholder brand="kungfu" size={36} />
            <LogoPlaceholder brand="canadian" size={36} />
          </div>
          <h3>Kung Fu × Canadian Classics</h3>
          <p>{settings.address}</p>
          <span className="delivery-badge">Home Delivery Available</span>
        </div>
        <div>
          <h3>Hours</h3>
          <p>
            {settings.openTime} – {settings.closeTime}
          </p>
        </div>
        <div>
          <h3>Contact / WhatsApp</h3>
          <p>
            <a href={`https://wa.me/92${settings.whatsapp.replace(/\D/g, '').replace(/^0/, '')}`}>
              {settings.whatsapp}
            </a>
          </p>
          <p>
            <a href={`tel:${settings.phone2}`}>{settings.phone2}</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
