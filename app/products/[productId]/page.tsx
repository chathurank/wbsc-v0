import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductInfo } from "@/components/product/product-info"
import { ProductTabs } from "@/components/product/product-tabs"
import { RelatedProducts } from "@/components/product/related-products"
import { BulkOrderForm } from "@/components/product/bulk-order-form"
import { TechnicalSpecs } from "@/components/product/technical-specs"
import { RelatedSearches } from "@/components/product/related-searches"
import { AssociatedItems } from "@/components/product/associated-items"
import { OptionalAccessories } from "@/components/product/optional-accessories"
import { EzConfigurations } from "@/components/product/ez-configurations"
import { JsonLd } from '@/components/json-ld'
import { getProduct } from '@/lib/api'

export async function generateMetadata({ params }: { params: { productId: string } }): Promise<Metadata> {
  const product = await getProduct(params.productId)
  if (!product) return {}

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.images[0].src, width: 600, height: 600, alt: product.images[0].alt }],
    },
  }
}

export default async function ProductPage({ params }: { params: { productId: string } }) {
  const product = await getProduct(params.productId)

  if (!product) {
    notFound()
  }

  const jsonLdData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images.map(img => img.src),
    "description": product.shortDescription,
    "sku": product.sku,
    "mpn": product.mpn,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "AggregateOffer",
      "url": `https://www.wurthbaer.com/products/${product.id}`,
      "priceCurrency": "USD",
      "lowPrice": Math.min(...product.variants.map(v => v.price)),
      "highPrice": Math.max(...product.variants.map(v => v.price)),
      "offerCount": product.variants.length,
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <JsonLd data={jsonLdData} />
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/categories/${product.category.slug}`}>{product.category.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      <Suspense fallback={<div>Loading product details...</div>}>
        <ProductTabs product={product} className="mb-12" />
      </Suspense>

      <Suspense fallback={<div>Loading EZ configurations...</div>}>
        <EzConfigurations configurations={product.ezConfigurations} className="mb-12" />
      </Suspense>

      <Suspense fallback={<div>Loading technical specifications...</div>}>
        <TechnicalSpecs specs={product.technicalSpecs} className="mb-12" />
      </Suspense>

      <Suspense fallback={<div>Loading associated items...</div>}>
        <AssociatedItems items={product.associatedItems} className="mb-12" />
      </Suspense>

      <Suspense fallback={<div>Loading optional accessories...</div>}>
        <OptionalAccessories items={product.optionalAccessories} className="mb-12" />
      </Suspense>

      <Suspense fallback={<div>Loading bulk order form...</div>}>
        <BulkOrderForm product={product} className="mb-12" />
      </Suspense>

      <Suspense fallback={<div>Loading related products...</div>}>
        <RelatedProducts products={product.relatedProducts} className="mb-12" />
      </Suspense>

      <Suspense fallback={<div>Loading related searches...</div>}>
        <RelatedSearches searches={product.relatedSearches} className="mb-12" />
      </Suspense>
    </div>
  )
}

