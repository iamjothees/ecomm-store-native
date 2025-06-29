import HelloBar from "@/components/home/HelloBar"
import FeaturedCategories from "@/components/home/FeaturedCategories"
import Hero from "@/components/home/Hero"

function Home() {
  return (
    <main className="grow flex flex-col gap-4 items-center my-2">
      <HelloBar />
      <FeaturedCategories />
      <Hero />
    </main>
  )
}

export default Home