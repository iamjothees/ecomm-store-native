import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import ImageWithFallback from "@/components/common/ImageWithFallback";

const dummyCategories = [
  {id: 1, name: "Category 1", imageSrc: "https://picsum.photos/200/300"},
  {id: 2, name: "Category 2", imageSrc: "https://picsum.photos/200/300"},
  {id: 3, name: "Category 3", imageSrc: "https://picsum.photos/200/300"},
  {id: 4, name: "Category 4", imageSrc: "https://picsum.photos/200/300"},
  {id: 5, name: "Category 5", imageSrc: "https://picsum.photos/200/300"},
  {id: 6, name: "Category 6", imageSrc: "https://picsum.photos/200/300"},
  {id: 7, name: "Category 7", imageSrc: "https://picsum.photos/200/300"},
  {id: 8, name: "Category 8", imageSrc: "https://picsum.photos/200/300"},
];

function FeaturedCategories() {
  return (
    <section className="w-full py-2">
      <header className="flex justify-between items-center mb-2 px-3">
        <h1 className="text-lg font-semibold text-primary-950">Categories</h1>
        <Button variant="link" onClick={() => alert("View All")} className="!px-0">
            View All
            <ChevronsRight />
        </Button>
      </header>

      <main className="flex overflow-x-auto gap-3 px-3 pb-2 snap-x snap-mandatory scroll-smooth">
        {dummyCategories.map((category) => (
            <ImageWithFallback
              key={category.id}
              src={category.imageSrc}
              fallbackSrc={"#"}
              alt={category.name}
              className="h-20 aspect-square rounded-full bg-card shadow-md flex items-center justify-center snap-center object-cover"
            />
        ))}
      </main>
    </section>
  );
}

export default FeaturedCategories;
