"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, Search, MoreHorizontal, Check, X, Reply, Flag, Download, MessageSquare, ThumbsUp } from "lucide-react"

// Mock reviews data
const reviews = [
  {
    id: "1",
    customer: {
      name: "Ahmed Hassan",
      email: "ahmed@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    product: {
      id: "1",
      name: "iPhone 13 Pro Max",
      image: "/placeholder.svg?height=60&width=60",
    },
    rating: 5,
    title: "Excellent phone with amazing camera quality",
    content:
      "I've been using this phone for 3 months now and I'm extremely satisfied. The camera quality is outstanding, battery life is great, and the build quality is premium. Highly recommended!",
    status: "approved",
    isVerifiedPurchase: true,
    helpfulVotes: 12,
    createdAt: "2024-01-15T10:30:00Z",
    reply: null,
  },
  {
    id: "2",
    customer: {
      name: "Fatima Khan",
      email: "fatima@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    product: {
      id: "2",
      name: "Samsung Galaxy S21 Ultra",
      image: "/placeholder.svg?height=60&width=60",
    },
    rating: 4,
    title: "Good phone but battery could be better",
    content:
      "Overall a solid phone with great display and camera. However, the battery life is not as good as expected. Still a good purchase for the price.",
    status: "pending",
    isVerifiedPurchase: true,
    helpfulVotes: 8,
    createdAt: "2024-01-14T16:45:00Z",
    reply: null,
  },
  {
    id: "3",
    customer: {
      name: "Muhammad Ali",
      email: "ali@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    product: {
      id: "3",
      name: "MacBook Pro 14-inch",
      image: "/placeholder.svg?height=60&width=60",
    },
    rating: 5,
    title: "Perfect for professional work",
    content:
      "This MacBook is a beast! Perfect for video editing and development work. The M1 chip is incredibly fast and the display is gorgeous.",
    status: "approved",
    isVerifiedPurchase: true,
    helpfulVotes: 15,
    createdAt: "2024-01-13T14:20:00Z",
    reply: {
      content: "Thank you for your positive feedback! We're glad you're enjoying your MacBook Pro.",
      createdAt: "2024-01-14T09:00:00Z",
    },
  },
  {
    id: "4",
    customer: {
      name: "Ayesha Ahmed",
      email: "ayesha@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    product: {
      id: "4",
      name: "Sony WH-1000XM4",
      image: "/placeholder.svg?height=60&width=60",
    },
    rating: 2,
    title: "Not worth the price",
    content:
      "Expected much better sound quality for this price range. The noise cancellation is okay but overall disappointed with the purchase.",
    status: "flagged",
    isVerifiedPurchase: false,
    helpfulVotes: 3,
    createdAt: "2024-01-12T11:00:00Z",
    reply: null,
  },
  {
    id: "5",
    customer: {
      name: "Hassan Malik",
      email: "hassan@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    product: {
      id: "5",
      name: "Anker PowerCore 20000mAh",
      image: "/placeholder.svg?height=60&width=60",
    },
    rating: 5,
    title: "Reliable power bank",
    content:
      "Great power bank with fast charging. Has been very reliable for travel and daily use. Good build quality and value for money.",
    status: "approved",
    isVerifiedPurchase: true,
    helpfulVotes: 7,
    createdAt: "2024-01-11T13:30:00Z",
    reply: null,
  },
]

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedRating, setSelectedRating] = useState("all")
  const [replyDialogOpen, setReplyDialogOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState<any>(null)

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || review.status === selectedStatus
    const matchesRating = selectedRating === "all" || review.rating.toString() === selectedRating

    return matchesSearch && matchesStatus && matchesRating
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: "default" as const,
      pending: "secondary" as const,
      rejected: "destructive" as const,
      flagged: "outline" as const,
    }

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-PK", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleReply = (review: any) => {
    setSelectedReview(review)
    setReplyDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-600">Manage customer reviews and feedback</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Reviews
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {reviews.filter((r) => r.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {reviews.filter((r) => r.status === "approved").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Flagged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {reviews.filter((r) => r.status === "flagged").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedRating} onValueChange={setSelectedRating}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Image
                      src={review.customer.avatar || "/placeholder.svg"}
                      alt={review.customer.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{review.customer.name}</p>
                        {review.isVerifiedPurchase && (
                          <Badge variant="outline" className="text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(review.status)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleReply(review)}>
                          <Reply className="h-4 w-4 mr-2" />
                          Reply
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Flag className="h-4 w-4 mr-2" />
                          Flag
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Image
                    src={review.product.image || "/placeholder.svg"}
                    alt={review.product.name}
                    width={40}
                    height={40}
                    className="rounded"
                  />
                  <Link href={`/admin/products/${review.product.id}`} className="text-sm text-blue-600 hover:underline">
                    {review.product.name}
                  </Link>
                </div>

                <div>
                  <h4 className="font-medium mb-1">{review.title}</h4>
                  <p className="text-gray-700 text-sm">{review.content}</p>
                </div>

                {review.reply && (
                  <div className="bg-gray-50 rounded-lg p-3 ml-8">
                    <div className="flex items-center space-x-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">Store Reply</span>
                      <span className="text-xs text-gray-500">{formatDate(review.reply.createdAt)}</span>
                    </div>
                    <p className="text-sm text-gray-700">{review.reply.content}</p>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{review.helpfulVotes} helpful</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No reviews found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedReview && (
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  {renderStars(selectedReview.rating)}
                  <span className="font-medium">{selectedReview.customer.name}</span>
                </div>
                <p className="text-sm">{selectedReview.content}</p>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Reply</label>
              <Textarea placeholder="Write your reply..." rows={4} />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setReplyDialogOpen(false)}>Send Reply</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
