import { Suspense } from "react"
import { getProductBySlug, getRelatedProducts } from "@/lib/api"
import Breadcrumbs from "@/components/Breadcrumbs"
import ProductGallery from "@/components/product/ProductGallery"
import AddToCartButton from "@/components/product/AddToCartButton"
import BuyNowButton from "@/components/product/BuyNowButton"
import ProductTabs from "@/components/product/ProductTabs"
import RelatedProducts from "@/components/product/RelatedProducts"
import ProductRating from "@/components/product/ProductRating"
import QuantitySelector from "@/components/product/QuantitySelector"
import ProductOptions from "@/components/product/ProductOptions"
import { formatCurrency } from "@/lib/utils"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    return {
      title: "Product Not Found | TechBazaar",
    }
  }

  return {
    title: `${product.name} | TechBazaar`,
    description: product.description.substring(0, 160),
    openGraph: {
      images: [{ url: product.imageUrls[0], width: 800, height: 600, alt: product.name }],
    },
  }
}

export async function generateStaticParams() {
  // In a real app, you might want to limit this to the most popular products
  // and use fallback: 'blocking' for the rest
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`).then((res) => res.json())
  return products.map((product: any) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.id, product.category)

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.category, href: `/category/${product.category}` },
          { label: product.name, href: `/product/${product.slug}` },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        <div>
          <ProductGallery images={product.imageUrls} alt={product.name} />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <ProductRating rating={product.rating} />
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="text-2xl font-bold">
            {formatCurrency(product.pricePKR)}
            {product.discountPercentage > 0 && (
              <span className="ml-2 text-sm line-through text-muted-foreground">
                {formatCurrency(product.pricePKR / (1 - product.discountPercentage / 100))}
              </span>
            )}
          </div>

          <div className="text-sm">
            <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
            {product.stock > 0 && <span className="ml-2 text-muted-foreground">({product.stock} available)</span>}
          </div>

          <div className="text-sm text-muted-foreground">SKU: {product.sku}</div>

          {product.options && product.options.length > 0 && <ProductOptions options={product.options} />}

          <div className="flex flex-col gap-4">
            <QuantitySelector max={product.stock} />

            <div className="flex flex-col sm:flex-row gap-4">
              <AddToCartButton product={product} className="flex-1" />
              <BuyNowButton product={product} className="flex-1" />
            </div>
          </div>
        </div>
      </div>

      <ProductTabs product={product} />

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <Suspense fallback={<div>Loading related products...</div>}>
          <RelatedProducts products={relatedProducts} />
        </Suspense>
      </div>
    </div>
  )
}
