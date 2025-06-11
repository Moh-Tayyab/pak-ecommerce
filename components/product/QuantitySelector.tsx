"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus } from "lucide-react"

interface QuantitySelectorProps {
  max: number
  defaultValue?: number
  onChange?: (quantity: number) => void
}

export default function QuantitySelector({ max, defaultValue = 1, onChange }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(defaultValue)

  function updateQuantity(newQuantity: number) {
    const validQuantity = Math.max(1, Math.min(max, newQuantity))
    setQuantity(validQuantity)
    onChange?.(validQuantity)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Quantity:</span>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(quantity - 1)}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <Input
          type="number"
          min="1"
          max={max}
          value={quantity}
          onChange={(e) => updateQuantity(Number.parseInt(e.target.value) || 1)}
          className="w-16 text-center"
        />

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(quantity + 1)}
          disabled={quantity >= max}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <span className="text-sm text-muted-foreground">({max} available)</span>
    </div>
  )
}
