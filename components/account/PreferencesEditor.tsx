"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useUserPreferences } from "@/lib/user-preferences-context"
import { Loader2, Save, Globe, Bell, Shield, Truck } from "lucide-react"

export default function PreferencesEditor() {
  const { preferences, updatePreferences, isLoading } = useUserPreferences()
  const { toast } = useToast()

  const handleSave = async () => {
    try {
      // Preferences are automatically saved when updated
      toast({
        title: "Preferences saved",
        description: "Your preferences have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive",
      })
    }
  }

  const updateNotificationPreference = (key: keyof typeof preferences.notifications, value: boolean) => {
    updatePreferences({
      notifications: {
        ...preferences.notifications,
        [key]: value,
      },
    })
  }

  const updatePrivacyPreference = (key: keyof typeof preferences.privacy, value: boolean) => {
    updatePreferences({
      privacy: {
        ...preferences.privacy,
        [key]: value,
      },
    })
  }

  const updateShippingPreference = (key: keyof typeof preferences.shipping, value: string) => {
    updatePreferences({
      shipping: {
        ...preferences.shipping,
        [key]: value,
      },
    })
  }

  return (
    <div className="space-y-6">
      {/* General Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <CardTitle>General Preferences</CardTitle>
          </div>
          <CardDescription>Customize your general app experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={preferences.theme}
                onValueChange={(value: "light" | "dark" | "system") => updatePreferences({ theme: value })}
              >
                <SelectTrigger id="theme">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={preferences.language}
                onValueChange={(value: "en" | "ur") => updatePreferences({ language: value })}
              >
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ur">اردو (Urdu)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={preferences.currency}
                onValueChange={(value: "PKR" | "USD") => updatePreferences({ currency: value })}
              >
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PKR">PKR (Pakistani Rupee)</SelectItem>
                  <SelectItem value="USD">USD (US Dollar)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notification Preferences</CardTitle>
          </div>
          <CardDescription>Choose how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive order updates and important information via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={preferences.notifications.email}
                onCheckedChange={(checked) => updateNotificationPreference("email", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive order updates and delivery alerts via SMS</p>
              </div>
              <Switch
                id="sms-notifications"
                checked={preferences.notifications.sms}
                onCheckedChange={(checked) => updateNotificationPreference("sms", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive real-time notifications in your browser</p>
              </div>
              <Switch
                id="push-notifications"
                checked={preferences.notifications.push}
                onCheckedChange={(checked) => updateNotificationPreference("push", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing-notifications">Marketing Communications</Label>
                <p className="text-sm text-muted-foreground">Receive promotional offers and product recommendations</p>
              </div>
              <Switch
                id="marketing-notifications"
                checked={preferences.notifications.marketing}
                onCheckedChange={(checked) => updateNotificationPreference("marketing", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Privacy Preferences</CardTitle>
          </div>
          <CardDescription>Control your privacy and data sharing settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-profile">Public Profile</Label>
                <p className="text-sm text-muted-foreground">Allow others to see your profile information</p>
              </div>
              <Switch
                id="show-profile"
                checked={preferences.privacy.showProfile}
                onCheckedChange={(checked) => updatePrivacyPreference("showProfile", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-orders">Order History Visibility</Label>
                <p className="text-sm text-muted-foreground">Show your order history in public reviews</p>
              </div>
              <Switch
                id="show-orders"
                checked={preferences.privacy.showOrders}
                onCheckedChange={(checked) => updatePrivacyPreference("showOrders", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="data-collection">Analytics & Data Collection</Label>
                <p className="text-sm text-muted-foreground">Help us improve by sharing anonymous usage data</p>
              </div>
              <Switch
                id="data-collection"
                checked={preferences.privacy.allowDataCollection}
                onCheckedChange={(checked) => updatePrivacyPreference("allowDataCollection", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            <CardTitle>Shipping Preferences</CardTitle>
          </div>
          <CardDescription>Set your default shipping and delivery preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="delivery-time">Preferred Delivery Time</Label>
            <Select
              value={preferences.shipping.preferredDeliveryTime}
              onValueChange={(value) => updateShippingPreference("preferredDeliveryTime", value)}
            >
              <SelectTrigger id="delivery-time">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                <SelectItem value="anytime">Anytime</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save All Preferences
        </Button>
      </div>
    </div>
  )
}
