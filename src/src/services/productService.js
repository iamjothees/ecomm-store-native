import { testProducts } from "@/tests/data";

const fetchProducts = ({ endPoint, currentPage = 1 }) => (
    new Promise((resolve) => {
        const pageSize = 4;
        setTimeout( () => resolve( [...testProducts].slice((currentPage-1) * (pageSize), pageSize*currentPage) ), 2000);
    })
);

export { fetchProducts };