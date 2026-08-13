import { Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import { findProductBySlug, sellableProducts } from '../../data/products'
import { formatInr } from '../../lib/currency'
import { useDemoStore, type CartLine } from '../../store/demoStore'

interface CartLineItemProps {
  line: CartLine
  compact?: boolean
}

export function CartLineItem({ line, compact = false }: CartLineItemProps) {
  const removeFromCart = useDemoStore((state) => state.removeFromCart)
  const setCartQuantity = useDemoStore((state) => state.setCartQuantity)
  const product = sellableProducts.find((item) => item.id === line.productId)

  if (!product) {
    return null
  }

  return (
    <article
      className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-ovia-line py-5 last:border-b-0"
      data-testid={`cart-line-${product.slug}`}
    >
      <Link
        className="overflow-hidden rounded-2xl bg-ovia-blush/25"
        to={`/product/${product.slug}`}
      >
        <img
          alt={product.catalogueName}
          className="aspect-[4/5] h-full w-full object-cover"
          src={product.image}
        />
      </Link>
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              className="font-display text-lg leading-tight text-ovia-ink hover:text-ovia-primary"
              to={`/product/${product.slug}`}
            >
              {product.catalogueName}
            </Link>
            <p className="mt-1 text-sm text-ovia-muted">
              Size <span className="font-semibold text-ovia-ink">{line.size}</span>
              {line.color ? <span> · {line.color}</span> : null}
            </p>
          </div>
          <button
            aria-label={`Remove ${product.catalogueName} from bag`}
            className="flex size-10 shrink-0 items-center justify-center rounded-full text-ovia-muted transition-colors hover:bg-ovia-blush/55 hover:text-ovia-plum"
            onClick={() => removeFromCart(line.id)}
            type="button"
          >
            <Trash2 aria-hidden="true" size={17} />
          </button>
        </div>
        <p className="mt-2 font-semibold text-ovia-plum">
          {formatInr(product.priceInPaise * line.quantity)}
        </p>
        <div
          aria-label={`Quantity for ${product.catalogueName}`}
          className="mt-3 inline-flex items-center rounded-full border border-ovia-line bg-white"
        >
          <button
            aria-label="Decrease quantity"
            className="flex size-9 items-center justify-center rounded-full text-ovia-plum hover:bg-ovia-blush/45"
            onClick={() => setCartQuantity(line.id, line.quantity - 1)}
            type="button"
          >
            <Minus aria-hidden="true" size={15} />
          </button>
          <span
            aria-live="polite"
            className="min-w-8 text-center text-sm font-semibold"
          >
            {line.quantity}
          </span>
          <button
            aria-label="Increase quantity"
            className="flex size-9 items-center justify-center rounded-full text-ovia-plum hover:bg-ovia-blush/45"
            onClick={() => setCartQuantity(line.id, line.quantity + 1)}
            type="button"
          >
            <Plus aria-hidden="true" size={15} />
          </button>
        </div>
        {!compact && (
          <span className="sr-only">
            Catalogue reference {findProductBySlug(product.slug)?.source.fileName}
          </span>
        )}
      </div>
    </article>
  )
}
