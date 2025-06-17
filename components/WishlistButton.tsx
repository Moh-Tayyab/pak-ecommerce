"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useWishlist } from "@/lib/wishlist-context"
import { cn } from "@/lib/utils"

interface WishlistButtonProps {
  product: {
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
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function WishlistButton({
  product,
  variant = "outline",
  size = "icon",
  className,
}: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  const handleToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleToggle} className={cn(className)}>
      <Heart className={cn("h-4 w-4", inWishlist && "fill-red-500 text-red-500")} />
      {size !== "icon" && <span className="ml-2">{inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</span>}
    </Button>
  )
}
