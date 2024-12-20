'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink } from 'lucide-react'

interface ProductAttribute {
  label: string
  value: string
  isLink?: boolean
}

interface ProductAttributesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  attributes: ProductAttribute[]
}

export function ProductAttributesDialog({
  open,
  onOpenChange,
  attributes
}: ProductAttributesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Product attributes</DialogTitle>
        </DialogHeader>
        <div className="rounded-lg border">
          {attributes.map((attribute, index) => (
            <div
              key={attribute.label}
              className="grid grid-cols-2 p-4 border-b last:border-b-0"
            >
              <div className="text-gray-900 font-medium">{attribute.label}</div>
              <div className="text-gray-900">
                {attribute.isLink ? (
                  <Button variant="link" className="p-0 h-auto font-normal">
                    {attribute.value}
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Button>
                ) : (
                  attribute.value
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            variant="default"
            className="bg-black hover:bg-gray-900 text-white px-8"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

