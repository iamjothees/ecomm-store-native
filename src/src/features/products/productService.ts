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
.filter((p): p is Product => p !== null);


const fetchProducts = ({ endPoint, currentPage = 1 }: { endPoint?: string; currentPage?: number }): Promise<Product[]> => (
    new Promise((resolve) => {
        const pageSize = 4;
        setTimeout(
        () => resolve(products.slice((currentPage - 1) * pageSize, pageSize * currentPage)),
        2000
        );
    })
);

const fetchProduct = ({ slug = null }: { slug: string | null }): Promise<Product | null> => {
    if (slug === null) return Promise.resolve(null);

    return new Promise((resolve) => {
        const product = products.find((product) => product.slug === slug);
        setTimeout(() => resolve(product ?? null), 2000);
    });
};

const fetchFeaturedProducts = (): Promise<Product[]> => (
    new Promise((resolve) => {
        setTimeout(() => resolve(products), 2000);
    })
);

const fetchRecentlyViewedProducts = (): Promise<Product[]> => (
    new Promise((resolve) => {
        setTimeout(() => resolve(products), 2000);
    })
);

const searchProducts = ({ searchQuery }: { searchQuery: string }): Promise<Product[]> => (
    new Promise((resolve, reject) => {
        if (!searchQuery) {
        reject("Search query is empty");
        return;
        }
        setTimeout(
        () =>
            resolve(
            products.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            ),
        2000
        );
    })
);

export { fetchProducts, fetchProduct, fetchFeaturedProducts, fetchRecentlyViewedProducts, searchProducts, };
