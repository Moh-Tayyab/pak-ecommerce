import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
let stripe: Stripe | null = null

if (stripeSecretKey) {
  stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2023-10-16",
  })
} else {
  console.warn("********************************************************************************")
  console.warn("WARNING: STRIPE_SECRET_KEY is not set. Stripe functionality will not work.")
  console.warn("For build purposes, a placeholder key will be used if absolutely necessary,")
  console.warn("but API calls requiring Stripe will likely fail or be mocked.")
  console.warn("Ensure STRIPE_SECRET_KEY is set in your environment for production/testing.")
  console.warn("********************************************************************************")
  // No fake key initialization here, stripe remains null.
  // The POST handler will check for null.
}

export async function POST(request: Request) {
  if (!stripe) {
    console.error("Stripe is not initialized due to missing STRIPE_SECRET_KEY.")
    return NextResponse.json(
      { error: "Stripe is not configured. Payment processing unavailable." },
      { status: 500 },
    )
  }

  try {
    const body = await request.json()
    const { items, orderId, customerEmail } = body

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "pkr",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
      },
      quantity: item.quantity,
    }))

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_API_URL}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/checkout/payment`,
      customer_email: customerEmail,
      client_reference_id: orderId,
      metadata: {
        orderId,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error("Stripe API error:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
