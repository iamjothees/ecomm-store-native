import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { useState } from 'react'; // Import useState
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerClose, DrawerDescription } from '@/components/ui/drawer'; // Import Drawer components
import ShowProduct from '@/screens/products/show'; // Import ShowProduct
import { Button } from '@/components/ui/button'; // Import Button for close icon
import { Expand } from "lucide-react";
import { useNavigate } from "react-router";

function ProductCard({ product = null, onClick = null }) {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to control drawer

  // Determine the actual click handler
  const handleClick = () => {
    if (onClick) return onClick(product);

    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    navigate(`/products/${product.slug}`);
    setIsDrawerOpen(false);
  }

  if (!product) return (
    <Card className="w-full h-auto flex flex-col gap-1 rounded-lg p-0 shadow-md snap-center">
      <div className="grow-0 shrink-0 h-2/3 aspect-square p-0.5">
        <Skeleton className="h-full min-w-[40vw] bg-primary-100 rounded-sm" />
      </div>
      <div className="grow flex flex-col justify-end px-2 py-0.5 gap-1">
        <Skeleton className="h-4 w-3/4 rounded-sm bg-primary-400" />
        <Skeleton className="h-3 w-1/2 rounded-sm bg-secondary-200" />
        <Skeleton className="h-4 w-1/3 rounded-sm bg-secondary-300" />
      </div>
    </Card>
  )

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Card 
          className="w-full h-auto flex flex-col gap-1 rounded-lg p-0 shadow-md snap-center cursor-pointer" 
          onClick={handleClick}
        >
          <div className="flex-1 p-0.5">
            <ImageWithFallback 
              src={product.featured_image.uri} 
              className="min-h-full w-full min-w-[40vw] aspect-square bg-primary-100 object-cover rounded-sm" 
            />
            {/* <div className="min-h-full w-full min-w-[40vw] aspect-square bg-primary-100 object-cover rounded-sm" /> */}
          </div>
          <div className="grow flex flex-col justify-end px-2 py-0.5">
            <p className="text-sm md:text-lg font-medium">{product.name}</p>
            <p className="text-xs md:text-sm font-light text-secondary-500">{product.category?.name || 'none'}</p>
            <p className="text-sm md:text-lg">
              {product.price} <span className="text-xs md:text-sm text-secondary-700 font-light line-through">{product.price}</span>
            </p>
          </div>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh]">
        <DrawerTitle className="px-4 py-2 flex justify-between">
          {product.name}
          <Button variant="ghost" size="icon" onClick={handleDrawerClose}>
            <Expand />
          </Button>
        </DrawerTitle>
        <DrawerDescription className="hidden">{product.category.name}</DrawerDescription>
        <DrawerClose asChild>
        </DrawerClose>
        <div className="h-full flex flex-col overflow-y-scroll pb-24">
          {product && <ShowProduct slug={product.slug} isScreen={false} />} 
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default ProductCard;
