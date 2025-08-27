import { AddressModel } from '../users/models/AddressModel';
import { Cart } from './models/CartModel';
import { CartItem } from './models/CartItemModel';

const getCart = (): Cart => {
    const cart = localStorage.getItem('cart');
    if (cart) {
        const parsedCart = JSON.parse(cart);
        return new Cart(parsedCart.items.map((item: any) => new CartItem(item)));
    }
    return new Cart([]);
};

const saveCart = (cart: Cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const addToCart = (item: CartItem): Cart => {
    const cart = getCart();
    const existingItem = cart.items.find((cartItem) => cartItem.id === item.id && JSON.stringify(cartItem.selectedVariants) === JSON.stringify(item.selectedVariants));

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push(new CartItem({ ...item, quantity: 1 }));
    }

    saveCart(cart);
    return cart;
};

export const removeFromCart = (item: CartItem): Cart => {
    const cart = getCart();
    cart.items = cart.items.filter((cartItem) => !(cartItem.id === item.id && JSON.stringify(cartItem.selectedVariants) === JSON.stringify(item.selectedVariants)));
    saveCart(cart);
    return cart;
};

export const incrementQuantity = (item: CartItem): Cart => {
    const cart = getCart();
    const existingItem = cart.items.find((cartItem) => cartItem.id === item.id && JSON.stringify(cartItem.selectedVariants) === JSON.stringify(item.selectedVariants));

    if (existingItem) {
        existingItem.quantity += 1;
    }

    saveCart(cart);
    return cart;
};

export const decrementQuantity = (item: CartItem): Cart => {
    let cart = getCart();
    const existingItem = cart.items.find((cartItem) => cartItem.id === item.id && JSON.stringify(cartItem.selectedVariants) === JSON.stringify(item.selectedVariants));

    if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity <= 0) {
            cart.items = cart.items.filter((cartItem) => !(cartItem.id === item.id && JSON.stringify(cartItem.selectedVariants) === JSON.stringify(item.selectedVariants)));
        }
    }

    saveCart(cart);
    return cart;
};

export const updateCartItemVariants = (originalItem: CartItem, newVariants: Record<string, string>): Cart => {
    let cart = getCart();

    // Remove the original item from the cart
    cart.items = cart.items.filter((cartItem) => !(cartItem.id === originalItem.id && JSON.stringify(cartItem.selectedVariants) === JSON.stringify(originalItem.selectedVariants)));

    // Create a new item with updated variants and original quantity
    const newItem = new CartItem({ ...originalItem, selectedVariants: newVariants });

    // Check if an item with the new variants already exists
    const existingItemWithNewVariants = cart.items.find((cartItem) => cartItem.id === newItem.id && JSON.stringify(cartItem.selectedVariants) === JSON.stringify(newItem.selectedVariants));

    if (existingItemWithNewVariants) {
        existingItemWithNewVariants.quantity += newItem.quantity;
    } else {
        cart.items.push(newItem);
    }

    saveCart(cart);
    return cart;
};

export const getInitialCart = (): Cart => {
    return getCart();
}

export const clearCart = (): Cart => {
    localStorage.removeItem('cart');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('billingAddress');
    localStorage.removeItem('isBillingSameAsShipping');
    return new Cart([]);
};

export const saveSelectedAddresses = (shippingAddress: AddressModel, billingAddress: AddressModel, isBillingSameAsShipping: boolean) => {
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
    localStorage.setItem('billingAddress', JSON.stringify(billingAddress));
    localStorage.setItem('isBillingSameAsShipping', JSON.stringify(isBillingSameAsShipping));
};

export const getSelectedAddresses = (): { shippingAddress: AddressModel | null, billingAddress: AddressModel | null, isBillingSameAsShipping: boolean } => {
    const shippingAddress = localStorage.getItem('shippingAddress');
    const billingAddress = localStorage.getItem('billingAddress');
    const isBillingSameAsShipping = localStorage.getItem('isBillingSameAsShipping');

    return {
        shippingAddress: shippingAddress ? JSON.parse(shippingAddress) : null,
        billingAddress: billingAddress ? JSON.parse(billingAddress) : null,
        isBillingSameAsShipping: isBillingSameAsShipping ? JSON.parse(isBillingSameAsShipping) : true,
    };
};

