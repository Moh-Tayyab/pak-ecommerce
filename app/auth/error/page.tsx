"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string>("An authentication error occurred")
  const [errorDescription, setErrorDescription] = useState<string | null>(null)

  useEffect(() => {
    // Get error information from URL parameters
    const error = searchParams.get("error")

    if (error) {
      switch (error) {
        case "Configuration":
          setErrorMessage("Server configuration error")
          setErrorDescription("There is a problem with the server configuration. Please contact support.")
          break
        case "AccessDenied":
          setErrorMessage("Access denied")
          setErrorDescription("You do not have permission to sign in.")
          break
        case "Verification":
          setErrorMessage("Verification error")
          setErrorDescription("The verification link may have been used or is invalid.")
          break
        case "OAuthSignin":
          setErrorMessage("OAuth sign in error")
          setErrorDescription("Error in the OAuth sign in process. Please try again.")
          break
        case "OAuthCallback":
          setErrorMessage("OAuth callback error")
          setErrorDescription("Error in the OAuth callback process. Please try again.")
          break
        case "OAuthCreateAccount":
          setErrorMessage("Account creation error")
          setErrorDescription("Could not create an account using the OAuth provider.")
          break
        case "EmailCreateAccount":
          setErrorMessage("Account creation error")
          setErrorDescription("Could not create an account using the email provider.")
          break
        case "Callback":
          setErrorMessage("Callback error")
          setErrorDescription("Error in the authentication callback. Please try again.")
          break
        case "OAuthAccountNotLinked":
          setErrorMessage("Account not linked")
          setErrorDescription(
            "This email is already associated with another account. Please sign in using the original provider.",
          )
          break
        case "EmailSignin":
          setErrorMessage("Email sign in error")
          setErrorDescription("The email sign in link is invalid or has expired.")
          break
        case "CredentialsSignin":
          setErrorMessage("Invalid credentials")
          setErrorDescription("The credentials you provided are invalid.")
          break
        case "SessionRequired":
          setErrorMessage("Authentication required")
          setErrorDescription("You must be signed in to access this page.")
          break
        case "facebook_oauth_failure":
          setErrorMessage("Facebook authentication failed")
          setErrorDescription(
            "There was a problem authenticating with Facebook. Please try again or use another sign-in method.",
          )
          break
        case "twitter_oauth_failure":
          setErrorMessage("Twitter authentication failed")
          setErrorDescription(
            "There was a problem authenticating with Twitter. Please try again or use another sign-in method.",
          )
          break
        default:
          setErrorMessage("Authentication error")
          setErrorDescription("An unexpected error occurred during authentication.")
      }
    }
  }, [searchParams])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <CardTitle className="text-2xl font-bold">{errorMessage}</CardTitle>
            </div>
            <CardDescription>
              {errorDescription || "There was a problem with your authentication request."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              If this problem persists, please contact our support team for assistance.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button asChild className="w-full">
              <Link href="/auth/signin">Try Again</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
