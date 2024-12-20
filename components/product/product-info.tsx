'use client'

import { useState } from 'react'
import { Flame, ChevronDown, ChevronRight, Plus, Minus, ShoppingCart, FileText, Heart, Scale, Settings2, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface ProductInfoProps {
  product: {
    id: string
    name: string
    sku: string
    price: number
    originalPrice: number
    savings: number
    inStock: boolean
    stockQuantity: number
    location: string
    minOrderQuantity: number
    unit: string
    bulkPricing?: {
      range: string
      price: number
      unit: string
    }[]
    partNumbers?: string[]
    keyOptions?: string[]
    finishOptions?: string[]
    backorder?: {
      orderNumber: string
      quantity: number
      eta: string
    }
  }
}

const defaultProduct = {
  keyOptions: ['C101 Key', 'C103 Key', 'C107 Key', 'KA915 Key'],
  finishOptions: ['Dull Chrome', 'Vibrant Ruby', 'Glossy Gold', 'Matte Black'],
  bulkPricing: [
    { range: "25-99 items", price: 26.65, unit: "EA" },
    { range: "50-99 items", price: 7.85, unit: "pair" },
    { range: "100+ items", price: 24.48, unit: "EA" }
  ],
  partNumbers: ["PART-001", "PART-002"]
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(product.minOrderQuantity)
  const [selectedKey, setSelectedKey] = useState(product.keyOptions?.[0] || defaultProduct.keyOptions[0])
  const [selectedFinish, setSelectedFinish] = useState(product.finishOptions?.[0] || defaultProduct.finishOptions[0])

  const keyOptions = product.keyOptions || defaultProduct.keyOptions
  const finishOptions = product.finishOptions || defaultProduct.finishOptions
  const bulkPricing = product.bulkPricing || defaultProduct.bulkPricing
  const partNumbers = product.partNumbers || defaultProduct.partNumbers

  return (
    <div className="space-y-6">
      {/* Hot Deal Badge */}
      <div className="flex items-center gap-2 text-red-600">
        <Flame className="h-5 w-5" />
        <span className="font-medium">Hot Deal</span>
      </div>

      {/* Price Section */}
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
          <span className="text-2xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
          <span className="text-xl text-gray-600">/EA</span>
          <span className="text-lg text-green-600 font-medium">
            You save ${product.savings.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Bulk Pricing */}
      <div className="grid grid-cols-3 gap-4">
        {bulkPricing.map((tier, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="text-lg font-medium">{tier.range}</div>
            <div className="text-2xl font-bold">
              ${tier.price.toFixed(2)}/{tier.unit}
            </div>
          </div>
        ))}
      </div>

      {/* Part Number Selector */}
      <div className="space-y-2">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Part # / Mfr. #" />
          </SelectTrigger>
          <SelectContent>
            {partNumbers.map((part) => (
              <SelectItem key={part} value={part}>
                {part}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Options Section */}
      <div className="space-y-6">
        <div className="text-center text-lg">OR select options</div>
        
        {/* Key Options */}
        <div className="space-y-2">
          <Label>Key: {selectedKey}</Label>
          <div className="flex flex-wrap gap-2">
            {keyOptions.map((key) => (
              <Button
                key={key}
                variant={selectedKey === key ? "default" : "outline"}
                className={cn(
                  "rounded-md",
                  selectedKey === key && "border-2 border-red-600"
                )}
                onClick={() => setSelectedKey(key)}
              >
                {key}
              </Button>
            ))}
          </div>
        </div>

        {/* Finish Options */}
        <div className="space-y-2">
          <Label>Finish: {selectedFinish}</Label>
          <div className="flex flex-wrap gap-2">
            {finishOptions.map((finish) => (
              <Button
                key={finish}
                variant={selectedFinish === finish ? "default" : "outline"}
                className={cn(
                  "rounded-md",
                  selectedFinish === finish && "border-2 border-red-600"
                )}
                onClick={() => setSelectedFinish(finish)}
              >
                {finish}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Stock Information */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="success" className="rounded-full">In Stock</Badge>
          <span>{product.stockQuantity} in stock at {product.location}</span>
        </div>
        <Button variant="ghost" className="font-medium">
          Check Other Stores
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Backorder Information */}
      {product.backorder && (
        <Button variant="ghost" className="w-full justify-between font-normal text-base">
          <div className="flex items-center gap-4">
            <span className="font-medium">Backordered</span>
            <span>•</span>
            <span>Order# {product.backorder.orderNumber}</span>
            <span>•</span>
            <span>{product.backorder.quantity} Each</span>
            <span>•</span>
            <span>ETA: {product.backorder.eta}</span>
          </div>
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}

      {/* Quantity Selector */}
      <div className="space-y-2">
        <Label>Sold In: {product.minOrderQuantity} {product.unit}</Label>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(product.minOrderQuantity, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(product.minOrderQuantity, parseInt(e.target.value) || 0))}
              className="w-20 text-center mx-2"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-gray-600">{product.unit}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <Button className="w-full bg-red-600 hover:bg-red-700 h-14 text-lg">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to cart
        </Button>
        
        <div className="grid grid-cols-3 gap-4">
          <Button variant="outline" className="w-full">
            <FileText className="mr-2 h-4 w-4" />
            Add to proposal
          </Button>
          <Button variant="outline" className="w-full">
            <Heart className="mr-2 h-4 w-4" />
            Add to shopping list
          </Button>
          <Button variant="outline" className="w-full">
            <Scale className="mr-2 h-4 w-4" />
            Add to compare
          </Button>
        </div>
      </div>

      {/* Additional Options */}
      <div className="space-y-4">
        <Button variant="ghost" className="w-full justify-between text-base font-normal">
          Contract pricing
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" className="w-full justify-between text-base font-normal">
          <div className="flex items-center">
            <Settings2 className="mr-2 h-4 w-4" />
            EZ configurators
          </div>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

