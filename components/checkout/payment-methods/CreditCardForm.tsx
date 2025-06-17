"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { PaymentDetails } from "@/lib/payment-service"

interface CreditCardFormProps {
  onDataChange: (data: Partial<PaymentDetails>) => void
}

export default function CreditCardForm({ onDataChange }: CreditCardFormProps) {
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedDetails = { ...cardDetails, [name]: value }
    setCardDetails(updatedDetails)
    onDataChange({ cardDetails: updatedDetails })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="card-name">Cardholder Name</Label>
        <Input
          id="card-name"
          name="name"
          placeholder="John Doe"
          value={cardDetails.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="card-number">Card Number</Label>
        <Input
          id="card-number"
          name="number"
          placeholder="4242 4242 4242 4242"
          value={cardDetails.number}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="card-expiry">Expiry Date</Label>
          <Input
            id="card-expiry"
            name="expiry"
            placeholder="MM/YY"
            value={cardDetails.expiry}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="card-cvc">CVC</Label>
          <Input id="card-cvc" name="cvc" placeholder="123" value={cardDetails.cvc} onChange={handleChange} required />
        </div>
      </div>

      <div className="pt-2">
        <p className="text-sm text-muted-foreground">
          This is a demo form. In a real application, you would use a secure payment form from a provider like Stripe.
        </p>
      </div>
    </div>
  )
}
