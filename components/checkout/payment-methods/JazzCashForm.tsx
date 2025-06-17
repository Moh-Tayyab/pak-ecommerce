"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import type { PaymentDetails } from "@/lib/payment-service"

interface JazzCashFormProps {
  onDataChange: (data: Partial<PaymentDetails>) => void
  amount: number
  orderId: string
}

export default function JazzCashForm({ onDataChange, amount, orderId }: JazzCashFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)
  const [transactionId, setTransactionId] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value)
    onDataChange({
      mobileWallet: {
        phoneNumber: e.target.value,
      },
    })
  }

  const handleTransactionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionId(e.target.value)
    onDataChange({
      mobileWallet: {
        phoneNumber,
        transactionId: e.target.value,
      },
    })
  }

  const handleSendVerification = async () => {
    setIsVerifying(true)
    setError(null)

    try {
      // In a real app, you would call your API to initiate the JazzCash payment
      const response = await fetch("/api/payments/jazzcash", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          amount,
          orderId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send verification")
      }

      setVerificationSent(true)
    } catch (error) {
      console.error("JazzCash verification error:", error)
      setError(error instanceof Error ? error.message : "Failed to send verification")
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center mb-4">
        <img src="/placeholder.svg?height=60&width=120" alt="JazzCash Logo" className="h-12" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="jazzcash-phone">JazzCash Account Number</Label>
        <Input
          id="jazzcash-phone"
          placeholder="03XX XXXXXXX"
          value={phoneNumber}
          onChange={handlePhoneChange}
          required
        />
        <p className="text-xs text-muted-foreground">Enter the phone number registered with your JazzCash account</p>
      </div>

      {!verificationSent ? (
        <Button
          type="button"
          onClick={handleSendVerification}
          disabled={!phoneNumber || isVerifying}
          className="w-full"
        >
          {isVerifying ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Send Payment Request
        </Button>
      ) : (
        <div className="space-y-4">
          <Alert>
            <AlertDescription>
              A payment request has been sent to your JazzCash account. Please check your phone and complete the
              payment.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="jazzcash-transaction">Transaction ID (Optional)</Label>
            <Input
              id="jazzcash-transaction"
              placeholder="Enter transaction ID after payment"
              value={transactionId}
              onChange={handleTransactionIdChange}
            />
            <p className="text-xs text-muted-foreground">
              If you have completed the payment, enter the transaction ID for faster verification
            </p>
          </div>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="pt-2">
        <p className="text-sm text-muted-foreground">
          This is a demo integration. In a real application, you would be redirected to the JazzCash payment gateway.
        </p>
      </div>
    </div>
  )
}
