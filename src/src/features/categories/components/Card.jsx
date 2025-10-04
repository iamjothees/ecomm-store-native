import ImageWithFallback from "@/components/common/ImageWithFallback";
import { Skeleton } from "@/components/ui/skeleton";
import placeholderImg from '@/assets/placeholder.png';

const CategoryCard = ({ category, onClick, hideName }) => {

    const handleClick = () => {
        if (onClick) onClick(category);
    }

    if (!category) return (
        <div className="w-full h-auto flex flex-col items-center justify-end">
            <Skeleton className="w-full aspect-square rounded-full bg-primary-100" />
            { !hideName && <Skeleton className="h-3 w-3/4 mt-1 rounded-sm bg-primary-300" />}
        </div>
    );

    return (
        <div key={category.id} className="w-full h-auto cursor-pointer flex flex-col items-center justify-end" onClick={handleClick}>
            <ImageWithFallback
                src={category.featuredImage?.url ?? placeholderImg}
                fallbackSrc={placeholderImg}
                alt={category.name}
                className="w-full aspect-square rounded-full object-cover border border-gray-200"
            />
            { !hideName && <span className="text-xs text-center mt-1 text-foreground text-wrap">{category.name}</span>}
        </div>
    );
};

export default CategoryCard;
