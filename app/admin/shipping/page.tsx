"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Truck,
  MapPin,
  Clock,
  Package,
  Calculator,
  Settings,
  Save,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { formatCurrency } from "@/lib/utils"

// Mock shipping data
const shippingZones = [
  {
    id: "1",
    name: "Lahore",
    regions: ["Lahore", "Kasur", "Sheikhupura"],
    methods: [
      { name: "Standard Delivery", rate: 150, estimatedDays: "1-2", isActive: true },
      { name: "Express Delivery", rate: 250, estimatedDays: "Same Day", isActive: true },
    ],
    isActive: true,
  },
  {
    id: "2",
    name: "Karachi",
    regions: ["Karachi", "Hyderabad", "Thatta"],
    methods: [
      { name: "Standard Delivery", rate: 200, estimatedDays: "2-3", isActive: true },
      { name: "Express Delivery", rate: 350, estimatedDays: "1-2", isActive: true },
    ],
    isActive: true,
  },
  {
    id: "3",
    name: "Islamabad/Rawalpindi",
    regions: ["Islamabad", "Rawalpindi", "Attock"],
    methods: [
      { name: "Standard Delivery", rate: 180, estimatedDays: "2-3", isActive: true },
      { name: "Express Delivery", rate: 300, estimatedDays: "1-2", isActive: true },
    ],
    isActive: true,
  },
  {
    id: "4",
    name: "Other Cities",
    regions: ["Faisalabad", "Multan", "Peshawar", "Quetta", "Other"],
    methods: [
      { name: "Standard Delivery", rate: 250, estimatedDays: "3-5", isActive: true },
      { name: "Express Delivery", rate: 400, estimatedDays: "2-3", isActive: false },
    ],
    isActive: true,
  },
]

const shippingRules = [
  {
    id: "1",
    name: "Free Shipping",
    condition: "Order value >= PKR 3,000",
    action: "Free standard shipping",
    isActive: true,
  },
  {
    id: "2",
    name: "Bulk Order Discount",
    condition: "Order weight >= 5kg",
    action: "10% shipping discount",
    isActive: true,
  },
  {
    id: "3",
    name: "VIP Customer",
    condition: "Customer tier = VIP",
    action: "Free express shipping",
    isActive: false,
  },
]

export default function ShippingPage() {
  const [isAddZoneDialogOpen, setIsAddZoneDialogOpen] = useState(false)
  const [isAddRuleDialogOpen, setIsAddRuleDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Shipping settings have been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shipping</h1>
          <p className="text-gray-600">Manage shipping zones, rates, and delivery options</p>
        </div>
        <Button onClick={handleSaveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <Tabs defaultValue="zones" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="zones" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Shipping Zones
          </TabsTrigger>
          <TabsTrigger value="rules" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Shipping Rules
          </TabsTrigger>
          <TabsTrigger value="carriers" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Carriers
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Shipping Zones */}
        <TabsContent value="zones" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Shipping Zones</h2>
              <p className="text-gray-600">Configure shipping rates for different regions</p>
            </div>
            <Dialog open={isAddZoneDialogOpen} onOpenChange={setIsAddZoneDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Zone
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Shipping Zone</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="zone-name">Zone Name</Label>
                    <Input id="zone-name" placeholder="Enter zone name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regions">Regions (comma-separated)</Label>
                    <Input id="regions" placeholder="Lahore, Kasur, Sheikhupura" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="standard-rate">Standard Delivery Rate (PKR)</Label>
                    <Input id="standard-rate" type="number" placeholder="150" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="express-rate">Express Delivery Rate (PKR)</Label>
                    <Input id="express-rate" type="number" placeholder="250" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="zone-active">Active</Label>
                    <Switch id="zone-active" defaultChecked />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddZoneDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddZoneDialogOpen(false)}>Add Zone</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {shippingZones.map((zone) => (
              <Card key={zone.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        {zone.name}
                      </CardTitle>
                      <CardDescription>Regions: {zone.regions.join(", ")}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={zone.isActive ? "default" : "secondary"}>
                        {zone.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Zone
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Zone
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {zone.methods.map((method, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Package className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Clock className="h-3 w-3" />
                              <span>{method.estimatedDays} days</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">{formatCurrency(method.rate)}</span>
                          <Badge variant={method.isActive ? "default" : "secondary"} className="text-xs">
                            {method.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Shipping Rules */}
        <TabsContent value="rules" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Shipping Rules</h2>
              <p className="text-gray-600">Set up conditional shipping rules and discounts</p>
            </div>
            <Dialog open={isAddRuleDialogOpen} onOpenChange={setIsAddRuleDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rule
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Shipping Rule</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="rule-name">Rule Name</Label>
                    <Input id="rule-name" placeholder="Enter rule name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="condition-type">Condition Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="order-value">Order Value</SelectItem>
                        <SelectItem value="order-weight">Order Weight</SelectItem>
                        <SelectItem value="customer-tier">Customer Tier</SelectItem>
                        <SelectItem value="product-category">Product Category</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="condition-value">Condition Value</Label>
                    <Input id="condition-value" placeholder="Enter condition value" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="action-type">Action</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free-shipping">Free Shipping</SelectItem>
                        <SelectItem value="discount-percentage">Percentage Discount</SelectItem>
                        <SelectItem value="discount-fixed">Fixed Discount</SelectItem>
                        <SelectItem value="upgrade-method">Upgrade Shipping Method</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="rule-active">Active</Label>
                    <Switch id="rule-active" defaultChecked />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddRuleDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddRuleDialogOpen(false)}>Add Rule</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule Name</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shippingRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell>{rule.condition}</TableCell>
                      <TableCell>{rule.action}</TableCell>
                      <TableCell>
                        <Badge variant={rule.isActive ? "default" : "secondary"}>
                          {rule.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Rule
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Rule
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Carriers */}
        <TabsContent value="carriers" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Shipping Carriers</h2>
            <p className="text-gray-600">Manage shipping carrier integrations</p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-8 w-8 text-blue-600" />
                    <div>
                      <CardTitle>TCS</CardTitle>
                      <CardDescription>Pakistan's leading courier service</CardDescription>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tcs-api-key">API Key</Label>
                    <Input id="tcs-api-key" type="password" placeholder="Enter API key" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tcs-account">Account Number</Label>
                    <Input id="tcs-account" placeholder="Enter account number" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-8 w-8 text-green-600" />
                    <div>
                      <CardTitle>Leopards Courier</CardTitle>
                      <CardDescription>Fast and reliable delivery service</CardDescription>
                    </div>
                  </div>
                  <Switch />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="leopards-api-key">API Key</Label>
                    <Input id="leopards-api-key" type="password" placeholder="Enter API key" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leopards-account">Account Number</Label>
                    <Input id="leopards-account" placeholder="Enter account number" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-8 w-8 text-red-600" />
                    <div>
                      <CardTitle>M&P Express</CardTitle>
                      <CardDescription>Nationwide delivery network</CardDescription>
                    </div>
                  </div>
                  <Switch />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mp-api-key">API Key</Label>
                    <Input id="mp-api-key" type="password" placeholder="Enter API key" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mp-account">Account Number</Label>
                    <Input id="mp-account" placeholder="Enter account number" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">General Settings</h2>
            <p className="text-gray-600">Configure general shipping preferences</p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Processing</CardTitle>
                <CardDescription>Configure order processing and fulfillment settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="processing-time">Processing Time (days)</Label>
                    <Input id="processing-time" type="number" defaultValue="1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cutoff-time">Daily Cutoff Time</Label>
                    <Input id="cutoff-time" type="time" defaultValue="15:00" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekend-processing">Process Orders on Weekends</Label>
                    <p className="text-sm text-gray-500">Process and ship orders on Saturday and Sunday</p>
                  </div>
                  <Switch id="weekend-processing" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Calculations</CardTitle>
                <CardDescription>Configure how shipping costs are calculated</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="calculation-method">Calculation Method</Label>
                  <Select defaultValue="weight">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight">Based on Weight</SelectItem>
                      <SelectItem value="price">Based on Price</SelectItem>
                      <SelectItem value="quantity">Based on Quantity</SelectItem>
                      <SelectItem value="dimensions">Based on Dimensions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-weight">Default Product Weight (kg)</Label>
                    <Input id="default-weight" type="number" step="0.1" defaultValue="0.5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-weight">Maximum Package Weight (kg)</Label>
                    <Input id="max-weight" type="number" defaultValue="30" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Options</CardTitle>
                <CardDescription>Configure shipping options available to customers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="shipping-calculator">Show Shipping Calculator</Label>
                    <p className="text-sm text-gray-500">Allow customers to calculate shipping before checkout</p>
                  </div>
                  <Switch id="shipping-calculator" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="delivery-instructions">Allow Delivery Instructions</Label>
                    <p className="text-sm text-gray-500">Let customers add special delivery instructions</p>
                  </div>
                  <Switch id="delivery-instructions" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="signature-required">Signature Required</Label>
                    <p className="text-sm text-gray-500">Require signature for all deliveries</p>
                  </div>
                  <Switch id="signature-required" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
