import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  description: string
  price: number
}

const products: Product[] = [
  { id: '1', name: 'Product 1', description: 'This is a description for Product 1', price: 19.99 },
  { id: '2', name: 'Product 2', description: 'This is a description for Product 2', price: 29.99 },
  { id: '3', name: 'Product 3', description: 'This is a description for Product 3', price: 39.99 },
  { id: '4', name: 'Product 4', description: 'This is a description for Product 4', price: 49.99 },
]

export const metadata: Metadata = {
  title: 'Product Category | Würth Baer Supply Company',
  description: 'Browse our wide range of products in this category.',
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 capitalize">{params.category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{product.description}</p>
              <p className="font-bold mt-2">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/products/${product.id}`} passHref>
                <Button>View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

