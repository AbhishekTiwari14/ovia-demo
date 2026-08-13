import { motion } from 'motion/react'
import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { SellableProduct } from '../../data/productTypes'
import { formatInr } from '../../lib/currency'
import { classNames } from '../../lib/classNames'
import { useDemoStore } from '../../store/demoStore'

interface ProductCardProps {
  product: SellableProduct
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const isWishlisted = useDemoStore((state) =>
    state.wishlistProductIds.includes(product.id),
  )
  const toggleWishlist = useDemoStore((state) => state.toggleWishlist)

  return (
    <motion.article
      className="group min-w-0"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative overflow-hidden rounded-[1.15rem] bg-[#f3ebe6]">
        <Link
          aria-label={`View ${product.catalogueName}`}
          className="block"
          to={`/product/${product.slug}`}
        >
          <img
            alt={product.catalogueName}
            className="aspect-[4/5] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
            loading={priority ? 'eager' : 'lazy'}
            src={product.image}
          />
        </Link>
        <button
          aria-label={
            isWishlisted
              ? `Remove ${product.catalogueName} from wishlist`
              : `Add ${product.catalogueName} to wishlist`
          }
          aria-pressed={isWishlisted}
          className={classNames(
            'absolute top-3 right-3 flex size-10 items-center justify-center rounded-full border border-white/65 shadow-sm backdrop-blur-sm transition-colors',
            isWishlisted
              ? 'bg-ovia-primary text-white'
              : 'bg-white/88 text-ovia-plum hover:bg-ovia-blush',
          )}
          onClick={() => toggleWishlist(product.id)}
          type="button"
        >
          <Heart
            aria-hidden="true"
            fill={isWishlisted ? 'currentColor' : 'none'}
            size={18}
          />
        </button>
      </div>
      <div className="px-1 pt-3">
        <Link
          className="line-clamp-2 font-display text-[1.06rem] leading-snug text-ovia-ink transition-colors hover:text-ovia-primary sm:text-lg"
          to={`/product/${product.slug}`}
        >
          {product.catalogueName}
        </Link>
        <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">
          <p className="font-semibold text-ovia-plum">
            {formatInr(product.priceInPaise)}
          </p>
          <p className="text-xs text-ovia-muted">{product.sizes.join(' · ')}</p>
        </div>
      </div>
    </motion.article>
  )
}

