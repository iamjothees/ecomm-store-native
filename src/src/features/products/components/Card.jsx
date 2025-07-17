import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import ImageWithFallback from "@/components/common/ImageWithFallback";

function ProductCard({ product = null }) {
  if (!product) return (
    <Card className="w-full h-auto flex flex-col gap-1 rounded-lg p-0 shadow-md snap-center">
      <div className="grow-0 shrink-0 h-2/3 aspect-square p-0.5">
        <Skeleton className="h-full w-full rounded-sm bg-primary-100" />
      </div>
      <div className="grow flex flex-col justify-end px-2 py-0.5 gap-1">
        <Skeleton className="h-4 w-3/4 rounded-sm" />
        <Skeleton className="h-3 w-1/2 rounded-sm bg-secondary-200" />
        <Skeleton className="h-4 w-1/3 rounded-sm bg-secondary-300" />
      </div>
    </Card>
  )

  return (
    <Card className="w-full h-auto flex flex-col gap-1 rounded-lg p-0 shadow-md snap-center">
      <div className="grow-0 shrink-0 h-2/3 aspect-square p-0.5">
        {/* <ImageWithFallback 
          src={product.featured_image.uri} 
          className="h-full w-full bg-primary-100 object-cover rounded-sm" 
        /> */}
        <div className="h-full w-full bg-primary-100 object-cover rounded-sm" />
      </div>
      <div className="grow flex flex-col justify-end px-2 py-0.5">
        <p className="text-sm md:text-lg font-medium">{product.name}</p>
        <p className="text-xs md:text-sm font-light text-secondary-500">{product.category?.name || 'none'}</p>
        <p className="text-sm md:text-lg">
          {product.price} <span className="text-xs md:text-sm text-secondary-700 font-light line-through">{product.price}</span>
        </p>
      </div>
    </Card>
  )
}

export default ProductCard;
