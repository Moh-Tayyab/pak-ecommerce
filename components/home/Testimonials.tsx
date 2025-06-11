import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Ahmed Hassan",
    location: "Karachi",
    rating: 5,
    comment: "Excellent service and fast delivery! Got my iPhone within 2 days. Highly recommended!",
  },
  {
    id: 2,
    name: "Fatima Khan",
    location: "Lahore",
    rating: 5,
    comment: "Great prices and authentic products. The customer support team is very helpful.",
  },
  {
    id: 3,
    name: "Muhammad Ali",
    location: "Islamabad",
    rating: 5,
    comment: "Best electronics store in Pakistan. Wide variety and competitive prices.",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>

              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">99%</div>
              <div className="text-muted-foreground">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-muted-foreground">Customer Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">1000+</div>
              <div className="text-muted-foreground">Products Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
