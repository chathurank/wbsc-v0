'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BulkOrderFormProps {
  product: {
    id: string
    name: string
    sku: string
    variants?: {
      id: string
      name: string
    }[]
  }
  className?: string
}

export function BulkOrderForm({ product, className }: BulkOrderFormProps) {
  const [quantity, setQuantity] = useState('')
  const [selectedVariant, setSelectedVariant] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission (e.g., send to API)
    console.log('Bulk order submitted:', { product, quantity, selectedVariant, notes })
  }

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-4">Request Bulk Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="product-name">Product</Label>
          <Input id="product-name" value={`${product.name} (SKU: ${product.sku})`} disabled />
        </div>
        {product.variants && (
          <div>
            <Label htmlFor="variant">Variant</Label>
            <Select value={selectedVariant} onValueChange={setSelectedVariant}>
              <SelectTrigger id="variant">
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent>
                {product.variants.map((variant) => (
                  <SelectItem key={variant.id} value={variant.id}>
                    {variant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Specify any special requirements or questions"
          />
        </div>
        <Button type="submit">Submit Bulk Order Request</Button>
      </form>
    </div>
  )
}

