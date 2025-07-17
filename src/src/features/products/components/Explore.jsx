

import { testProducts } from "@/tests/data";
import { useEffect, useState } from "react";
import ProductCard from "@/features/products/components/Card";
import usePagination from "@/hooks/usePagination";
import { Loader2 } from "lucide-react"

// interface ExploreProps {
//     products: any,
//     config: {
//         title: string,
//         apiEndpoint: string,
//     }
// }

function Explore({ config = { title: "Explore Products", apiEndpoint: "/categories/products" } }) {
    const [products, setProducts] = useState([]);
    const { page, initiatePage, handlePageEndReached, handlePageLoading, handlePageLoaded, nextPageTrigger } = usePagination();

    // TODO: Move to API
    const fetchProducts = () => (
        new Promise((resolve) => {
            const pageSize = 4;
            setTimeout( () => resolve( [...testProducts].slice((page.current-1) * (pageSize), pageSize*page.current) ), 2000);
        })
    );

    useEffect(() => {
        initiatePage();
    }, [config.apiEndpoint]);

    useEffect(() => {
        if (page.current === null) return;
        if (page.loading) return;
        if (page.endReached) return;
        

        handlePageLoading();
        fetchProducts()
            .then((newProducts) => {
                if (newProducts.length === 0) return newProducts;
                
                setProducts((current) => [...current, ...newProducts]);
                return newProducts;
            })
            .then((newProducts) => {
                if (newProducts.length === 0){
                    handlePageEndReached();
                    return;
                }
                handlePageLoaded();
            });
    }, [page.current]);

    return (
        <section className="flex-1 flex flex-col gap-3">
            <header>
                <p className="font-bold text-center">{config.title}</p>
            </header>
            <main>
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {products.map((product) => (
                        <li key={product.id}>
                            <ProductCard key={product.id} product={product} />
                        </li>
                    ))}
                    {
                        page.loading 
                            ? (
                                [...Array(4).keys()].map((i) => (
                                    <li key={i}>
                                        <ProductCard />
                                    </li>
                                ))
                            ) 
                            : (
                                page.endReached 
                                    ? (
                                        <li className="col-span-full text-center py-4 text-sm text-muted-foreground italic">
                                            Hey, you've reached the end.
                                        </li>
                                    ) 
                                    : (
                                        <li ref={nextPageTrigger} className="col-span-full text-center py-4 text-primary-600 cursor-pointer hover:underline transition-all">
                                            See more...
                                        </li>
                                    )
                            )
                    }
                </ul>
            </main>
        </section>
    )
}

export default Explore