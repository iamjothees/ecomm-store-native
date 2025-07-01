import HelloBar from "@/components/home/HelloBar"
import FeaturedCategories from "@/components/home/FeaturedCategories"
import FeaturedProducts from "@/components/home/FeaturedProducts"
import Stories from "@/components/home/Stories"
import RecentlyViewedProducts from "@/components/home/RecentlyViewedProducts"
import Hero from "@/components/home/Hero"

function Home() {
  return (
    <main className="grow flex flex-col gap-4 items-center my-2">
      <HelloBar />
      <FeaturedCategories />
      <Hero />
      <FeaturedProducts />
      <Stories />
      <RecentlyViewedProducts />
    </main>
  )
}

export default Home