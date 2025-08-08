import mediaType from "@/constants/enums/mediaType";
import products from "@/tests/products.json";
import categories from "@/tests/categories.json";
import users from "@/tests/users.json";

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
