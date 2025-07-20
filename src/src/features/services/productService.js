import { testProducts } from "@/tests/data";

const fetchProducts = ({ endPoint, currentPage = 1 }) => (
    new Promise((resolve) => {
        const pageSize = 4;
        setTimeout( () => resolve( [...testProducts].slice((currentPage-1) * (pageSize), pageSize*currentPage) ), 2000);
    })
);


const fetchProduct = ({slug = null}) => { // Product or null
    if (import.meta.env.MODE === "development") slug = "apsara-pencils";
    if (slug === null) return null;

    return new Promise((resolve) => {
        setTimeout(() => resolve(testProducts.find(product => product.slug === slug)), 2000);
    });

}

export { fetchProducts, fetchProduct };