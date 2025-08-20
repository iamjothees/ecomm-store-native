import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import ProductCard from "@/features/products/components/Card";
import HorizontalScrollSection from "@/components/common/HorizontalScrollSection";
import { fetchRecentlyViewedProducts } from '@/features/products/productService';
import { useEffect, useState } from "react";
import { Link } from "react-router";

function RecentlyViewedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentlyViewedProducts()
      .then((products) => setProducts(products))
      .finally(() => setLoading(false));
  }, []);

  return (
    <HorizontalScrollSection 
        renderMain={() => ( loading ? <Skeleton /> : products.map((product) => ( <ProductCard key={product.id} product={product} /> )) )}
        renderHeader={() => (
            <>
                <h1 className="text-lg font-semibold text-primary-950">Recently Viewed Products</h1>
                <Link to="/products/recent" className="flex items-center gap-1 text-sm text-primary"> 
                    View All
                    <ChevronsRight />
                </Link>
            </>
        )}
        styles={{ main: "min-h-50" }}
    />
  );
}

export default RecentlyViewedProducts;

const Skeleton = () => ( [...Array(4).keys()].map((_, i) => ( <ProductCard key={i} /> ))  );