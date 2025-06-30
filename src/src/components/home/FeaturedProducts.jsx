import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import HorizontalScrollSection from "@/components/common/HorizontalScrollSection";

const dummyProducts = [
  {id: 1, name: "Product 1", price: "₹100", featured_image: { uri: "https://picsum.photos/200/300" }},
  {id: 2, name: "Product 2", price: "₹200", featured_image: { uri: "https://picsum.photos/200/300" }},
  {id: 3, name: "Product 3", price: "₹300", featured_image: { uri: "https://picsum.photos/200/300" }},
  {id: 4, name: "Product 4", price: "₹400", featured_image: { uri: "https://picsum.photos/200/300" }},
  {id: 5, name: "Product 5", price: "₹500", featured_image: { uri: "https://picsum.photos/200/300" }},
  {id: 6, name: "Product 6", price: "₹600", featured_image: { uri: "https://picsum.photos/200/300" }},
  {id: 7, name: "Product 7", price: "₹700", featured_image: { uri: "https://picsum.photos/200/300" }},
  {id: 8, name: "Product 8", price: "₹800", featured_image: { uri: "https://picsum.photos/200/300" }},
];

function FeaturedProducts() {
  return (
    <HorizontalScrollSection 
        renderMain={() => ( dummyProducts.map((product) => ( <ProductCard key={product.id} product={product} /> )) )}
        renderHeader={() => (
            <>
                <h1 className="text-lg font-semibold text-primary-950">Featured Products</h1>
                <Button variant="link" onClick={() => alert("View All")} className="!px-0">
                    View All
                    <ChevronsRight />
                </Button>
            </>
        )}
        styles={{ main: "h-50" }}
    />
  );
}

export default FeaturedProducts;
