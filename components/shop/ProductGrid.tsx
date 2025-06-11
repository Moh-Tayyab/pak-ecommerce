"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import ProductCard from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { getProducts } from "@/lib/api"
import type { Product } from "@/lib/api"

interface ProductGridProps {
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  inStock?: boolean
  page?: number
}

export default function ProductGrid({
  category,
  brand,
  minPrice,
  maxPrice,
  rating,
  inStock,
  page = 1,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Extract search value to avoid searchParams dependency issue
  const search = searchParams.get("search") || undefined

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true)
      try {
        const result = await getProducts({
          category,
          brand,
          minPrice,
          maxPrice,
          rating,
          inStock,
          search,
          page,
          limit: 12,
        })
        setProducts(result.products)
        setTotal(result.total)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [category, brand, minPrice, maxPrice, rating, inStock, page, search])

  const totalPages = Math.ceil(total / 12)

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    router.push(`?${params.toString()}`)
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-muted animate-pulse rounded-lg h-80" />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">
          Showing {(page - 1) * 12 + 1}-{Math.min(page * 12, total)} of {total} products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <Button variant="outline" onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
            Previous
          </Button>

          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            const pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + i
            return (
              <Button
                key={pageNum}
                variant={pageNum === page ? "default" : "outline"}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </Button>
            )
          })}

          <Button variant="outline" onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}>
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
