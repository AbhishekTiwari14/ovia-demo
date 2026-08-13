import { createBrowserRouter } from 'react-router-dom'

import { BusinessLayout } from './BusinessLayout'
import { CustomerLayout } from './CustomerLayout'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { FoundationPage } from '../pages/FoundationPage'
import { HomePage } from '../pages/HomePage'
import { ProductRoutePage } from '../pages/ProductRoutePage'

export const router = createBrowserRouter([
  {
    element: <CustomerLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      { path: '/product/:slug', element: <ProductRoutePage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/checkout', element: <CheckoutPage /> },
    ],
  },
  {
    path: '/business',
    element: <BusinessLayout />,
    children: [
      {
        index: true,
        element: (
          <FoundationPage
            area="business"
            description="The business shell, simulated-data disclosure, persistence, and reset control are ready. Dashboard design is deferred."
            title="Business overview reserved"
          />
        ),
      },
      {
        path: 'products',
        element: (
          <FoundationPage
            area="business"
            description="The products destination is connected to the verified catalogue model. Product management UI is deferred."
            title="Products route reserved"
          />
        ),
      },
      {
        path: 'inventory',
        element: (
          <FoundationPage
            area="business"
            description="Persisted simulated inventory state is available for the future inventory editor."
            title="Inventory route reserved"
          />
        ),
      },
      {
        path: 'orders',
        element: (
          <FoundationPage
            area="business"
            description="The simulated orders destination is reserved. No real customer or payment data is used."
            title="Orders route reserved"
          />
        ),
      },
      {
        path: 'analytics',
        element: (
          <FoundationPage
            area="business"
            description="Recharts and Motion are installed for the later analytics phase; no metrics are presented as real Ovia data."
            title="Analytics route reserved"
          />
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <FoundationPage
        area="customer"
        description="This destination is not part of the Phase 1 route map."
        title="Page not found"
      />
    ),
  },
])
