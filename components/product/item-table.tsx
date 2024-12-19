'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, ShoppingCart, FileText, Heart, BarChart2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import React from 'react'

export interface Item {
  id: string
  name: string
  price: number
  sku: string
  image: string
  description: string
  availability: string
  minOrderQuantity: number
  unitOfMeasure: string
  priceScales?: {
    quantity: number;
    price: number;
  }[];
}

interface ItemTableProps {
  items: Item[]
  title: string
}

export function ItemTable({ items, title }: ItemTableProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [quantities, setQuantities] = useState<Record<string, number>>(
    items.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  )

  const toggleItem = useCallback((id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }, [])

  const toggleSelectItem = useCallback((id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }, [])

  const handleQuantityChange = useCallback((id: string, value: number) => {
    setQuantities(prev => ({ ...prev, [id]: value }))
  }, [])

  const isAllSelected = items.length === selectedItems.length

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map(item => item.id))
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <Checkbox
            checked={isAllSelected}
            onCheckedChange={toggleSelectAll}
            id="select-all"
          />
          <label htmlFor="select-all" className="ml-2">
            Select All
          </label>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" disabled={selectedItems.length === 0}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to cart
          </Button>
          <Button variant="outline" size="sm" disabled={selectedItems.length === 0}>
            <Heart className="w-4 h-4 mr-2" />
            Add to wishlist
          </Button>
          <Button variant="outline" size="sm" disabled={selectedItems.length === 0}>
            <BarChart2 className="w-4 h-4 mr-2" />
            Compare
          </Button>
        </div>
      </div>
      <Table className="border-collapse">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Item</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <React.Fragment key={item.id}>
              <TableRow>
                <TableCell className="w-[50px]">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => toggleSelectItem(item.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Image src={item.image} alt={item.name} width={50} height={50} className="rounded-md" />
                    <span>{item.name}</span>
                  </div>
                </TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold">${item.price.toFixed(2)}</span>
                    {item.priceScales && item.priceScales.length > 0 && (
                      <div className="text-xs text-muted-foreground">
                        {item.priceScales.map((scale, index) => (
                          <div key={index}>
                            {scale.quantity}+: ${scale.price.toFixed(2)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={item.availability === 'In Stock' ? 'default' : 'secondary'}>
                    {item.availability}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min={1}
                    value={quantities[item.id]}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                    className="w-20"
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleItem(item.id);
                    }}
                  >
                    {expandedItems.includes(item.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </TableCell>
              </TableRow>
              {expandedItems.includes(item.id) && (
                <TableRow key={`${item.id}-expanded`}>
                  <TableCell colSpan={7}>
                    <div className="p-4 bg-muted">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Product Details</h4>
                          <p className="text-sm">{item.description}</p>
                          <Button variant="link" className="mt-2 p-0">
                            <FileText className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Ordering Information</h4>
                          <p className="text-sm">Minimum Order Quantity: {item.minOrderQuantity}</p>
                          <p className="text-sm">Unit of Measure: {item.unitOfMeasure}</p>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-4">
        <Button variant="outline">Add items to proposal</Button>
        <Button variant="outline">Add items to shopping list</Button>
      </div>
    </div>
  )
}

