"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Download,
  Search,
  MoreHorizontal,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  UserPlus,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Mock customers data
const customers = [
  {
    id: "1",
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    phone: "+92 300 1234567",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Lahore, Punjab",
    totalOrders: 12,
    totalSpent: 245000,
    lastOrder: "2024-01-15T10:30:00Z",
    joinedAt: "2023-06-15T08:00:00Z",
    status: "active",
    tags: ["VIP", "Frequent Buyer"],
  },
  {
    id: "2",
    name: "Fatima Khan",
    email: "fatima@example.com",
    phone: "+92 301 2345678",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Karachi, Sindh",
    totalOrders: 8,
    totalSpent: 156000,
    lastOrder: "2024-01-14T16:45:00Z",
    joinedAt: "2023-08-20T12:30:00Z",
    status: "active",
    tags: ["Regular"],
  },
  {
    id: "3",
    name: "Muhammad Ali",
    email: "ali@example.com",
    phone: "+92 302 3456789",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Islamabad, ICT",
    totalOrders: 15,
    totalSpent: 320000,
    lastOrder: "2024-01-13T14:20:00Z",
    joinedAt: "2023-04-10T09:15:00Z",
    status: "active",
    tags: ["VIP", "Tech Enthusiast"],
  },
  {
    id: "4",
    name: "Ayesha Ahmed",
    email: "ayesha@example.com",
    phone: "+92 303 4567890",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Faisalabad, Punjab",
    totalOrders: 3,
    totalSpent: 45000,
    lastOrder: "2024-01-10T11:00:00Z",
    joinedAt: "2023-12-01T15:45:00Z",
    status: "active",
    tags: ["New Customer"],
  },
  {
    id: "5",
    name: "Hassan Malik",
    email: "hassan@example.com",
    phone: "+92 304 5678901",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Multan, Punjab",
    totalOrders: 1,
    totalSpent: 12999,
    lastOrder: "2023-12-15T13:30:00Z",
    joinedAt: "2023-11-20T10:20:00Z",
    status: "inactive",
    tags: ["Inactive"],
  },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedTag, setSelectedTag] = useState("all")

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    const matchesStatus = selectedStatus === "all" || customer.status === selectedStatus
    const matchesTag =
      selectedTag === "all" || customer.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())

    return matchesSearch && matchesStatus && matchesTag
  })

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === "active" ? "default" : "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-PK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getCustomerSegment = (totalSpent: number) => {
    if (totalSpent >= 200000) return { label: "VIP", color: "bg-purple-100 text-purple-800" }
    if (totalSpent >= 100000) return { label: "Premium", color: "bg-blue-100 text-blue-800" }
    if (totalSpent >= 50000) return { label: "Regular", color: "bg-green-100 text-green-800" }
    return { label: "New", color: "bg-gray-100 text-gray-800" }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage your customer relationships</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {customers.filter((c) => c.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">VIP Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {customers.filter((c) => c.tags.includes("VIP")).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                customers.reduce((sum, c) => sum + c.totalSpent, 0) /
                  customers.reduce((sum, c) => sum + c.totalOrders, 0),
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Customer Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="new customer">New Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Segment</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => {
                  const segment = getCustomerSegment(customer.totalSpent)
                  return (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 relative">
                            <Image
                              src={customer.avatar || "/placeholder.svg"}
                              alt={customer.name}
                              fill
                              className="object-cover rounded-full"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-gray-500">Joined {formatDate(customer.joinedAt)}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1 text-gray-400" />
                            {customer.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1 text-gray-400" />
                            {customer.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                          {customer.location}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{customer.totalOrders}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(customer.totalSpent)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${segment.color}`}>
                          {segment.label}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                          {formatDate(customer.lastOrder)}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(customer.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/customers/${customer.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ShoppingBag className="h-4 w-4 mr-2" />
                              View Orders
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No customers found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
