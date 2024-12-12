import Link from "next/link"

export function TopBar() {
  return (
    <div className="bg-background border-b">
      <div className="container flex items-center justify-between py-2 text-sm">
        <div className="hidden sm:block">Würth Baer Supply Company</div>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="tel:(800) 444-0043" className="hover:text-primary">
            (800) 444-0043
          </Link>
          <div className="hidden sm:flex items-center gap-2">
            <Link href="#" className="hover:text-primary">
              Brea, CA
            </Link>
            <Link href="#" className="hover:text-primary">
              944 West Utah Avenue
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

