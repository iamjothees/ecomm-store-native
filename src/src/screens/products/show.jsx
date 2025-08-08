import { createContext, useContext, useEffect, useState } from 'react';
import { data, useParams } from 'react-router';
import useScreenContext from '@/contexts/ScreenContext';
import { fetchProduct } from '@/features/products/productService';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn, formatPrice } from "@/lib/utils"; // Assuming cn is a utility for class concatenation
import { ShoppingCart, Heart, Frown, Home } from 'lucide-react'; // Importing Lucide React icons, added Frown, Home
import { DynamicIcon } from 'lucide-react/dynamic';
import ExploreProducts from "@/features/products/components/Explore";
import Variants from '@/components/screens/products/variants';
import { useToast } from '@/contexts/ToastContext';
import { useCart } from '@/contexts/CartContext';
import { Link, useNavigate } from 'react-router';
import useSWR from 'swr';

const Context = createContext({ isScreen: true });

function ShowProduct({ slug: propSlug, isScreen=true }) {
  const { screen, setScreen } = useScreenContext();
  const routeParams = useParams();
  const slug = propSlug || routeParams.slug;

  const [product, setProduct] = useState(undefined);
  const [selectedVariants, setSelectedVariants] = useState({});

  const { data: fetchedProduct, isLoading: loading, error } = useSWR(slug, (slug) => fetchProduct({ slug }) );

  useEffect(() => { 
    setProduct(() => fetchedProduct);
  }, [fetchedProduct]);

  useEffect(() => {
    if (isScreen) setScreen((screen) => ({ ...screen, screenTitle: "Product", showHeader: true }));
    if (!slug) {
      setProduct(() => null);
      return;
    }
    
    setProduct( (product) => (product?.slug === slug) ? product : undefined );
  }, [slug]);

  useEffect(() => {
    if (isScreen) setScreen((screen) => ({ ...screen, loading }));

    if (error) {
        console.error("Error fetching product:", error);
        setProduct(() => null);
        if (isScreen) setScreen((screen) => ({ ...screen, screenTitle: "Product", loading: false }));
    }
  }, [loading, error]);

  useEffect(() => {
    if (Boolean(product) === false) {
      if(product === null) console.error("Error fetching product: Product not found");
      return;
    };

    if (product.variants && product.variants.length > 0) {
      const initialVariants = {};
      product.variants.forEach(variant => {
        if (variant.values && variant.values.length > 0) {
          initialVariants[variant.name] = variant.values[0]; // Select first option by default
        }
      });
      setSelectedVariants(initialVariants);
    }

    if (isScreen) setScreen((screen) => ({ ...screen, screenTitle: product.name }));
  }, [product]);
  
  if (screen.loading || product === undefined) {
    return <Context value={{ isScreen }}><ProductSkeleton /></Context>;
  }

  // Show "Product not found" message if product is null
  if (product === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-4 text-center">
        <Frown className="h-24 w-24 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h2>
        <p className="text-base text-muted-foreground mb-6">
          Oops! It looks like the product you're looking for doesn't exist or is currently unavailable.
        </p>
        <Button
          variant="default"
          className="flex items-center gap-2 px-6 py-3 rounded-lg shadow-md"
          onClick={() => console.log("Navigate to Home")} // Placeholder for navigation
        >
          <Home className="h-5 w-5" />
          Go to Home
        </Button>
      </div>
    );
  }

  return (
    <Context value={{ isScreen }}>
      <div className={cn("flex flex-col p-4 space-y-4", isScreen ? "pt-18" : "pt-5")}>
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
        {/* Add InfoTags component here */}
        <InfoTags tags={product.info_tags} />
        <ProductSpecs specs={product.specs} />
        <ProductFAQs faqs={product.faqs} />
        
        {/* Related Products */}
        <ExploreProducts config={{ title: "Related Products" }} />
      </div>
    </Context>
  );
}

// Skeleton Loader for Product Page
function ProductSkeleton() {
  const { isScreen } = useContext(Context);
  return (
    <div className={cn("flex flex-col gap-4 p-4", isScreen ? "pt-18" : "pt-5")}>
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
      {/* Info tags skeleton */}
      <div className="flex gap-4 justify-around mt-4"> {/* Adjusted for circular layout */}
        <div className="flex flex-col items-center gap-1">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
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
                  loading="lazy" // Lazy load video thumbnails
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
        <span className="text-xl font-bold text-primary">{ formatPrice(product.price) }</span>
        {product.mrp > product.price && (
          <span className="line-through text-base text-muted-foreground">{ formatPrice(product.mrp) }</span>
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
  const { isScreen } = useContext(Context);
  const { cart, dispatch } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, selectedVariants } });
    showToast('Item added to cart', 'success');
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

  const isItemInCart = cart.items.some(item => item.id === product.id && JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants));

  return (
    <div className={cn("sticky z-10 bg-background p-4 shadow-md -mx-4", isScreen ? "top-16" : "top-0")}>
      <div className="flex gap-2">
        <Button
          className="flex-1 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-200 ease-in-out hover:scale-[1.01]"
          variant="default"
          onClick={handleBuyNow}
          disabled={!areAllVariantsSelected}
        >
          Buy Now
        </Button>

        {
          isItemInCart 
            ? (
              <Link to="/cart" className="w-12 h-auto" onClick={(e) => {
                e.preventDefault(); // Prevent immediate navigation
                showToast(`${product.name} with selected options already in cart. Redirecting...`, 'info');
                setTimeout(() => {
                  navigate('/cart'); 
                }, 800);
              }}>
                <Button className="w-full h-full p-2 rounded-lg shadow-sm" variant="secondary">
                  <ShoppingCart className="h-6 w-6" />
                </Button>
              </Link>
            ) 
            : (
              <Button
                className="w-12 h-auto p-2 rounded-lg shadow-sm"
                variant="secondary"
                onClick={handleAddToCart}
                disabled={!areAllVariantsSelected}
              >
                <ShoppingCart className="h-6 w-6" />
              </Button>
            )
        }

        <Button variant="ghost" className="w-12 h-auto p-2 rounded-lg shadow-sm">
          <Heart className="h-6 w-6" /> {/* Icon for wishlist */}
        </Button>
      </div>
    </div>
  );
}

// Component to display small info tags with icons
function InfoTags({ tags }) {
  if (!tags?.length) return null;

  return (
    <div className="relative overflow-hidden mt-4">
      <div className="flex items-baseline justify-start gap-4 pr-8 overflow-x-auto scrollbar-hide">
        {tags.map((tag, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center p-2 flex-shrink-0"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full border-2 border-primary text-primary mb-1">
                <DynamicIcon name={tag.icon} className="h-6 w-6" />
              </div>
              {tag.label && <span className="text-sm text-muted-foreground font-medium">{tag.label}</span>}
            </div>
          );
        })}
      </div>
      {/* Gradient overlay to indicate more content */}
      {tags.length > 3 && ( // Only show gradient if there are more than 3 tags (adjust as needed based on visible count)
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      )}
    </div>
  );
}

// Component to display Product Specifications
function ProductSpecs({ specs }) {
  if (!specs?.length) return null;

  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const initialDisplayCount = 4;
  const specsToDisplay = showAllSpecs ? specs : specs.slice(0, initialDisplayCount);
  const hasMoreSpecs = specs.length > initialDisplayCount;

  return (
    <div className="mt-4 p-4 bg-card rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2 text-foreground">Specifications</h3>
      <ul className="text-sm text-muted-foreground space-y-2">
        {specsToDisplay.map((s, i) => (
          <li key={i} className="flex justify-between items-center border-b border-dashed border-gray-200 pb-1 last:border-b-0 last:pb-0">
            <span className="font-medium text-gray-800">{s.label}:</span>
            <span>{s.value}</span>
          </li>
        ))}
      </ul>
      {hasMoreSpecs && (
        <Button
          variant="link"
          className="w-full text-primary mt-2 text-sm justify-center"
          onClick={() => setShowAllSpecs(!showAllSpecs)}
        >
          {showAllSpecs ? "Show Less" : "See More"}
        </Button>
      )}
    </div>
  );
}

// Component to display Product FAQs
function ProductFAQs({ faqs }) {
  if (!faqs?.length) return null;

  const [showAllFAQs, setShowAllFAQs] = useState(false);
  const initialDisplayCount = 2; // Display first 2 FAQs
  const faqsToDisplay = showAllFAQs ? faqs : faqs.slice(0, initialDisplayCount);
  const hasMoreFAQs = faqs.length > initialDisplayCount;

  return (
    <div className="mt-4 p-4 bg-card rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2 text-foreground">FAQs</h3>
      <ul className="text-sm text-muted-foreground space-y-3">
        {faqsToDisplay.map((faq, i) => (
          <li key={i}>
            <strong className="text-gray-900 block mb-1">{faq.question}</strong>
            <p className="text-gray-700">{faq.answer}</p>
          </li>
        ))}
      </ul>
      {hasMoreFAQs && (
        <Button
          variant="link"
          className="w-full text-primary mt-2 text-sm justify-center"
          onClick={() => setShowAllFAQs(!showAllFAQs)}
        >
          {showAllFAQs ? "Show Less" : "See More"}
        </Button>
      )}
    </div>
  );
}

export default ShowProduct;
