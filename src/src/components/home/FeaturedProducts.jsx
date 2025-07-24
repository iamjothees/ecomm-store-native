import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import ProductCard from "@/features/products/components/Card";
import HorizontalScrollSection from "@/components/common/HorizontalScrollSection";
import { fetchFeaturedProducts } from '@/features/products/productService';

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts()
      .then((products) => setProducts(products))
      .finally(() => setLoading(false));
  }, []);

  return (
    <HorizontalScrollSection 
        renderMain={() => ( loading ? <Skeleton /> : products.map((product) => ( <ProductCard key={product.id} product={product} /> )) )}
        renderHeader={() => (
            <>
                <h1 className="text-lg font-semibold text-primary-950">Featured Products</h1>
                <Button variant="link" onClick={() => alert("View All")} className="!px-0">
                    View All
                    <ChevronsRight />
                </Button>
            </>
        )}
        styles={{ main: "min-h-50" }}
    />
  );
}

export default FeaturedProducts;

const Skeleton = () => ( [...Array(4).keys()].map((_, i) => ( <ProductCard key={i} /> ))  );