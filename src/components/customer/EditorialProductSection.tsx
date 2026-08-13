import type { CommerceProduct } from '../../data/productTypes'
import { ProductCard } from './ProductCard'

interface EditorialProductSectionProps {
  anchorIds?: readonly string[]
  copy: string
  eyebrow: string
  featuredProduct: CommerceProduct
  id: string
  index: string
  onOpenCart?: () => void
  supportingProducts: readonly [CommerceProduct, CommerceProduct]
  title: string
  tone?: 'ivory' | 'blush'
}

export function EditorialProductSection({
  anchorIds = [],
  copy,
  eyebrow,
  featuredProduct,
  id,
  index,
  onOpenCart,
  supportingProducts,
  title,
  tone = 'ivory',
}: EditorialProductSectionProps) {
  return (
    <section
      className={tone === 'blush' ? 'relative bg-ovia-blush/28' : 'relative'}
      id={id}
    >
      {anchorIds.map((anchorId) => (
        <span aria-hidden="true" className="absolute -top-24" id={anchorId} key={anchorId} />
      ))}
      <div className="mx-auto w-full max-w-360 px-4 py-18 sm:px-6 sm:py-24 lg:px-8 lg:py-30">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-12">
          <header className="flex items-start justify-between gap-7 lg:col-span-5 lg:pr-10">
            <div className="max-w-lg">
              <p className="type-eyebrow">{eyebrow}</p>
              <h2 className="type-section-title mt-4">{title}</h2>
              <p className="type-supporting mt-5 max-w-md">{copy}</p>
            </div>
            <span aria-hidden="true" className="font-display text-4xl font-light text-ovia-primary/35 sm:text-5xl">
              {index}
            </span>
          </header>

          <div className="lg:col-span-7 lg:row-span-2">
            <ProductCard
              badge="Featured"
              onOpenCart={onOpenCart}
              priority
              product={featuredProduct}
              variant="featured"
            />
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-6 lg:col-span-5 lg:items-start lg:pr-10">
            {supportingProducts.map((product) => (
              <ProductCard key={product.id} onOpenCart={onOpenCart} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
