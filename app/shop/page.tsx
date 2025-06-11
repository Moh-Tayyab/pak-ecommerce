import { Suspense } from "react"
import { getCategories, getBrands } from "@/lib/api"
import ProductGrid from "@/components/shop/ProductGrid"
import FilterSidebar from "@/components/shop/FilterSidebar"
import SearchBar from "@/components/SearchBar"
import ProductGridSkeleton from "@/components/shop/ProductGridSkeleton"

export const metadata = {
  title: "Shop All Electronics | TechBazaar",
  description:
    "Browse our complete collection of smartphones, laptops, headphones, and electronic accessories with fast delivery across Pakistan.",
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const categories = await getCategories()
  const brands = await getBrands()

  const category = typeof searchParams.category === "string" ? searchParams.category : undefined
  const brand = typeof searchParams.brand === "string" ? searchParams.brand : undefined
  const minPrice = typeof searchParams.minPrice === "string" ? Number.parseInt(searchParams.minPrice) : undefined
  const maxPrice = typeof searchParams.maxPrice === "string" ? Number.parseInt(searchParams.maxPrice) : undefined
  const rating = typeof searchParams.rating === "string" ? Number.parseInt(searchParams.rating) : undefined
  const inStock = searchParams.inStock === "true"
  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shop All Electronics</h1>

      <div className="mb-6">
        <SearchBar placeholder="Search for electronics, brands, models..." />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <FilterSidebar
            categories={categories}
            brands={brands}
            selectedCategory={category}
            selectedBrand={brand}
            selectedMinPrice={minPrice}
            selectedMaxPrice={maxPrice}
            selectedRating={rating}
            selectedInStock={inStock}
          />
        </div>

        <div className="w-full lg:w-3/4">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid
              category={category}
              brand={brand}
              minPrice={minPrice}
              maxPrice={maxPrice}
              rating={rating}
              inStock={inStock}
              page={page}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
