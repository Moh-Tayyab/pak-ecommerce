import { type NextRequest, NextResponse } from "next/server"
import type { Product } from "@/lib/api"

// This would normally come from a database
// For demo purposes, we'll import from the main products route
async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/products`)
  const data = await response.json()
  return data.products || []
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const products = await getProducts()
    const product = products.find((p) => p.id === params.id || p.slug === params.id)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    // In a real app, update the product in the database
    return NextResponse.json({ success: true, message: "Product updated successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // In a real app, delete the product from the database
    return NextResponse.json({ success: true, message: "Product deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
