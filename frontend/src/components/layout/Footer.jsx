import { Link } from 'react-router-dom'
import {
  contactLinks,
  footerLinks,
  socialLinks,
} from '../../constants/navigation'
import { siteConfig } from '../../constants/site'
import { Container } from '../ui'

const FooterLinkList = ({ title, links }) => {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--color-gold)]">
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.path}
              className="footer-link text-sm transition focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-gray-900)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[rgba(255,255,255,0.08)] bg-[#111111]">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <Link
              to="/"
              className="text-lg font-bold text-[var(--color-white)] focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-gray-900)]"
            >
              {siteConfig.name}
            </Link>
            <p className="mt-4 text-sm leading-6 text-[rgba(255,255,255,0.72)]">
              {siteConfig.description}
            </p>
          </div>

          <FooterLinkList title="Company" links={footerLinks.company} />
          <FooterLinkList title="Quick Links" links={footerLinks.quickLinks} />
          <FooterLinkList title="Brands" links={footerLinks.brands} />

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--color-gold)]">
              Contact
            </h2>
            <ul className="mt-4 space-y-3">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="footer-link text-sm transition focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-gray-900)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {socialLinks.length > 0 && <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--color-gold)]">
              Social Media
            </h2>
            {socialLinks.length > 0 && (
              <ul className="mt-4 space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noreferrer"
                      className="footer-link text-sm transition focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-gray-900)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[rgba(255,255,255,0.1)] pt-6 text-sm text-[rgba(255,255,255,0.58)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {siteConfig.legalName}. {siteConfig.copyright}
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
