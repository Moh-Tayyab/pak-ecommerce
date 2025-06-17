"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"

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

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (itemId: string) => void
  isInWishlist: (itemId: string) => boolean
  wishlistCount: number
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage when session changes
  useEffect(() => {
    if (session?.user?.email) {
      const savedWishlist = localStorage.getItem(`wishlist_${session.user.email}`)
      if (savedWishlist) {
        try {
          setWishlistItems(JSON.parse(savedWishlist))
        } catch (error) {
          console.error("Error parsing wishlist:", error)
          setWishlistItems([])
        }
      }
    } else {
      setWishlistItems([])
    }
  }, [session])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (session?.user?.email) {
      localStorage.setItem(`wishlist_${session.user.email}`, JSON.stringify(wishlistItems))
    }
  }, [wishlistItems, session])

  const addToWishlist = (item: WishlistItem) => {
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your wishlist",
        variant: "destructive",
      })
      return
    }

    if (isInWishlist(item.id)) {
      toast({
        title: "Already in wishlist",
        description: "This item is already in your wishlist",
      })
      return
    }

    setWishlistItems((prev) => [...prev, item])
    toast({
      title: "Added to wishlist",
      description: `${item.name} has been added to your wishlist`,
    })
  }

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId))
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist",
    })
  }

  const isInWishlist = (itemId: string) => {
    return wishlistItems.some((item) => item.id === itemId)
  }

  const clearWishlist = () => {
    setWishlistItems([])
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
    })
  }

  const wishlistCount = wishlistItems.length

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
