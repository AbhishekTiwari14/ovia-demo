import { Menu, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { Container } from '../components/layout/LayoutPrimitives'
import { CartDrawer } from '../components/customer/CartDrawer'
import { SiteFooter } from '../components/customer/SiteFooter'
import { useDemoStore } from '../store/demoStore'

export function CustomerLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cartCount = useDemoStore((state) =>
    state.cart.reduce((count, line) => count + line.quantity, 0),
  )
  const location = useLocation()

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <div className="min-h-screen">
      <div className="bg-ovia-plum px-4 py-2 text-center text-[0.68rem] font-semibold tracking-[0.08em] text-white uppercase sm:text-xs">
        Private Ovia edit <span aria-hidden="true">•</span> Browse the current catalogue
      </div>
      <header className="sticky top-0 z-40 border-b border-ovia-line bg-ovia-ivory/94 backdrop-blur-xl">
        <Container className="flex min-h-18 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
              className="flex size-11 items-center justify-center rounded-full text-ovia-plum hover:bg-ovia-blush/50 md:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              type="button"
            >
              {isMenuOpen ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
            </button>
            <Link
              aria-label="Ovia Closet home"
              className="block overflow-hidden rounded-xl"
              onClick={closeMenu}
              to="/"
            >
              <img
                alt="Ovia"
                className="size-12 object-cover"
                height="48"
                src="/brand/ovia-logo.jpg"
                width="48"
              />
            </Link>
          </div>
          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            <a className="text-sm font-semibold text-ovia-muted hover:text-ovia-primary" href="/#new-arrivals">New Arrivals</a>
            <a className="text-sm font-semibold text-ovia-muted hover:text-ovia-primary" href="/#dresses">Dresses</a>
            <a className="text-sm font-semibold text-ovia-muted hover:text-ovia-primary" href="/#tops">Tops</a>
            <a className="text-sm font-semibold text-ovia-muted hover:text-ovia-primary" href="/#kurtis">Kurtis</a>
          </nav>
          <div className="flex items-center gap-1">
            <Link
              className="hidden min-h-11 items-center rounded-full px-3 text-sm font-semibold text-ovia-plum hover:bg-ovia-blush/45 sm:inline-flex"
              to="/"
            >
              Shop
            </Link>
            <button
              aria-label={`Open bag with ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
              className="relative flex size-11 items-center justify-center rounded-full text-ovia-plum hover:bg-ovia-blush/50"
              data-testid="header-bag-button"
              onClick={() => setIsCartOpen(true)}
              type="button"
            >
              <ShoppingBag aria-hidden="true" size={18} />
              {cartCount > 0 && (
                <span
                  aria-live="polite"
                  className="absolute top-0 right-0 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-ovia-primary px-1 text-[0.65rem] font-bold text-white ring-2 ring-ovia-ivory"
                  data-testid="cart-badge"
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </Container>
        {isMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="border-t border-ovia-line bg-ovia-ivory px-4 py-3 md:hidden"
          >
            <Container className="flex flex-col px-0">
              {[
                ['New Arrivals', '/#new-arrivals'],
                ['Dresses', '/#dresses'],
                ['Tops', '/#tops'],
                ['One Shoulder', '/#one-shoulder'],
                ['Kurtis', '/#kurtis'],
              ].map(([label, href]) => (
                <a
                  className="flex min-h-11 items-center border-b border-ovia-line/70 text-sm font-semibold text-ovia-plum last:border-0"
                  href={href}
                  key={href}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              ))}
            </Container>
          </nav>
        )}
      </header>
      <main>
        <Outlet context={{ openCart: () => setIsCartOpen(true) }} />
      </main>
      {!location.pathname.startsWith('/checkout') && <SiteFooter />}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
