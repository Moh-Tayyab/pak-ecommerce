import { Suspense } from "react"
import Link from "next/link"
import CartItems from "@/components/cart/CartItems"
import CartSummary from "@/components/cart/CartSummary"
import CartItemsSkeleton from "@/components/cart/CartItemsSkeleton"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"

export const metadata = {
  title: "Your Cart | TechBazaar",
  description: "Review and manage items in your shopping cart",
}

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Suspense fallback={<CartItemsSkeleton />}>
            <CartItems />
          </Suspense>
        </div>

        <div className="lg:col-span-1">
          <CartSummary />

          <div className="mt-6 flex flex-col gap-4">
            <Button asChild className="w-full">
              <Link href="/checkout/shipping">Proceed to Checkout</Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/shop">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
