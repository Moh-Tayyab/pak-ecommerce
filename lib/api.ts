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

// Mock data
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

const products: Product[] = [
  {
    id: "prod1",
    slug: "iphone-13-pro-max",
    name: "iPhone 13 Pro Max",
    description:
      "The iPhone 13 Pro Max features a 6.7-inch Super Retina XDR display with ProMotion, A15 Bionic chip, and a pro camera system that enables impressive low-light photography.",
    category: "smartphones",
    brand: "apple",
    pricePKR: 249999,
    discountPercentage: 5,
    rating: 4.8,
    reviewCount: 124,
    imageUrls: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    stock: 15,
    sku: "APIP13PM-128",
    specifications: {
      display: "6.7-inch Super Retina XDR display with ProMotion",
      processor: "A15 Bionic chip",
      camera: "Pro 12MP camera system: Telephoto, Wide, and Ultra Wide",
      battery: "Up to 28 hours video playback",
      storage: "128GB",
      os: "iOS 15",
      dimensions: "160.8 x 78.1 x 7.65 mm",
      weight: "238 grams",
    },
    createdAt: "2023-01-15T08:00:00Z",
    isFeatured: true,
    options: [
      {
        name: "Storage",
        values: ["128GB", "256GB", "512GB", "1TB"],
      },
      {
        name: "Color",
        values: ["Graphite", "Gold", "Silver", "Sierra Blue"],
      },
    ],
  },
  {
    id: "prod2",
    slug: "samsung-galaxy-s21-ultra",
    name: "Samsung Galaxy S21 Ultra",
    description:
      "The Galaxy S21 Ultra features a stunning 6.8-inch Dynamic AMOLED 2X display, powerful Exynos 2100 processor, and a versatile quad camera system with 100x Space Zoom.",
    category: "smartphones",
    brand: "samsung",
    pricePKR: 199999,
    discountPercentage: 10,
    rating: 4.7,
    reviewCount: 98,
    imageUrls: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    stock: 8,
    sku: "SGGS21U-256",
    specifications: {
      display: "6.8-inch Dynamic AMOLED 2X display",
      processor: "Exynos 2100",
      camera: "108MP wide, 12MP ultra-wide, 10MP telephoto with 3x optical zoom, 10MP telephoto with 10x optical zoom",
      battery: "5000mAh",
      storage: "256GB",
      os: "Android 11",
      dimensions: "165.1 x 75.6 x 8.9 mm",
      weight: "227 grams",
    },
    createdAt: "2023-02-10T10:30:00Z",
    isFeatured: true,
    options: [
      {
        name: "Storage",
        values: ["128GB", "256GB", "512GB"],
      },
      {
        name: "Color",
        values: ["Phantom Black", "Phantom Silver", "Phantom Titanium", "Phantom Navy", "Phantom Brown"],
      },
    ],
  },
  {
    id: "prod3",
    slug: "macbook-pro-14",
    name: "MacBook Pro 14-inch",
    description:
      "The 14-inch MacBook Pro features an M1 Pro chip, stunning Liquid Retina XDR display, and all-day battery life, making it perfect for professionals and creatives.",
    category: "laptops",
    brand: "apple",
    pricePKR: 349999,
    discountPercentage: 0,
    rating: 4.9,
    reviewCount: 76,
    imageUrls: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    stock: 5,
    sku: "APMB14-512",
    specifications: {
      display: "14.2-inch Liquid Retina XDR display",
      processor: "Apple M1 Pro chip",
      memory: "16GB unified memory",
      storage: "512GB SSD",
      graphics: "14-core GPU",
      battery: "Up to 17 hours",
      ports: "3 Thunderbolt 4 ports, HDMI port, SDXC card slot, MagSafe 3 port",
      os: "macOS Monterey",
    },
    createdAt: "2023-03-05T14:15:00Z",
    isFeatured: true,
    options: [
      {
        name: "Processor",
        values: ["M1 Pro (8-core CPU)", "M1 Pro (10-core CPU)", "M1 Max (10-core CPU)"],
      },
      {
        name: "Memory",
        values: ["16GB", "32GB", "64GB"],
      },
      {
        name: "Storage",
        values: ["512GB", "1TB", "2TB", "4TB", "8TB"],
      },
    ],
  },
  {
    id: "prod4",
    slug: "sony-wh-1000xm4",
    name: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
    description:
      "Industry-leading noise cancellation with Dual Noise Sensor technology, up to 30-hour battery life, and touch sensor controls for an exceptional listening experience.",
    category: "audio-headphones",
    brand: "sony",
    pricePKR: 59999,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 203,
    imageUrls: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    stock: 20,
    sku: "SONWH1000XM4",
    specifications: {
      type: "Over-ear, Wireless",
      driver: "40mm, dome type (CCAW Voice coil)",
      frequency: "4Hz-40,000Hz",
      battery: "Up to 30 hours",
      charging: "USB Type-C",
      weight: "254g",
      features: "Active Noise Cancellation, Speak-to-Chat, Wearing Detection, Adaptive Sound Control",
    },
    createdAt: "2023-01-20T09:45:00Z",
    isFeatured: true,
    options: [
      {
        name: "Color",
        values: ["Black", "Silver", "Midnight Blue"],
      },
    ],
  },
  {
    id: "prod5",
    slug: "anker-powercore-20000",
    name: "Anker PowerCore 20000mAh Power Bank",
    description:
      "High-capacity 20000mAh power bank with PowerIQ and VoltageBoost technology for fast charging of smartphones, tablets, and other USB devices.",
    category: "cables-chargers",
    brand: "anker",
    pricePKR: 7999,
    discountPercentage: 20,
    rating: 4.6,
    reviewCount: 312,
    imageUrls: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    stock: 35,
    sku: "ANKPB20K",
    specifications: {
      capacity: "20000mAh",
      input: "5V/2A",
      output: "2 USB-A ports (5V/3A each)",
      charging: "Micro USB",
      dimensions: "166 x 62 x 22 mm",
      weight: "356g",
      features: "PowerIQ, VoltageBoost, MultiProtect Safety System",
    },
    createdAt: "2023-02-15T11:20:00Z",
    isFeatured: false,
    options: [
      {
        name: "Color",
        values: ["Black", "White"],
      },
    ],
  },
  // Add more products as needed
]

// API functions
export async function getCategories(): Promise<Category[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return categories
}

export async function getBrands(): Promise<Brand[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return brands
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
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
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  let filteredProducts = [...products]

  // Apply filters
  if (filters) {
    if (filters.category) {
      filteredProducts = filteredProducts.filter((p) => p.category === filters.category)
    }

    if (filters.brand) {
      filteredProducts = filteredProducts.filter((p) => p.brand === filters.brand)
    }

    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter((p) => p.pricePKR >= filters.minPrice!)
    }

    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter((p) => p.pricePKR <= filters.maxPrice!)
    }

    if (filters.rating !== undefined) {
      filteredProducts = filteredProducts.filter((p) => p.rating >= filters.rating!)
    }

    if (filters.inStock) {
      filteredProducts = filteredProducts.filter((p) => p.stock > 0)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.brand.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower),
      )
    }
  }

  // Get total count before pagination
  const total = filteredProducts.length

  // Apply pagination
  const page = filters?.page || 1
  const limit = filters?.limit || 12
  const start = (page - 1) * limit
  const end = start + limit

  filteredProducts = filteredProducts.slice(start, end)

  return { products: filteredProducts, total }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))
  return products.find((product) => product.slug === slug)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))
  return products.filter((product) => product.isFeatured)
}

export async function getNewArrivals(limit = 6): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  // Sort by createdAt (newest first) and take the first 'limit' products
  return [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, limit)
}

export async function getRelatedProducts(productId: string, category: string, limit = 4): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  // Get products in the same category, excluding the current product
  return products.filter((p) => p.category === category && p.id !== productId).slice(0, limit)
}

export async function searchProducts(query: string, limit = 10): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 150))

  if (!query.trim()) {
    return []
  }

  const searchLower = query.toLowerCase()

  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.brand.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower),
    )
    .slice(0, limit)
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

  // In a real app, you would save the order to a database here

  return { id: orderId, total }
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

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
