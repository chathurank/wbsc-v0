import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductInfo } from "@/components/product/product-info"
import { ProductTabs } from "@/components/product/product-tabs"
import { ProductHotDeals } from "@/components/product/product-hot-deals"
import { EzConfigurations } from "@/components/product/ez-configurations"
import { AssociatedItems } from "@/components/product/associated-items"
import { OptionalAccessories } from "@/components/product/optional-accessories"
import { RelatedSearches } from "@/components/product/related-searches"

interface ProductVariant {
  sku: string
  name: string
  price: number
  originalPrice: number
  savings: number
}

interface Product {
  id: string
  variants: ProductVariant[]
  description: string
  specifications: Record<string, string>
  images: {
    src: string
    alt: string
  }[]
  downloads: {
    name: string
    url: string
  }[]
  relatedProducts: {
    id: string
    name: string
    price: number
    image: string
  }[]
}

// This would typically come from an API or database
const product: Product = {
  id: '1',
  variants: [
    {
      sku: 'WUAD52-5648-465',
      name: '8502 Pro Tumbler Cylinder Cam Lock for Lipped/Overlay Application, Dull Chrome, Silver, Keyed to C101 Key',
      price: 28.79,
      originalPrice: 34.99,
      savings: 6.20,
    },
    {
      sku: 'WUAD52-5648-466',
      name: '8502 Pro Tumbler Cylinder Cam Lock for Lipped/Overlay Application, Polished Brass, Keyed to C101 Key',
      price: 30.99,
      originalPrice: 36.99,
      savings: 6.00,
    },
  ],
  description: 'REVOLUTION is the latest advancement in conventional screw technology. It brings together all of the best features of conventional screws into a revolutionary new fastening solution that drives perfectly straight in to the deck.',
  specifications: {
    'Item #': 'WUAD52-5648-465',
    'Material': 'Steel',
    'Product Type': 'Cabinet Cam Lock',
    'Finish': 'Dull Chrome',
    'Length': '1.5"',
    'Width': '0.75"',
    'Height': '0.5"',
    'Cylinder Diameter': '5/8"',
    'Material Type': 'Steel',
    'Product Line': 'Cabinet Cam Lock',
    'Phase': 'EA',
    'Weight': '0.25 lb',
    'UPC': 'EA',
    'Cylinder Diameter': '5/8"',
    'Style': 'Antique Brass'
  },
  images: [
    { src: 'https://via.placeholder.com/600x600', alt: 'Main product image' },
    { src: 'https://via.placeholder.com/600x600', alt: 'Side view' },
    { src: 'https://via.placeholder.com/600x600', alt: 'Installation view' },
    { src: 'https://via.placeholder.com/600x600', alt: 'Dimensions' },
    { src: 'https://via.placeholder.com/600x600', alt: 'Package contents' }
  ],
  downloads: [
    { name: 'Technical Data Sheet', url: '#' },
    { name: 'Installation Guide', url: '#' },
    { name: 'CAD Drawing', url: '#' }
  ],
  relatedProducts: [
    {
      id: '2',
      name: 'Similar Lock Model A',
      price: 25.99,
      image: 'https://via.placeholder.com/200x200'
    },
    {
      id: '3',
      name: 'Similar Lock Model B',
      price: 32.99,
      image: 'https://via.placeholder.com/200x200'
    }
  ]
}

export default function ProductPage({ params }: { params: { productId: string } }) {
  if (params.productId !== '1' || !product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/categories/locks">Locks</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cam Locks</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <ProductGallery images={product.images} />
        <ProductInfo 
          variants={product.variants || []}
        />
      </div>

      <ProductTabs product={product} className="mb-12" />

      <EzConfigurations className="mb-12" />

      <AssociatedItems className="mb-12" />

      <OptionalAccessories className="mb-12" />

      <ProductHotDeals products={product.relatedProducts} className="mb-12" />

      <RelatedSearches className="mb-12" />
    </div>
  )
}

export async function generateMetadata({ params }: { params: { productId: string } }): Promise<Metadata> {
  // In a real application, we would fetch the product data here
  return {
    title: `${product?.variants[0]?.name || 'Product'} | Würth Baer Supply Company`,
    description: product?.description || 'Product description unavailable',
  }
}

