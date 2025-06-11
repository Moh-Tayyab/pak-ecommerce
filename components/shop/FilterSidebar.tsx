"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Filter, X } from "lucide-react"
import type { Category, Brand } from "@/lib/api"

interface FilterSidebarProps {
  categories: Category[]
  brands: Brand[]
  selectedCategory?: string
  selectedBrand?: string
  selectedMinPrice?: number
  selectedMaxPrice?: number
  selectedRating?: number
  selectedInStock?: boolean
}

export default function FilterSidebar({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  selectedMinPrice,
  selectedMaxPrice,
  selectedRating,
  selectedInStock,
}: FilterSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [priceRange, setPriceRange] = useState([selectedMinPrice || 0, selectedMaxPrice || 500000])
  const [isOpen, setIsOpen] = useState(false)

  function updateFilters(key: string, value: string | number | boolean | null) {
    const params = new URLSearchParams(searchParams.toString())

    if (value === null || value === "" || value === false) {
      params.delete(key)
    } else {
      params.set(key, value.toString())
    }

    // Reset to first page when filters change
    params.delete("page")

    router.push(`?${params.toString()}`)
  }

  function clearAllFilters() {
    router.push(window.location.pathname)
  }

  const hasActiveFilters =
    selectedCategory || selectedBrand || selectedMinPrice || selectedMaxPrice || selectedRating || selectedInStock

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="w-full justify-between">
          <span className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
      </div>

      <div className={`space-y-6 ${isOpen ? "block" : "hidden lg:block"}`}>
        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Active Filters</span>
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              <X className="mr-1 h-3 w-3" />
              Clear All
            </Button>
          </div>
        )}

        {/* Categories */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
            Categories
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.slug}
                  checked={selectedCategory === category.slug}
                  onCheckedChange={(checked) => updateFilters("category", checked ? category.slug : null)}
                />
                <Label htmlFor={category.slug} className="text-sm">
                  {category.name}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Brands */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
            Brands
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <Checkbox
                  id={brand.slug}
                  checked={selectedBrand === brand.slug}
                  onCheckedChange={(checked) => updateFilters("brand", checked ? brand.slug : null)}
                />
                <Label htmlFor={brand.slug} className="text-sm">
                  {brand.name}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Price Range */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
            Price Range
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4">
            <div>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                onValueCommit={(value) => {
                  updateFilters("minPrice", value[0])
                  updateFilters("maxPrice", value[1])
                }}
                max={500000}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>PKR {priceRange[0].toLocaleString()}</span>
                <span>PKR {priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Rating */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
            Rating
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={selectedRating === rating}
                  onCheckedChange={(checked) => updateFilters("rating", checked ? rating : null)}
                />
                <Label htmlFor={`rating-${rating}`} className="text-sm">
                  {rating}+ Stars
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Availability */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
            Availability
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-stock"
                checked={selectedInStock || false}
                onCheckedChange={(checked) => updateFilters("inStock", checked)}
              />
              <Label htmlFor="in-stock" className="text-sm">
                In Stock Only
              </Label>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  )
}
