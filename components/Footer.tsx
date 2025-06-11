import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const categories = [
  { name: "Smartphones", slug: "smartphones" },
  { name: "Laptops", slug: "laptops" },
  { name: "Audio & Headphones", slug: "audio-headphones" },
  { name: "Cables & Chargers", slug: "cables-chargers" },
  { name: "Smart Wearables", slug: "smart-wearables" },
]

const customerService = [
  { name: "Contact Us", slug: "contact" },
  { name: "FAQ", slug: "faq" },
  { name: "Shipping Policy", slug: "shipping-policy" },
  { name: "Returns & Refunds", slug: "returns" },
  { name: "Privacy Policy", slug: "privacy-policy" },
  { name: "Terms & Conditions", slug: "terms" },
]

export default function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About & Brand */}
          <div>
            <div className="flex items-center mb-4">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="TechBazaar Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="font-bold text-xl">TechBazaar</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Pakistan's #1 Electronic Accessories Store. Shop the latest tech with fast delivery and secure payments.
            </p>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {customerService.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${item.slug}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest products and exclusive offers.
            </p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email address" className="max-w-[220px]" />
              <Button type="submit">Subscribe</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">We never share your email with third parties.</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>

            <div className="text-sm text-muted-foreground">© 2025 TechBazaar. All Rights Reserved.</div>

            <div className="mt-4 md:mt-0 flex space-x-2">
              <Image src="/placeholder.svg?height=30&width=40" alt="Visa" width={40} height={30} />
              <Image src="/placeholder.svg?height=30&width=40" alt="Mastercard" width={40} height={30} />
              <Image src="/placeholder.svg?height=30&width=40" alt="American Express" width={40} height={30} />
              <Image src="/placeholder.svg?height=30&width=40" alt="JazzCash" width={40} height={30} />
              <Image src="/placeholder.svg?height=30&width=40" alt="EasyPaisa" width={40} height={30} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
