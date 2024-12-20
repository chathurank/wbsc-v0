'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ItemDetailsAccordion } from "./item-details-accordion"
import { ProductAttributesDialog } from "./product-attributes-dialog"
import { ChevronRight, Minus, Plus, ShoppingCart, FileText, Heart, Scale } from 'lucide-react'
import React from 'react'

interface Item {
  id: string
  name: string
  price: number
  originalPrice?: number
  pricePerUnit: string
  sku: string
  itemNumber: string
  manufacturerNumber: string
  image: string
  soldIn: string
  catalog: string
  description: string
  availability: string
  minOrderQuantity: number
  location: string
  stock: number
  isLastChance?: boolean
  hasPriceScales?: boolean
  bulkPricing: {
    quantity: number
    price: number
  }[]
}

interface ItemTableProps {
  items: Item[]
  title: string
}

interface ItemAttributes {
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

export function ItemTable({ items, title }: ItemTableProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [quantities, setQuantities] = useState<Record<string, number>>(
    items.reduce((acc, item) => ({ ...acc, [item.id]: item.minOrderQuantity }), {})
  )
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [showAttributes, setShowAttributes] = useState(false)
  const [selectedItemAttributes, setSelectedItemAttributes] = useState<ItemAttributes | null>(null)

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === items.length ? [] : items.map(item => item.id)
    )
  }

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(items.find(item => item.id === itemId)?.minOrderQuantity || 1, newQuantity)
    }))
  }

  const handleShowAttributes = (item: Item) => {
    setSelectedItemAttributes({
      itemNumber: item.itemNumber,
      manufacturerNumber: item.manufacturerNumber,
      productType: "Door Handle", // This would come from your data
      catalog: item.catalog,
      finish: "Anochrome", // This would come from your data
      material: "12-Gauge Steel", // This would come from your data
      length: "24\"", // This would come from your data
      width: "7/8\"", // This would come from your data
      depth: "11/16\"", // This would come from your data
      boxQuantity: "5 EA" // This would come from your data
    })
    setShowAttributes(true)
  }

  const formatAttributes = (attributes: ItemAttributes) => [
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
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      
      <div className="flex gap-2">
        <Button className="bg-red-600 hover:bg-red-700" disabled={selectedItems.length === 0}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add items to cart
        </Button>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Add items to proposal
        </Button>
        <Button variant="outline">
          <Heart className="mr-2 h-4 w-4" />
          Add items to shopping list
        </Button>
        <Button variant="outline">Add to compare</Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={selectedItems.length === items.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[120px]">Qty.</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Sold in</TableHead>
              <TableHead>Catalog</TableHead>
              <TableHead>Item #</TableHead>
              <TableHead>Mfr. #</TableHead>
              <TableHead>Product details</TableHead>
              <TableHead className="w-[100px]">Attributes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <TableRow 
                  className={`border-b ${expandedItem === item.id ? 'bg-gray-50' : ''} cursor-pointer hover:bg-gray-50`}
                  onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => handleSelectItem(item.id)}
                    />
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, quantities[item.id] - 1)}
                        disabled={quantities[item.id] <= item.minOrderQuantity}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        min={item.minOrderQuantity}
                        value={quantities[item.id]}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || item.minOrderQuantity)}
                        className="w-16 text-center"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, quantities[item.id] + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">
                        ${item.price.toFixed(2)}
                        {item.hasPriceScales && '*'}
                      </div>
                      <div className="text-sm text-gray-500">{item.pricePerUnit}</div>
                    </div>
                  </TableCell>
                  <TableCell>{item.soldIn}</TableCell>
                  <TableCell>
                    <Button variant="link" className="h-auto p-0">
                      {item.catalog}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        width={40} 
                        height={40} 
                        className="rounded"
                      />
                      <div className="text-sm">{item.itemNumber}</div>
                    </div>
                  </TableCell>
                  <TableCell>{item.manufacturerNumber}</TableCell>
                  <TableCell>
                    <div className="font-normal text-left w-full">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between"
                      onClick={() => handleShowAttributes(item)}
                    >
                      Attributes
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedItem === item.id && (
                  <TableRow>
                    <TableCell colSpan={9} className="p-0">
                      <ItemDetailsAccordion
                        details={{
                          name: item.name,
                          image: item.image,
                          price: item.price,
                          originalPrice: item.originalPrice,
                          dimensions: item.description,
                          pricePerUnit: parseFloat(item.pricePerUnit),
                          unit: item.soldIn,
                          bulkPricing: item.bulkPricing,
                          stock: {
                            status: item.availability,
                            quantity: item.stock,
                            location: item.location
                          },
                          isLastChance: item.isLastChance
                        }}
                        onClose={() => setExpandedItem(null)}
                        onAddToCart={(quantity) => {
                          console.log(`Adding ${quantity} of ${item.id} to cart`)
                          setExpandedItem(null)
                        }}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {items.some(item => item.hasPriceScales) && (
        <div className="text-sm text-gray-500">
          * Contains price scales
        </div>
      )}
      {selectedItemAttributes && (
        <ProductAttributesDialog
          open={showAttributes}
          onOpenChange={setShowAttributes}
          attributes={formatAttributes(selectedItemAttributes)}
        />
      )}
    </div>
  )
}

