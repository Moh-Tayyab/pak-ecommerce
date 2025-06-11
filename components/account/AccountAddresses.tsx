"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, Plus, Pencil, Trash2 } from "lucide-react"

// Mock address data - in a real app, this would come from your API
const mockAddresses = [
  {
    id: "addr1",
    name: "Home",
    fullName: "Ahmed Hassan",
    address: "123 Main Street",
    city: "Lahore",
    province: "Punjab",
    postalCode: "54000",
    phone: "+92 300 1234567",
    isDefault: true,
  },
]

export default function AccountAddresses() {
  const [addresses, setAddresses] = useState(mockAddresses)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null)

  const handleAddNew = () => {
    setIsAddingNew(true)
    setEditingAddressId(null)
  }

  const handleEdit = (id: string) => {
    setEditingAddressId(id)
    setIsAddingNew(false)
  }

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((address) => address.id !== id))
  }

  const handleCancel = () => {
    setIsAddingNew(false)
    setEditingAddressId(null)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the address to your backend
    setIsAddingNew(false)
    setEditingAddressId(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Addresses</CardTitle>
              <CardDescription>Manage your shipping addresses</CardDescription>
            </div>
            <Button onClick={handleAddNew} disabled={isAddingNew || editingAddressId !== null}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Address
            </Button>
          </div>
        </CardHeader>
      </Card>

      {addresses.map((address) => (
        <Card key={address.id} className={editingAddressId === address.id ? "border-primary" : ""}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                <CardTitle className="text-base">{address.name}</CardTitle>
                {address.isDefault && (
                  <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(address.id)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(address.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {editingAddressId === address.id ? (
              <AddressForm onCancel={handleCancel} onSave={handleSave} address={address} />
            ) : (
              <div className="space-y-1 text-sm">
                <p className="font-medium">{address.fullName}</p>
                <p>{address.address}</p>
                <p>
                  {address.city}, {address.province} {address.postalCode}
                </p>
                <p>{address.phone}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {isAddingNew && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Address</CardTitle>
          </CardHeader>
          <CardContent>
            <AddressForm onCancel={handleCancel} onSave={handleSave} />
          </CardContent>
        </Card>
      )}

      {addresses.length === 0 && !isAddingNew && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground mb-4">You don't have any saved addresses yet.</p>
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Address
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function AddressForm({ onCancel, onSave, address }: any) {
  const provinces = [
    { value: "punjab", label: "Punjab" },
    { value: "sindh", label: "Sindh" },
    { value: "kpk", label: "Khyber Pakhtunkhwa" },
    { value: "balochistan", label: "Balochistan" },
    { value: "gilgit", label: "Gilgit-Baltistan" },
    { value: "ajk", label: "Azad Jammu and Kashmir" },
    { value: "islamabad", label: "Islamabad Capital Territory" },
  ]

  return (
    <form onSubmit={onSave} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Address Name</Label>
          <Input id="name" defaultValue={address?.name || ""} placeholder="Home, Work, etc." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" defaultValue={address?.fullName || ""} placeholder="John Doe" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Street Address</Label>
        <Input id="address" defaultValue={address?.address || ""} placeholder="123 Main Street" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" defaultValue={address?.city || ""} placeholder="Lahore" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="province">Province</Label>
          <Select defaultValue={address?.province || ""}>
            <SelectTrigger id="province">
              <SelectValue placeholder="Select province" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((province) => (
                <SelectItem key={province.value} value={province.value}>
                  {province.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input id="postalCode" defaultValue={address?.postalCode || ""} placeholder="54000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" defaultValue={address?.phone || ""} placeholder="+92 300 1234567" />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Address</Button>
      </div>
    </form>
  )
}
