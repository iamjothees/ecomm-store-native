import { ChevronsRight } from "lucide-react";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import HorizontalScrollSection from "@/components/common/HorizontalScrollSection";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { fetchFeaturedCategories } from "@/features/categories/categoryService";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component

function FeaturedCategories() {
    const [ categories, setCategories ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        fetchFeaturedCategories().then((categories) => {
            setCategories(categories);
            setLoading(false);
        });
    }, []);

    return (
        <HorizontalScrollSection 
            renderMain={() => (
                loading 
                    ? <ComponentSkeleton />
                    : categories.map((category) => (
                    <Link to={`/categories/${category.slug}`} key={category.id} className="h-24 aspect-square"> {/* Added Link for navigation */}
                        <ImageWithFallback
                            src={category.imageSrc}
                            fallbackSrc={"https://placehold.co/100x100/E2E8F0/FFFFFF?text=Category"} // Placeholder fallback
                            alt={category.name}
                            className="flex-1 h-full w-full rounded-full bg-primary-200 shadow-md flex items-center justify-center snap-center object-cover"
                        />
                        {/* <div key={category.id} className="h-full w-full rounded-full bg-primary-200 shadow-md flex items-center justify-center snap-center object-cover"/> */}
                    </Link>
                ))
            )}
            renderHeader={() => (
                <>
                    <h1 className="text-lg font-semibold text-primary-950">Categories</h1>
                    <Link to="/categories" className="flex items-center gap-1 text-sm text-primary"> {/* Added text-primary for link color */}
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

// Skeleton component for FeaturedCategories
const ComponentSkeleton = () => (
        Array.from({ length: 4 }).map((_, index) => ( // Render 4 skeleton items
            <Skeleton key={index} className="h-24 aspect-square rounded-full bg-primary-200 shadow-md snap-center" />
        ))
);
