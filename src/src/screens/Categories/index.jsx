import { useContext, useEffect, useState } from "react";
import ScreenContext from "@/contexts/ScreenContext";
import { Button } from "@/components/ui/button"
import SearchBar from "@/components/common/SearchBar";
import { index } from '@/services/categoryService';
import ExploreProducts from "@/features/products/components/Explore";
import { useNavigate } from "react-router";
import CategoryCard from "@/features/categories/components/Card";

function Categories() {
    const { screen, setScreen } = useContext(ScreenContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [ categories, setCategories ] = useState({
        featured: [],
        all: [],
    });
    const [ products, setProducts ] = useState([]);

    let navigate = useNavigate();

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    }

    const handleCategoryClick = (event) => {
        const { slug } = event.currentTarget.dataset;
        navigate(`/categories/${slug}`);
    }

    useEffect(() => { setScreen({ screenTitle: "Categories" }); }, []);

    useEffect(() => {
        setScreen({ loading: true });
        index()
            .then(({featured, all}) => setCategories({featured, all}))
            .finally(() => setScreen({ loading: false }));
    }, []);

    return (
        <section className="flex-1 flex flex-col gap-3 pt-18 px-4">
            <header>
                <SearchBar onChange={handleSearchChange} value={searchTerm} />
            </header>
            <main>
                <section>
                    {
                        searchTerm && (
                            <header className="flex gap-2 justify-center align-center">
                                <p className="font-bold text-center">Search Results for "{searchTerm}"</p>
                                <Button variant="link">Clear</Button>
                            </header>
                        )
                    }
                    <main className="flex flex-col gap-5">
                        {/* Featured Categories */}
                        <section className="flex flex-col gap-2">
                            <header>
                                <p className="font-bold text-center">Explore</p>
                            </header>
                            <main>
                                <ul className="grid grid-cols-3 md:grid-cols-6 flex-wrap justify-around md:justify-start gap-2 space-y-2">
                                    {
                                        screen.loading 
                                            ? (
                                                [...Array(4)].map((_, i) => (
                                                    <li key={i}>
                                                        <CategoryCard />
                                                    </li>
                                                ))
                                            )
                                            : (
                                                categories.featured.map((category) => (
                                                    <li key={category.id} data-slug={category.slug} onClick={handleCategoryClick}>
                                                        <CategoryCard key={category.id} category={category} />
                                                    </li>
                                                ))
                                            )
                                    }
                                </ul>
                            </main>
                        </section>

                        {/* All Categories */}
                        <section className="flex flex-col gap-2">
                            <main className="flex flex-col gap-5">
                                <section>
                                    <main>
                                        <ul className="flex flex-col gap-2">
                                            {
                                                categories.all.filter(category => category.subCategories.length > 0).map((category) => (
                                                    <li key={category.id}>
                                                        <p className="text-sm font-bold">{category.name}</p>
                                                        <ul className="mt-1 flex flex-wrap justify-start gap-2 space-y-2">
                                                            {
                                                                screen.loading 
                                                                    ? (
                                                                        [...Array(4)].map((_, index) => (
                                                                            <li key={index}>
                                                                                <CategoryCard />
                                                                            </li>
                                                                        ))
                                                                    )
                                                                    : (
                                                                        category.subCategories.map((category) => (
                                                                            <li key={category.id}>
                                                                                <CategoryCard key={category.id} category={category} />
                                                                            </li>
                                                                        ))
                                                                    )
                                                            }
                                                        </ul>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </main>
                                </section>
                                {/* All Other Categories */}
                                {
                                    categories.all.filter(category => Boolean(category.subCategories?.length > 0) === false).length > 0 &&
                                    <section className="flex flex-col gap-2">
                                        <header>
                                            <p className="font-bold text-center">All Other Categories</p>
                                        </header>
                                        <main>
                                            <ul className="grid grid-cols-3 md:grid-cols-6 flex-wrap justify-around md:justify-start gap-2 space-y-2">
                                                {
                                                    categories.all.filter(category => Boolean(category.subCategories?.length > 0) === false)
                                                        .map((category) => (
                                                            <li key={category.id}>
                                                                <CategoryCard key={category.id} category={category} />
                                                            </li>
                                                    ))
                                                }
                                            </ul>
                                        </main>
                                    </section>
                                }
                            </main>
                        </section>

                        {/* Explore Products */}
                        <ExploreProducts products={products} config={{ title: "Explore Products" }} />
                    </main>
                </section>
            </main>
        </section>
    )
}

export default Categories