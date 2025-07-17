import { useContext, useEffect, useState } from "react";
import ScreenContext from "@/contexts/ScreenContext";
import { Button } from "@/components/ui/button"
import SearchBar from "@/components/common/SearchBar";
import { testCategories } from "@/tests/data";
import ExploreProducts from "@/features/products/components/Explore";

function Categories() {
    const { setScreen } = useContext(ScreenContext);
    const [searchTerm, setSearchTerm] = useState("");

    const [ categories, setCategories ] = useState({
        featured: [...testCategories].slice(0, 8),
        all: testCategories.sort((category, nextCategory) => nextCategory.subCategories.length - category.subCategories.length),
    });

    const [ products, setProducts ] = useState([]);

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    }

    useEffect(() => { setScreen({ screenTitle: "Categories" }); }, []);

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
                                <ul className="flex flex-wrap justify-around md:justify-start gap-2 space-y-2">
                                    {
                                        categories.featured.map((category) => (
                                            <li key={category.id}>
                                                <Category key={category.id} category={category} />
                                            </li>
                                        ))
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
                                                                category.subCategories.map((category) => (
                                                                    <li key={category.id}>
                                                                        <Category key={category.id} category={category} />
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </main>
                                </section>
                                {/* All Other Categories */}
                                <section className="flex flex-col gap-2">
                                    <header>
                                        <p className="font-bold text-center">All Other Categories</p>
                                    </header>
                                    <main>
                                        <ul className="flex flex-wrap justify-around md:justify-start gap-2 space-y-2">
                                            {
                                                categories.all.filter(category => Boolean(category.subCategories?.length > 0) === false)
                                                    .map((category) => (
                                                        <li key={category.id}>
                                                            <Category key={category.id} category={category} />
                                                        </li>
                                                ))
                                            }
                                        </ul>
                                    </main>
                                </section>
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

const Category = ({ category }) => {
    return (
        <div className="w-24 md:w-36 rounded-lg bg-card flex flex-col gap-1">
            <img src={category.imageSrc} className="w-full aspect-square rounded-lg" />
            <p className="text-sm truncate px-2 py-0.5">{category.name}</p>
        </div>
    );
}