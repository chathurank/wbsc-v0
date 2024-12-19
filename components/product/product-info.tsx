'use client'

import { useState, useEffect } from 'react'
import { FileText, ShoppingCart, BarChart2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductVariant {
  sku: string
  name: string
  price: number
  originalPrice: number
  savings: number
}

interface ProductInfoProps {
  variants: ProductVariant[]
}

interface Option {
  id: string
  label: string
  options: string[]
}

const options: Option[] = [
  {
    id: 'keying',
    label: 'Keying',
    options: ['Keyed Alike', 'Keyed Different', 'Master Keyed']
  },
  {
    id: 'finish',
    label: 'Finish',
    options: ['Satin Chrome', 'Polished Brass', 'Oil Rubbed Bronze']
  }
]

export function ProductInfo({ variants }: ProductInfoProps) {
  const [selectedSku, setSelectedSku] = useState(variants[0]?.sku || '')
  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

  const selectedVariant = variants.find(v => v.sku === selectedSku) || variants[0] || {
    sku: '',
    name: 'Product Unavailable',
    price: 0,
    originalPrice: 0,
    savings: 0
  }

  const handleOptionSelect = (optionId: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionId]: prev[optionId] === value ? '' : value
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{selectedVariant.name}</h1>
        <div className="flex items-center gap-4 mt-2">
          <p className="text-sm text-muted-foreground">SKU: {selectedVariant.sku}</p>
          {variants.length > 0 ? (
            <Select value={selectedSku} onValueChange={setSelectedSku}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select SKU" />
              </SelectTrigger>
              <SelectContent>
                {variants.map((variant) => (
                  <SelectItem key={variant.sku} value={variant.sku}>
                    {variant.sku}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="text-sm text-muted-foreground">No variants available</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">${selectedVariant.price.toFixed(2)}</span>
          {selectedVariant.originalPrice > selectedVariant.price && (
            <>
              <span className="text-lg text-muted-foreground line-through">
                ${selectedVariant.originalPrice.toFixed(2)}
              </span>
              <Badge variant="destructive">
                Save ${selectedVariant.savings.toFixed(2)}
              </Badge>
            </>
          )}
        </div>
        <p className="text-sm text-muted-foreground">Price shown in USD</p>
      </div>

      <div className="space-y-4">
        {options.map((option) => (
          <div key={option.id}>
            <Label className="mb-2 block">{option.label}</Label>
            <div className="flex flex-wrap gap-2">
              {option.options.map((value) => (
                <Button
                  key={value}
                  variant={selectedOptions[option.id] === value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleOptionSelect(option.id, value)}
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Price Scales</h3>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>1-9: ${selectedVariant.price?.toFixed(2) || 'N/A'}</div>
          <div>10-49: ${(selectedVariant.price * 0.95)?.toFixed(2) || 'N/A'}</div>
          <div>50+: ${(selectedVariant.price * 0.9)?.toFixed(2) || 'N/A'}</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="w-32">
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
          </div>
          <Button className="flex-1">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to cart
          </Button>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">Add to proposal</Button>
          <Button variant="outline" className="flex-1">Add to shopping list</Button>
        </div>
        <Button variant="outline" className="w-full">
          <BarChart2 className="mr-2 h-4 w-4" />
          Add to compare
        </Button>
      </div>

    </div>
  )
}

