import { BarChart3, Boxes, ClipboardList, LayoutDashboard } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

import { DemoModeIndicator } from '../components/business/DemoModeIndicator'
import { Container } from '../components/layout/LayoutPrimitives'
import { classNames } from '../lib/classNames'

const businessLinks = [
  { to: '/business', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/business/products', label: 'Products', icon: Boxes },
  { to: '/business/inventory', label: 'Inventory', icon: ClipboardList },
  { to: '/business/orders', label: 'Orders', icon: ClipboardList },
  { to: '/business/analytics', label: 'Analytics', icon: BarChart3 },
] as const

export function BusinessLayout() {
  return (
    <div className="min-h-screen bg-[#fffdfb]">
      <header className="border-b border-ovia-line bg-white">
        <Container className="flex min-h-18 flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-3">
            <img
              alt="Ovia"
              className="size-11 rounded-lg object-cover"
              height="44"
              src="/brand/ovia-logo.jpg"
              width="44"
            />
            <div>
              <p className="font-display text-lg text-ovia-plum">
                Business workspace
              </p>
              <p className="text-xs text-ovia-muted">Ovia Closet</p>
            </div>
          </div>
          <DemoModeIndicator />
        </Container>
      </header>
      <div className="border-b border-ovia-line bg-white">
        <Container>
          <nav
            aria-label="Business"
            className="flex gap-1 overflow-x-auto py-2"
          >
            {businessLinks.map(({ to, label, icon: Icon, ...linkProps }) => (
              <NavLink
                className={({ isActive }) =>
                  classNames(
                    'inline-flex min-h-10 shrink-0 items-center gap-2 rounded-control px-3 text-sm font-semibold transition-colors',
                    isActive
                      ? 'bg-ovia-blush text-ovia-plum'
                      : 'text-ovia-muted hover:bg-ovia-blush/35 hover:text-ovia-plum',
                  )
                }
                key={to}
                to={to}
                {...linkProps}
              >
                <Icon aria-hidden="true" size={16} />
                {label}
              </NavLink>
            ))}
          </nav>
        </Container>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
