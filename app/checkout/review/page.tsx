"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/cart-context"
import CheckoutProgress from "@/components/checkout/CheckoutProgress"
import OrderSummary from "@/components/checkout/OrderSummary"
import { createOrder } from "@/lib/api"
import { Loader2 } from "lucide-react"

export default function ReviewPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, clearCart } = useCart()
  const [shippingInfo, setShippingInfo] = useState<any>(null)
  const [paymentInfo, setPaymentInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Get shipping and payment info from localStorage
    const savedShippingInfo = localStorage.getItem("shippingInfo")
    const savedPaymentInfo = localStorage.getItem("paymentInfo")

    if (!savedShippingInfo) {
      router.push("/checkout/shipping")
      return
    }

    if (!savedPaymentInfo) {
      router.push("/checkout/payment")
      return
    }

    setShippingInfo(JSON.parse(savedShippingInfo))
    setPaymentInfo(JSON.parse(savedPaymentInfo))
  }, [router])

  async function handlePlaceOrder() {
    setIsLoading(true)

    try {
      // In a real app, you would send this data to your backend
      const order = await createOrder({
        items,
        shippingInfo,
        paymentInfo,
      })

      // Store order ID for confirmation page
      localStorage.setItem("orderId", order.id)
      localStorage.setItem("orderTotal", order.total)

      // Clear cart and checkout data
      clearCart()

      toast({
        title: "Order placed successfully!",
        description: "Your order has been placed and will be processed soon.",
        variant: "default",
      })

      router.push("/checkout/confirmation")
    } catch (error) {
      toast({
        title: "Error placing order",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-8">Please add some items to your cart before proceeding to checkout.</p>
        <Button asChild>
          <a href="/shop">Continue Shopping</a>
        </Button>
      </div>
    )
  }

  if (!shippingInfo || !paymentInfo) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  // Helper function to get payment method display name
  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "card":
        return "Credit/Debit Card"
      case "cod":
        return "Cash on Delivery"
      case "easypaisa":
        return "EasyPaisa"
      case "jazzcash":
        return "JazzCash"
      case "stripe":
        return "Stripe"
      default:
        return method
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CheckoutProgress currentStep="review" />

      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-8">Review Your Order</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium">{shippingInfo.fullName}</p>
              <p>{shippingInfo.address}</p>
              <p>
                {shippingInfo.city}, {shippingInfo.province} {shippingInfo.postalCode}
              </p>
              <p>Email: {shippingInfo.email}</p>
              <p>Phone: {shippingInfo.phone}</p>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-4">Payment Method</h2>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium">{getPaymentMethodName(paymentInfo.method)}</p>

              {paymentInfo.method === "card" && paymentInfo.cardDetails && (
                <p>Card ending in {paymentInfo.cardDetails.number.slice(-4)}</p>
              )}

              {(paymentInfo.method === "easypaisa" || paymentInfo.method === "jazzcash") &&
                paymentInfo.mobileWallet && <p>Phone: {paymentInfo.mobileWallet.phoneNumber}</p>}

              {paymentInfo.method === "cod" && <p>Payment will be collected upon delivery</p>}
            </div>
          </div>

          <div>
            <OrderSummary items={items} />
          </div>
        </div>

        <div className="mt-8">
          <Button onClick={handlePlaceOrder} className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              "Place Order"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
