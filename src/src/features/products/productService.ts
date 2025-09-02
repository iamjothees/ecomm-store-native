import { testProducts } from "@/tests/data";
import { Product } from "@/features/products/models/productModel";

const products: Product[] = testProducts
.map((data: Record<string, any>) => {
    try {
        return new Product(data);
    } catch (error) {
        console.error("Invalid product:", data, error);
        return null;
    }
})
.filter((p: Product): p is Product => p !== null);


const fetchProducts = ({ endPoint = '', filterProducts = () => true, currentPage = 1 }: { endPoint?: string; filterProducts?: (product: Product) => boolean; currentPage?: number }): Promise<Product[]> => (
    // const resultProducts = import.meta.env.VITE_STORE_NAME;
    new Promise((resolve) => {
        const pageSize = 4;
        setTimeout( () => resolve(products.slice((currentPage - 1) * pageSize, pageSize * currentPage).filter(filterProducts)), 100 );
    })
);

const fetchProduct = ({ slug = null }: { slug: string | null }): Promise<Product | null> => {
    if (slug === null) return Promise.resolve(null);

    return new Promise((resolve) => {
        const product = products.find((product) => product.slug === slug);
        
        setTimeout(() => resolve(product ?? null), 1000);
    });
};

const fetchFeaturedProducts = (): Promise<Product[]> => (
    new Promise((resolve) => {
        setTimeout(() => resolve(products), 100);
    })
);

const fetchRecentlyViewedProducts = (): Promise<Product[]> => (
    new Promise((resolve) => {
        setTimeout(() => resolve(products), 100);
    })
);

const searchProducts = ({ searchQuery }: { searchQuery: string }): Promise<Product[]> => (
    new Promise((resolve, reject) => {
        if (!searchQuery) {
            reject("Search query is empty");
            return;
        }
        setTimeout(
            () => resolve( products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()) ) )
            , 100
        );
    })
);

export { fetchProducts, fetchProduct, fetchFeaturedProducts, fetchRecentlyViewedProducts, searchProducts, };
