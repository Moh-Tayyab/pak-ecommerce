import { type NextRequest, NextResponse } from "next/server"
import type { Product } from "@/lib/api"

// In-memory storage for demo (in production, use a database)
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
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const category = searchParams.get("category")
  const brand = searchParams.get("brand")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const rating = searchParams.get("rating")
  const inStock = searchParams.get("inStock")
  const search = searchParams.get("search")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "12")

  let filteredProducts = [...products]

  // Apply filters
  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category)
  }
  if (brand) {
    filteredProducts = filteredProducts.filter((p) => p.brand === brand)
  }
  if (minPrice) {
    filteredProducts = filteredProducts.filter((p) => p.pricePKR >= Number.parseInt(minPrice))
  }
  if (maxPrice) {
    filteredProducts = filteredProducts.filter((p) => p.pricePKR <= Number.parseInt(maxPrice))
  }
  if (rating) {
    filteredProducts = filteredProducts.filter((p) => p.rating >= Number.parseInt(rating))
  }
  if (inStock === "true") {
    filteredProducts = filteredProducts.filter((p) => p.stock > 0)
  }
  if (search) {
    const searchLower = search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.brand.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower),
    )
  }

  const total = filteredProducts.length
  const start = (page - 1) * limit
  const end = start + limit
  filteredProducts = filteredProducts.slice(start, end)

  return NextResponse.json({ products: filteredProducts, total })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Generate ID and slug
    const id = `prod${Date.now()}`
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    const newProduct: Product = {
      id,
      slug,
      name: body.name,
      description: body.description,
      category: body.category,
      brand: body.brand,
      pricePKR: body.price,
      discountPercentage: body.comparePrice
        ? Math.round(((body.comparePrice - body.price) / body.comparePrice) * 100)
        : 0,
      rating: 0,
      reviewCount: 0,
      imageUrls: body.images || ["/placeholder.svg?height=600&width=600"],
      stock: body.stock,
      sku: body.sku,
      specifications: {
        weight: body.weight ? `${body.weight}g` : undefined,
        dimensions: body.dimensions
          ? `${body.dimensions.length}x${body.dimensions.width}x${body.dimensions.height}mm`
          : undefined,
      },
      createdAt: new Date().toISOString(),
      isFeatured: body.isFeatured || false,
      options: [],
    }

    products.unshift(newProduct) // Add to beginning of array

    return NextResponse.json({ success: true, product: newProduct })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 })
  }
}
