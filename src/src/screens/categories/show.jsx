import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { show } from '@/features/services/categoryService';
import useScreenContext from "@/contexts/ScreenContext";
import SearchBar from "@/components/common/SearchBar";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import CategoryCard from "@/features/categories/components/Card";
import ExploreProducts from "@/features/products/components/Explore";
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

function Category() {
    const { screen, setScreen } = useScreenContext();
    const { slug } = useParams();
    const [category, setCategory] = useState(null);

    const [search, setSearch] = useState('');

    const handleSearchChange = (value) => {
        setSearch(value);
    }

    useEffect(() => {
        setScreen({ loading: true });
        show({ slug }).then(category => setCategory(category))
            .finally(() => setScreen({ loading: false }));
    }, [slug]);

    useEffect(() => { 
        if (category === null) return
        setScreen({ screenTitle: category.name }); 
    }, [category]);

    if (screen.loading || category === null) return <ScreenSkeleton />;

    return (
        <section className="flex-1 flex flex-col gap-3 pt-18">
            <header className='w-full px-4'>
                <SearchBar placeholder={`Search Products or Categories in ${category.name}`} value={search} onChange={handleSearchChange} />
            </header>
            <main className='flex-1 flex flex-col gap-3'>
                <Hero category={category} />
                <SubCategories categories={category.subCategories} />
                <ExploreCategoryProducts category={category} />
            </main>
        </section>
    )
}

export default Category

const Hero = ({ category }) => {
    const [contents, setContents] = useState(null);

    useEffect(() => {
        setContents(category.contents || []);
    }, [category]);

    if (contents === null) return <></>;
    
    if (contents.length === 0) return <></>;

    return (
        <section className="w-full h-50 flex flex-col">
            <main className="grow flex gap-3 py-3 scroll-horizontal">
                {
                    contents.map((content) => (
                        <div key={Math.random()} className="grow shrink-0 h-full w-screen snap-center flex justify-center">
                            <ImageWithFallback 
                                key={Math.random()}
                                src={content.src}
                                className="h-full max-w-[98%] bg-card rounded-lg object-cover"
                            />
                            {/* <div className="h-full max-w-[98%] bg-card rounded-lg object-cover w-[500px] mx-2 bg-primary-300" /> */}
                        </div>
                    ))
                }
            </main>
            <footer>
                <div className="flex gap-3 justify-center">
                    {
                        contents.map((content, index) => (
                            <div key={Math.random()} 
                                className={cn("h-2 bg-primary-800 rounded-full my-1", index === 1 ? "w-5" : "w-2")} 
                            />
                        ))
                    }
                </div>
            </footer>
        </section>
    )
}

const SubCategories = ({ categories }) => {

    if (categories.length === 0) return <></>;

    const navigate = useNavigate();
    const handleCategoryClick = ({ slug }) => {
        navigate(`/categories/${slug}`);
    }

    if (categories.length === 0) return <></>;

    return (
        <section className="flex flex-col gap-2 px-4">
            <header>
                <p className="font-bold text-center">Explore</p>
            </header>
            <main>
                <ul className="grid grid-cols-3 md:grid-cols-6 flex-wrap justify-around md:justify-start gap-2 space-y-2">
                    {
                        (
                            categories.map((category) => (
                                <li key={category.id}>
                                    <CategoryCard key={category.id} category={category} onClick={handleCategoryClick} />
                                </li>
                            ))
                        )
                    }
                </ul>
            </main>
        </section>
    );
};

const ExploreCategoryProducts = ({ category }) => {
    return (
        <section className='p-2'>
            <ExploreProducts config={{ apiEndpoint: `/categories/${category.slug}/products`, title: "Explore Products" }} />
        </section>
    );

}

const ScreenSkeleton = () => {
    return (
        <section className="flex-1 flex flex-col gap-3 pt-18">
            <header className='w-full px-4'>
                <Skeleton className="h-10 w-full rounded-md" />
            </header>

            <main className='flex-1 flex flex-col gap-3'>
                {/* Hero Skeleton */}
                <section className="w-full h-50 flex flex-col">
                    <main className="grow flex gap-3 py-3 scroll-horizontal overflow-x-auto">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="grow shrink-0 h-full w-screen snap-center flex justify-center">
                                <Skeleton className="h-full max-w-[98%] w-full rounded-lg" />
                            </div>
                        ))}
                    </main>
                    <footer>
                        <div className="flex gap-3 justify-center">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <Skeleton key={i} className="h-2 w-2 rounded-full" />
                            ))}
                        </div>
                    </footer>
                </section>

                {/* SubCategories Skeleton */}
                <section className="flex flex-col gap-2 px-4">
                    <header>
                        <Skeleton className="h-4 w-24 mx-auto rounded-md" />
                    </header>
                    <main>
                        <ul className="grid grid-cols-3 md:grid-cols-6 gap-2">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <li key={i}>
                                    <Skeleton className="w-full aspect-square rounded-md" />
                                </li>
                            ))}
                        </ul>
                    </main>
                </section>

                {/* Explore Products Skeleton */}
                <section className='p-2 flex flex-col gap-2'>
                    <Skeleton className="h-5 w-32 rounded" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="aspect-[2/3] w-full rounded-md" />
                        ))}
                    </div>
                </section>
            </main>
        </section>
    );
}
