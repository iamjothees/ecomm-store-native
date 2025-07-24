import { useEffect, useState } from "react";
import useScreenContext from "@/contexts/ScreenContext";
import { Button } from "@/components/ui/button"
import SearchBar from "@/components/common/SearchBar";
import { index } from '@/features/categories/categoryService';
import ExploreProducts from "@/features/products/components/Explore";
import { useNavigate } from "react-router";
import CategoryCard from "@/features/categories/components/Card";
import { Skeleton } from "@/components/ui/skeleton";

function Categories() {
    const { screen, setScreen } = useScreenContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [ categories, setCategories ] = useState({
        featured: [],
        all: [],
    });

    let navigate = useNavigate();

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    }

    const handleCategoryClick = ({ slug }) => {
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
                        <FeaturedCategories categories={categories.featured} onClick={handleCategoryClick} screen={screen} />

                        {/* All Categories */}
                        <AllCategories categories={categories.all} handleCategoryClick={handleCategoryClick} screen={screen} />

                        {/* Explore Products */}
                        <ExploreProducts config={{ title: "Explore Products" }} />
                    </main>
                </section>
            </main>
        </section>
    );
}

export default Categories

const FeaturedCategories = ({ categories, onClick, screen }) => {
    return (
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
                                categories.map((category) => (
                                    <li key={category.slug}>
                                        <CategoryCard key={category.slug} category={category} onClick={onClick} />
                                    </li>
                                ))
                            )
                    }
                </ul>
            </main>
        </section>
    );
}


const AllCategories = ({ categories, handleCategoryClick, screen }) => {

    if (screen.loading) return (
        <section className="flex flex-col gap-2 mt-5">
            <main className="flex flex-col gap-5">
                <Skeleton className="h-3 w-40 bg-primary-600 rounded-lg" />
                <ul className="flex flex-wrap gap-2">
                    {
                        [...Array(4)].map((_, i) => (
                            <li key={i} className="w-1/4">
                                <CategoryCard />
                            </li>
                        ))
                    }
                </ul>
            </main>
        </section>
    );

    return (
        <section className="flex flex-col gap-2 mt-5">
            <main className="flex flex-col gap-5">
                <section>
                    <main>
                        <ul className="flex flex-col gap-2">
                            {
                                categories.filter(category => category.subCategories.length > 0).map((category) => (
                                    <li key={category.id}>
                                        <p className="text-sm font-bold">{category.name}</p>
                                        <ul className="mt-1 flex flex-wrap justify-start gap-2 space-y-2">
                                            {
                                                (
                                                    category.subCategories.map((category) => (
                                                        <li key={category.id}>
                                                            <CategoryCard key={category.id} category={category} onClick={handleCategoryClick} />
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
                    categories.filter(category => Boolean(category.subCategories?.length > 0) === false).length > 0 &&
                    <section className="flex flex-col gap-2">
                        <header>
                            <p className="font-bold text-center">All Other Categories</p>
                        </header>
                        <main>
                            <ul className="grid grid-cols-3 md:grid-cols-6 flex-wrap justify-around md:justify-start gap-2 space-y-2">
                                {
                                    categories.filter(category => Boolean(category.subCategories?.length > 0) === false)
                                        .map((category) => (
                                            <li key={category.id}>
                                                <CategoryCard key={category.id} category={category} onClick={handleCategoryClick} />
                                            </li>
                                    ))
                                }
                            </ul>
                        </main>
                    </section>
                }
            </main>
        </section>
    )
}