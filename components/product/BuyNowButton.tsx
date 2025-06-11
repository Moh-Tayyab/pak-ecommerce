"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "@/lib/api"

interface BuyNowButtonProps {
  product: Product
  className?: string
  quantity?: number
  selectedOptions?: Record<string, string>
}

export default function BuyNowButton({ product, className, quantity = 1, selectedOptions = {} }: BuyNowButtonProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  async function handleBuyNow() {
    setIsProcessing(true)

    try {
      addItem({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.pricePKR,
        image: product.imageUrls[0],
        quantity,
        options: selectedOptions,
      })

      router.push("/checkout/shipping")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your request.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Button
      onClick={handleBuyNow}
      disabled={product.stock === 0 || isProcessing}
      variant="secondary"
      className={className}
    >
      <Zap className="mr-2 h-4 w-4" />
      {isProcessing ? "Processing..." : product.stock === 0 ? "Out of Stock" : "Buy Now"}
    </Button>
  )
}
