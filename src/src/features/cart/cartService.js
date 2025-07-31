const getCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const addToCart = (item) => {
    const cart = getCart();
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    saveCart(cart);
    return cart;
};

export const removeFromCart = (item) => {
    let cart = getCart();
    cart = cart.filter((cartItem) => cartItem.id !== item.id);
    saveCart(cart);
    return cart;
};

export const getInitialCart = () => {
    return getCart();
}
