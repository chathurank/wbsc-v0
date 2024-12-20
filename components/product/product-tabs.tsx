'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronUp, FileText, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'

interface Configurator {
  title: string
  image: string
  logo: string
  href: string
}

interface ProductTabsProps {
  product: {
    description: string
    specifications?: Record<string, string>
    downloads?: {
      name: string
      url: string
    }[]
    configurators?: Configurator[]
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
        setVisibleSpecsCount(Math.max(count, 1))
      }
    }

    calculateVisibleSpecs()
    window.addEventListener('resize', calculateVisibleSpecs)
    return () => window.removeEventListener('resize', calculateVisibleSpecs)
  }, [])

  const specEntries = Object.entries(product.specifications || {})
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
          
          {product.downloads && product.downloads.length > 0 && (
            <div ref={downloadsRef} className="mt-8">
              <h3 className="text-xl font-bold mb-4">Downloads</h3>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                {product.downloads.map((download) => (
                  <Card key={download.name} className="group hover:bg-gray-50 transition-colors">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="relative w-16 h-20 bg-gray-100 rounded flex-shrink-0">
                        <Image
                          src="/placeholder.svg"
                          alt={download.name}
                          fill
                          className="object-cover rounded"
                        />
                        <div className="absolute -bottom-3 -right-3 bg-black rounded-full p-2">
                          <Download className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-medium group-hover:text-red-600 transition-colors">
                          {download.name}
                        </h4>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {product.configurators && product.configurators.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4">EZ configurators</h3>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                {product.configurators.map((configurator, index) => (
                  <Link 
                    key={index} 
                    href={configurator.href}
                    className="group block"
                  >
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-900">
                      <Image
                        src={configurator.image}
                        alt={configurator.title}
                        fill
                        className="object-cover opacity-90"
                      />
                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <h4 className="text-white text-2xl font-medium mb-4">
                          <span className="block">Blum Aventos Lift</span>
                          <span className="block">Systems configurator</span>
                        </h4>
                        <div className="self-end bg-[#FF6B00] p-2 rounded">
                          <Image
                            src={configurator.logo}
                            alt="Blum logo"
                            width={60}
                            height={30}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {product.specifications && Object.keys(product.specifications).length > 0 && (
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
        )}
      </div>
    </div>
  )
}

