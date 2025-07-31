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

export const getInitialCart = (): Cart => {
    return getCart();
}

