import { Suspense } from "react"
import { getCategories, getBrands, getCategoryBySlug } from "@/lib/api"
import ProductGrid from "@/components/shop/ProductGrid"
import FilterSidebar from "@/components/shop/FilterSidebar"
import SearchBar from "@/components/SearchBar"
import Breadcrumbs from "@/components/Breadcrumbs"
import ProductGridSkeleton from "@/components/shop/ProductGridSkeleton"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = await getCategoryBySlug(params.slug)

  if (!category) {
    return {
      title: "Category Not Found | TechBazaar",
    }
  }

  return {
    title: `${category.name} | TechBazaar`,
    description: `Shop the latest ${category.name} in Pakistan. ${category.description}`,
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const categories = await getCategories()
  const brands = await getBrands()
  const category = await getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  const brand = typeof searchParams.brand === "string" ? searchParams.brand : undefined
  const minPrice = typeof searchParams.minPrice === "string" ? Number.parseInt(searchParams.minPrice) : undefined
  const maxPrice = typeof searchParams.maxPrice === "string" ? Number.parseInt(searchParams.maxPrice) : undefined
  const rating = typeof searchParams.rating === "string" ? Number.parseInt(searchParams.rating) : undefined
  const inStock = searchParams.inStock === "true"
  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: category.name, href: `/category/${category.slug}` },
        ]}
      />

      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <p className="text-muted-foreground">{category.description}</p>
      </div>

      <div className="mb-6">
        <SearchBar placeholder={`Search in ${category.name}...`} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <FilterSidebar
            categories={categories}
            brands={brands}
            selectedCategory={category.slug}
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
              category={category.slug}
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
