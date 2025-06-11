"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const faqCategories = [
  {
    id: "shipping",
    name: "Shipping & Delivery",
    faqs: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping within Pakistan typically takes 3-5 business days. For major cities like Karachi, Lahore, and Islamabad, delivery may be as quick as 1-2 business days. Remote areas may require additional time.",
      },
      {
        question: "Do you ship to all areas in Pakistan?",
        answer:
          "Yes, we deliver to all major cities and remote areas across Pakistan. However, delivery times may vary depending on your location.",
      },
      {
        question: "Is there a minimum order value for free shipping?",
        answer:
          "Yes, orders above PKR 3,000 qualify for free standard shipping across Pakistan. Orders below this amount incur a flat shipping fee of PKR 250.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order is dispatched, you'll receive a tracking number via email and SMS. You can use this number to track your package on our website or directly through our shipping partner's website.",
      },
    ],
  },
  {
    id: "returns",
    name: "Returns & Refunds",
    faqs: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 7-day return policy for most products. Items must be in their original condition with all packaging and accessories. Some products like earphones and memory cards may have different return policies for hygiene reasons.",
      },
      {
        question: "How do I initiate a return?",
        answer:
          "To initiate a return, log into your account, go to your orders, select the item you wish to return, and follow the return instructions. Alternatively, you can contact our customer service team.",
      },
      {
        question: "How long does it take to process refunds?",
        answer:
          "Once we receive and inspect the returned item, refunds are typically processed within 5-7 business days. The time it takes for the refund to appear in your account depends on your payment method and bank.",
      },
      {
        question: "Do I have to pay for return shipping?",
        answer:
          "For returns due to defects or errors on our part, return shipping is free. For returns due to change of mind or other customer reasons, return shipping costs are the responsibility of the customer.",
      },
    ],
  },
  {
    id: "warranty",
    name: "Warranty & Support",
    faqs: [
      {
        question: "What warranty do your products come with?",
        answer:
          "Most electronic products come with the manufacturer's warranty, typically ranging from 1-2 years depending on the product and brand. Details of the warranty are mentioned on each product page.",
      },
      {
        question: "How do I claim warranty?",
        answer:
          "To claim warranty, contact our customer service with your order details and a description of the issue. We'll guide you through the process, which may involve sending the item back for repair or replacement.",
      },
      {
        question: "Do you offer extended warranty options?",
        answer:
          "Yes, for select products, we offer extended warranty packages that can be purchased at the time of buying the product. These extend protection beyond the manufacturer's warranty period.",
      },
      {
        question: "What's covered under warranty?",
        answer:
          "Typically, warranties cover manufacturing defects and hardware failures under normal use. They do not cover physical damage, water damage, or issues arising from misuse or unauthorized repairs.",
      },
    ],
  },
  {
    id: "payment",
    name: "Payment Options",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept credit/debit cards (Visa, Mastercard, UnionPay), online bank transfers, mobile wallets (JazzCash, EasyPaisa), and cash on delivery (COD) for most areas in Pakistan.",
      },
      {
        question: "Is it safe to use my credit card on your website?",
        answer:
          "Yes, our website uses industry-standard SSL encryption to protect your payment information. We do not store your complete credit card details on our servers.",
      },
      {
        question: "Are there any additional charges for certain payment methods?",
        answer:
          "There are no additional charges for most payment methods. However, cash on delivery may incur a small handling fee of PKR 100 in some areas.",
      },
      {
        question: "Can I pay in installments?",
        answer:
          "Yes, we offer installment plans through partner banks for orders above PKR 10,000. Available options include 3, 6, and 12-month plans, subject to your bank's approval and terms.",
      },
    ],
  },
  {
    id: "orders",
    name: "Orders & Account",
    faqs: [
      {
        question: "Do I need an account to place an order?",
        answer:
          "While creating an account is recommended for a better shopping experience and order tracking, we also offer a guest checkout option for those who prefer not to create an account.",
      },
      {
        question: "Can I modify or cancel my order after placing it?",
        answer:
          "You can modify or cancel your order within 1 hour of placing it, provided it hasn't been processed for shipping. Contact our customer service immediately to request changes.",
      },
      {
        question: "How can I check the status of my order?",
        answer:
          "Log into your account and go to the 'My Orders' section to view the status of your current and past orders. You'll also receive email and SMS updates at each stage of your order.",
      },
      {
        question: "What should I do if I receive a damaged or incorrect item?",
        answer:
          "If you receive a damaged or incorrect item, please take photos and contact our customer service within 24 hours of delivery. We'll arrange for a return and replacement as quickly as possible.",
      },
    ],
  },
]

export default function FAQClientPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategory, setExpandedCategory] = useState<string | null>("shipping")

  // Filter FAQs based on search query
  const filteredFAQs =
    searchQuery.trim() === ""
      ? faqCategories
      : faqCategories
          .map((category) => ({
            ...category,
            faqs: category.faqs.filter(
              (faq) =>
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
          }))
          .filter((category) => category.faqs.length > 0)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>

      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search for answers..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg mb-2">No results found for "{searchQuery}"</p>
            <p className="text-muted-foreground">Try using different keywords or browse our categories below</p>
          </div>
        ) : (
          filteredFAQs.map((category) => (
            <div key={category.id} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
              <Accordion
                type="single"
                collapsible
                defaultValue={expandedCategory === category.id ? `${category.id}-0` : undefined}
              >
                {category.faqs.map((faq, index) => (
                  <AccordionItem key={`${category.id}-${index}`} value={`${category.id}-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
