import { createContext, useContext, useReducer, useEffect } from 'react';
import { getInitialCart, addToCart, removeFromCart } from '@/features/cart/cartService';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return addToCart(action.payload);
        case 'REMOVE_FROM_CART':
            return removeFromCart(action.payload);
        case 'INITIALIZE_CART':
            return action.payload;
        default:
            return state;
    }
};

export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, [], () => {
        return getInitialCart();
    });

    useEffect(() => {
        dispatch({ type: 'INITIALIZE_CART', payload: getInitialCart() });
    }, []);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
