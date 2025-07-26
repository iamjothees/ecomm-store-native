import { testProducts } from "@/tests/data";

const fetchProducts = ({ endPoint, currentPage = 1 }) => (
    new Promise((resolve) => {
        const pageSize = 4;
        setTimeout( () => resolve( [...testProducts].slice((currentPage-1) * (pageSize), pageSize*currentPage) ), 2000);
    })
);


const fetchProduct = ({slug = null}) => { // Product or null
    // if (import.meta.env.MODE === "development") slug = "trendy-denim-jacket";
    if (slug === null) return null;

    return new Promise((resolve) => {
        const product = testProducts.find((product) => product.slug === slug);
        setTimeout(() => product ? resolve(product) : resolve(null), 2000);
    });
}

const fetchFeaturedProducts = () => (
    new Promise((resolve) => {
        setTimeout(() => resolve(testProducts), 2000);
    })
);

const fetchRecentlyViewedProducts = () => (
    new Promise((resolve) => {
        setTimeout(() => resolve(testProducts), 2000);
    })
);

const searchProducts = ({ searchQuery }) => (
    new Promise((resolve, reject) => {
        if (!searchQuery) reject("Search query is empty");
        setTimeout(
            () => resolve(testProducts.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase())))
        , 2000);
    })
);

export { fetchProducts, fetchProduct, fetchFeaturedProducts, fetchRecentlyViewedProducts, searchProducts };
