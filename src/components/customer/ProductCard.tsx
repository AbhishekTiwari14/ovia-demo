import { Check, Heart, Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import type { CommerceProduct } from '../../data/productTypes'
import { formatInr } from '../../lib/currency'
import { classNames } from '../../lib/classNames'
import { useDemoStore } from '../../store/demoStore'

interface ProductCardProps {
  badge?: string
  onOpenCart?: () => void
  priority?: boolean
  product: CommerceProduct
  variant?: 'standard' | 'featured'
}

type QuickAddState = 'idle' | 'adding' | 'added'

export function ProductCard({
  badge,
  onOpenCart,
  priority = false,
  product,
  variant = 'standard',
}: ProductCardProps) {
  const isWishlisted = useDemoStore((state) =>
    state.wishlistProductIds.includes(product.id),
  )
  const addToCart = useDemoStore((state) => state.addToCart)
  const toggleWishlist = useDemoStore((state) => state.toggleWishlist)
  const [quickAddState, setQuickAddState] = useState<QuickAddState>('idle')
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  const handleQuickAdd = () => {
    if (quickAddState !== 'idle') return
    const size = product.sizes[0]
    if (!size) return
    const color = product.colors.find((item) => item.selectable)?.label

    setQuickAddState('adding')
    timers.current.push(window.setTimeout(() => {
      addToCart({ productId: product.id, quantity: 1, size, ...(color ? { color } : {}) })
      setQuickAddState('added')
    }, 160))
    timers.current.push(window.setTimeout(() => onOpenCart?.(), 520))
    timers.current.push(window.setTimeout(() => setQuickAddState('idle'), 1_000))
  }

  const quickAddVariant = [product.sizes[0], product.colors.find((item) => item.selectable)?.label]
    .filter(Boolean)
    .join(' / ')
  const quickAddLabel = quickAddState === 'adding'
    ? 'Adding…'
    : quickAddState === 'added'
      ? 'Added to bag'
      : `Quick add · ${quickAddVariant}`

  return (
    <article
      className={classNames('group min-w-0', variant === 'featured' && 'lg:grid lg:grid-cols-[1fr_15rem] lg:items-end lg:gap-7')}
    >
      <div className="relative overflow-hidden bg-[#f1e8e2]">
        <Link
          aria-label={`View ${product.catalogueName}`}
          className="block overflow-hidden"
          to={`/product/${product.slug}`}
        >
          <img
            alt={product.catalogueName}
            className={classNames(
              'w-full object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.025]',
              variant === 'featured' ? 'aspect-[4/5] lg:aspect-[4/5]' : 'aspect-[4/5]',
            )}
            loading={priority ? 'eager' : 'lazy'}
            src={product.image}
          />
        </Link>

        {badge && (
          <span className="absolute top-3 left-3 bg-ovia-ivory/92 px-2.5 py-1 text-[0.59rem] font-bold tracking-[0.14em] text-ovia-plum uppercase backdrop-blur-sm sm:top-4 sm:left-4">
            {badge}
          </span>
        )}

        <button
          aria-label={isWishlisted ? `Remove ${product.catalogueName} from wishlist` : `Add ${product.catalogueName} to wishlist`}
          aria-pressed={isWishlisted}
          className={classNames(
            'absolute top-2.5 right-2.5 flex size-11 items-center justify-center rounded-full border border-white/60 shadow-sm backdrop-blur-sm transition-[opacity,background-color,color,transform] duration-250 active:translate-y-px md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:translate-y-0 md:focus-visible:opacity-100',
            isWishlisted ? 'bg-ovia-primary text-white opacity-100' : 'bg-white/88 text-ovia-plum hover:bg-ovia-blush',
          )}
          onClick={() => toggleWishlist(product.id)}
          type="button"
        >
          <Heart aria-hidden="true" fill={isWishlisted ? 'currentColor' : 'none'} size={18} />
        </button>

        <button
          aria-live="polite"
          className="flex min-h-11 w-full items-center justify-center gap-2 border-b border-ovia-line bg-ovia-ivory/96 px-2 text-[0.62rem] font-bold tracking-[0.06em] text-ovia-plum uppercase backdrop-blur-md transition-[opacity,transform,background-color] duration-250 hover:bg-white active:translate-y-px disabled:cursor-wait sm:px-3 sm:text-[0.68rem] md:absolute md:inset-x-4 md:bottom-4 md:w-auto md:border-0 md:shadow-sm md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:translate-y-0 md:focus-visible:opacity-100"
          data-testid={`quick-add-${product.slug}`}
          disabled={quickAddState !== 'idle'}
          onClick={handleQuickAdd}
          type="button"
        >
          {quickAddState === 'added' ? <Check aria-hidden="true" size={16} /> : <Plus aria-hidden="true" size={16} />}
          {quickAddLabel}
        </button>
      </div>

      <div className={classNames('pt-3.5', variant === 'featured' && 'lg:pb-2')}>
        {variant === 'featured' && <p className="type-eyebrow mb-2 hidden lg:block">The statement piece</p>}
        <Link
          className={classNames(
            'line-clamp-2 font-sans leading-snug text-ovia-ink transition-colors hover:text-ovia-primary',
            variant === 'featured' ? 'text-lg sm:text-xl lg:text-2xl' : 'text-sm sm:text-base',
          )}
          to={`/product/${product.slug}`}
        >
          {product.catalogueName}
        </Link>
        <p className={classNames('mt-1.5 font-sans font-semibold text-ovia-plum', variant === 'featured' ? 'text-base lg:text-lg' : 'text-sm sm:text-base')}>
          {formatInr(product.priceInPaise)}
        </p>
        <p className="mt-2 text-[0.67rem] tracking-[0.04em] text-ovia-muted sm:text-xs">
          Sizes {product.sizes.join(' · ')}
        </p>
      </div>
    </article>
  )
}
