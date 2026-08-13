import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { sellableProducts } from '../data/products'
import type { ProductSize } from '../data/productTypes'

export type AnalyticsPeriod = 'daily' | 'weekly' | 'monthly'
export type DemoOrderStatus = 'confirmed' | 'processing' | 'shipped'

export interface CartLine {
  id: string
  productId: string
  quantity: number
  size: ProductSize
  color?: string
}

export interface DemoOrder {
  id: string
  customerName: string
  amountInPaise: number
  status: DemoOrderStatus
}

export interface DemoData {
  cart: CartLine[]
  wishlistProductIds: string[]
  inventoryByProductId: Record<string, number>
  orders: DemoOrder[]
  analyticsPeriod: AnalyticsPeriod
}

interface DemoActions {
  addToCart: (line: Omit<CartLine, 'id'>) => string
  clearCart: () => void
  removeFromCart: (lineId: string) => void
  setAnalyticsPeriod: (period: AnalyticsPeriod) => void
  setCartQuantity: (lineId: string, quantity: number) => void
  setInventoryQuantity: (productId: string, quantity: number) => void
  toggleWishlist: (productId: string) => void
  resetDemo: () => void
}

export type DemoStore = DemoData & DemoActions

function getCartLineId(line: Omit<CartLine, 'id'>) {
  return [line.productId, line.size, line.color ?? 'default'].join(':')
}

function createInitialInventory() {
  return Object.fromEntries(
    sellableProducts.map((product, index) => [product.id, 6 + index * 2]),
  )
}

export function createInitialDemoData(): DemoData {
  return {
    cart: [],
    wishlistProductIds: [],
    inventoryByProductId: createInitialInventory(),
    orders: [
      {
        id: 'OVIA-DEMO-1001',
        customerName: 'Demo Customer',
        amountInPaise: 159_800,
        status: 'processing',
      },
    ],
    analyticsPeriod: 'weekly',
  }
}

export const useDemoStore = create<DemoStore>()(
  persist(
    (set) => ({
      ...createInitialDemoData(),
      addToCart: (line) => {
        const id = getCartLineId(line)

        set((state) => {
          const existingLine = state.cart.find((item) => item.id === id)

          return {
            cart: existingLine
              ? state.cart.map((item) =>
                  item.id === id
                    ? { ...item, quantity: item.quantity + line.quantity }
                    : item,
                )
              : [...state.cart, { ...line, id }],
          }
        })

        return id
      },
      clearCart: () => set({ cart: [] }),
      removeFromCart: (lineId) =>
        set((state) => ({
          cart: state.cart.filter((line) => line.id !== lineId),
        })),
      setAnalyticsPeriod: (analyticsPeriod) => set({ analyticsPeriod }),
      setCartQuantity: (lineId, quantity) =>
        set((state) => ({
          cart:
            quantity <= 0
              ? state.cart.filter((line) => line.id !== lineId)
              : state.cart.map((line) =>
                  line.id === lineId
                    ? { ...line, quantity: Math.trunc(quantity) }
                    : line,
                ),
        })),
      setInventoryQuantity: (productId, quantity) =>
        set((state) => ({
          inventoryByProductId: {
            ...state.inventoryByProductId,
            [productId]: Math.max(0, Math.trunc(quantity)),
          },
        })),
      toggleWishlist: (productId) =>
        set((state) => ({
          wishlistProductIds: state.wishlistProductIds.includes(productId)
            ? state.wishlistProductIds.filter((id) => id !== productId)
            : [...state.wishlistProductIds, productId],
        })),
      resetDemo: () => set(createInitialDemoData()),
    }),
    {
      name: 'ovia-demo:v1',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: ({
        cart,
        wishlistProductIds,
        inventoryByProductId,
        orders,
        analyticsPeriod,
      }) => ({
        cart,
        wishlistProductIds,
        inventoryByProductId,
        orders,
        analyticsPeriod,
      }),
    },
  ),
)
