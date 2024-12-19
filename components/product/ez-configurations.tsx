import Image from "next/image"
import { Button } from "@/components/ui/button"

interface EzConfigurationsProps {
  className?: string
}

interface Configuration {
  id: number
  name: string
  type: string
  specs: {
    label: string
    value: string
  }[]
}

const configurations: Configuration[] = [
  {
    id: 1,
    name: "Blank Keyed Lift System",
    type: "Standard Lift",
    specs: [
      { label: "Lift", value: "Standard" },
      { label: "Keying", value: "Blank" },
      { label: "Finish", value: "Satin Chrome" },
    ],
  },
  {
    id: 2,
    name: "Keyed Alike Lift System",
    type: "High Lift",
    specs: [
      { label: "Lift", value: "High" },
      { label: "Keying", value: "Keyed Alike" },
      { label: "Finish", value: "Brass" },
    ],
  },
]

export function EzConfigurations({ className }: EzConfigurationsProps) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-6">EZ configurations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {configurations.map((config) => (
          <div key={config.id} className="border rounded-lg p-4 shadow-sm">
            <Image
              src={`https://via.placeholder.com/200x200?text=Configuration+${config.id}`}
              alt={config.name}
              width={200}
              height={200}
              className="w-full h-auto mb-4 rounded-md"
            />
            <h3 className="font-semibold mb-1">{config.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{config.type}</p>
            <div className="space-y-2 mb-4">
              {config.specs.map((spec, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{spec.label}:</span>
                  <span className="font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">View configuration</Button>
          </div>
        ))}
      </div>
    </div>
  )
}

