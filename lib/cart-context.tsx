"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  slug: string
  price: number
  image: string
  quantity: number
  options?: Record<string, string>
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  updateItemQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
  getSubtotal: () => number
  getShippingCost: () => number
  getTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  // Add item to cart
  function addItem(item: CartItem) {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (i) => i.id === item.id && JSON.stringify(i.options) === JSON.stringify(item.options),
      )

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += item.quantity
        return updatedItems
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, item]
      }
    })
  }

  // Update item quantity
  function updateItemQuantity(id: string, quantity: number) {
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  // Remove item from cart
  function removeItem(id: string) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  // Clear cart
  function clearCart() {
    setItems([])
  }

  // Calculate subtotal
  function getSubtotal() {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Calculate shipping cost
  function getShippingCost() {
    const subtotal = getSubtotal()
    // Free shipping for orders over PKR 3,000
    return subtotal >= 3000 ? 0 : 250
  }

  // Calculate total
  function getTotal() {
    return getSubtotal() + getShippingCost()
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateItemQuantity,
        removeItem,
        clearCart,
        getSubtotal,
        getShippingCost,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
