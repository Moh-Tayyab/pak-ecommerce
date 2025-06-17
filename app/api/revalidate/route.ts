import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json()

    // Revalidate specific paths
    if (path) {
      revalidatePath(path)
    } else {
      // Revalidate all product-related pages
      revalidatePath("/shop")
      revalidatePath("/admin/products")
      revalidatePath("/")
    }

    return NextResponse.json({ revalidated: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 })
  }
}
