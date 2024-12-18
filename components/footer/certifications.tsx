import Image from "next/image"
import { SamGovBadge } from "./sam-gov-badge"

export function Certifications() {
  return (
    <div className="flex flex-wrap gap-8">
      <SamGovBadge />
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <Image
          src="/placeholder.svg"
          alt="Viking Cloud Trusted Commerce"
          width={120}
          height={60}
        />
      </div>
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <Image
          src="/placeholder.svg"
          alt="Vender Freight Routing"
          width={120}
          height={60}
        />
      </div>
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <Image
          src="/placeholder.svg"
          alt="FSC Certification"
          width={120}
          height={60}
        />
      </div>
    </div>
  )
}

