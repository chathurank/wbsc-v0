'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronRight, Minus, Plus, ShoppingCart, FileText, Heart } from 'lucide-react'

interface OptionalAccessory {
  id: string
  name: string
  price: number
  sku: string
  image: string
  availability: string
  minOrderQuantity: number
  unitOfMeasure: string
  details: Record<string, string>
}

interface OptionalAccessoriesTableProps {
  accessories: OptionalAccessory[]
  className?: string
}

export function OptionalAccessoriesTable({ accessories, className }: OptionalAccessoriesTableProps) {
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([])
  const [quantities, setQuantities] = useState<Record<string, number>>(
    accessories.reduce((acc, accessory) => ({ ...acc, [accessory.id]: accessory.minOrderQuantity }), {})
  )

  const handleSelectAccessory = (accessoryId: string) => {
    setSelectedAccessories(prev => 
      prev.includes(accessoryId) 
        ? prev.filter(id => id !== accessoryId)
        : [...prev, accessoryId]
    )
  }

  const handleSelectAll = () => {
    setSelectedAccessories(
      selectedAccessories.length === accessories.length ? [] : accessories.map(accessory => accessory.id)
    )
  }

  const handleQuantityChange = (accessoryId: string, newQuantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [accessoryId]: Math.max(accessories.find(accessory => accessory.id === accessoryId)?.minOrderQuantity || 1, newQuantity)
    }))
  }

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-4">Optional Accessories</h2>
      
      <div className="flex gap-2 mb-4">
        <Button className="bg-red-600 hover:bg-red-700" disabled={selectedAccessories.length === 0}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to cart
        </Button>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Add to proposal
        </Button>
        <Button variant="outline">
          <Heart className="mr-2 h-4 w-4" />
          Add to shopping list
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox
                checked={selectedAccessories.length === accessories.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accessories.map((accessory) => (
            <TableRow key={accessory.id}>
              <TableCell>
                <Checkbox
                  checked={selectedAccessories.includes(accessory.id)}
                  onCheckedChange={() => handleSelectAccessory(accessory.id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <Image 
                    src={accessory.image} 
                    alt={accessory.name} 
                    width={60} 
                    height={60} 
                    className="rounded-md"
                  />
                  <div>
                    <div className="font-medium">{accessory.name}</div>
                    <div className="text-sm text-gray-500">SKU: {accessory.sku}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>${accessory.price.toFixed(2)}</TableCell>
              <TableCell>{accessory.availability}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(accessory.id, quantities[accessory.id] - 1)}
                    disabled={quantities[accessory.id] <= accessory.minOrderQuantity}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min={accessory.minOrderQuantity}
                    value={quantities[accessory.id]}
                    onChange={(e) => handleQuantityChange(accessory.id, parseInt(e.target.value) || accessory.minOrderQuantity)}
                    className="w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(accessory.id, quantities[accessory.id] + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

