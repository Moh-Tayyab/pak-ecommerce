import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import type { Product } from "@/lib/api"

interface NewArrivalsProps {
  products: Product[]
}

export default function NewArrivals({ products }: NewArrivalsProps) {
  return (
    <section className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">New Arrivals</h2>
        <Button asChild variant="outline">
          <Link href="/shop?sort=newest">View All</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <Link href={`/product/${product.slug}`}>
                <div className="aspect-square relative">
                  <Image
                    src={product.imageUrls[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">New</Badge>
            </div>

            <div className="p-4">
              <Link href={`/product/${product.slug}`}>
                <h3 className="font-medium mb-2 hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
              </Link>

              <div className="mb-3">
                <span className="text-lg font-bold text-primary">{formatCurrency(product.pricePKR)}</span>
              </div>

              <Button asChild size="sm" className="w-full">
                <Link href={`/product/${product.slug}`}>View Product</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
