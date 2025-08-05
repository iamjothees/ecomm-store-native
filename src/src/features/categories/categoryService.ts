import { testCategories } from "@/tests/data";
import { Category } from "./models/CategoryModel";

const categories: Category[] = testCategories.map(data => new Category(data));

const index = () => (
    new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                featured: [...categories].slice(0, 8),
                all: categories.sort((category, nextCategory) => nextCategory.subCategories.length - category.subCategories.length),
            });

        }, 100);
    })
);

const show = ({ slug }: { slug: string }) => (
    new Promise((resolve) => {
        if (Boolean(slug) === false) return resolve(null);
        setTimeout(() => {
            let category = undefined;
            let categoriesToSearch = [...categories];
            while (category === undefined) {
                category = categoriesToSearch.find(category => category.slug === slug);
                categoriesToSearch = categoriesToSearch.flatMap(category => category.subCategories);
            }
            return resolve(category);
        }, 100);
    })
);

const fetchFeaturedCategories = () => (
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(categories.slice(0, 8));
        }, 100);
    })
);

const searchCategories = ({ searchQuery }: { searchQuery: string }) => (
    new Promise((resolve, reject) => {
        if (!searchQuery) reject("Search query is empty");
        setTimeout(
            () => resolve(categories.filter(category => category.name.toLowerCase().includes(searchQuery.toLowerCase())))
        , 100);
    })
);

export { index, show, fetchFeaturedCategories, searchCategories };
