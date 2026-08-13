import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Menu, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { CartDrawer } from '../components/customer/CartDrawer'
import { BusinessDiscoveryPill } from '../components/customer/BusinessDiscoveryPill'
import { SiteFooter } from '../components/customer/SiteFooter'
import { Container } from '../components/layout/LayoutPrimitives'
import { classNames } from '../lib/classNames'
import { useDemoStore } from '../store/demoStore'

export function CustomerLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const cartCount = useDemoStore((state) =>
    state.cart.reduce((count, line) => count + line.quantity, 0),
  )
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.hash, location.pathname])

  useEffect(() => {
    const syncScrollState = () => setIsScrolled(window.scrollY > 28)
    syncScrollState()
    window.addEventListener('scroll', syncScrollState, { passive: true })
    return () => window.removeEventListener('scroll', syncScrollState)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)
  const integratedHeader = isHome && !isScrolled && !isMenuOpen

  return (
    <div className="min-h-screen">
      <div className="relative z-50 bg-ovia-plum px-4 py-2 text-center text-[0.68rem] font-semibold tracking-[0.08em] text-white uppercase sm:text-xs">
        Private Ovia edit <span aria-hidden="true">•</span> Browse the current catalogue
      </div>
      <header
        className={classNames(
          'sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300',
          integratedHeader
            ? 'border-transparent bg-ovia-ivory/72 backdrop-blur-md'
            : 'border-ovia-line/85 bg-ovia-ivory/94 shadow-[0_5px_22px_rgb(41_35_39/0.045)] backdrop-blur-xl',
        )}
        data-header-state={integratedHeader ? 'integrated' : 'solid'}
      >
        <Container className="flex min-h-18 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
              className="flex size-11 items-center justify-center rounded-full text-ovia-plum transition-colors hover:bg-ovia-blush/50 md:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              type="button"
            >
              {isMenuOpen ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
            </button>
            <Link aria-label="Ovia Closet home" className="block overflow-hidden" onClick={closeMenu} to="/">
              <img alt="Ovia" className="size-12 object-cover" height="48" src="/brand/ovia-logo.jpg" width="48" />
            </Link>
          </div>
          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex lg:gap-8">
            <a className="text-[0.72rem] font-semibold tracking-[0.09em] text-ovia-muted uppercase transition-colors hover:text-ovia-primary" href="/#new-arrivals">New Arrivals</a>
            <a className="text-[0.72rem] font-semibold tracking-[0.09em] text-ovia-muted uppercase transition-colors hover:text-ovia-primary" href="/#dresses">Dresses</a>
            <a className="text-[0.72rem] font-semibold tracking-[0.09em] text-ovia-muted uppercase transition-colors hover:text-ovia-primary" href="/#tops">Tops</a>
            <a className="text-[0.72rem] font-semibold tracking-[0.09em] text-ovia-muted uppercase transition-colors hover:text-ovia-primary" href="/#kurtis">Kurtis</a>
            <Link
              className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-ovia-primary/18 bg-ovia-blush/48 px-3.5 text-ovia-plum transition-[background-color,border-color] duration-200 hover:border-ovia-primary/35 hover:bg-ovia-blush/72"
              data-testid="desktop-business-preview"
              to="/business"
            >
              <span className="hidden text-[0.53rem] font-bold tracking-[0.14em] text-ovia-primary uppercase lg:block">For Ovia team</span>
              <span className="text-[0.68rem] font-bold whitespace-nowrap">Business Preview</span>
              <ArrowRight aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" size={14} />
            </Link>
          </nav>
          <div className="flex items-center gap-1">
            <Link className="hidden min-h-11 items-center rounded-full px-3 text-sm font-semibold text-ovia-plum transition-colors hover:bg-ovia-blush/45 sm:inline-flex" to="/">Shop</Link>
            <Link
              aria-label="Business Preview for Ovia team"
              className="inline-flex min-h-10 items-center gap-1 rounded-full border border-ovia-primary/18 bg-ovia-blush/52 px-2.5 text-[0.62rem] font-bold text-ovia-plum transition-colors hover:bg-ovia-blush/78 md:hidden"
              data-testid="mobile-business-preview"
              to="/business"
            >
              <span>Business Preview</span>
              <ArrowRight aria-hidden="true" size={13} />
            </Link>
            <button
              aria-label={`Open bag with ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
              className="relative flex size-11 items-center justify-center rounded-full text-ovia-plum transition-colors hover:bg-ovia-blush/50"
              data-testid="header-bag-button"
              onClick={() => setIsCartOpen(true)}
              type="button"
            >
              <ShoppingBag aria-hidden="true" size={18} />
              <AnimatePresence mode="popLayout">
                {cartCount > 0 && (
                  <motion.span
                    animate={{ opacity: 1, scale: 1 }}
                    aria-live="polite"
                    className="absolute top-0 right-0 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-ovia-primary px-1 text-[0.65rem] font-bold text-white ring-2 ring-ovia-ivory"
                    data-testid="cart-badge"
                    exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 }}
                    initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.75 }}
                    key={cartCount}
                    transition={{ duration: 0.18 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </Container>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              animate={{ height: 'auto', opacity: 1 }}
              aria-label="Mobile navigation"
              className="overflow-hidden border-t border-ovia-line bg-ovia-ivory px-4 md:hidden"
              exit={{ height: 0, opacity: 0 }}
              initial={{ height: 0, opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            >
              <Container className="flex flex-col px-0 py-3">
                {[
                  ['New Arrivals', '/#new-arrivals'], ['Dresses', '/#dresses'], ['Tops', '/#tops'], ['One Shoulder', '/#one-shoulder'], ['Kurtis', '/#kurtis'],
                ].map(([label, href]) => (
                  <a className="flex min-h-12 items-center border-b border-ovia-line/70 text-sm font-semibold text-ovia-plum last:border-0" href={href} key={href} onClick={closeMenu}>{label}</a>
                ))}
                <Link className="mt-2 flex min-h-12 items-center justify-between bg-ovia-blush/55 px-3 text-sm font-semibold text-ovia-plum" onClick={closeMenu} to="/business">
                  Business Preview <span aria-hidden="true">→</span>
                </Link>
              </Container>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <motion.main
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 5 }}
        key={location.pathname}
        transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: 'easeOut' }}
      >
        <Outlet context={{ openCart: () => setIsCartOpen(true) }} />
      </motion.main>
      {!location.pathname.startsWith('/checkout') && <SiteFooter />}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {isHome && <BusinessDiscoveryPill />}
    </div>
  )
}
