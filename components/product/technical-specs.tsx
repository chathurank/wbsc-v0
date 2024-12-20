import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TechnicalSpecsProps {
  specs: {
    category: string
    items: {
      name: string
      value: string
    }[]
  }[]
  className?: string
}

export function TechnicalSpecs({ specs, className }: TechnicalSpecsProps) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-4">Technical Specifications</h2>
      {specs.map((category) => (
        <div key={category.category} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{category.category}</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Specification</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {category.items.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  )
}

