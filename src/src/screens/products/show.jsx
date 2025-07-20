import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useScreenContext from '@/contexts/ScreenContext';
import { fetchProduct } from '@/features/services/productService';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils"; // Assuming cn is a utility for class concatenation
import { ShoppingCart, Heart } from 'lucide-react'; // Importing Lucide React icons
import ExploreProducts from "@/features/products/components/Explore";
import Variants from '@/components/screens/products/variants';

// Main Product Display Component
function ShowProduct() {
  const { screen, setScreen } = useScreenContext();
  const { slug } = useParams();
  const [product, setProduct] = useState(undefined);
  const [selectedVariants, setSelectedVariants] = useState({});

  useEffect(() => {
    setScreen({ screenTitle: "Product", loading: true });

    fetchProduct({ slug })
      .then(productData => {
        setProduct(productData);
        if (productData === null) {
          throw new Error("Product not found");
        }
        if (productData.variants && productData.variants.length > 0) {
          const initialVariants = {};
          productData.variants.forEach(variant => {
            if (variant.values && variant.values.length > 0) {
              initialVariants[variant.name] = variant.values[0]; // Select first option by default
            }
          });
          setSelectedVariants(initialVariants);
        }
        return productData;
      })
      .then((productData) => setScreen({ screenTitle: productData.name }))
      .catch((error) => {
        console.error("Error fetching product:", error);
        setProduct(null); // Explicitly set to null on error for "Product not found" message
      })
      .finally(() => setScreen({ loading: false }));
  }, []);

  // Show skeleton while loading or if product is undefined
  if (screen.loading || product === undefined) {
    return <ProductSkeleton />;
  }

  // Show "Product not found" message if product is null
  if (product === null) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground pt-18">
        Product not found. Please try again later.
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 space-y-4 pt-18">
      <ProductMedia product={product} />
      <Variants
        product={product}
        selectedVariants={selectedVariants}
        setSelectedVariants={setSelectedVariants}
      />
      <ProductDetails product={product} />
      <ProductActions
        product={product}
        selectedVariants={selectedVariants}
      />
      <ProductSpecs specs={product.specs} />
      <ProductFAQs faqs={product.faqs} />
      
      {/* Related Products */}
      <ExploreProducts config={{ title: "Related Products" }} />
    </div>
  );
}

// Skeleton Loader for Product Page
function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4 pt-18">
      {/* Main image skeleton */}
      <Skeleton className="h-64 w-full rounded-xl" />
      {/* Thumbnails skeleton */}
      <div className="flex gap-2 pb-2">
        <Skeleton className="h-16 w-16 rounded-md" />
        <Skeleton className="h-16 w-16 rounded-md" />
        <Skeleton className="h-16 w-16 rounded-md" />
      </div>
      {/* Selected variants display skeleton */}
      <Skeleton className="h-12 w-full rounded-lg" />
      {/* Product details skeleton */}
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-6 w-full" />
      {/* Action buttons skeleton */}
      <div className="flex gap-2">
        <Skeleton className="h-10 flex-1 rounded-md" />
        <Skeleton className="h-10 flex-1 rounded-md" />
        <Skeleton className="h-10 w-12 rounded-md" />
      </div>
      {/* Specs/FAQs/Related products section skeletons */}
      <Skeleton className="h-4 w-1/3 mt-4" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-4 w-1/3 mt-4" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-4 w-1/3 mt-4" />
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-32 rounded-md" />
        <Skeleton className="h-32 rounded-md" />
      </div>
    </div>
  );
}

// Component to display Product Media (Images & Videos)
function ProductMedia({ product }) {
  const [current, setCurrent] = useState(0);
  // Ensure media is an array, fallback to imageUrl if no media array
  const media = product.media && product.media.length > 0 ? product.media : [{ type: "image", url: product.imageUrl }];

  return (
    <div className="space-y-2">
      <Card className="aspect-square w-full overflow-hidden !p-1 flex items-center justify-center bg-gray-100">
        {media[current]?.type === "image" ? (
          <img
            key={media[current].url} // Use URL as key for stability
            src={media[current].url}
            alt={`Product image ${current + 1}`}
            className="w-full h-full object-contain rounded-md"
            loading="eager" // Main image is eager loaded
          />
        ) : (
          <video
            key={media[current].url} // Use URL as key for stability
            src={media[current].url}
            controls // Added controls for video
            autoPlay // Added autoplay as a default, can be toggled
            loop // Loop video for continuous display
            muted // Muted to prevent autoplay sound issues
            className="w-full h-full object-contain rounded-md"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </Card>

      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-2">
          {media.map((item, idx) => (
            <div
              key={item.url || idx} // Use url as key if available, fallback to idx
              onClick={() => setCurrent(idx)}
              className={cn(
                "aspect-square h-16 rounded-md overflow-hidden border cursor-pointer flex items-center justify-center bg-gray-100",
                current === idx ? "border-primary" : "border-muted"
              )}
            >
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy" // Thumbnails can be lazy loaded
                />
              ) : (
                // Placeholder for video thumbnail, or display first frame if possible
                <video
                  src={item.url}
                  className="w-full h-full object-cover"
                  preload="metadata" // Preload metadata to show first frame if possible
                  muted // Muted for thumbnail preview
                />
              )}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

// Component to display Product Details
function ProductDetails({ product }) {
  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-bold text-foreground">{product.name}</h2>
      <p className="text-sm text-muted-foreground">{product.description}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-xl font-bold text-primary">₹{product.price}</span>
        {product.mrp > product.price && (
          <span className="line-through text-base text-muted-foreground">₹{product.mrp}</span>
        )}
        {product.mrp > product.price && (
          <Badge variant="default" className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off
          </Badge>
        )}
      </div>
    </div>
  );
}

// Component for Product Actions (Buy Now, Add to Cart, Wishlist)
function ProductActions({ product, selectedVariants }) {
  const handleAddToCart = () => {
    // Implement add to cart logic here
    console.log("Added to cart:", {
      product: product.name,
      ...selectedVariants, // Spread the selectedVariants object
    });
    // You would typically dispatch an action to a cart state management system here
  };

  const handleBuyNow = () => {
    // Implement buy now logic here (e.g., direct checkout)
    console.log("Buying now:", {
      product: product.name,
      ...selectedVariants, // Spread the selectedVariants object
    });
  };

  // Check if all variant types have a selected option
  const areAllVariantsSelected = product.variants.every(variant => selectedVariants[variant.name] !== undefined);

  return (
    <div className="flex gap-2 mt-4">
      <Button
        className="flex-1 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-200 ease-in-out hover:scale-[1.01]"
        variant="default"
        onClick={handleBuyNow}
        disabled={!areAllVariantsSelected}
      >
        Buy Now
      </Button>

      <Button
        className="w-12 h-auto p-2 rounded-lg shadow-sm"
        variant="secondary"
        onClick={handleAddToCart}
        disabled={!areAllVariantsSelected}
      >
        <ShoppingCart className="h-6 w-6" />
      </Button>

      <Button variant="ghost" className="w-12 h-auto p-2 rounded-lg shadow-sm">
        <Heart className="h-6 w-6" /> {/* Icon for wishlist */}
      </Button>
    </div>
  );
}

// Component to display Product Specifications
function ProductSpecs({ specs }) {
  if (!specs?.length) return null;
  return (
    <div className="mt-4 p-4 bg-card rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2 text-foreground">Specifications</h3>
      <ul className="text-sm text-muted-foreground space-y-2">
        {specs.map((s, i) => (
          <li key={i} className="flex justify-between items-center border-b border-dashed border-gray-200 pb-1 last:border-b-0 last:pb-0">
            <span className="font-medium text-gray-800">{s.label}:</span>
            <span>{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component to display Product FAQs
function ProductFAQs({ faqs }) {
  if (!faqs?.length) return null;
  return (
    <div className="mt-4 p-4 bg-card rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2 text-foreground">FAQs</h3>
      <ul className="text-sm text-muted-foreground space-y-3">
        {faqs.map((faq, i) => (
          <li key={i}>
            <strong className="text-gray-900 block mb-1">{faq.q}</strong>
            <p className="text-gray-700">{faq.a}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowProduct;
