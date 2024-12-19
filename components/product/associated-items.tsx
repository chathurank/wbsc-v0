import { ItemTable, Item } from './item-table'

interface AssociatedItemsProps {
  className?: string
}

const associatedItems: Item[] = [
  {
    id: '1',
    name: 'Associated Item 1',
    price: 19.99,
    sku: 'SKU123',
    image: 'https://via.placeholder.com/100',
    description: 'This is a description for Associated Item 1. It provides additional details about the product.',
    availability: 'In Stock',
    minOrderQuantity: 1,
    unitOfMeasure: 'Each'
  },
  {
    id: '2',
    name: 'Associated Item 2',
    price: 29.99,
    sku: 'SKU456',
    image: 'https://via.placeholder.com/100',
    description: 'This is a description for Associated Item 2. It provides additional details about the product.',
    availability: 'Out of Stock',
    minOrderQuantity: 5,
    unitOfMeasure: 'Pack'
  },
]

export function AssociatedItems({ className }: AssociatedItemsProps) {
  return (
    <div className={className}>
      <ItemTable items={associatedItems} title="Associated Items" />
    </div>
  )
}

