"use client"

import type React from "react"

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
import { Slider } from "@/components/ui/slider"
import { Save, Palette, Layout, Type, ImageIcon, Monitor, Smartphone, Tablet, Eye, Upload, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function AppearancePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState("default")
  const [logoImage, setLogoImage] = useState<string | null>(null)
  const [faviconImage, setFaviconImage] = useState<string | null>(null)

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast({
      title: "Appearance settings saved",
      description: "Your store appearance has been updated successfully.",
    })
    setIsLoading(false)
  }

  const handleImageUpload = (type: "logo" | "favicon", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (type === "logo") {
          setLogoImage(result)
        } else {
          setFaviconImage(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const themes = [
    { id: "default", name: "Default", primary: "#3b82f6", secondary: "#64748b" },
    { id: "dark", name: "Dark Mode", primary: "#1f2937", secondary: "#374151" },
    { id: "green", name: "Nature", primary: "#059669", secondary: "#065f46" },
    { id: "purple", name: "Royal", primary: "#7c3aed", secondary: "#5b21b6" },
    { id: "orange", name: "Sunset", primary: "#ea580c", secondary: "#c2410c" },
    { id: "pink", name: "Rose", primary: "#e11d48", secondary: "#be185d" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appearance</h1>
          <p className="text-gray-600">Customize your store's look and feel</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="theme" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="theme" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Theme
          </TabsTrigger>
          <TabsTrigger value="branding" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            Layout
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="responsive" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Responsive
          </TabsTrigger>
        </TabsList>

        {/* Theme Settings */}
        <TabsContent value="theme" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Color Scheme</CardTitle>
              <CardDescription>Choose a color theme for your store</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedTheme === theme.id ? "border-primary" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedTheme(theme.id)}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.secondary }}></div>
                    </div>
                    <p className="font-medium">{theme.name}</p>
                    {selectedTheme === theme.id && <Badge className="absolute top-2 right-2">Selected</Badge>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Colors</CardTitle>
              <CardDescription>Customize individual color elements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="primary-color" type="color" defaultValue="#3b82f6" className="w-16 h-10" />
                    <Input defaultValue="#3b82f6" className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="secondary-color" type="color" defaultValue="#64748b" className="w-16 h-10" />
                    <Input defaultValue="#64748b" className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="accent-color" type="color" defaultValue="#f59e0b" className="w-16 h-10" />
                    <Input defaultValue="#f59e0b" className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="background-color">Background Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="background-color" type="color" defaultValue="#ffffff" className="w-16 h-10" />
                    <Input defaultValue="#ffffff" className="flex-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dark Mode</CardTitle>
              <CardDescription>Configure dark mode settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-dark-mode">Enable Dark Mode</Label>
                  <p className="text-sm text-gray-500">Allow customers to switch to dark mode</p>
                </div>
                <Switch id="enable-dark-mode" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-dark-mode">Auto Dark Mode</Label>
                  <p className="text-sm text-gray-500">Automatically switch based on system preference</p>
                </div>
                <Switch id="auto-dark-mode" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding Settings */}
        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logo & Brand Assets</CardTitle>
              <CardDescription>Upload and manage your brand assets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label>Store Logo</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {logoImage ? (
                      <div className="relative">
                        <img src={logoImage || "/placeholder.svg"} alt="Logo" className="max-h-20 mx-auto" />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-0 right-0"
                          onClick={() => setLogoImage(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Upload your store logo</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload("logo", e)}
                          className="hidden"
                          id="logo-upload"
                        />
                        <Button variant="outline" asChild>
                          <label htmlFor="logo-upload" className="cursor-pointer">
                            <Upload className="h-4 w-4 mr-2" />
                            Choose File
                          </label>
                        </Button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">Recommended: 200x60px, PNG or SVG format</p>
                </div>

                <div className="space-y-4">
                  <Label>Favicon</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {faviconImage ? (
                      <div className="relative">
                        <img src={faviconImage || "/placeholder.svg"} alt="Favicon" className="w-8 h-8 mx-auto" />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-0 right-0"
                          onClick={() => setFaviconImage(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Upload favicon</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload("favicon", e)}
                          className="hidden"
                          id="favicon-upload"
                        />
                        <Button variant="outline" asChild>
                          <label htmlFor="favicon-upload" className="cursor-pointer">
                            <Upload className="h-4 w-4 mr-2" />
                            Choose File
                          </label>
                        </Button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">Recommended: 32x32px, ICO or PNG format</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="store-tagline">Store Tagline</Label>
                  <Input
                    id="store-tagline"
                    placeholder="Enter your store tagline"
                    defaultValue="Pakistan's Premier Electronics Store"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand-description">Brand Description</Label>
                  <Textarea
                    id="brand-description"
                    placeholder="Describe your brand"
                    defaultValue="Discover the latest in technology with TechBazaar - your trusted source for smartphones, laptops, and electronics in Pakistan."
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Add your social media links</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook-url">Facebook</Label>
                  <Input id="facebook-url" placeholder="https://facebook.com/yourstore" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram-url">Instagram</Label>
                  <Input id="instagram-url" placeholder="https://instagram.com/yourstore" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter-url">Twitter</Label>
                  <Input id="twitter-url" placeholder="https://twitter.com/yourstore" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtube-url">YouTube</Label>
                  <Input id="youtube-url" placeholder="https://youtube.com/yourstore" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Layout Settings */}
        <TabsContent value="layout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Header Layout</CardTitle>
              <CardDescription>Configure your store header appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="header-style">Header Style</Label>
                <Select defaultValue="modern">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="centered">Centered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sticky-header">Sticky Header</Label>
                  <p className="text-sm text-gray-500">Keep header visible when scrolling</p>
                </div>
                <Switch id="sticky-header" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-search">Show Search Bar</Label>
                  <p className="text-sm text-gray-500">Display search bar in header</p>
                </div>
                <Switch id="show-search" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Footer Layout</CardTitle>
              <CardDescription>Configure your store footer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="footer-style">Footer Style</Label>
                <Select defaultValue="detailed">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                    <SelectItem value="newsletter">Newsletter Focus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-newsletter">Show Newsletter Signup</Label>
                  <p className="text-sm text-gray-500">Include newsletter subscription in footer</p>
                </div>
                <Switch id="show-newsletter" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-social-links">Show Social Links</Label>
                  <p className="text-sm text-gray-500">Display social media links in footer</p>
                </div>
                <Switch id="show-social-links" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Layout</CardTitle>
              <CardDescription>Configure product display settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="products-per-row">Products per Row</Label>
                <Select defaultValue="4">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Products</SelectItem>
                    <SelectItem value="3">3 Products</SelectItem>
                    <SelectItem value="4">4 Products</SelectItem>
                    <SelectItem value="5">5 Products</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="products-per-page">Products per Page</Label>
                <Select defaultValue="20">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 Products</SelectItem>
                    <SelectItem value="20">20 Products</SelectItem>
                    <SelectItem value="30">30 Products</SelectItem>
                    <SelectItem value="50">50 Products</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-quick-view">Quick View</Label>
                  <p className="text-sm text-gray-500">Enable quick view on product hover</p>
                </div>
                <Switch id="show-quick-view" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Typography Settings */}
        <TabsContent value="typography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Font Settings</CardTitle>
              <CardDescription>Configure typography for your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="heading-font">Heading Font</Label>
                  <Select defaultValue="inter">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="poppins">Poppins</SelectItem>
                      <SelectItem value="montserrat">Montserrat</SelectItem>
                      <SelectItem value="playfair">Playfair Display</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body-font">Body Font</Label>
                  <Select defaultValue="inter">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="open-sans">Open Sans</SelectItem>
                      <SelectItem value="lato">Lato</SelectItem>
                      <SelectItem value="source-sans">Source Sans Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Base Font Size</Label>
                  <div className="flex items-center space-x-4">
                    <Slider defaultValue={[16]} max={24} min={12} step={1} className="flex-1" />
                    <span className="text-sm font-medium w-12">16px</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Line Height</Label>
                  <div className="flex items-center space-x-4">
                    <Slider defaultValue={[1.5]} max={2} min={1} step={0.1} className="flex-1" />
                    <span className="text-sm font-medium w-12">1.5</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Letter Spacing</Label>
                  <div className="flex items-center space-x-4">
                    <Slider defaultValue={[0]} max={2} min={-1} step={0.1} className="flex-1" />
                    <span className="text-sm font-medium w-12">0px</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Text Styles</CardTitle>
              <CardDescription>Preview and customize text styles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h1 className="text-3xl font-bold mb-2">Heading 1 - Store Title</h1>
                  <p className="text-gray-600">This is how your main headings will appear</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">Heading 2 - Section Title</h2>
                  <p className="text-gray-600">This is how your section headings will appear</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Heading 3 - Product Title</h3>
                  <p className="text-gray-600">This is how your product titles will appear</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="mb-2">Body Text - Product Description</p>
                  <p className="text-gray-600 text-sm">
                    This is how your regular text content will appear throughout your store. It includes product
                    descriptions, blog posts, and other content.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Responsive Settings */}
        <TabsContent value="responsive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mobile Optimization</CardTitle>
              <CardDescription>Configure mobile-specific settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="mobile-menu">Mobile Menu Style</Label>
                  <p className="text-sm text-gray-500">Choose mobile navigation style</p>
                </div>
                <Select defaultValue="drawer">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drawer">Drawer</SelectItem>
                    <SelectItem value="dropdown">Dropdown</SelectItem>
                    <SelectItem value="fullscreen">Fullscreen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="mobile-search">Mobile Search</Label>
                  <p className="text-sm text-gray-500">Show search prominently on mobile</p>
                </div>
                <Switch id="mobile-search" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="mobile-cart">Floating Cart Button</Label>
                  <p className="text-sm text-gray-500">Show floating cart button on mobile</p>
                </div>
                <Switch id="mobile-cart" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Breakpoint Preview</CardTitle>
              <CardDescription>Preview your store at different screen sizes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Button variant="outline" size="sm">
                  <Monitor className="h-4 w-4 mr-2" />
                  Desktop
                </Button>
                <Button variant="outline" size="sm">
                  <Tablet className="h-4 w-4 mr-2" />
                  Tablet
                </Button>
                <Button variant="outline" size="sm">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Mobile
                </Button>
              </div>
              <div className="border rounded-lg p-4 bg-gray-50 min-h-64 flex items-center justify-center">
                <div className="text-center">
                  <Monitor className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Responsive preview would be displayed here</p>
                  <p className="text-sm text-gray-400">Interactive preview of your store at different breakpoints</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Settings</CardTitle>
              <CardDescription>Optimize for different devices and connections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="lazy-loading">Lazy Load Images</Label>
                  <p className="text-sm text-gray-500">Load images only when needed</p>
                </div>
                <Switch id="lazy-loading" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="webp-images">WebP Image Format</Label>
                  <p className="text-sm text-gray-500">Use modern image format for better performance</p>
                </div>
                <Switch id="webp-images" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="minify-css">Minify CSS/JS</Label>
                  <p className="text-sm text-gray-500">Compress assets for faster loading</p>
                </div>
                <Switch id="minify-css" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
