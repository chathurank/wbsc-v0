'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ProductAttributesDialog } from './product-attributes-dialog'

interface ItemDetailsAccordionProps {
  details: {
    name: string
    image: string
    price: number
    originalPrice?: number
    dimensions: string
    pricePerUnit: number
    unit: string
    bulkPricing: {
      quantity: number
      price: number
    }[]
    stock: {
      status: string
      quantity: number
      location: string
    }
    isLastChance?: boolean
    attributes?: {
      itemNumber: string
      manufacturerNumber: string
      productType: string
      catalog: string
      finish: string
      material: string
      length: string
      width: string
      depth: string
      boxQuantity: string
    }
  }
  onClose: () => void
  onAddToCart: (quantity: number) => void
}

export function ItemDetailsAccordion({ details, onClose, onAddToCart }: ItemDetailsAccordionProps) {
  const [quantity, setQuantity] = useState(1)
  const [showAttributes, setShowAttributes] = useState(false)

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value))
  }

  const formatAttributes = (attributes: NonNullable<typeof details.attributes>) => [
    { label: "Item #", value: attributes.itemNumber },
    { label: "Mfr. #", value: attributes.manufacturerNumber },
    { label: "Product type", value: attributes.productType },
    { label: "Catalog", value: attributes.catalog, isLink: true },
    { label: "Finish", value: attributes.finish },
    { label: "Material", value: attributes.material },
    { label: "Length", value: attributes.length },
    { label: "Width", value: attributes.width },
    { label: "Depth", value: attributes.depth },
    { label: "Box qty", value: attributes.boxQuantity }
  ]

  return (
    <>
      <div className="bg-gray-50 p-6">
        <div className="flex items-start gap-8">
          {/* Left side - Image */}
          <div className="w-64 flex-shrink-0">
            <Image
              src={details.image}
              alt={details.name}
              width={256}
              height={256}
              className="rounded-lg border"
            />
          </div>

          {/* Middle - Product info */}
          <div className="flex-grow space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{details.name}</h3>
                {details.isLastChance && (
                  <div className="flex items-center gap-2 text-amber-600 mt-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">Last Chance</span>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">${details.price.toFixed(2)}</span>
              {details.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  ${details.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-sm text-gray-600">/{details.dimensions}</span>
            </div>

            <div className="text-sm text-gray-600">
              ${details.pricePerUnit.toFixed(2)} per {details.unit}
            </div>

            <div className="grid grid-cols-2 gap-8 mt-4">
              {details.bulkPricing.map((pricing, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border">
                  <div className="text-sm text-gray-600">For {pricing.quantity} {details.unit}</div>
                  <div className="font-semibold">${pricing.price.toFixed(2)}/{details.unit}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="w-80 space-y-4">
            <div className="flex items-center justify-between">
              <div className={cn(
                "px-3 py-1 rounded-full text-sm font-medium",
                details.stock.status === "In Stock"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              )}>
                {details.stock.status}
              </div>
              <div className="text-sm text-gray-600">
                {details.stock.quantity} in stock at {details.stock.location}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Sold in: 1 {details.unit}</div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(Number(e.target.value))}
                    className="w-20 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </Button>
                  <span className="text-sm text-gray-600 ml-2">{details.unit}</span>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={() => onAddToCart(quantity)}
              >
                Add to cart
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">Contract pricing</Button>
                <Button variant="outline">Add to proposal</Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">Add to compare</Button>
                <Button variant="outline">
                  <span className="sr-only">Add to wishlist</span>
                  ♡
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button
                variant="link"
                className="text-sm w-full justify-start p-0"
                onClick={() => setShowAttributes(true)}
              >
                View all attributes →
              </Button>
              <Button variant="link" className="text-sm w-full justify-start p-0">
                EZ configurators →
              </Button>
            </div>
          </div>
        </div>
      </div>

      {details.attributes && (
        <ProductAttributesDialog
          open={showAttributes}
          onOpenChange={setShowAttributes}
          attributes={formatAttributes(details.attributes)}
        />
      )}
    </>
  )
}

