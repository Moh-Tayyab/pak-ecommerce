import HeroBanner from "@/components/home/HeroBanner"
import FeaturedCategories from "@/components/home/FeaturedCategories"
import DailyDeals from "@/components/home/DailyDeals"
import NewArrivals from "@/components/home/NewArrivals"
import Testimonials from "@/components/home/Testimonials"
import NewsletterTeaser from "@/components/home/NewsletterTeaser"
import { getCategories, getFeaturedProducts, getNewArrivals } from "@/lib/api"

export default async function Home() {
  const categories = await getCategories()
  const featuredProducts = await getFeaturedProducts()
  const newArrivals = await getNewArrivals()

  return (
    <div className="flex flex-col gap-12 pb-12">
      <HeroBanner />
      <FeaturedCategories categories={categories} />
      <DailyDeals products={featuredProducts.filter((p) => p.discountPercentage > 0)} />
      <NewArrivals products={newArrivals} />
      <Testimonials />
      <NewsletterTeaser />
    </div>
  )
}
