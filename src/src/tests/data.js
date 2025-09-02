import products from "@/tests/products.json";
import categories from "@/tests/categories.json";
import users from "@/tests/users.json";
import orders from "@/tests/orders.json";
import homeScreenContents from '@/tests/homeScreenContents.json';


import { Category } from "@/features/categories/models/CategoryModel";

const testCategories = categories.map(cat => new Category(cat));

const getRandomCategory = () => {
    const randomIndex = Math.floor(Math.random() * testCategories.length);
    return testCategories[randomIndex];
};

const testProducts = products.map(product => ({
    ...product,
    category: getRandomCategory()
}));

export { testCategories };
export { testProducts };
export { users as testUsers };
export { orders as testOrders };
export { homeScreenContents as testHomeScreenContents };