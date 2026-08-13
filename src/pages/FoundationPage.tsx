import { ArrowRight, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'

import {
  Container,
  PageSection,
  ResponsiveGrid,
  Stack,
} from '../components/layout/LayoutPrimitives'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Heading, Text } from '../components/ui/Typography'
import { sellableProducts } from '../data/products'
import { useDemoStore } from '../store/demoStore'

export interface FoundationPageProps {
  area: 'customer' | 'business'
  title: string
  description: string
}

export function FoundationPage({
  area,
  title,
  description,
}: FoundationPageProps) {
  const resetDemo = useDemoStore((state) => state.resetDemo)

  return (
    <PageSection>
      <Container>
        <Stack className="max-w-5xl">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold tracking-[0.14em] text-ovia-primary uppercase">
              Phase 1 foundation
            </p>
            <Heading>{title}</Heading>
            <Text className="mt-4" tone="muted">
              {description}
            </Text>
          </div>

          <ResponsiveGrid>
            <Card>
              <p className="text-sm font-semibold text-ovia-muted">
                Catalogue
              </p>
              <p className="mt-2 font-display text-4xl text-ovia-plum">
                {sellableProducts.length}
              </p>
              <Text className="mt-2 text-sm" tone="muted">
                Verified sellable products are ready for later storefront work.
              </Text>
            </Card>
            <Card>
              <p className="text-sm font-semibold text-ovia-muted">Routes</p>
              <p className="mt-2 font-display text-4xl text-ovia-plum">9</p>
              <Text className="mt-2 text-sm" tone="muted">
                Customer and business destinations are reserved.
              </Text>
            </Card>
            <Card>
              <p className="text-sm font-semibold text-ovia-muted">State</p>
              <p className="mt-2 font-display text-4xl text-ovia-plum">v1</p>
              <Text className="mt-2 text-sm" tone="muted">
                Demo data persists locally and can be restored safely.
              </Text>
            </Card>
          </ResponsiveGrid>

          <div className="flex flex-wrap gap-3">
            {area === 'customer' ? (
              <Link
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-ovia-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ovia-plum"
                to="/business"
              >
                View business foundation
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            ) : (
              <Link
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control border border-ovia-primary px-4 py-2.5 text-sm font-semibold text-ovia-plum transition-colors hover:bg-ovia-blush/55"
                to="/"
              >
                View storefront foundation
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            )}
            {area === 'business' && (
              <Button onClick={resetDemo} variant="ghost">
                <RotateCcw aria-hidden="true" size={17} />
                Reset demo data
              </Button>
            )}
          </div>
        </Stack>
      </Container>
    </PageSection>
  )
}

