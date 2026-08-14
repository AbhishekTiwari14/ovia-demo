import { ArrowRight, Boxes, IndianRupee, PackageCheck, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

import { sellableProducts } from '../../data/products'
import { formatInr } from '../../lib/currency'
import { getBusinessMetrics } from '../../lib/business'
import { useDemoStore } from '../../store/demoStore'
import { Container } from '../layout/LayoutPrimitives'

function formatOrderDate(value: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(value))
}

export function BusinessRevealSection() {
  const inventory = useDemoStore((state) => state.inventoryByVariant)
  const orders = useDemoStore((state) => state.orders)
  const createdProducts = useDemoStore((state) => state.createdProducts)
  const metrics = getBusinessMetrics(
    [...sellableProducts, ...createdProducts],
    orders,
    inventory,
  )
  const recentOrders = [...orders]
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .slice(0, 2)
  const previewMetrics = [
    { label: 'Orders', value: metrics.orders.toString(), icon: ShoppingBag },
    { label: 'Revenue', value: formatInr(metrics.revenue), icon: IndianRupee },
    { label: 'Active products', value: metrics.activeProducts.toString(), icon: PackageCheck },
  ]

  return (
    <section className="overflow-hidden bg-ovia-plum text-white" data-testid="business-reveal-section">
      <Container className="grid gap-12 py-18 sm:py-24 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16 lg:py-28">
        <div className="max-w-xl">
          <p className="text-[0.67rem] font-bold tracking-[0.17em] text-ovia-blush uppercase">
            Behind the edit
          </p>
          <h2 className="mt-4 max-w-lg font-display text-[clamp(2.7rem,5.6vw,5.4rem)] leading-[0.9] font-medium tracking-[-0.04em]">
            The storefront is only half the story.
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
            See how Ovia could manage products, sizes, inventory, orders and customer insights behind the scenes.
          </p>
          <Link
            className="customer-primary-action mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-ovia-blush px-6 text-sm font-bold text-ovia-plum hover:bg-white"
            data-testid="business-reveal-cta"
            to="/business"
          >
            Explore the Business Side
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>

        <div className="relative pb-10 lg:pb-0 lg:pl-5">
          <div aria-hidden="true" className="absolute -top-7 -right-8 size-40 rounded-full border border-ovia-blush/15" />
          <div className="relative overflow-hidden rounded-[1.4rem] border border-white/14 bg-ovia-ivory text-ovia-ink shadow-[0_28px_70px_rgb(27_14_23/0.24)] sm:rounded-[1.75rem]">
            <div className="flex items-center justify-between border-b border-ovia-line px-4 py-3.5 sm:px-6">
              <div className="flex items-center gap-3">
                <img alt="" className="size-8 object-cover sm:size-9" src="/brand/ovia-logo.jpg" />
                <div>
                  <p className="text-xs font-bold text-ovia-ink sm:text-sm">Ovia business overview</p>
                  <p className="mt-0.5 text-[0.6rem] text-ovia-muted sm:text-[0.67rem]">Live demo interface preview</p>
                </div>
              </div>
              <span className="rounded-full bg-ovia-blush/65 px-2.5 py-1 text-[0.55rem] font-bold tracking-[0.1em] text-ovia-plum uppercase sm:text-[0.62rem]">
                Demo mode
              </span>
            </div>

            <div className="p-4 sm:p-6">
              <p className="text-[0.61rem] font-bold tracking-[0.13em] text-ovia-primary uppercase">
                Simulated business data
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                {previewMetrics.map(({ label, value, icon: Icon }, index) => (
                  <div className={index === 2 ? 'col-span-2 min-w-0 border border-ovia-line bg-white p-4 sm:col-span-1' : 'min-w-0 border border-ovia-line bg-white p-4'} key={label}>
                    <Icon aria-hidden="true" className="text-ovia-primary" size={16} />
                    <p className="mt-3 truncate text-lg font-semibold tracking-[-0.03em] text-ovia-ink sm:text-2xl">{value}</p>
                    <p className="mt-1 truncate text-[0.68rem] text-ovia-muted">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-[1.28fr_0.72fr]">
                <div className="border border-ovia-line bg-white">
                  <div className="flex items-center justify-between border-b border-ovia-line px-3 py-2.5 sm:px-4">
                    <p className="text-xs font-bold">Recent orders</p>
                    <span className="text-[0.6rem] text-ovia-muted">Live demo state</span>
                  </div>
                  <div className="divide-y divide-ovia-line">
                    {recentOrders.map((order) => (
                      <div className="grid grid-cols-[1fr_auto] items-center gap-3 px-3 py-3 sm:px-4" key={order.id}>
                        <div className="min-w-0">
                          <p className="truncate text-[0.7rem] font-bold sm:text-xs">{order.customerName}</p>
                          <p className="mt-0.5 text-[0.58rem] text-ovia-muted sm:text-[0.64rem]">{order.id} · {formatOrderDate(order.createdAt)}</p>
                        </div>
                        <p className="text-[0.68rem] font-bold text-ovia-plum sm:text-xs">{formatInr(order.amountInPaise)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex min-h-28 flex-col justify-between bg-ovia-blush/55 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.6rem] font-bold tracking-[0.1em] text-ovia-primary uppercase">Stock watch</p>
                      <p className="mt-2 text-3xl font-semibold text-ovia-plum">{metrics.lowStockVariants.length}</p>
                    </div>
                    <span className="flex size-8 items-center justify-center rounded-full bg-white text-ovia-plum">
                      <Boxes aria-hidden="true" size={15} />
                    </span>
                  </div>
                  <p className="mt-4 text-[0.66rem] leading-5 text-ovia-muted">Low-stock variants ready for attention.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
