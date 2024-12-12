import Link from "next/link"
import { Search, ShoppingCart, ChevronDown, Scan, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

export function MainHeader() {
  return (
    <div className="container py-4">
      <div className="flex items-center gap-4 sm:gap-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <svg width="320" height="68" viewBox="0 0 320 68" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto sm:h-12">
            <g clipPath="url(#clip0_116_3707)">
              <path d="M222.93 56.3962H236.6L226.763 39.7687C232.207 37.511 235.298 33.1857 235.298 27.4601C235.298 18.9293 229.613 13.3308 218.355 13.3308H196.771V56.3962H208.643V41.4717H214.644L222.93 56.3962ZM223.43 27.4601C223.43 30.5067 221.325 32.7025 216.93 32.7025H208.643V22.2219H216.93C221.325 22.2229 223.43 24.4144 223.43 27.4601ZM175.494 25.4503V39.215C175.494 45.4292 172.405 47.6218 168.384 47.6218C164.368 47.6218 161.212 45.4292 161.212 39.2738V25.4503H149.088V39.8243C149.088 51.1517 155.46 57.3691 168.385 57.3691C181.375 57.3691 187.626 51.1517 187.626 39.8853V25.4503H175.494ZM161.213 13.3308H149.091V21.4339H161.213V13.3308ZM175.494 21.4308H187.621V13.3276H175.494V21.4308ZM99.1135 41.8352L92.9887 13.3308H80.9258L92.0618 56.3962H104.865L112.349 28.3152L119.831 56.3962H132.638L143.768 13.3308H131.708L125.583 41.8352L117.975 13.3308H106.72L99.1135 41.8352ZM307.819 28.7407H293.094V13.3308H280.974V56.3962H293.094V38.4922H307.819V56.3962H320V13.3308H307.819V28.7407ZM251.038 22.7083V56.3962H263.159V22.7083H274.414V13.3308H239.782V22.7083H251.038Z" fill="currentColor"/>
              <path d="M62.6571 26.4505H0V0H26.0768V10.4008H36.5824V0H62.6571V26.4505Z" fill="#E21F26"/>
              <path d="M36.5824 57.1778V67.5334C51.5797 64.7599 62.6571 51.8945 62.6571 37.4469V36.9016H0V37.4469C0 51.8945 11.0859 64.7599 26.0768 67.5334V57.1778H36.5824Z" fill="#E21F26"/>
            </g>
            <defs>
              <clipPath id="clip0_116_3707">
                <rect width="320" height="67.5345" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-3xl hidden sm:block">
          <div className="relative">
            <Input
              type="search"
              placeholder="What are you looking for?"
              className="h-11"
            />
            <div className="absolute right-0 top-0 h-full flex items-center gap-2 px-3">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Scan className="h-4 w-4" />
                <span className="sr-only">Scan product</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Account & Cart */}
        <div className="flex items-center gap-4 sm:gap-6 ml-auto sm:ml-0">
          {/* Theme Toggle */}
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hidden sm:flex items-center gap-2">
                My account
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Orders</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="sr-only">Cart</span>
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center"
            >
              0
            </Badge>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                <Link href="/quick-order" className="text-lg font-medium">
                  Quick order
                </Link>
                <Link href="/quotes" className="text-lg font-medium">
                  Quotes
                </Link>
                <Link href="/promotions" className="text-lg font-medium">
                  Promotions
                </Link>
                <Link href="/resource-center" className="text-lg font-medium">
                  Resource center
                </Link>
                <Link href="/careers" className="text-lg font-medium">
                  Careers
                </Link>
                <Link href="/help" className="text-lg font-medium">
                  Help
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}

