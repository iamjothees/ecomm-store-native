import { Product } from '@/features/products/models/productModel';

export class CartItem extends Product {
    quantity: number;
    selectedVariants: Record<string, string>;

    constructor(data: Record<string, any>) {
        super(data);
        if (typeof data.quantity !== 'number') throw new Error("Invalid or missing 'quantity'");
        if (typeof data.selectedVariants !== 'object') throw new Error("Invalid or missing 'selectedVariants'");

        this.quantity = data.quantity;
        this.selectedVariants = data.selectedVariants;
    }
}
