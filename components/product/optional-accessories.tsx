import { OptionalAccessoriesTable } from './optional-accessories-table'

interface OptionalAccessoriesProps {
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

export function OptionalAccessories({ items, className }: OptionalAccessoriesProps) {
  return (
    <div className={className}>
      <OptionalAccessoriesTable accessories={items} />
    </div>
  )
}

