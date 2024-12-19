'use client'

import { useState, useRef, useEffect } from 'react'
import { FileText, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface ProductTabsProps {
  product: {
    description: string
    specifications: Record<string, string>
    downloads: {
      name: string
      url: string
    }[]
  }
  className?: string
}

export function ProductTabs({ product, className }: ProductTabsProps) {
  const [showAllSpecs, setShowAllSpecs] = useState(false)
  const [visibleSpecsCount, setVisibleSpecsCount] = useState(5)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const downloadsRef = useRef<HTMLDivElement>(null)
  const specItemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calculateVisibleSpecs = () => {
      const descHeight = descriptionRef.current?.offsetHeight || 0
      const downHeight = downloadsRef.current?.offsetHeight || 0
      const specItemHeight = specItemRef.current?.offsetHeight || 0
      const totalHeight = descHeight + downHeight
      
      if (specItemHeight > 0) {
        const count = Math.floor(totalHeight / specItemHeight)
        setVisibleSpecsCount(Math.max(count, 1)) // Ensure at least one spec is shown
      }
    }

    calculateVisibleSpecs()
    window.addEventListener('resize', calculateVisibleSpecs)
    return () => window.removeEventListener('resize', calculateVisibleSpecs)
  }, [])

  const specEntries = Object.entries(product.specifications)
  const visibleSpecs = showAllSpecs ? specEntries : specEntries.slice(0, visibleSpecsCount)

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div ref={descriptionRef}>
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          </div>
          
          <div ref={downloadsRef} className="mt-8">
            <h3 className="text-xl font-bold mb-4">Downloads</h3>
            <div className="grid gap-2">
              {product.downloads.map((download) => (
                <Button
                  key={download.name}
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a href={download.url} className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    <span className="flex-grow text-left">{download.name}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Specifications</h2>
          <div className="grid gap-y-2">
            {visibleSpecs.map(([key, value], index) => (
              <div 
                key={key} 
                className="flex justify-between py-2 border-b"
                ref={index === 0 ? specItemRef : null}
              >
                <span className="text-sm font-medium">{key}</span>
                <span className="text-sm text-muted-foreground">{value}</span>
              </div>
            ))}
          </div>
          {specEntries.length > visibleSpecsCount && (
            <Button
              variant="ghost"
              className="w-full mt-4"
              onClick={() => setShowAllSpecs(!showAllSpecs)}
            >
              {showAllSpecs ? (
                <>
                  Show Less <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

