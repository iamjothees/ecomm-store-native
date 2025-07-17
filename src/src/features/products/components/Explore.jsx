

import { testProducts } from "@/tests/data";
import { useEffect, useState } from "react";
import ProductCard from "@/features/products/components/Card";
import { useInView } from "react-intersection-observer";
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
    const [page, setPage] = useState({
        current: 1,
        loading: false,
        error: false,
        endReached: false
    });

    const { ref, inView } = useInView({ threshold: 0.6, });

    // TODO: Move to API
    const fetchProducts = () => (
        new Promise((resolve) => {
            const pageSize = 4;
            setTimeout(
                () => {
                    resolve( [...testProducts].slice((page.current-1) * (pageSize), pageSize*page.current) );
                }
            , 2000);
        })
    );

    useEffect(() => {
        setPage({...page, current: 1, endReached: false, loading: true});
        fetchProducts()
            .then( (products) => setProducts(products) )
            .finally(() => setPage({...page, loading: false}));
    }, [config.apiEndpoint]);

    useEffect(() => {
        if (!inView) return;

        setPage({...page, current: page.current + 1});
    }, [inView]);

    useEffect(() => {
        if (page.current === 1) return;
        if (page.loading) return;
        if (page.endReached) return;
        console.log("loading more");
        

        setPage({...page, loading: true});
        fetchProducts()
            .then((newProducts) => {
                if (newProducts.length === 0) return newProducts;
                
                setProducts((current) => [...current, ...newProducts]);
                return newProducts;
            })
            .then((newProducts) => {
                if (newProducts?.length === 0){
                    setPage({...page, current: page.current - 1, endReached: true, loading: false});
                    return;
                }
                setPage({...page, loading: false})
            });
    }, [page.current]);

    return (
        <section className="flex-1 flex flex-col gap-3">
            <header>
                <p className="font-bold text-center">{config.title}</p>
            </header>
            <main>
                <ul className="grid grid-cols-2 gap-3">
                    {products.map((product) => (
                        <li key={product.id}>
                            <ProductCard key={product.id} product={product} />
                        </li>
                    ))}
                    {
                        page.loading ? (
                            <li className="col-span-2 text-center py-4 text-muted-foreground flex justify-center items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Loading...</span>
                            </li>
                        ) : page.endReached ? (
                            <li className="col-span-2 text-center py-4 text-sm text-muted-foreground italic">
                                Hey, you've reached the end.
                            </li>
                        ) : (
                            <li ref={ref} className="col-span-2 text-center py-4 text-primary-600 cursor-pointer hover:underline transition-all">
                                See more...
                            </li>
                        )
                    }
                </ul>
            </main>
        </section>
    )
}

export default Explore