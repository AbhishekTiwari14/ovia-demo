import type { SellableProduct } from '../../data/productTypes'
import { ProductCard } from './ProductCard'

interface ProductSectionProps {
  eyebrow?: string
  id: string
  products: readonly SellableProduct[]
  title: string
  description?: string
}

export function ProductSection({
  eyebrow,
  id,
  products,
  title,
  description,
}: ProductSectionProps) {
  return (
    <section className="scroll-mt-28 py-10 sm:py-14 lg:py-18" id={id}>
      <div className="mb-6 flex items-end justify-between gap-5 sm:mb-8">
        <div className="max-w-xl">
          {eyebrow && (
            <p className="mb-2 text-[0.68rem] font-bold tracking-[0.18em] text-ovia-primary uppercase">
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-3xl leading-none tracking-[-0.025em] text-ovia-ink sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-sm leading-6 text-ovia-muted sm:text-base">
              {description}
            </p>
          )}
        </div>
        <a
          className="hidden shrink-0 border-b border-ovia-primary pb-1 text-xs font-bold tracking-[0.12em] text-ovia-primary uppercase transition-colors hover:border-ovia-plum hover:text-ovia-plum sm:block"
          href={`#${id}`}
        >
          View edit
        </a>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
        {products.map((product, index) => (
          <ProductCard key={product.id} priority={index < 2} product={product} />
        ))}
      </div>
    </section>
  )
}

