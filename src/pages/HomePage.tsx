import { motion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Container } from '../components/layout/LayoutPrimitives'
import { ProductSection } from '../components/customer/ProductSection'
import { sellableProducts } from '../data/products'

const bySlug = Object.fromEntries(
  sellableProducts.map((product) => [product.slug, product]),
)

function requiredProduct(slug: string) {
  const product = bySlug[slug]
  if (!product) {
    throw new Error(`Required Ovia product is missing: ${slug}`)
  }
  return product
}

const brownDress = requiredProduct('brown-off-shoulder-dress')
const whiteOneShoulder = requiredProduct('white-one-shoulder-piece')
const beigeOnePiece = requiredProduct('beige-off-shoulder-one-piece')

const newArrivals = [
  brownDress,
  whiteOneShoulder,
  requiredProduct('lace-trimmed-top'),
  requiredProduct('red-ombre-top'),
]

const dresses = sellableProducts.filter((product) => product.category === 'dress')
const tops = sellableProducts.filter(
  (product) => product.category === 'top' || product.category === 'waistcoat',
)
const oneShoulder = [brownDress, whiteOneShoulder, beigeOnePiece]
const kurtis = sellableProducts.filter((product) => product.category === 'kurti')

const categoryCards = [
  { label: 'Dresses', href: '#dresses', product: brownDress },
  { label: 'Tops', href: '#tops', product: requiredProduct('red-ombre-top') },
  { label: 'Kurtis', href: '#kurtis', product: requiredProduct('lime-shells-corset-kurti') },
  { label: 'Waistcoat', href: '#tops', product: requiredProduct('waist-coat') },
]

export function HomePage() {
  return (
    <>
      <section className="overflow-hidden border-b border-ovia-line bg-[#f4e7ee]">
        <Container className="grid min-h-[38rem] items-stretch px-0 sm:min-h-[42rem] sm:grid-cols-[0.86fr_1.14fr] sm:px-6 lg:min-h-[46rem]">
          <motion.div
            className="relative z-10 flex flex-col justify-center px-5 pt-12 pb-9 sm:px-0 sm:pr-10 sm:py-16 lg:pr-20"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-ovia-primary/20 bg-white/60 px-3 py-1.5 text-[0.68rem] font-bold tracking-[0.16em] text-ovia-plum uppercase">
              <Sparkles aria-hidden="true" size={13} />
              The private Ovia edit
            </span>
            <h1 className="max-w-xl font-display text-[clamp(3.1rem,8vw,6.5rem)] leading-[0.91] tracking-[-0.055em] text-ovia-ink">
              Soft shape.
              <span className="block text-ovia-primary">Bold mood.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-ovia-muted sm:text-lg sm:leading-8">
              Discover expressive dresses, tops and kurtis selected from Ovia
              Closet’s current catalogue.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ovia-primary px-6 text-sm font-bold text-white transition-colors hover:bg-ovia-plum"
                to={`/product/${brownDress.slug}`}
              >
                Shop the hero look
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
              <a
                className="inline-flex min-h-12 items-center rounded-full border border-ovia-primary/50 px-6 text-sm font-bold text-ovia-plum transition-colors hover:bg-white/55"
                href="#new-arrivals"
              >
                Explore the edit
              </a>
            </div>
          </motion.div>

          <motion.div
            className="relative min-h-[28rem] overflow-hidden rounded-t-[2.5rem] bg-[#d9c6ba] sm:my-6 sm:min-h-0 sm:rounded-[2.5rem]"
            initial={{ opacity: 0, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              alt={brownDress.catalogueName}
              className="absolute inset-0 size-full object-cover"
              fetchPriority="high"
              src={brownDress.image}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ovia-ink/65 via-ovia-ink/12 to-transparent px-5 pt-24 pb-6 text-white sm:px-7">
              <p className="font-display text-2xl sm:text-3xl">
                {brownDress.catalogueName}
              </p>
              <p className="mt-1 text-sm text-white/80">Sizes S · M</p>
            </div>
          </motion.div>
        </Container>
      </section>

      <Container>
        <section className="py-10 sm:py-14" aria-labelledby="category-title">
          <div className="mb-6">
            <p className="text-[0.68rem] font-bold tracking-[0.18em] text-ovia-primary uppercase">
              Find your silhouette
            </p>
            <h2
              className="mt-2 font-display text-3xl tracking-[-0.025em] sm:text-4xl"
              id="category-title"
            >
              Shop by category
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
            {categoryCards.map(({ label, href, product }) => (
              <motion.a
                className="group relative overflow-hidden rounded-[1.15rem] bg-[#f0e5df]"
                href={href}
                key={label}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  alt=""
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                  src={product.image}
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ovia-ink/75 to-transparent px-4 pt-14 pb-4 text-white">
                  <span className="font-display text-xl sm:text-2xl">{label}</span>
                  <ArrowRight aria-hidden="true" size={18} />
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        <ProductSection
          description="A first look at the Ovia pieces leading this private storefront."
          eyebrow="The latest edit"
          id="new-arrivals"
          products={newArrivals}
          title="New Arrivals"
        />
        <ProductSection
          description="Draped and one-shoulder silhouettes with an easy statement feel."
          id="dresses"
          products={dresses}
          title="Dresses"
        />
        <ProductSection
          description="Corset-inspired, lace-trimmed and ombré details from the catalogue."
          id="tops"
          products={tops}
          title="Tops"
        />
      </Container>

      <section className="my-10 bg-ovia-plum text-white sm:my-14">
        <Container className="grid items-center gap-8 py-12 sm:grid-cols-[0.8fr_1.2fr] sm:py-16 lg:gap-16">
          <div>
            <p className="text-[0.68rem] font-bold tracking-[0.18em] text-ovia-blush uppercase">
              Ovia style focus
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">
              One shoulder,
              <span className="block text-ovia-blush">three distinct moods.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/72 sm:text-base">
              Explore the off-shoulder and one-shoulder pieces visibly represented
              in Ovia’s catalogue.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4" id="one-shoulder">
            {oneShoulder.map((product) => (
              <Link
                className="group overflow-hidden rounded-2xl bg-white/10"
                key={product.id}
                to={`/product/${product.slug}`}
              >
                <img
                  alt={product.catalogueName}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                  src={product.image}
                />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <Container>
        <ProductSection
          description="Shell and corset-style kurtis in the exact sizes shown in the Ovia catalogue."
          id="kurtis"
          products={kurtis}
          title="Kurtis"
        />
      </Container>
    </>
  )
}
