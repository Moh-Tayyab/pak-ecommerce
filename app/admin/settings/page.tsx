"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Save, Store, CreditCard, Truck, Bell, Users, Database } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    })
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your store configuration and preferences</p>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="shipping" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Shipping
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Advanced
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Basic information about your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input id="store-name" defaultValue="TechBazaar" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-url">Store URL</Label>
                  <Input id="store-url" defaultValue="techbazaar.pk" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-description">Store Description</Label>
                <Textarea
                  id="store-description"
                  defaultValue="Pakistan's premier electronics store offering the latest smartphones, laptops, and tech accessories."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" defaultValue="info@techbazaar.pk" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input id="contact-phone" defaultValue="+92 300 1234567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-address">Store Address</Label>
                <Textarea
                  id="store-address"
                  defaultValue="123 Tech Street, Gulberg III, Lahore, Punjab 54000, Pakistan"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Settings</CardTitle>
              <CardDescription>Configure regional preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="pkr">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pkr">PKR - Pakistani Rupee</SelectItem>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="asia/karachi">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia/karachi">Asia/Karachi</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ur">اردو (Urdu)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure available payment options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Credit/Debit Cards</p>
                      <p className="text-sm text-gray-500">Accept Visa, Mastercard, and local cards</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded"></div>
                    <div>
                      <p className="font-medium">EasyPaisa</p>
                      <p className="text-sm text-gray-500">Mobile wallet payments</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-red-500 rounded"></div>
                    <div>
                      <p className="font-medium">JazzCash</p>
                      <p className="text-sm text-gray-500">Mobile wallet payments</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-blue-500 rounded"></div>
                    <div>
                      <p className="font-medium">Stripe</p>
                      <p className="text-sm text-gray-500">International payment processing</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-gray-500 rounded"></div>
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-gray-500">Pay when you receive your order</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Configuration</CardTitle>
              <CardDescription>Configure payment processing settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cod-fee">Cash on Delivery Fee (PKR)</Label>
                <Input id="cod-fee" type="number" defaultValue="100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min-order">Minimum Order Amount (PKR)</Label>
                <Input id="min-order" type="number" defaultValue="500" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-capture">Auto-capture payments</Label>
                  <p className="text-sm text-gray-500">Automatically capture payments when orders are placed</p>
                </div>
                <Switch id="auto-capture" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipping Settings */}
        <TabsContent value="shipping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Zones</CardTitle>
              <CardDescription>Configure shipping rates for different regions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Lahore</p>
                    <p className="text-sm text-gray-500">Same day delivery available</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">PKR 150</p>
                    <Badge variant="outline">Active</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Karachi</p>
                    <p className="text-sm text-gray-500">1-2 business days</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">PKR 200</p>
                    <Badge variant="outline">Active</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Other Cities</p>
                    <p className="text-sm text-gray-500">3-5 business days</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">PKR 250</p>
                    <Badge variant="outline">Active</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Configuration</CardTitle>
              <CardDescription>General shipping settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="free-shipping">Free Shipping Threshold (PKR)</Label>
                <Input id="free-shipping" type="number" defaultValue="3000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="processing-time">Order Processing Time (days)</Label>
                <Input id="processing-time" type="number" defaultValue="1" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="tracking">Enable Order Tracking</Label>
                  <p className="text-sm text-gray-500">Allow customers to track their orders</p>
                </div>
                <Switch id="tracking" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure when to send email notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="order-confirmation">Order Confirmation</Label>
                    <p className="text-sm text-gray-500">Send email when order is placed</p>
                  </div>
                  <Switch id="order-confirmation" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="order-shipped">Order Shipped</Label>
                    <p className="text-sm text-gray-500">Send email when order is shipped</p>
                  </div>
                  <Switch id="order-shipped" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="order-delivered">Order Delivered</Label>
                    <p className="text-sm text-gray-500">Send email when order is delivered</p>
                  </div>
                  <Switch id="order-delivered" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="low-stock">Low Stock Alerts</Label>
                    <p className="text-sm text-gray-500">Send email when products are low in stock</p>
                  </div>
                  <Switch id="low-stock" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SMS Notifications</CardTitle>
              <CardDescription>Configure SMS notifications for customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-order">Order Updates</Label>
                    <p className="text-sm text-gray-500">Send SMS for order status updates</p>
                  </div>
                  <Switch id="sms-order" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-delivery">Delivery Notifications</Label>
                    <p className="text-sm text-gray-500">Send SMS before delivery</p>
                  </div>
                  <Switch id="sms-delivery" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Users</CardTitle>
              <CardDescription>Manage admin access and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Super Admin</p>
                    <p className="text-sm text-gray-500">Full access to all features</p>
                  </div>
                  <Badge>Active</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Store Manager</p>
                    <p className="text-sm text-gray-500">Manage products and orders</p>
                  </div>
                  <Badge variant="outline">Inactive</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Customer Support</p>
                    <p className="text-sm text-gray-500">View orders and customer data</p>
                  </div>
                  <Badge variant="outline">Inactive</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Advanced configuration options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance">Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">Temporarily disable the store</p>
                </div>
                <Switch id="maintenance" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics">Google Analytics</Label>
                  <p className="text-sm text-gray-500">Enable Google Analytics tracking</p>
                </div>
                <Switch id="analytics" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="seo">SEO Optimization</Label>
                  <p className="text-sm text-gray-500">Enable SEO-friendly URLs</p>
                </div>
                <Switch id="seo" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Backup and data management options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Database Backup</Label>
                  <p className="text-sm text-gray-500">Last backup: 2 hours ago</p>
                </div>
                <Button variant="outline">Create Backup</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Export Data</Label>
                  <p className="text-sm text-gray-500">Export all store data</p>
                </div>
                <Button variant="outline">Export</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
