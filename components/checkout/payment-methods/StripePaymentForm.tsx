"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { getStripe } from "@/lib/payment-service"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/components/ui/use-toast"

interface StripePaymentFormProps {
  email: string
  orderId: string
}

export default function StripePaymentForm({ email, orderId }: StripePaymentFormProps) {
  const { items } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Create a Stripe checkout session
      const response = await fetch("/api/payments/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          orderId,
          customerEmail: email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      // Redirect to Stripe Checkout
      const stripe = await getStripe()
      if (data.url) {
        window.location.href = data.url
      } else {
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        })
        if (error) throw error
      }
    } catch (error) {
      console.error("Stripe checkout error:", error)
      setError(error instanceof Error ? error.message : "Failed to redirect to payment page")
      toast({
        title: "Payment Error",
        description: "There was a problem initiating the payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center mb-4">
        <img src="/placeholder.svg?height=60&width=120" alt="Stripe Logo" className="h-12" />
      </div>

      <p className="text-center">You will be redirected to Stripe's secure payment page to complete your purchase.</p>

      <Button onClick={handleCheckout} disabled={isLoading} className="w-full">
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Proceed to Secure Payment
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="pt-2">
        <p className="text-sm text-muted-foreground">
          Your payment information is securely processed by Stripe. We do not store your card details.
        </p>
      </div>
    </div>
  )
}
