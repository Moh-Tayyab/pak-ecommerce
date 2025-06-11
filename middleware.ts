import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

// Protected routes that require authentication
const protectedRoutes = ["/account", "/account/orders", "/account/wishlist", "/account/settings", "/checkout"]

export async function middleware(request: NextRequest) {
  try {
    // Use the NEXTAUTH_SECRET environment variable for JWT decryption
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    const isAuthenticated = !!token
    const path = request.nextUrl.pathname

    // Check if the path is a protected route
    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))

    // If the route is protected and the user is not authenticated, redirect to sign in
    if (isProtectedRoute && !isAuthenticated) {
      const signInUrl = new URL("/auth/signin", request.url)
      signInUrl.searchParams.set("callbackUrl", path)
      return NextResponse.redirect(signInUrl)
    }

    // If the user is already authenticated and trying to access sign in page, redirect to account
    if (path.startsWith("/auth/signin") && isAuthenticated) {
      return NextResponse.redirect(new URL("/account", request.url))
    }
  } catch (error) {
    console.error("Middleware error:", error)
    // Redirect to error page if there's an authentication error
    if (request.nextUrl.pathname.startsWith("/account") || request.nextUrl.pathname.startsWith("/checkout")) {
      const errorUrl = new URL("/auth/error", request.url)
      return NextResponse.redirect(errorUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/account/:path*", "/checkout/:path*", "/auth/signin"],
}
