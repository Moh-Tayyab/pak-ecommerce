"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Heart, ShoppingCart, Trash2, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import Link from "next/link"

interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  slug: string
  rating: number
  reviews: number
  inStock: boolean
  category: string
}

export default function WishlistPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const { addToCart } = useCart()
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      setIsRedirecting(true)
      router.push("/auth/signin?callbackUrl=/account/wishlist")
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      loadWishlist()
    }
  }, [session])

  const loadWishlist = async () => {
    try {
      // In a real app, this would fetch from an API
      const savedWishlist = localStorage.getItem(`wishlist_${session?.user?.email}`)
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist))
      }
    } catch (error) {
      console.error("Error loading wishlist:", error)
      toast({
        title: "Error",
        description: "Failed to load wishlist items",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = (itemId: string) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== itemId)
    setWishlistItems(updatedWishlist)
    localStorage.setItem(`wishlist_${session?.user?.email}`, JSON.stringify(updatedWishlist))

    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist",
    })
  }

  const addToCartFromWishlist = (item: WishlistItem) => {
    if (!item.inStock) {
      toast({
        title: "Out of stock",
        description: "This item is currently out of stock",
        variant: "destructive",
      })
      return
    }

    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    })
  }

  const moveAllToCart = () => {
    const inStockItems = wishlistItems.filter((item) => item.inStock)

    inStockItems.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      })
    })

    if (inStockItems.length > 0) {
      toast({
        title: "Added to cart",
        description: `${inStockItems.length} items added to your cart`,
      })
    }

    if (inStockItems.length < wishlistItems.length) {
      toast({
        title: "Some items skipped",
        description: "Out of stock items were not added to cart",
        variant: "destructive",
      })
    }
  }

  if (status === "loading" || isRedirecting) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">{isRedirecting ? "Redirecting to login..." : "Loading..."}</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground mt-2">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>
        {wishlistItems.length > 0 && (
          <Button onClick={moveAllToCart} className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Add All to Cart
          </Button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <CardTitle className="mb-2">Your wishlist is empty</CardTitle>
            <CardDescription className="mb-6">Save items you love to your wishlist and shop them later</CardDescription>
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                {!item.inStock && (
                  <Badge variant="destructive" className="absolute top-2 left-2">
                    Out of Stock
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>

                <h3 className="font-semibold mb-2 line-clamp-2">
                  <Link href={`/product/${item.slug}`} className="hover:text-primary">
                    {item.name}
                  </Link>
                </h3>

                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({item.reviews})</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold">Rs. {item.price.toLocaleString()}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      Rs. {item.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => addToCartFromWishlist(item)} disabled={!item.inStock}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {item.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/product/${item.slug}`}>
                      <span className="sr-only">View product</span>→
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
