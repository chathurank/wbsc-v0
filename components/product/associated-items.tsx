import { ItemTable } from './item-table'

interface AssociatedItemsProps {
  items: {
    id: string
    name: string
    price: number
    sku: string
    image: string
    availability: string
    minOrderQuantity: number
    unitOfMeasure: string
    details: Record<string, string>
  }[]
  className?: string
}

export function AssociatedItems({ items, className }: AssociatedItemsProps) {
  return (
    <div className={className}>
      <ItemTable items={items} title="Associated Items" />
    </div>
  )
}

