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
import { Logo } from "@/components/logo"

export function MainHeader() {
  return (
    <div className="container py-4 sm:py-6">
      <div className="flex items-center gap-4 sm:gap-8 h-16">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Logo className="w-40 h-8 sm:w-60 sm:h-12" />
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

