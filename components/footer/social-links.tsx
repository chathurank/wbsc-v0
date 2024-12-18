import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter, PinIcon as Pinterest, Youtube } from 'lucide-react'

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Pinterest, href: "#", label: "Pinterest" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function SocialLinks() {
  return (
    <div className="flex gap-4">
      {socialLinks.map((social) => (
        <Link
          key={social.label}
          href={social.href}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label={social.label}
        >
          <social.icon className="h-6 w-6" />
        </Link>
      ))}
    </div>
  )
}

