import { useCart } from '@/contexts/CartContext';
import useScreenContext from "@/contexts/ScreenContext";
import { Button } from '@/components/ui/button';
import { Trash2, ShoppingCart, ChevronDown } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';
import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router';
import CartItemVariantSelector from '@/features/cart/components/CartItemVariantSelector';

function Cart() {
    const { defaultScreen, setScreen } = useScreenContext();
    const { cart, dispatch } = useCart();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleRemoveFromCart = (item) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: item });
        showToast('Item removed from cart', 'error');
    };

    const handleIncrementQuantity = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item }); // Re-use ADD_TO_CART to increment quantity
        showToast(`Increased quantity of ${item.name}`, 'info');
    };

    const handleDecrementQuantity = (item) => {
        // For simplicity, if quantity becomes 0, remove the item. Otherwise, decrement.
        if (item.quantity <= 1) {
            handleRemoveFromCart(item);
        } else {
            dispatch({ type: 'DECREMENT_QUANTITY', payload: item });
            showToast(`Decreased quantity of ${item.name}`, 'info');
        }
    };

    const handleVariantChange = (item, newVariants) => {
        dispatch({ type: 'UPDATE_ITEM_VARIANTS', payload: { item, newVariants } });
        showToast(`Variants updated for ${item.name}`, 'success');
    };

    useEffect(() => { setScreen(() => ({ ...defaultScreen, screenTitle: "Cart" })); }, []);

    return (
        <div className="p-4 pt-18 flex flex-col h-full">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <ShoppingCart className="h-24 w-24 mb-4" />
                    <p className="text-lg font-semibold mb-2">Your cart is empty!</p>
                    <p className="text-sm mb-6">Looks like you haven't added anything to your cart yet.</p>
                    <Button onClick={() => navigate('/')}>Start Shopping</Button>
                </div>
            ) : (
                <div className="flex flex-col flex-1">
                    <ScrollArea className="flex-1 pr-2">
                        <div className="max-w-[560px] space-y-4">
                            {cart.items.map((item) => (
                                <Card key={`${item.id}-${Object.keys(item.selectedVariants).join('-')}-${Object.values(item.selectedVariants).join('-')}`} className="relative flex p-3 gap-3 items-center">
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveFromCart(item)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                    <div className="w-full flex gap-5 justify-start items-start">
                                        <ImageWithFallback
                                            src={item.featured_image.uri}
                                            className="flex-0 h-24 md:h-28 aspect-square object-cover rounded-md"
                                        />
                                        <div>
                                            <p className="font-bold text-md me-7">{item.name}</p>
                                            <p className="font-light text-sm">{item.category.name}</p>
                                            {item.variants && item.variants.length > 0 && (
                                                <CartItemVariantSelector
                                                    product={item}
                                                    initialSelectedVariants={item.selectedVariants}
                                                    onVariantChange={(newVariants) => handleVariantChange(item, newVariants)}
                                                >
                                                    <Button variant="outline" size="sm" className="mt-1 flex items-center justify-between w-full">
                                                        <span className="text-xs text-muted-foreground">
                                                            {Object.entries(item.selectedVariants).map(([key, value]) => `${key}: ${value}`).join(', ')}
                                                        </span>
                                                        <ChevronDown className="h-4 w-4 ml-2" />
                                                    </Button>
                                                </CartItemVariantSelector>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center border rounded-md">
                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDecrementQuantity(item)}>-</Button>
                                                <span className="px-2 text-sm">{item.quantity}</span>
                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleIncrementQuantity(item)}>+</Button>
                                            </div>
                                            <div>
                                                {item.quantity > 1 ? (
                                                    <p className="text-sm text-muted-foreground">₹{item.price}</p>
                                                ) : null}
                                                <p className="text-primary font-bold text-md">₹{item.price * item.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>

                    <div className="mt-6 p-4 border-t border-gray-200 space-y-3">
                        <div className="flex justify-between text-md">
                            <span>Subtotal:</span>
                            <span className="font-semibold">₹{cart.totalPrice}</span>
                        </div>
                        <div className="flex justify-between text-md">
                            <span>Shipping:</span>
                            <span className="font-semibold">Free</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-primary">
                            <span>Total:</span>
                            <span>₹{cart.totalPrice}</span>
                        </div>
                        <Button className="w-full py-3 text-lg">Proceed to Checkout</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
