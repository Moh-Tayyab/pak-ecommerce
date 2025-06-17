import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In a real app, you would fetch preferences from your database
    // For now, return default preferences
    const defaultPreferences = {
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

    return NextResponse.json(defaultPreferences)
  } catch (error) {
    console.error("Error fetching user preferences:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const preferences = await request.json()

    // In a real app, you would save preferences to your database
    // For now, just return success
    console.log("Saving preferences for user:", session.user.id, preferences)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving user preferences:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
