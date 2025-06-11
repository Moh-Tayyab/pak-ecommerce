"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Loader2 } from "lucide-react"

// Mock order data - in a real app, this would come from your API
const mockOrders = [
  {
    id: "ORD123456",
    date: "2023-06-15T10:30:00Z",
    status: "Delivered",
    total: 24999,
    items: [{ name: "iPhone 13 Pro Max", quantity: 1, price: 24999 }],
  },
  {
    id: "ORD123457",
    date: "2023-05-20T14:45:00Z",
    status: "Processing",
    total: 7999,
    items: [{ name: "Anker PowerCore 20000mAh", quantity: 1, price: 7999 }],
  },
]

export default function AccountOrders() {
  const [orders, setOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchOrders = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setOrders(mockOrders)
      setIsLoading(false)
    }

    fetchOrders()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>You haven't placed any orders yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Orders</CardTitle>
          <CardDescription>View and track your orders</CardDescription>
        </CardHeader>
      </Card>

      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-base">Order #{order.id}</CardTitle>
                <CardDescription>{formatDate(order.date)}</CardDescription>
              </div>
              <div className="mt-2 md:mt-0 flex items-center gap-2">
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Processing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/account/orders/${order.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t text-base font-medium">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
