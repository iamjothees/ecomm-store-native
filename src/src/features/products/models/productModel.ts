// models/product.ts

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

interface RelatedProduct {
	slug: string;
	name: string;
	price: number;
	featured_image: {
		uri: string;
	};
}

export class Product {
	id: string;
	slug: string;
	name: string;
	description: string;
	price: number;
	mrp: number;
	featured_image: { uri: string };
	media: ProductMedia[];
	variants: ProductVariant[];
	info_tags: ProductInfoTag[];
	specs: ProductSpec[];
	faqs: ProductFAQ[];
	relatedProducts: RelatedProduct[];

	constructor(data: Record<string, any>) {
		if (typeof data.id !== 'string') throw new Error("Invalid or missing 'id'");
		if (typeof data.slug !== 'string') throw new Error("Invalid or missing 'slug'");
		if (typeof data.name !== 'string') throw new Error("Invalid or missing 'name'");
		if (typeof data.description !== 'string') throw new Error("Invalid or missing 'description'");
		if (typeof data.price !== 'number') throw new Error("Invalid or missing 'price'");
		if (typeof data.mrp !== 'number') throw new Error("Invalid or missing 'mrp'");
		if (!data.featured_image || typeof data.featured_image.uri !== 'string') {
		throw new Error("Invalid or missing 'featured_image.uri'");
		}
		
		if (!Array.isArray(data.media) || !data.media.every(m => typeof m.url === 'string' && (m.type === 'image' || m.type === 'video')))
		throw new Error("Invalid or missing 'media'");
		if (!Array.isArray(data.variants) || !data.variants.every(v => typeof v.name === 'string' && Array.isArray(v.values)))
		throw new Error("Invalid or missing 'variants'");
		if (!Array.isArray(data.info_tags) || !data.info_tags.every(t => typeof t.icon === 'string' && typeof t.label === 'string'))
		throw new Error("Invalid or missing 'info_tags'");
		if (!Array.isArray(data.specs) || !data.specs.every(s => typeof s.label === 'string' && typeof s.value === 'string'))
		throw new Error("Invalid or missing 'specs'");
		if ( (Boolean(data.faqs) === false) || !Array.isArray(data.faqs) || !data.faqs.every(f => typeof f.question === 'string' && typeof f.answer === 'string'))
		throw new Error("Invalid or missing 'faqs'");
		if (!Array.isArray(data.relatedProducts) || !data.relatedProducts.every(p => typeof p.slug === 'string' && typeof p.name === 'string' && typeof p.price === 'number' && p.featured_image && typeof p.featured_image.uri === 'string'))
		throw new Error("Invalid or missing 'relatedProducts'");

		this.id = data.id;
		this.slug = data.slug;
		this.name = data.name;
		this.description = data.description;
		this.price = data.price;
		this.mrp = data.mrp;
		this.featured_image = data.featured_image;
		this.media = data.media;
		this.variants = data.variants;
		this.info_tags = data.info_tags;
		this.specs = data.specs;
		this.faqs = data.faqs;
		this.relatedProducts = data.relatedProducts;
	}
}
