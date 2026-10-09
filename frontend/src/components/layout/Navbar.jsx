import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import { navigationItems, routePaths } from '../../constants/navigation'
import { siteConfig } from '../../constants/site'
import {
  buttonBaseClasses,
  buttonSizes,
  buttonVariants,
  containerClasses,
} from '../../styles/theme'
import { classNames } from '../../utils/classNames'

const SCROLLED_OFFSET = 80

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLLED_OFFSET)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  const navLinkClassName = ({ isActive }) =>
    classNames(
      'relative rounded-[14px] px-3 py-2 text-sm font-medium transition duration-300 after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-[var(--color-gold)] after:transition-transform after:duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2',
      isActive
        ? 'text-[#4A2B1B] after:scale-x-100'
        : 'text-[#4A2B1B] after:scale-x-0 hover:text-[var(--color-gold)] hover:after:scale-x-100',
    )

  return (
    <header
      className={classNames(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-[var(--color-gray-200)] bg-[rgba(255,255,255,0.96)] shadow-[0_8px_28px_rgba(26,26,26,0.04)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav
        className={classNames(
          containerClasses,
          'flex h-16 items-center justify-between md:h-[70px] lg:h-20',
        )}
        aria-label="Primary navigation"
      >
        <Link
          to={routePaths.home}
          className="flex items-center gap-2 rounded-[14px] text-base font-bold tracking-normal text-[var(--color-black)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2"
          aria-label={`${siteConfig.name} home`}
        >
          <img
            src="/brands/rsp-logo.png"
            alt=""
            className="h-8 w-8 object-contain"
            aria-hidden="true"
          />
          {siteConfig.name}
        </Link>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {navigationItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={navLinkClassName}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to={routePaths.franchiseEnquiry}
            className={classNames(
              buttonBaseClasses,
              buttonVariants.primary,
              buttonSizes.medium,
            )}
          >
            Franchise Enquiry
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-[14px] border border-[var(--color-gray-200)] bg-[rgba(255,255,255,0.86)] text-[var(--color-black)] shadow-[0_8px_24px_rgba(26,26,26,0.06)] backdrop-blur-xl transition hover:text-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 lg:hidden"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className="relative h-4 w-5" aria-hidden="true">
            <motion.span
              className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current"
              animate={isMenuOpen ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
            />
            <motion.span
              className="absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current"
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current"
              animate={isMenuOpen ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 top-16 z-40 bg-[rgba(5,5,5,0.18)] backdrop-blur-sm md:top-[70px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.aside
              id="mobile-navigation"
              ref={panelRef}
              className="ml-auto flex h-[calc(100vh-4rem)] w-full max-w-sm flex-col gap-6 border-l border-[var(--color-gray-200)] bg-[rgba(255,255,255,0.96)] p-6 shadow-[0_24px_70px_rgba(26,26,26,0.12)] backdrop-blur-2xl md:h-[calc(100vh-70px)]"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col gap-2">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      classNames(
                        'relative rounded-[14px] px-4 py-3 text-base font-medium transition after:absolute after:bottom-1 after:left-4 after:right-4 after:h-0.5 after:rounded-full after:bg-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2',
                        isActive
                          ? 'text-[#4A2B1B] after:scale-x-100'
                          : 'text-[#4A2B1B] after:scale-x-0 hover:text-[var(--color-gold)] hover:after:scale-x-100',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <Link
                to={routePaths.franchiseEnquiry}
                className={classNames(
                  buttonBaseClasses,
                  buttonVariants.primary,
                  buttonSizes.large,
                  'w-full',
                )}
              >
                Franchise Enquiry
              </Link>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
