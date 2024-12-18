import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  description: string
  price: number
  details: string
}

const products: Product[] = [
  { 
    id: '1', 
    name: 'Product 1', 
    description: 'This is a description for Product 1', 
    price: 19.99,
    details: 'Product 1 is a high-quality item perfect for various applications. It features durable construction and versatile functionality.'
  },
  // Add more products as needed
]


export default function ProductPage({ params }: { params: { productId: string } }) {
  const product = products.find(p => p.id === params.productId)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Product Details</h2>
            <p>{product.details}</p>
          </div>
          <Button size="lg">Add to Cart</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export async function generateMetadata({ params }: { params: { productId: string } }): Promise<Metadata> {
  const product = products.find(p => p.id === params.productId)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} | Würth Baer Supply Company`,
    description: product.description,
  }
}

