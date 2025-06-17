// Mock data for the e-commerce site
// In a real application, this would be replaced with actual API calls

import type { CartItem } from "./cart-context"

// Types
export interface Product {
  id: string
  slug: string
  name: string
  description: string
  category: string
  brand: string
  pricePKR: number
  discountPercentage: number
  rating: number
  reviewCount: number
  imageUrls: string[]
  stock: number
  sku: string
  specifications: Record<string, any>
  createdAt: string
  isFeatured: boolean
  options?: ProductOption[]
}

export interface ProductOption {
  name: string
  values: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  imageUrl: string
}

export interface Brand {
  id: string
  name: string
  slug: string
  logoUrl: string
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

// Static data that doesn't change
const categories: Category[] = [
  {
    id: "cat1",
    name: "Smartphones",
    slug: "smartphones",
    description: "Latest smartphones from top brands like Apple, Samsung, and Xiaomi.",
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "cat2",
    name: "Laptops",
    slug: "laptops",
    description: "Powerful laptops for work, gaming, and everyday use.",
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "cat3",
    name: "Audio & Headphones",
    slug: "audio-headphones",
    description: "High-quality audio devices including headphones, earbuds, and speakers.",
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "cat4",
    name: "Cables & Chargers",
    slug: "cables-chargers",
    description: "Essential cables, chargers, and power banks for all your devices.",
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "cat5",
    name: "Cameras & Drones",
    slug: "cameras-drones",
    description: "Capture stunning photos and videos with our range of cameras and drones.",
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "cat6",
    name: "Smart Wearables",
    slug: "smart-wearables",
    description: "Stay connected with smartwatches and fitness trackers.",
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "cat7",
    name: "Gaming",
    slug: "gaming",
    description: "Enhance your gaming experience with controllers, headsets, and accessories.",
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
]

const brands: Brand[] = [
  { id: "brand1", name: "Apple", slug: "apple", logoUrl: "/placeholder.svg?height=100&width=100" },
  { id: "brand2", name: "Samsung", slug: "samsung", logoUrl: "/placeholder.svg?height=100&width=100" },
  { id: "brand3", name: "Xiaomi", slug: "xiaomi", logoUrl: "/placeholder.svg?height=100&width=100" },
  { id: "brand4", name: "HP", slug: "hp", logoUrl: "/placeholder.svg?height=100&width=100" },
  { id: "brand5", name: "Dell", slug: "dell", logoUrl: "/placeholder.svg?height=100&width=100" },
  { id: "brand6", name: "Sony", slug: "sony", logoUrl: "/placeholder.svg?height=100&width=100" },
  { id: "brand7", name: "JBL", slug: "jbl", logoUrl: "/placeholder.svg?height=100&width=100" },
  { id: "brand8", name: "Anker", slug: "anker", logoUrl: "/placeholder.svg?height=100&width=100" },
]

// API functions that now use real API calls
export async function getCategories(): Promise<Category[]> {
  return categories
}

export async function getBrands(): Promise<Brand[]> {
  return brands
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return categories.find((category) => category.slug === slug)
}

export async function getProducts(filters?: {
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  inStock?: boolean
  search?: string
  page?: number
  limit?: number
}): Promise<{ products: Product[]; total: number }> {
  try {
    const params = new URLSearchParams()

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString())
        }
      })
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/products?${params}`, {
      cache: "no-store", // Always fetch fresh data
    })

    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    return { products: [], total: 0 }
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/products/${slug}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      return undefined
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching product:", error)
    return undefined
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const { products } = await getProducts({ limit: 100 })
    return products.filter((product) => product.isFeatured)
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

export async function getNewArrivals(limit = 6): Promise<Product[]> {
  try {
    const { products } = await getProducts({ limit: 100 })
    return products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, limit)
  } catch (error) {
    console.error("Error fetching new arrivals:", error)
    return []
  }
}

export async function getRelatedProducts(productId: string, category: string, limit = 4): Promise<Product[]> {
  try {
    const { products } = await getProducts({ category, limit: 100 })
    return products.filter((p) => p.id !== productId).slice(0, limit)
  } catch (error) {
    console.error("Error fetching related products:", error)
    return []
  }
}

export async function searchProducts(query: string, limit = 10): Promise<Product[]> {
  try {
    const { products } = await getProducts({ search: query, limit })
    return products
  } catch (error) {
    console.error("Error searching products:", error)
    return []
  }
}

export async function createProduct(
  productData: any,
): Promise<{ success: boolean; product?: Product; error?: string }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || "Failed to create product")
    }

    return result
  } catch (error) {
    console.error("Error creating product:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function createOrder(orderData: {
  items: CartItem[]
  shippingInfo: any
  paymentInfo: any
}): Promise<{ id: string; total: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Generate a random order ID
  const orderId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  // Calculate total
  const subtotal = orderData.items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal >= 3000 ? 0 : 250
  const total = (subtotal + shipping).toString()

  return { id: orderId, total }
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  // Mock reviews
  const reviews: Review[] = [
    {
      id: "rev1",
      productId,
      userId: "user1",
      userName: "Ahmed K.",
      rating: 5,
      comment: "Excellent product! Fast delivery and exactly as described.",
      createdAt: "2023-05-15T14:30:00Z",
    },
    {
      id: "rev2",
      productId,
      userId: "user2",
      userName: "Fatima S.",
      rating: 4,
      comment: "Good quality product. The battery life is impressive.",
      createdAt: "2023-05-10T09:15:00Z",
    },
    {
      id: "rev3",
      productId,
      userId: "user3",
      userName: "Muhammad R.",
      rating: 5,
      comment: "Amazing value for money. Would definitely recommend!",
      createdAt: "2023-05-05T16:45:00Z",
    },
  ]

  return reviews
}
