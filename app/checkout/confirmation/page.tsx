"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ShoppingBag } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function ConfirmationPage() {
  const [orderId, setOrderId] = useState<string | null>(null)
  const [orderTotal, setOrderTotal] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)

  useEffect(() => {
    // Get order details from localStorage
    const savedOrderId = localStorage.getItem("orderId")
    const savedOrderTotal = localStorage.getItem("orderTotal")
    const savedPaymentInfo = localStorage.getItem("paymentInfo")

    if (savedOrderId) {
      setOrderId(savedOrderId)
    }

    if (savedOrderTotal) {
      setOrderTotal(savedOrderTotal)
    }

    if (savedPaymentInfo) {
      try {
        const paymentInfo = JSON.parse(savedPaymentInfo)
        setPaymentMethod(paymentInfo.method)
      } catch (error) {
        console.error("Error parsing payment info:", error)
      }
    }

    // Clear checkout data
    localStorage.removeItem("shippingInfo")
    localStorage.removeItem("paymentInfo")
  }, [])

  // Calculate expected delivery date (3-5 business days from now)
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 5)
  const formattedDeliveryDate = new Intl.DateTimeFormat("en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(deliveryDate)

  // Helper function to get payment method display name
  const getPaymentMethodName = (method: string | null) => {
    if (!method) return "Not specified"

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
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>

        <p className="text-lg mb-8">Your order has been placed successfully and will be processed soon.</p>

        <div className="bg-muted p-6 rounded-lg mb-8">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="text-lg font-medium">{orderId || "N/A"}</p>
          </div>

          {orderTotal && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Order Total</p>
              <p className="text-lg font-medium">{formatCurrency(Number.parseFloat(orderTotal))}</p>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-muted-foreground">Payment Method</p>
            <p className="text-lg font-medium">{getPaymentMethodName(paymentMethod)}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Expected Delivery</p>
            <p className="text-lg font-medium">{formattedDeliveryDate}</p>
          </div>
        </div>

        <p className="mb-8">
          We have sent a confirmation email to your registered email address with all the order details.
          {paymentMethod === "cod" && " Please have the exact amount ready for the delivery person."}
        </p>

        <Button asChild size="lg">
          <Link href="/">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  )
}
