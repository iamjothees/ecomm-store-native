interface Media {
	type: 'image' | 'video';
	url: string;
}

export interface CategoryData {
    id: number;
    name: string;
    slug: string;
    featuredImage?: Media;
    parent?: Category | null;
    subCategories?: CategoryData[];
    contents?: Media[];
}

export class Category {
    id: number;
    name: string;
    slug: string;
    featuredImage?: Media;
    parent: Category | null;
    subCategories: Category[];
    contents: Media[];

    constructor(data: CategoryData) {
        if (typeof data.id !== 'number') throw new Error("Invalid or missing 'id'");
        if (typeof data.name !== 'string') throw new Error("Invalid or missing 'name'");
        if (typeof data.slug !== 'string') throw new Error("Invalid or missing 'slug'");

        this.id = data.id;
        this.name = data.name;
        this.slug = data.slug;
        this.featuredImage = data.featuredImage;
        this.parent = data.parent || null;
        this.subCategories = data.subCategories ? data.subCategories.map(sub => new Category(sub)) : [];
        this.contents = data.contents || [];
    }
}
