"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/cart-context"
import CheckoutProgress from "@/components/checkout/CheckoutProgress"
import CreditCardForm from "@/components/checkout/payment-methods/CreditCardForm"
import EasyPaisaForm from "@/components/checkout/payment-methods/EasyPaisaForm"
import JazzCashForm from "@/components/checkout/payment-methods/JazzCashForm"
import StripePaymentForm from "@/components/checkout/payment-methods/StripePaymentForm"
import type { PaymentDetails, PaymentMethod } from "@/lib/payment-service"
import { CreditCard, Banknote, Wallet, StickerIcon as StripeIcon } from "lucide-react"

const formSchema = z.object({
  paymentMethod: z.enum(["card", "cod", "easypaisa", "jazzcash", "stripe"], {
    required_error: "Please select a payment method",
  }),
  sameAsBilling: z.boolean().default(true),
})

export default function PaymentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, getTotal } = useCart()
  const [shippingInfo, setShippingInfo] = useState<any>(null)
  const [paymentDetails, setPaymentDetails] = useState<Partial<PaymentDetails>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [orderId, setOrderId] = useState<string>(`ORD-${Date.now()}`)

  useEffect(() => {
    // Get shipping info from localStorage
    const savedShippingInfo = localStorage.getItem("shippingInfo")
    if (!savedShippingInfo) {
      router.push("/checkout/shipping")
      return
    }

    setShippingInfo(JSON.parse(savedShippingInfo))
  }, [router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: "card",
      sameAsBilling: true,
    },
  })

  const watchPaymentMethod = form.watch("paymentMethod") as PaymentMethod

  function handlePaymentDetailsChange(details: Partial<PaymentDetails>) {
    setPaymentDetails((prev) => ({ ...prev, ...details }))
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // In a real app, you would process payment or save payment preference
      const paymentInfo = {
        method: values.paymentMethod,
        ...paymentDetails,
        sameAsBilling: values.sameAsBilling,
      }

      localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo))

      // For Stripe, we don't redirect yet as the user will be redirected to Stripe's checkout
      if (values.paymentMethod === "stripe") {
        setIsLoading(false)
        return
      }

      toast({
        title: "Payment information saved",
        description: "Your payment details have been saved successfully.",
      })

      router.push("/checkout/review")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your payment information.",
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

  if (!shippingInfo) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CheckoutProgress currentStep="payment" />

      <div className="max-w-2xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-8">Payment Information</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <FormItem className="flex flex-col items-center space-y-3 rounded-md border p-4 cursor-pointer hover:bg-muted">
                        <FormControl>
                          <RadioGroupItem value="card" className="sr-only" />
                        </FormControl>
                        <CreditCard className="h-6 w-6" />
                        <FormLabel className="font-normal cursor-pointer">Credit / Debit Card</FormLabel>
                      </FormItem>

                      <FormItem className="flex flex-col items-center space-y-3 rounded-md border p-4 cursor-pointer hover:bg-muted">
                        <FormControl>
                          <RadioGroupItem value="stripe" className="sr-only" />
                        </FormControl>
                        <StripeIcon className="h-6 w-6" />
                        <FormLabel className="font-normal cursor-pointer">Stripe</FormLabel>
                      </FormItem>

                      <FormItem className="flex flex-col items-center space-y-3 rounded-md border p-4 cursor-pointer hover:bg-muted">
                        <FormControl>
                          <RadioGroupItem value="easypaisa" className="sr-only" />
                        </FormControl>
                        <Wallet className="h-6 w-6 text-green-600" />
                        <FormLabel className="font-normal cursor-pointer">EasyPaisa</FormLabel>
                      </FormItem>

                      <FormItem className="flex flex-col items-center space-y-3 rounded-md border p-4 cursor-pointer hover:bg-muted">
                        <FormControl>
                          <RadioGroupItem value="jazzcash" className="sr-only" />
                        </FormControl>
                        <Wallet className="h-6 w-6 text-red-600" />
                        <FormLabel className="font-normal cursor-pointer">JazzCash</FormLabel>
                      </FormItem>

                      <FormItem className="flex flex-col items-center space-y-3 rounded-md border p-4 cursor-pointer hover:bg-muted md:col-span-2">
                        <FormControl>
                          <RadioGroupItem value="cod" className="sr-only" />
                        </FormControl>
                        <Banknote className="h-6 w-6" />
                        <FormLabel className="font-normal cursor-pointer">Cash on Delivery</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchPaymentMethod === "card" && (
              <div className="bg-muted p-6 rounded-lg">
                <CreditCardForm onDataChange={handlePaymentDetailsChange} />
              </div>
            )}

            {watchPaymentMethod === "easypaisa" && (
              <div className="bg-muted p-6 rounded-lg">
                <EasyPaisaForm onDataChange={handlePaymentDetailsChange} amount={getTotal()} orderId={orderId} />
              </div>
            )}

            {watchPaymentMethod === "jazzcash" && (
              <div className="bg-muted p-6 rounded-lg">
                <JazzCashForm onDataChange={handlePaymentDetailsChange} amount={getTotal()} orderId={orderId} />
              </div>
            )}

            {watchPaymentMethod === "stripe" && (
              <div className="bg-muted p-6 rounded-lg">
                <StripePaymentForm email={shippingInfo.email} orderId={orderId} />
              </div>
            )}

            {watchPaymentMethod === "cod" && (
              <div className="bg-muted p-6 rounded-lg">
                <p className="text-center mb-4">You will pay when your order is delivered.</p>
                <p className="text-sm text-muted-foreground text-center">
                  Please have the exact amount ready to ensure a smooth delivery process.
                </p>
              </div>
            )}

            <FormField
              control={form.control}
              name="sameAsBilling"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Billing address is the same as shipping address</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isLoading || watchPaymentMethod === "stripe"}>
                {isLoading ? "Processing..." : "Review Order"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
