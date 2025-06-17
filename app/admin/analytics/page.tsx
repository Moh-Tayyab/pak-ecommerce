"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DollarSign, ShoppingCart, Users, Package, Download, ArrowUpRight, ArrowDownRight, Eye } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Mock analytics data
const analyticsData = {
  overview: {
    revenue: { current: 1250000, previous: 980000, change: 27.5 },
    orders: { current: 1234, previous: 1098, change: 12.4 },
    customers: { current: 8945, previous: 8234, change: 8.6 },
    avgOrderValue: { current: 12500, previous: 11200, change: 11.6 },
  },
  topProducts: [
    { name: "iPhone 13 Pro Max", revenue: 1124775, sales: 45, change: 15.2 },
    { name: "Samsung Galaxy S21 Ultra", revenue: 639968, sales: 32, change: -5.3 },
    { name: "MacBook Pro 14-inch", revenue: 629982, sales: 18, change: 8.7 },
    { name: "Sony WH-1000XM4", revenue: 401933, sales: 67, change: 22.1 },
    { name: "Anker PowerCore 20000mAh", revenue: 711911, sales: 89, change: 18.9 },
  ],
  salesByCategory: [
    { category: "Smartphones", revenue: 2500000, percentage: 45, change: 12.5 },
    { category: "Laptops", revenue: 1800000, percentage: 32, change: 8.3 },
    { category: "Audio & Headphones", revenue: 650000, percentage: 12, change: 15.7 },
    { category: "Accessories", revenue: 400000, percentage: 7, change: -2.1 },
    { category: "Others", revenue: 200000, percentage: 4, change: 5.2 },
  ],
  customerMetrics: {
    newCustomers: { current: 234, previous: 198, change: 18.2 },
    returningCustomers: { current: 456, previous: 423, change: 7.8 },
    customerRetention: { current: 68.5, previous: 65.2, change: 5.1 },
    avgLifetimeValue: { current: 45000, previous: 42000, change: 7.1 },
  },
  trafficSources: [
    { source: "Direct", visitors: 12500, percentage: 35, change: 8.2 },
    { source: "Google Search", visitors: 8900, percentage: 25, change: 12.5 },
    { source: "Social Media", visitors: 7100, percentage: 20, change: 15.3 },
    { source: "Email", visitors: 4300, percentage: 12, change: -3.2 },
    { source: "Referrals", visitors: 2800, percentage: 8, change: 22.1 },
  ],
}

export default function AnalyticsPage() {
  const renderChangeIndicator = (change: number) => {
    const isPositive = change > 0
    const Icon = isPositive ? ArrowUpRight : ArrowDownRight
    const colorClass = isPositive ? "text-green-600" : "text-red-600"

    return (
      <div className={`flex items-center text-sm ${colorClass}`}>
        <Icon className="h-3 w-3 mr-1" />
        {Math.abs(change).toFixed(1)}%
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your store performance and insights</p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analyticsData.overview.revenue.current)}</div>
            {renderChangeIndicator(analyticsData.overview.revenue.change)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.orders.current.toLocaleString()}</div>
            {renderChangeIndicator(analyticsData.overview.orders.change)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.customers.current.toLocaleString()}</div>
            {renderChangeIndicator(analyticsData.overview.customers.change)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analyticsData.overview.avgOrderValue.current)}</div>
            {renderChangeIndicator(analyticsData.overview.avgOrderValue.change)}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best performing products by revenue</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(product.revenue)}</p>
                    {renderChangeIndicator(product.change)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue breakdown by product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.salesByCategory.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.category}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{formatCurrency(category.revenue)}</span>
                      {renderChangeIndicator(category.change)}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${category.percentage}%` }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{category.percentage}% of total sales</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Metrics</CardTitle>
            <CardDescription>Customer acquisition and retention insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">New Customers</p>
                <p className="text-2xl font-bold">{analyticsData.customerMetrics.newCustomers.current}</p>
                {renderChangeIndicator(analyticsData.customerMetrics.newCustomers.change)}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Returning Customers</p>
                <p className="text-2xl font-bold">{analyticsData.customerMetrics.returningCustomers.current}</p>
                {renderChangeIndicator(analyticsData.customerMetrics.returningCustomers.change)}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Retention Rate</p>
                <p className="text-2xl font-bold">{analyticsData.customerMetrics.customerRetention.current}%</p>
                {renderChangeIndicator(analyticsData.customerMetrics.customerRetention.change)}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Avg Lifetime Value</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(analyticsData.customerMetrics.avgLifetimeValue.current)}
                </p>
                {renderChangeIndicator(analyticsData.customerMetrics.avgLifetimeValue.change)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.trafficSources.map((source) => (
                <div key={source.source} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{source.source}</p>
                    <p className="text-sm text-gray-600">{source.visitors.toLocaleString()} visitors</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{source.percentage}%</Badge>
                    <div className="mt-1">{renderChangeIndicator(source.change)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
