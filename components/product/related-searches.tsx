import Link from "next/link"

interface RelatedSearchesProps {
  className?: string
}

export function RelatedSearches({ className }: RelatedSearchesProps) {
  const searches = [
    "Cam locks",
    "Cabinet locks",
    "Drawer locks",
    "Furniture locks",
    "Keyed locks"
  ]

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-4">Related searches</h2>
      <ul className="flex flex-wrap gap-3">
        {searches.map((search, index) => (
          <li key={index}>
            <Link
              href={`/search?q=${encodeURIComponent(search)}`}
              className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors duration-200"
            >
              {search}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

