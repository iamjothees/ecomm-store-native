// models/product.ts

import { Category } from "@/features/categories/models/CategoryModel";

interface ProductVariant {
	name: string;
	values: string[];
}

interface ProductMedia {
	type: 'image' | 'video';
	url: string;
}

interface ProductInfoTag {
	icon: string;
	label: string;
}

interface ProductSpec {
	label: string;
	value: string;
}

interface ProductFAQ {
	question: string;
	answer: string;
}

export class Product {
	id: string;
	slug: string;
	name: string;
	category: Category;
	description: string;
	price: number;
	mrp: number;
	featured_image?: { uri: string };
	media: ProductMedia[];
	info_tags: ProductInfoTag[];
	specs: ProductSpec[];
	faqs: ProductFAQ[];
	variants: ProductVariant[];

	constructor(data: Record<string, any>) {
		if (typeof data.id !== 'string' || data.id.trim() === '') throw new Error("Invalid or missing 'id'");
		if (typeof data.slug !== 'string' || data.slug.trim() === '') throw new Error("Invalid or missing 'slug'");
		if (typeof data.name !== 'string' || data.name.trim() === '') throw new Error("Invalid or missing 'name'");
		if (!data.category || typeof data.category !== 'object') throw new Error("Invalid or missing 'category'");
		if (typeof data.price !== 'number') throw new Error("Invalid or missing 'price'");
		if (typeof data.mrp !== 'number') throw new Error("Invalid or missing 'mrp'");

		this.id = data.id;
		this.slug = data.slug;
		this.name = data.name;
		this.category = new Category(data.category);
		this.price = data.price;
		this.mrp = data.mrp;


		// description
		this.description = typeof data.description === 'string' ? data.description : '';

		// featured_image
		if (data.featured_image && (typeof data.featured_image !== 'object' || typeof data.featured_image.uri !== 'string')) {
			throw new Error("Invalid 'featured_image.uri'");
		}
		this.featured_image = data.featured_image;

		// media
		if (data.media && (!Array.isArray(data.media) || !data.media.every(m => m && typeof m.url === 'string' && (m.type === 'image' || m.type === 'video')))) {
			throw new Error("Invalid 'media' property. It should be an array of {type: 'image'|'video', url: string}");
		}
		this.media = data.media || [];

		// variants
		if (data.variants && (!Array.isArray(data.variants) || !data.variants.every(v => v && typeof v.name === 'string' && Array.isArray(v.values)))) {
			throw new Error("Invalid 'variants' property. It should be an array of {name: string, values: string[]}");
		}
		this.variants = data.variants || [];

		// info_tags
		if (data.info_tags && (!Array.isArray(data.info_tags) || !data.info_tags.every(t => t && typeof t.icon === 'string' && typeof t.label === 'string'))) {
			throw new Error("Invalid 'info_tags' property. It should be an array of {icon: string, label: string}");
		}
		this.info_tags = data.info_tags || [];

		// specs
		if (data.specs && (!Array.isArray(data.specs) || !data.specs.every(s => s && typeof s.label === 'string' && typeof s.value === 'string'))) {
			throw new Error("Invalid 'specs' property. It should be an array of {label: string, value: string}");
		}
		this.specs = data.specs || [];

		// faqs
		if (data.faqs && (!Array.isArray(data.faqs) || !data.faqs.every(f => f && typeof f.question === 'string' && typeof f.answer === 'string'))) {
			throw new Error("Invalid 'faqs' property. It should be an array of {question: string, answer: string}");
		}
		this.faqs = data.faqs || [];
	}

	static fromJson(json: Record<string, any>): Product {
		return new Product(json);
	}
}
