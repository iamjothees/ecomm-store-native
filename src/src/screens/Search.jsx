import { useState, useEffect } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import useScreenContext from '@/contexts/ScreenContext';
import ProductCard from '@/features/products/components/Card';
import CategoryCard from "@/features/categories/components/Card";
import SearchBar from "@/components/common/SearchBar";
import { searchProducts } from '../features/products/productService';
import { searchCategories } from '../features/categories/categoryService';

const mockTags = ['Summer', 'Winter', 'Casual', 'Formal', 'Sportswear', 'Party Wear'];

function SearchScreen() {
    const { defaultScreen, screen, setScreen } = useScreenContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [searchResults, setSearchResults] = useState({
        categories: [],
        products: [],
        tags: [],
    });
    const loading = true;

    const handleSearchChange = (value) => setSearchTerm(value);

    const performSearch = (query) => (
        new Promise(async(resolve) => {
            const products = await searchProducts({ searchQuery: query });
            const categories = await searchCategories({ searchQuery: query });          
            const tags = mockTags.filter(tag => tag.toLowerCase().includes(query.toLowerCase()));

            if (products && categories && tags) resolve({ categories, products, tags });
        })
    );

    useEffect(() => setScreen(() => ({ ...defaultScreen, screenTitle: "Search" })), []);

    useEffect(() => {
        if (!searchTerm) {
            setSearchResults({ categories: [], products: [], tags: [], });
            return;
        };
        setScreen(() => ({ ...screen, loading: true }));
        performSearch(searchTerm)
            .then(results => setSearchResults(results))
            .finally(() => setScreen(() => ({ ...screen, loading: false })));
    }, [searchTerm]);

    return (
        <div className="flex flex-col h-full p-4 pt-18">
            <SearchBar placeholder="Find products by keywords" onChange={handleSearchChange} value={searchTerm} />

        {/* Search Results Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-3">
            <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-gray-100 rounded-lg">
                <TabsTrigger value="all" className="py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary rounded-md">All</TabsTrigger>
                <TabsTrigger value="categories" className="py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary rounded-md">Categories</TabsTrigger>
                <TabsTrigger value="products" className="py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary rounded-md">Products</TabsTrigger>
                <TabsTrigger value="tags" className="py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary rounded-md">Tags</TabsTrigger>
            </TabsList>

            {/* All Tab Content */}
            <TabsContent value="all" className="mt-4">
            {
                screen.loading 
                    ? <SearchSkeleton />
                    : (
                        <>
                            {
                            searchResults.categories.length > 0 
                                && (
                                    <section className="mb-6">
                                        <div className="flex justify-between items-center mb-3">
                                            <h2 className="text-lg font-semibold text-foreground">Categories</h2>
                                            <Button onClick={() => setActiveTab('categories')} variant="link" className="text-primary p-0 h-auto">
                                            See More <ChevronRight className="h-4 w-4 ml-1" />
                                            </Button>
                                        </div>
                                        <ScrollArea className="w-full whitespace-nowrap pb-2">
                                            <ul className="flex gap-3">
                                            {searchResults.categories.map(category => (
                                                <li className="w-24">
                                                    <CategoryCard key={category.id} category={category} />
                                                </li>
                                            ))}
                                            </ul>
                                            <ScrollBar orientation="horizontal" />
                                        </ScrollArea>
                                    </section>
                                )
                            }

                            {searchResults.products.length > 0 && (
                                <section className="mb-6">
                                <div className="flex justify-between items-center mb-3">
                                    <h2 className="text-lg font-semibold text-foreground">Products</h2>
                                    <Button onClick={() => setActiveTab('products')} variant="link" className="text-primary p-0 h-auto">
                                    See More <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {searchResults.products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                                </section>
                            )}

                            {searchResults.tags.length > 0 && (
                                <section className="mb-6">
                                <h2 className="text-lg font-semibold text-foreground mb-3">Tags</h2>
                                <div className="flex flex-wrap gap-2">
                                    {searchResults.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="px-3 py-1 rounded-full text-sm">
                                        {tag}
                                    </Badge>
                                    ))}
                                </div>
                                </section>
                            )}

                            {searchTerm.length > 0 && searchResults.categories.length === 0 && searchResults.products.length === 0 && searchResults.tags.length === 0 && (
                                <div className="text-center text-muted-foreground mt-8">No results found for "{searchTerm}"</div>
                            )}
                        </>
                    )
            }
            </TabsContent>

            <TabsContent value="categories" className="mt-4">
            {screen.loading ? (
                <SearchSkeleton type="categories" />
            ) : (
                <>
                {
                    searchResults.categories.length > 0 
                    ? (
                        <ul className="grid grid-cols-3 gap-4">
                            { searchResults.categories.map(category => ( <li className="w-24"> <CategoryCard key={category.id} category={category} /> </li> )) }
                        </ul>
                    ) 
                    : (
                        searchTerm.length > 0 && <div className="text-center text-muted-foreground mt-8">No categories found for "{searchTerm}"</div>
                    )
                }
                </>
            )}
            </TabsContent>

            {/* Products Tab Content */}
            <TabsContent value="products" className="mt-4">
            {screen.loading ? (
                <SearchSkeleton type="products" />
            ) : (
                <>
                {searchResults.products.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                    {searchResults.products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                    </div>
                ) : (
                    searchTerm.length > 0 && <div className="text-center text-muted-foreground mt-8">No products found for "{searchTerm}"</div>
                )}
                </>
            )}
            </TabsContent>

            {/* Tags Tab Content */}
            <TabsContent value="tags" className="mt-4">
            {screen.loading ? (
                <SearchSkeleton type="tags" />
            ) : (
                <>
                {searchResults.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                    {searchResults.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="px-3 py-1 rounded-full text-sm">
                        {tag}
                        </Badge>
                    ))}
                    </div>
                ) : (
                    searchTerm.length > 0 && <div className="text-center text-muted-foreground mt-8">No tags found for "{searchTerm}"</div>
                )}
                </>
            )}
            </TabsContent>

            {
                searchTerm === '' && (
                    <div className="mt-12 flex flex-col items-center justify-center text-center gap-2 text-muted-foreground">
                        <Search className="w-8 h-8 text-muted-foreground" />
                        <p className="text-sm font-medium">Start typing to search for products or categories</p>
                        <span className="text-xs text-muted-foreground">Try something like “Shoes”, “Laptops”, or “Accessories”</span>
                    </div>
                )
            }
        </Tabs>
        </div>
    );
}

export default SearchScreen;

    // Skeleton component for Search Screen
const SearchSkeleton = ({ type = 'all' }) => {
    if (type === 'categories') {
        return (
        <ul className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
                <li className="w-24">
                    <CategoryCard key={index} hideName />
                </li>
            ))}
        </ul>
        );
    } else if (type === 'products') {
        return (
        <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="w-full h-auto flex flex-col gap-1 rounded-lg p-0 shadow-md">
                <div className="grow-0 shrink-0 h-2/3 aspect-square p-0.5">
                <Skeleton className="h-full w-full rounded-sm bg-gray-200" />
                </div>
                <div className="grow flex flex-col justify-end px-2 py-0.5 gap-1">
                <Skeleton className="h-4 w-3/4 rounded-sm bg-gray-200" />
                <Skeleton className="h-3 w-1/2 rounded-sm bg-gray-200" />
                <Skeleton className="h-4 w-1/3 rounded-sm bg-gray-200" />
                </div>
            </Card>
            ))}
        </div>
        );
    } else if (type === 'tags') {
        return (
        <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-24 rounded-full bg-gray-200" />
            ))}
        </div>
        );
    }
    // Default 'all' tab skeleton
    return (
        <>
        <section className="mb-6">
            <Skeleton className="h-6 w-1/3 mb-3" />
            <ScrollArea className="w-full whitespace-nowrap pb-2">
            <ul className="flex gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                    <li className="w-24">
                        <CategoryCard key={index} />
                    </li>
                ))}
            </ul>
            </ScrollArea>
        </section>
        <section className="mb-6">
            <Skeleton className="h-6 w-1/3 mb-3" />
            <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => ( <ProductCard key={index} /> ))}
            </div>
        </section>
        <section className="mb-6">
            <Skeleton className="h-6 w-1/4 mb-3" />
            <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-8 w-20 rounded-full bg-gray-200" />
            ))}
            </div>
        </section>
        </>
    );
};
