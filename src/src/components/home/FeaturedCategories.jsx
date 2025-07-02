import { ChevronsRight } from "lucide-react";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import HorizontalScrollSection from "@/components/common/HorizontalScrollSection";
import { Link } from "react-router";

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
        <HorizontalScrollSection 
            renderMain={() => ( 
                dummyCategories.map((category) => (
                    // <ImageWithFallback
                    //   key={category.id}
                    //   src={category.imageSrc}
                    //   fallbackSrc={"#"}
                    //   alt={category.name}
                    //   className="h-20 aspect-square rounded-full bg-card shadow-md flex items-center justify-center snap-center object-cover"
                    // />
                    <div key={category.id} className="h-20 aspect-square rounded-full bg-card shadow-md flex items-center justify-center snap-center object-cover"/>
                ))
            )}
            renderHeader={() => (
                <>
                    <h1 className="text-lg font-semibold text-primary-950">Categories</h1>
                    <Link to="/categories" className="flex items-center gap-1 text-sm">
                        View All
                        <ChevronsRight size={16} />
                    </Link>
                </>
            )}
            hideIndicator
        />
    );
}

export default FeaturedCategories;
