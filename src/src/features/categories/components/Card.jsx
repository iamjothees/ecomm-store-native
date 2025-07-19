import ImageWithFallback from "@/components/common/ImageWithFallback";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryCard = ({ category, onClick }) => {
    if (!category) return (
        <div className="w-full h-auto rounded-lg bg-card flex flex-col gap-1">
            <div className="grow-0 shrink-0 w-full aspect-square rounded-lg p-0.5">
                <Skeleton className="h-full w-full bg-primary-100 rounded-lg" />
            </div>
            <Skeleton className="h-3 w-3/4 mx-2 my-0.5 rounded-sm bg-primary-300" />
        </div>
    );

    return (
        <div className="w-full h-auto rounded-lg bg-card flex flex-col gap-1" onClick={() => onClick(category)}>
            <div className="grow-0 shrink-0 w-full aspect-square rounded-lg p-0.5">
                <ImageWithFallback 
                    src={category.imageSrc} 
                    className="h-full w-full bg-primary-100 object-cover aspect-square rounded-lg" 
                />
            </div>
            <p className="text-sm truncate px-2 py-0.5">{category.name}</p>
        </div>
    );
};

export default CategoryCard;
