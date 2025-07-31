import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

function Cart() {
    const { cart, dispatch } = useCart();
    const { showToast } = useToast();

    const handleRemoveFromCart = (item) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: item });
        showToast('Item removed from cart', 'error');
    };

    return (
        <div className="p-4 pt-18">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b py-2">
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-500">{item.price}</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveFromCart(item)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cart;
