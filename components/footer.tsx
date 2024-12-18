import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { HelpBanner } from "./help-banner"
import { FooterLinks } from "./footer-links"
import { SalesRepCard } from "./sales-rep-card"
import { AppDownloadButtons } from "./app-download-buttons"
import { Certifications } from "./certifications"
import { SocialLinks } from "./social-links"

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/careers", label: "Careers" },
  { href: "/locations", label: "Locations" },
  { href: "/blog", label: "Blog" },
]

const accountLinks = [
  { href: "/account", label: "Account Overview" },
  { href: "/orders", label: "Order History" },
  { href: "/saved-lists", label: "Saved Lists" },
  { href: "/quotes", label: "Quotes" },
  { href: "/invoices", label: "Invoices" },
]

const resourceLinks = [
  { href: "/catalogs", label: "Catalogs" },
  { href: "/resources", label: "Resource Center" },
  { href: "/support", label: "Support" },
  { href: "/faq", label: "FAQ" },
  { href: "/shipping", label: "Shipping Information" },
]

const legalLinks = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Notice" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/do-not-sell", label: "Do Not Sell My Personal Information" },
  { href: "/compliance", label: "Würth Compliance" },
  { href: "/feedback", label: "Site Feedback" },
  { href: "/sitemap", label: "Sitemap" },
]

export function Footer() {
  return (
    <footer className="bg-white dark:bg-black text-gray-800 dark:text-white">
      <HelpBanner />
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FooterLinks title="Company Information" links={companyLinks} />
          <FooterLinks title="My Account" links={accountLinks} />
          <FooterLinks title="Tools and Resources" links={resourceLinks} />
          <div>
            <SalesRepCard />
            <AppDownloadButtons />
          </div>
        </div>

        <div className="flex flex-wrap gap-8 items-center justify-between mt-12 py-8 border-t border-gray-200 dark:border-white/10">
          <Certifications />
          <SocialLinks />
        </div>

        <Separator className="my-8 bg-gray-200 dark:bg-white/10" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <p>
            Copyright © 2004-{new Date().getFullYear()},{" "}
            <Link href="/" className="hover:text-white transition-colors">
              Würth Baer Supply Company
            </Link>
            . All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

