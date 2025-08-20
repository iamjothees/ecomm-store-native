import { ChevronsRight } from "lucide-react";
import CategoryCard from "@/features/categories/components/Card";
import HorizontalScrollSection from "@/components/common/HorizontalScrollSection";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { fetchFeaturedCategories } from "@/features/categories/categoryService";

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
                        <Link to={`/categories/${category.slug}`} key={category.id} className="w-24 h-auto">
                            <CategoryCard key={category.id} category={category} hideName />
                        </Link>
                    ))
            )}
            renderHeader={() => (
                <>
                    <h1 className="text-lg font-semibold text-primary-950">Categories</h1>
                    <Link to="/categories" className="flex items-center gap-1 text-sm text-primary"> 
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
            <div key={index} className="min-w-24">
                <CategoryCard key={index} hideName />
            </div>
        ))
);
