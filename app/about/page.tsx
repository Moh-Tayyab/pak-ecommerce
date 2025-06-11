import Image from "next/image"
import { Shield, Truck, CreditCard, Clock } from "lucide-react"

export const metadata = {
  title: "About Us | TechBazaar",
  description:
    "Learn about TechBazaar, Pakistan's premier electronics store. Our mission, values, and commitment to customer satisfaction.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About TechBazaar</h1>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              At TechBazaar, our mission is to provide Pakistani consumers with access to high-quality electronic
              accessories at competitive prices. We believe that everyone deserves access to the latest technology
              without breaking the bank.
            </p>
            <p className="text-muted-foreground">
              Founded in 2025, we've quickly grown to become Pakistan's trusted destination for smartphones, laptops,
              headphones, and all electronic accessories. Our team of tech enthusiasts is dedicated to curating the best
              products and delivering exceptional customer service.
            </p>
          </div>

          <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=600" alt="TechBazaar team" fill className="object-cover" />
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Why Choose TechBazaar?</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Genuine Products</h3>
              <p className="text-muted-foreground">
                We source directly from authorized distributors to ensure authenticity and quality.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">
                We deliver across Pakistan with efficient shipping partners for quick delivery.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Secure Payments</h3>
              <p className="text-muted-foreground">
                Multiple payment options with state-of-the-art security for your transactions.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">
                Our customer service team is available around the clock to assist you.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center">Our Values</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Customer First</h3>
              <p className="text-muted-foreground">
                We prioritize customer satisfaction in everything we do, from product selection to after-sales support.
              </p>
            </div>

            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Quality Assurance</h3>
              <p className="text-muted-foreground">
                We rigorously test all products to ensure they meet our high standards before they reach you.
              </p>
            </div>

            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously improve our services and stay updated with the latest technology trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
