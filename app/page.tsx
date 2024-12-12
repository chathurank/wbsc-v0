import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: 'Home | Würth Baer Supply Company',
  description: 'Welcome to Würth Baer Supply Company - Your trusted partner for industrial supplies and equipment.',
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Würth Baer Supply Company</h1>
      <p className="text-xl mb-8">Your trusted partner for industrial supplies and equipment.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Featured Products</CardTitle>
            <CardDescription>Check out our top-selling items</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Browse through our curated selection of high-quality industrial supplies.</p>
            <Button className="mt-4">Shop Now</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Order</CardTitle>
            <CardDescription>Fast and efficient ordering process</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Save time with our streamlined quick order system for repeat purchases.</p>
            <Button className="mt-4">Quick Order</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Request a Quote</CardTitle>
            <CardDescription>Get personalized pricing for your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Our team will provide you with competitive quotes for your specific requirements.</p>
            <Button className="mt-4">Request Quote</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

