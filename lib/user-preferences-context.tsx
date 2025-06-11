"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useSession } from "next-auth/react"

export interface UserPreferences {
  theme: "light" | "dark" | "system"
  language: "en" | "ur"
  currency: "PKR" | "USD"
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
    marketing: boolean
  }
  privacy: {
    showProfile: boolean
    showOrders: boolean
    allowDataCollection: boolean
  }
  shipping: {
    defaultAddress?: string
    preferredDeliveryTime: "morning" | "afternoon" | "evening" | "anytime"
  }
}

interface UserPreferencesContextType {
  preferences: UserPreferences
  updatePreferences: (updates: Partial<UserPreferences>) => Promise<void>
  isLoading: boolean
  error: string | null
}

const defaultPreferences: UserPreferences = {
  theme: "system",
  language: "en",
  currency: "PKR",
  notifications: {
    email: true,
    sms: false,
    push: true,
    marketing: false,
  },
  privacy: {
    showProfile: true,
    showOrders: false,
    allowDataCollection: true,
  },
  shipping: {
    preferredDeliveryTime: "anytime",
  },
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined)

export function UserPreferencesProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load preferences when user signs in
  useEffect(() => {
    if (session?.user) {
      loadPreferences()
    } else {
      // Load from localStorage for guest users
      const savedPreferences = localStorage.getItem("userPreferences")
      if (savedPreferences) {
        try {
          setPreferences({ ...defaultPreferences, ...JSON.parse(savedPreferences) })
        } catch (error) {
          console.error("Failed to parse saved preferences:", error)
        }
      }
    }
  }, [session])

  const loadPreferences = async () => {
    if (!session?.user) return

    setIsLoading(true)
    try {
      // In a real app, this would be an API call to your backend
      const savedPreferences = localStorage.getItem(`userPreferences_${session.user.id}`)
      if (savedPreferences) {
        setPreferences({ ...defaultPreferences, ...JSON.parse(savedPreferences) })
      }
    } catch (error) {
      console.error("Failed to load preferences:", error)
      setError("Failed to load preferences")
    } finally {
      setIsLoading(false)
    }
  }

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    setIsLoading(true)
    setError(null)

    try {
      const newPreferences = { ...preferences, ...updates }
      setPreferences(newPreferences)

      // Save to localStorage (in a real app, this would be an API call)
      const storageKey = session?.user ? `userPreferences_${session.user.id}` : "userPreferences"
      localStorage.setItem(storageKey, JSON.stringify(newPreferences))

      // In a real app, you would also save to your backend
      // await fetch('/api/user/preferences', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newPreferences)
      // })
    } catch (error) {
      console.error("Failed to update preferences:", error)
      setError("Failed to update preferences")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <UserPreferencesContext.Provider
      value={{
        preferences,
        updatePreferences,
        isLoading,
        error,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  )
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext)
  if (context === undefined) {
    throw new Error("useUserPreferences must be used within a UserPreferencesProvider")
  }
  return context
}
