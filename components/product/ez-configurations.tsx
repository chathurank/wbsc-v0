import Image from "next/image"
import { Button } from "@/components/ui/button"

interface EzConfigurationsProps {
  configurations: {
    id: string
    name: string
    image: string
    specs: {
      [key: string]: string
    }
  }[]
  className?: string
}

export function EzConfigurations({ configurations, className }: EzConfigurationsProps) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-6">EZ Configurations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {configurations.map((config) => (
          <div key={config.id} className="border rounded-lg p-4 shadow-sm">
            <Image
              src={config.image}
              alt={config.name}
              width={200}
              height={200}
              className="w-full h-auto mb-4 rounded-md"
            />
            <h3 className="font-semibold mb-2">{config.name}</h3>
            <div className="space-y-2 mb-4">
              {Object.entries(config.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{key}:</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">Select Configuration</Button>
          </div>
        ))}
      </div>
    </div>
  )
}

