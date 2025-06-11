import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CartProvider } from "@/lib/cart-context"
import { UserPreferencesProvider } from "@/lib/user-preferences-context"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { NextAuthProvider } from "@/lib/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "TechBazaar - Pakistan's Premier Electronics Store",
  description:
    "Shop the latest smartphones, laptops, headphones, and electronic accessories in Pakistan with fast delivery and secure payments.",
  keywords: "electronics, Pakistan, smartphones, laptops, headphones, tech accessories",
  openGraph: {
    title: "TechBazaar - Pakistan's Premier Electronics Store",
    description:
      "Shop the latest smartphones, laptops, headphones, and electronic accessories in Pakistan with fast delivery and secure payments.",
    url: "https://techbazaar.pk",
    siteName: "TechBazaar",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TechBazaar - Pakistan's Premier Electronics Store",
      },
    ],
    locale: "en-PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechBazaar - Pakistan's Premier Electronics Store",
    description:
      "Shop the latest smartphones, laptops, headphones, and electronic accessories in Pakistan with fast delivery and secure payments.",
    images: ["/images/twitter-image.jpg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextAuthProvider>
          <UserPreferencesProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              <CartProvider>
                <div className="flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <Toaster />
              </CartProvider>
            </ThemeProvider>
          </UserPreferencesProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
