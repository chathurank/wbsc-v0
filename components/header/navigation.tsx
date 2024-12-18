import Link from "next/link"
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navigation() {
  return (
    <nav className="bg-[#CC0000] hidden sm:block">
      <div className="container">
        <ul className="flex items-center gap-8">
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-white hover:bg-white/10 flex items-center gap-2 h-12 rounded-none font-medium"
                >
                  All products
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/categories/fasteners" className="w-full">
                    Fasteners
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/categories/tools" className="w-full">
                    Tools
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/categories/safety-equipment" className="w-full">
                    Safety Equipment
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <Link
              href="/quick-order"
              className="text-white hover:text-white/90 h-12 flex items-center"
            >
              Quick order
            </Link>
          </li>
          <li>
            <Link
              href="/quotes"
              className="text-white hover:text-white/90 h-12 flex items-center"
            >
              Quotes
            </Link>
          </li>
          <li>
            <Link
              href="/promotions"
              className="text-white hover:text-white/90 h-12 flex items-center"
            >
              Promotions
            </Link>
          </li>
          <li>
            <Link
              href="/resource-center"
              className="text-white hover:text-white/90 h-12 flex items-center"
            >
              Resource center
            </Link>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-white hover:bg-white/10 flex items-center gap-2 h-12 rounded-none font-medium"
                >
                  Digital tools
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Tool 1</DropdownMenuItem>
                <DropdownMenuItem>Tool 2</DropdownMenuItem>
                <DropdownMenuItem>Tool 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <Link
              href="/careers"
              className="text-white hover:text-white/90 h-12 flex items-center"
            >
              Careers
            </Link>
          </li>
          <li>
            <Link
              href="/help"
              className="text-white hover:text-white/90 h-12 flex items-center"
            >
              Help
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

