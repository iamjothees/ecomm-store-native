import HelloBar from "@/components/home/HelloBar"
import FeaturedCategories from "@/components/home/FeaturedCategories"

function Home() {
  return (
    <main className="grow flex flex-col gap-4 items-center my-2">
      <HelloBar />
      <FeaturedCategories />
    </main>
  )
}

export default Home