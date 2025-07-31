import { testCategories } from "@/tests/data";

const index = () => (
    new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                featured: [...testCategories].slice(0, 8),
                all: testCategories.sort((category, nextCategory) => nextCategory.subCategories.length - category.subCategories.length),
            });

        }, 100);
    })
);

const show = ({ slug }) => (
    new Promise((resolve) => {
        if (Boolean(slug) === false) return resolve(null);
        setTimeout(() => {
            resolve(testCategories.find(category => category.slug === slug));
        }, 100);
    })
);

const fetchFeaturedCategories = () => (
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(testCategories.slice(3, 10));
        }, 100);
    })
);

const searchCategories = ({ searchQuery }) => (
    new Promise((resolve, reject) => {
        if (!searchQuery) reject("Search query is empty");
        setTimeout(
            () => resolve(testCategories.filter(category => category.name.toLowerCase().includes(searchQuery.toLowerCase())))
        , 100);
    })
);

export { index, show, fetchFeaturedCategories, searchCategories };
