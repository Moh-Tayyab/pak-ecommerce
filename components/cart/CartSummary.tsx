"use client"

import { useCart } from "@/lib/cart-context"
import { formatCurrency } from "@/lib/utils"

export default function CartSummary() {
  const { getSubtotal, getShippingCost, getTotal } = useCart()

  const subtotal = getSubtotal()
  const shipping = getShippingCost()
  const total = getTotal()

  return (
    <div className="bg-muted p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
        </div>

        {shipping === 0 && subtotal >= 3000 && (
          <p className="text-sm text-green-600">🎉 You qualify for free shipping!</p>
        )}

        {shipping > 0 && (
          <p className="text-sm text-muted-foreground">Add {formatCurrency(3000 - subtotal)} more for free shipping</p>
        )}

        <hr className="my-2" />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  )
}
