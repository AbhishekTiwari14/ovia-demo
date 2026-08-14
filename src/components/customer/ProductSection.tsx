import type { CommerceProduct } from '../../data/productTypes'
import { ProductCard } from './ProductCard'

interface ProductSectionProps {
  badge?: string
  eyebrow?: string
  id: string
  onOpenCart?: () => void
  products: readonly CommerceProduct[]
  title: string
  description?: string
}

export function ProductSection({
  badge,
  eyebrow,
  id,
  onOpenCart,
  products,
  title,
  description,
}: ProductSectionProps) {
  return (
    <section className="scroll-mt-24 py-16 sm:scroll-mt-28 sm:py-24 lg:py-30" id={id}>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="type-eyebrow mb-3">
              {eyebrow}
            </p>
          )}
          <h2 className="type-section-title">
            {title}
          </h2>
          {description && (
            <p className="type-supporting mt-4 max-w-xl">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-11 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-14">
        {products.map((product, index) => (
          <ProductCard
            badge={badge}
            key={product.id}
            onOpenCart={onOpenCart}
            priority={index < 2}
            product={product}
          />
        ))}
      </div>
    </section>
  )
}
