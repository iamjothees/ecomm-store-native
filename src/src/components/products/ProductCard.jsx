import { Card } from "@/components/ui/card"
import ImageWithFallback from "@/components/common/ImageWithFallback";

function ProductCard({ product }) {
  return (
    <Card className="h-full aspect-product-card flex flex-col gap-1 rounded-lg p-0 shadow-md snap-center">
      <div className="grow-0 shrink-0 h-2/3 aspect-square p-0.5">
        <ImageWithFallback 
          src={product.featured_image.uri} 
          className="h-full w-full bg-primary-100 object-cover rounded-sm" 
        />
      </div>
      <div className="grow flex flex-col justify-end px-2 py-0.5">
        <p className="text-sm font-medium">{product.name}</p>
        <p className="text-xs font-light text-secondary-500">{product.category?.name || 'none'}</p>
        <p className="text-sm">{product.price} <span className="text-xs text-secondary-700 font-light line-through">{product.price}</span></p>
      </div>
    </Card>
  )
}

export default ProductCard