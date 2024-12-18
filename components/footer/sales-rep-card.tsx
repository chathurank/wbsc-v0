import Image from "next/image"
import Link from "next/link"
import { Phone, Mail } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

export function SalesRepCard() {
  return (
    <Card className="bg-white text-black p-4">
      <CardContent className="p-0">
        <p className="text-sm text-gray-600 mb-2">Your Sales Representative</p>
        <div className="flex items-start gap-4">
          <Image
            src="https://via.placeholder.com/80"
            alt="Sales Representative"
            width={80}
            height={80}
            className="rounded-lg"
          />
          <div>
            <h3 className="font-semibold">Ronald Richards</h3>
            <div className="space-y-1 mt-2">
              <Link href="tel:1-866-326-8131" className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4" />
                1-866-326-8131
              </Link>
              <Link href="mailto:johndoe@gmail.com" className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                johndoe@gmail.com
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

