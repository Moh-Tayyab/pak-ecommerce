"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Package,
  CalendarIcon,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { format } from "date-fns"

// Mock reports data
const salesReports = [
  {
    period: "Today",
    revenue: 45000,
    orders: 23,
    customers: 18,
    avgOrderValue: 1956,
    change: { revenue: 12.5, orders: 8.3, customers: 15.2, avgOrderValue: -2.1 },
  },
  {
    period: "Yesterday",
    revenue: 38000,
    orders: 19,
    customers: 16,
    avgOrderValue: 2000,
    change: { revenue: -5.2, orders: -12.1, customers: -8.5, avgOrderValue: 8.7 },
  },
  {
    period: "This Week",
    revenue: 285000,
    orders: 142,
    customers: 98,
    avgOrderValue: 2007,
    change: { revenue: 18.3, orders: 22.1, customers: 12.8, avgOrderValue: -3.2 },
  },
  {
    period: "This Month",
    revenue: 1250000,
    orders: 634,
    customers: 423,
    avgOrderValue: 1971,
    change: { revenue: 25.7, orders: 28.9, customers: 18.4, avgOrderValue: -2.8 },
  },
]

const topProducts = [
  { name: "iPhone 13 Pro Max", sales: 45, revenue: 1124775, profit: 224955, margin: 20 },
  { name: "Samsung Galaxy S21 Ultra", sales: 32, revenue: 639968, profit: 127994, margin: 20 },
  { name: "MacBook Pro 14-inch", sales: 18, revenue: 629982, profit: 157496, margin: 25 },
  { name: "Sony WH-1000XM4", sales: 67, revenue: 401933, profit: 120580, margin: 30 },
  { name: "Anker PowerCore 20000mAh", sales: 89, revenue: 711911, profit: 213573, margin: 30 },
]

const customerReports = [
  { segment: "VIP", count: 45, revenue: 450000, avgSpent: 10000, retention: 95 },
  { segment: "Premium", count: 123, revenue: 615000, avgSpent: 5000, retention: 85 },
  { segment: "Regular", count: 234, revenue: 468000, avgSpent: 2000, retention: 70 },
  { segment: "New", count: 156, revenue: 156000, avgSpent: 1000, retention: 45 },
]

const inventoryReports = [
  { category: "Smartphones", totalValue: 2500000, lowStock: 5, outOfStock: 2, turnover: 8.5 },
  { category: "Laptops", totalValue: 1800000, lowStock: 3, outOfStock: 1, turnover: 6.2 },
  { category: "Audio & Headphones", totalValue: 650000, lowStock: 8, outOfStock: 0, turnover: 12.3 },
  { category: "Accessories", totalValue: 400000, lowStock: 12, outOfStock: 3, turnover: 15.7 },
]

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  })
  const [selectedPeriod, setSelectedPeriod] = useState("this-month")

  const renderChangeIndicator = (change: number) => {
    const isPositive = change > 0
    const Icon = isPositive ? TrendingUp : TrendingDown
    const colorClass = isPositive ? "text-green-600" : "text-red-600"

    return (
      <div className={`flex items-center text-sm ${colorClass}`}>
        <Icon className="h-3 w-3 mr-1" />
        {Math.abs(change).toFixed(1)}%
      </div>
    )
  }

  const exportReport = (reportType: string) => {
    // In a real app, this would generate and download the report
    console.log(`Exporting ${reportType} report`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Analyze your business performance and insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {dateRange.from && dateRange.to
                  ? `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")}`
                  : "Select dates"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => range && setDateRange(range)}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Sales
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Customers
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Financial
          </TabsTrigger>
        </TabsList>

        {/* Sales Reports */}
        <TabsContent value="sales" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Sales Performance</h2>
            <Button onClick={() => exportReport("sales")}>
              <Download className="h-4 w-4 mr-2" />
              Export Sales Report
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {salesReports.map((report) => (
              <Card key={report.period}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{report.period}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Revenue</span>
                      {renderChangeIndicator(report.change.revenue)}
                    </div>
                    <div className="text-xl font-bold">{formatCurrency(report.revenue)}</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Orders</span>
                      {renderChangeIndicator(report.change.orders)}
                    </div>
                    <div className="text-lg font-semibold">{report.orders}</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Customers</span>
                      {renderChangeIndicator(report.change.customers)}
                    </div>
                    <div className="text-lg font-semibold">{report.customers}</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Avg Order Value</span>
                      {renderChangeIndicator(report.change.avgOrderValue)}
                    </div>
                    <div className="text-lg font-semibold">{formatCurrency(report.avgOrderValue)}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sales Trends</CardTitle>
              <CardDescription>Revenue and order trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Sales trend chart would be displayed here</p>
                  <p className="text-sm text-gray-400">Integration with charting library required</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Product Reports */}
        <TabsContent value="products" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Product Performance</h2>
            <Button onClick={() => exportReport("products")}>
              <Download className="h-4 w-4 mr-2" />
              Export Product Report
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
              <CardDescription>Products ranked by revenue and profitability</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Profit</TableHead>
                    <TableHead>Margin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product, index) => (
                    <TableRow key={product.name}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">#{index + 1}</span>
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{product.sales}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(product.revenue)}</TableCell>
                      <TableCell className="font-medium text-green-600">{formatCurrency(product.profit)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.margin}%</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
                <CardDescription>Sales breakdown by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Category breakdown chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Trends</CardTitle>
                <CardDescription>Product performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Product trends chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Customer Reports */}
        <TabsContent value="customers" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Customer Analytics</h2>
            <Button onClick={() => exportReport("customers")}>
              <Download className="h-4 w-4 mr-2" />
              Export Customer Report
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Customer Segments</CardTitle>
              <CardDescription>Customer breakdown by spending and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Segment</TableHead>
                    <TableHead>Customers</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Avg Spent</TableHead>
                    <TableHead>Retention Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerReports.map((segment) => (
                    <TableRow key={segment.segment}>
                      <TableCell>
                        <Badge
                          variant={
                            segment.segment === "VIP"
                              ? "default"
                              : segment.segment === "Premium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {segment.segment}
                        </Badge>
                      </TableCell>
                      <TableCell>{segment.count}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(segment.revenue)}</TableCell>
                      <TableCell>{formatCurrency(segment.avgSpent)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${segment.retention}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{segment.retention}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Acquisition</CardTitle>
                <CardDescription>New vs returning customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Customer acquisition chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Lifetime Value</CardTitle>
                <CardDescription>CLV trends and projections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">CLV trends chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Inventory Reports */}
        <TabsContent value="inventory" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Inventory Analysis</h2>
            <Button onClick={() => exportReport("inventory")}>
              <Download className="h-4 w-4 mr-2" />
              Export Inventory Report
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Inventory Overview</CardTitle>
              <CardDescription>Stock levels and turnover by category</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Total Value</TableHead>
                    <TableHead>Low Stock</TableHead>
                    <TableHead>Out of Stock</TableHead>
                    <TableHead>Turnover Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryReports.map((category) => (
                    <TableRow key={category.category}>
                      <TableCell className="font-medium">{category.category}</TableCell>
                      <TableCell>{formatCurrency(category.totalValue)}</TableCell>
                      <TableCell>
                        <Badge variant={category.lowStock > 5 ? "destructive" : "secondary"}>
                          {category.lowStock} items
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={category.outOfStock > 0 ? "destructive" : "default"}>
                          {category.outOfStock} items
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{category.turnover}x</span>
                          <span className="text-sm text-gray-500">per year</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Stock Alerts</CardTitle>
                <CardDescription>Products requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-red-800">Out of Stock</p>
                      <p className="text-sm text-red-600">6 products need restocking</p>
                    </div>
                    <Badge variant="destructive">Critical</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-yellow-800">Low Stock</p>
                      <p className="text-sm text-yellow-600">28 products below threshold</p>
                    </div>
                    <Badge variant="secondary">Warning</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-800">Overstock</p>
                      <p className="text-sm text-blue-600">12 products with excess inventory</p>
                    </div>
                    <Badge variant="outline">Info</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory Turnover</CardTitle>
                <CardDescription>Product movement and velocity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Inventory turnover chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financial Reports */}
        <TabsContent value="financial" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Financial Overview</h2>
            <Button onClick={() => exportReport("financial")}>
              <Download className="h-4 w-4 mr-2" />
              Export Financial Report
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Gross Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(1250000)}</div>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  25.7% from last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(312500)}</div>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  18.3% from last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25.0%</div>
                <div className="flex items-center text-sm text-red-600">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  2.1% from last month
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Revenue sources and composition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Product Sales</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Shipping Fees</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                      </div>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Other Fees</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "5%" }}></div>
                      </div>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Cost structure and expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Cost of Goods</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                      <span className="text-sm font-medium">60%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Shipping Costs</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: "8%" }}></div>
                      </div>
                      <span className="text-sm font-medium">8%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Marketing</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: "5%" }}></div>
                      </div>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Operations</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-500 h-2 rounded-full" style={{ width: "2%" }}></div>
                      </div>
                      <span className="text-sm font-medium">2%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Profit & Loss Statement</CardTitle>
              <CardDescription>Monthly financial performance summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">P&L statement chart would be displayed here</p>
                  <p className="text-sm text-gray-400">Detailed financial breakdown by month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
