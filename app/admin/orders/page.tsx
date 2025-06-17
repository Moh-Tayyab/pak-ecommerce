"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Download,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Printer,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Mock orders data
const orders = [
  {
    id: "ORD-001",
    customer: {
      name: "Ahmed Hassan",
      email: "ahmed@example.com",
      phone: "+92 300 1234567",
    },
    items: 2,
    total: 24999,
    status: "completed",
    paymentStatus: "paid",
    paymentMethod: "card",
    shippingAddress: "123 Main St, Lahore, Punjab",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
  },
  {
    id: "ORD-002",
    customer: {
      name: "Fatima Khan",
      email: "fatima@example.com",
      phone: "+92 301 2345678",
    },
    items: 1,
    total: 15999,
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "easypaisa",
    shippingAddress: "456 Oak Ave, Karachi, Sindh",
    createdAt: "2024-01-15T08:15:00Z",
    updatedAt: "2024-01-15T08:15:00Z",
  },
  {
    id: "ORD-003",
    customer: {
      name: "Muhammad Ali",
      email: "ali@example.com",
      phone: "+92 302 3456789",
    },
    items: 3,
    total: 8999,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "jazzcash",
    shippingAddress: "789 Pine St, Islamabad, ICT",
    createdAt: "2024-01-14T16:45:00Z",
    updatedAt: "2024-01-15T09:30:00Z",
  },
  {
    id: "ORD-004",
    customer: {
      name: "Ayesha Ahmed",
      email: "ayesha@example.com",
      phone: "+92 303 4567890",
    },
    items: 1,
    total: 32999,
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "cod",
    shippingAddress: "321 Elm St, Faisalabad, Punjab",
    createdAt: "2024-01-14T12:20:00Z",
    updatedAt: "2024-01-14T12:20:00Z",
  },
  {
    id: "ORD-005",
    customer: {
      name: "Hassan Malik",
      email: "hassan@example.com",
      phone: "+92 304 5678901",
    },
    items: 2,
    total: 12999,
    status: "cancelled",
    paymentStatus: "refunded",
    paymentMethod: "stripe",
    shippingAddress: "654 Maple Dr, Multan, Punjab",
    createdAt: "2024-01-13T14:10:00Z",
    updatedAt: "2024-01-14T10:15:00Z",
  },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    const matchesPaymentStatus = selectedPaymentStatus === "all" || order.paymentStatus === selectedPaymentStatus

    return matchesSearch && matchesStatus && matchesPaymentStatus
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, icon: Clock, color: "text-yellow-600" },
      processing: { variant: "default" as const, icon: Package, color: "text-blue-600" },
      shipped: { variant: "outline" as const, icon: Truck, color: "text-purple-600" },
      completed: { variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
      cancelled: { variant: "destructive" as const, icon: AlertCircle, color: "text-red-600" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    if (!config) return <Badge variant="secondary">{status}</Badge>

    const Icon = config.icon
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getPaymentStatusBadge = (status: string) => {
    const variants = {
      paid: "default" as const,
      pending: "secondary" as const,
      failed: "destructive" as const,
      refunded: "outline" as const,
    }

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getPaymentMethodDisplay = (method: string) => {
    const methods = {
      card: "Credit Card",
      easypaisa: "EasyPaisa",
      jazzcash: "JazzCash",
      stripe: "Stripe",
      cod: "Cash on Delivery",
    }
    return methods[method as keyof typeof methods] || method
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-PK", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Manage and track customer orders</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {orders.filter((o) => o.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {orders.filter((o) => o.status === "processing").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Shipped</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {orders.filter((o) => o.status === "shipped").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {orders.filter((o) => o.status === "completed").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Order Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer.name}</p>
                        <p className="text-sm text-gray-500">{order.customer.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{order.items} items</TableCell>
                    <TableCell className="font-medium">{formatCurrency(order.total)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getPaymentStatusBadge(order.paymentStatus)}
                        <p className="text-xs text-gray-500">{getPaymentMethodDisplay(order.paymentMethod)}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{formatDate(order.createdAt)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/orders/${order.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Update Status
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Printer className="h-4 w-4 mr-2" />
                            Print Invoice
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No orders found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
