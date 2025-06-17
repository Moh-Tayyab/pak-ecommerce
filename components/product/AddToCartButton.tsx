"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "@/lib/api"

interface AddToCartButtonProps {
  product: Product
  className?: string
  quantity?: number
  selectedOptions?: Record<string, string>
}

export default function AddToCartButton({
  product,
  className,
  quantity = 1,
  selectedOptions = {},
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [isAdding, setIsAdding] = useState(false)

  async function handleAddToCart() {
    setIsAdding(true)

    try {
      const response = await fetch("/api/products", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: quantity,
        }),
      })

      if (response.ok) {
        addItem({
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.pricePKR,
          image: product.imageUrls[0],
          quantity,
          options: selectedOptions,
        })

        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart.`,
        })
      } else {
        const errorData = await response.json()
        toast({
          title: "Error adding to cart",
          description: errorData.error || "Failed to add item to cart.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected network error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Button onClick={handleAddToCart} disabled={product.stock === 0 || isAdding} className={className}>
      <ShoppingCart className="mr-2 h-4 w-4" />
      {isAdding ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
    </Button>
  )
}
