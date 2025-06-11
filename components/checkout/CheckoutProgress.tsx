import { Check } from "lucide-react"

interface CheckoutProgressProps {
  currentStep: "shipping" | "payment" | "review"
}

const steps = [
  { id: "shipping", name: "Shipping", description: "Delivery information" },
  { id: "payment", name: "Payment", description: "Payment method" },
  { id: "review", name: "Review", description: "Review & place order" },
]

export default function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)

  return (
    <nav aria-label="Progress">
      <ol className="flex items-center justify-center space-x-8">
        {steps.map((step, index) => (
          <li key={step.id} className="flex items-center">
            <div className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  index < currentStepIndex
                    ? "border-primary bg-primary text-primary-foreground"
                    : index === currentStepIndex
                      ? "border-primary bg-background text-primary"
                      : "border-muted-foreground bg-background text-muted-foreground"
                }`}
              >
                {index < currentStepIndex ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <div className="ml-4 min-w-0">
                <p
                  className={`text-sm font-medium ${
                    index <= currentStepIndex ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.name}
                </p>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`ml-8 h-0.5 w-16 ${index < currentStepIndex ? "bg-primary" : "bg-muted-foreground"}`} />
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
