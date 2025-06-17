import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { phoneNumber, amount, orderId } = body

    // In a real app, you would integrate with the EasyPaisa API here
    // For now, we'll simulate a successful API call

    // Validate phone number format (Pakistan mobile number)
    const phoneRegex = /^(\+92|0092|0)[3][0-9]{9}$/
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 })
    }

    // Simulate API response
    const response = {
      success: true,
      transactionId: `EP-${Date.now()}`,
      message: "Payment request sent to EasyPaisa. Please check your phone to complete the payment.",
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("EasyPaisa API error:", error)
    return NextResponse.json({ error: "Failed to process EasyPaisa payment" }, { status: 500 })
  }
}
