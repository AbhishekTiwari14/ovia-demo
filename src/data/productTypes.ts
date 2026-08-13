export type ProductCategory = 'kurti' | 'dress' | 'top' | 'waistcoat'

export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Free size'

export type ColorEvidence =
  | 'explicitly-listed'
  | 'catalogue-name'
  | 'catalogue-photo'

export interface ProductColor {
  label: string
  evidence: ColorEvidence
  selectable: boolean
}

export interface CropRectangle {
  x: number
  y: number
  width: number
  height: number
}

export interface CatalogueSource {
  fileName: string
  crop: CropRectangle
  notes?: string
}

interface ProductBase {
  id: string
  slug: string
  catalogueName: string | null
  priceInPaise: number | null
  sizes: readonly ProductSize[]
  colors: readonly ProductColor[]
  category: ProductCategory | null
  image: string
  source: CatalogueSource
}

export interface SellableProduct extends ProductBase {
  status: 'sellable'
  catalogueName: string
  priceInPaise: number
  category: ProductCategory
}

export interface ReferenceOnlyProduct extends ProductBase {
  status: 'reference-only'
  reason: 'missing-name-and-price'
  catalogueName: null
  priceInPaise: null
}

export type Product = SellableProduct | ReferenceOnlyProduct

