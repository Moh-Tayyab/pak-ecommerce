import Image from "next/image"
import { formatCurrency } from "@/lib/utils"
import type { CartItem } from "@/lib/cart-context"

interface OrderSummaryProps {
  items: CartItem[]
}

export default function OrderSummary({ items }: OrderSummaryProps) {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal >= 3000 ? 0 : 250
  const total = subtotal + shipping

  return (
    <div className="bg-muted p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="space-y-4 mb-4">
        {items.map((item) => (
          <div key={`${item.id}-${JSON.stringify(item.options)}`} className="flex gap-3">
            <div className="w-12 h-12 relative flex-shrink-0">
              <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover rounded" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">{item.name}</h4>
              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
              {item.options && Object.keys(item.options).length > 0 && (
                <div className="text-xs text-muted-foreground">
                  {Object.entries(item.options).map(([key, value]) => (
                    <span key={key} className="mr-2">
                      {key}: {value}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</div>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
        </div>

        <hr className="my-2" />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  )
}
