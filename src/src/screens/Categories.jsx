import { useContext, useEffect, useState } from "react";
import ScreenContext from "@/contexts/ScreenContext";
import { Button } from "@/components/ui/button"
import SearchBar from "@/components/common/SearchBar";
import { testCategories } from "@/tests/data";

function Categories() {
    const { setScreen } = useContext(ScreenContext);
    const [searchTerm, setSearchTerm] = useState("");

    const [ categories, setCategories ] = useState({
        featured: [...testCategories].slice(0, 4),
        all: testCategories,
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
                    <main>
                        <section className="flex flex-col gap-2">
                            <header>
                                <p className="font-bold text-center">Explore</p>
                            </header>
                            <main>
                                <ul className="flex flex-wrap justify-between gap-2">
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

                    </main>
                </section>
            </main>
        </section>
    )
}

export default Categories

const Category = ({ category }) => {
    return (
        <div className="w-24 rounded-lg bg-card relative">
            <img src={category.imageSrc} className="w-full aspect-square rounded-lg" />
            <p className="absolute bottom-1 right-1 text-end text-sm font-semibold text-white">{category.name}</p>
        </div>
    );
}