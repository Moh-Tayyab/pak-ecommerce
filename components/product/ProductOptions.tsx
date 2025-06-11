"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { ProductOption } from "@/lib/api"

interface ProductOptionsProps {
  options: ProductOption[]
  onChange?: (selectedOptions: Record<string, string>) => void
}

export default function ProductOptions({ options, onChange }: ProductOptionsProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

  function handleOptionChange(optionName: string, value: string) {
    const newOptions = { ...selectedOptions, [optionName]: value }
    setSelectedOptions(newOptions)
    onChange?.(newOptions)
  }

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.name}>
          <Label className="text-sm font-medium mb-2 block">{option.name}</Label>
          <RadioGroup
            value={selectedOptions[option.name] || ""}
            onValueChange={(value) => handleOptionChange(option.name, value)}
          >
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={`${option.name}-${value}`} />
                  <Label htmlFor={`${option.name}-${value}`} className="text-sm cursor-pointer">
                    {value}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}
