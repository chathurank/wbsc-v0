import { ItemTable, Item } from './item-table'

interface OptionalAccessoriesProps {
  className?: string
}

const accessories: Item[] = [
  {
    id: '1',
    name: 'Optional Accessory 1',
    price: 9.99,
    sku: 'ACC123',
    image: 'https://via.placeholder.com/100',
    description: 'This is a description for Optional Accessory 1. It provides additional details about the product.',
    availability: 'In Stock',
    minOrderQuantity: 1,
    unitOfMeasure: 'Each'
  },
  {
    id: '2',
    name: 'Optional Accessory 2',
    price: 14.99,
    sku: 'ACC456',
    image: 'https://via.placeholder.com/100',
    description: 'This is a description for Optional Accessory 2. It provides additional details about the product.',
    availability: 'Low Stock',
    minOrderQuantity: 2,
    unitOfMeasure: 'Pack'
  },
]

export function OptionalAccessories({ className }: OptionalAccessoriesProps) {
  return (
    <div className={className}>
      <ItemTable items={accessories} title="Optional accessories" />
    </div>
  )
}

