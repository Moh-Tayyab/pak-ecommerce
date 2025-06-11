"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/lib/hooks"
import { searchProducts } from "@/lib/api"

interface SearchBarProps {
  placeholder?: string
}

export default function SearchBar({ placeholder = "Search..." }: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const searchRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Fetch search results when query changes
  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setResults([])
      return
    }

    async function fetchResults() {
      setIsLoading(true)
      try {
        const data = await searchProducts(debouncedQuery)
        setResults(data)
      } catch (error) {
        console.error("Error searching products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [debouncedQuery])

  // Handle search submission
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`)
      setIsFocused(false)
    }
  }

  // Clear search
  function clearSearch() {
    setQuery("")
    setResults([])
  }

  return (
    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          className="pl-10 pr-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </form>

      {/* Search Results Dropdown */}
      {isFocused && query.trim().length >= 2 && (
        <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-lg max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">Loading...</div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((product) => (
                <li key={product.id} className="border-b last:border-0">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-muted flex items-center"
                    onClick={() => {
                      router.push(`/product/${product.slug}`)
                      setIsFocused(false)
                    }}
                  >
                    <div className="w-10 h-10 relative mr-3 flex-shrink-0">
                      <img
                        src={product.imageUrls[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">PKR {product.pricePKR.toLocaleString()}</div>
                    </div>
                  </button>
                </li>
              ))}
              <li className="p-2 text-center">
                <Button
                  variant="link"
                  className="text-sm"
                  onClick={() => {
                    router.push(`/shop?search=${encodeURIComponent(query.trim())}`)
                    setIsFocused(false)
                  }}
                >
                  View all results
                </Button>
              </li>
            </ul>
          ) : (
            <div className="p-4 text-center text-muted-foreground">No products found for "{query}"</div>
          )}
        </div>
      )}
    </div>
  )
}
