import { useCart } from '@/contexts/CartContext';
import useScreenContext from "@/contexts/ScreenContext";
import { Button } from '@/components/ui/button';
import { Trash2, ShoppingCart, ChevronDown } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router';
import CartItemVariantSelector from '@/features/cart/components/CartItemVariantSelector';
import { formatPrice } from '@/lib/utils';
import AddressesSelector from '@/components/checkout/AddressesSelector';
import orderService from '@/features/orders/orderService';
import { getSelectedAddresses } from '@/features/cart/cartService';

function Cart() {
    const { defaultScreen, setScreen } = useScreenContext();
    const { cart, dispatch } = useCart();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    useEffect(() => { setScreen(() => ({ ...defaultScreen, screenTitle: "Cart" })); }, []);

    const handlePlaceOrder = async () => {
        setIsPlacingOrder(true);
        const { shippingAddress, billingAddress } = getSelectedAddresses();

        if (!shippingAddress || !billingAddress) {
            showToast("Please select shipping and billing addresses.", "error");
            setIsPlacingOrder(false);
            return;
        }

        const order = {
            items: cart.items,
            total: cart.totalPrice,
            shippingAddress,
            billingAddress,
            status: 'pending',
        };

        try {
            await orderService.placeOrder(order);
            dispatch({ type: 'CLEAR_CART' });
            showToast("Order placed successfully!", "success");
            navigate('/order-success');
        } catch (error) {
            showToast("Failed to place order. Please try again.", "error");
        } finally {
            setIsPlacingOrder(false);
        }
    };

    return (
        <div className="flex-1 px-4 pt-18 flex flex-col gap-3 sm:absolute sm:w-screen">
            <h1 className="text-xl sm:text-2xl p-2 font-bold text-center">Shopping Cart</h1>
            {
                cart.items.length === 0 
                    ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                            <ShoppingCart className="h-24 w-24 mb-4" />
                            <p className="text-lg font-semibold mb-2">Your cart is empty!</p>
                            <p className="text-sm mb-6">Looks like you haven't added anything to your cart yet.</p>
                            <Button onClick={() => navigate('/')}>Start Shopping</Button>
                        </div>
                    ) 
                    : (
                        <div className="flex-1 flex flex-col sm:flex-row gap-5 sm:items-start sm:justify-between">
                            <ScrollArea className="sm:h-[calc(100vh-8rem)] flex-1 pr-2">
                                <div className="space-y-4">
                                    {
                                        cart.items.map((item) => (
                                            <Item 
                                                key={`${item.id}-${Object.keys(item.selectedVariants).join('-')}-${Object.values(item.selectedVariants).join('-')}`} 
                                                item={item} 
                                            />
                                        ))
                                    }
                                </div>
                                <div className='mt-8'>
                                    <AddressesSelector />
                                </div>
                                <div className="h-16 hidden sm:block"></div>
                            </ScrollArea>

                            <div className="max-w-[400px] sm:flex-1 p-4 border-t border-gray-200 sm:border-t-0 space-y-3 bg-card shadow-sm rounded-sm">
                                <h2 className="text-lg font-semibold">Order Summary</h2>
                                <div className="flex justify-between text-md">
                                    <span>Subtotal:</span>
                                    <span className="font-semibold">{formatPrice(cart.totalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-md">
                                    <span>Shipping:</span>
                                    <span className="font-semibold">Free</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-primary">
                                    <span>Total:</span>
                                    <span>{formatPrice(cart.totalPrice)}</span>
                                </div>
                                <Button className="w-full py-3 text-lg" onClick={handlePlaceOrder} disabled={isPlacingOrder}>
                                    {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                                </Button>
                            </div>
                        </div>
                    )
            }
        </div>
    );
}

export default Cart;


const Item = ({ item }) => {

    const { dispatch } = useCart();
    const { showToast } = useToast();


    const handleRemoveFromCart = (item) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: item });
        showToast('Item removed from cart', 'error');
    };

    const handleIncrementQuantity = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item }); // Re-use ADD_TO_CART to increment quantity
        showToast(`Increased quantity of ${item.name}`, 'info');
    };

    const handleDecrementQuantity = (item) => {
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

    return (
        <Card className="max-w-[560px] relative flex p-3 gap-3 items-center">
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
            <div className="w-full flex flex-col">
                <div className="flex-1 flex items-center justify-between mt-2">
                    <div className="max-w-[200px] flex-1 flex items-center justify-between border rounded-md">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDecrementQuantity(item)}>-</Button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleIncrementQuantity(item)}>+</Button>
                    </div>
                    <div className='flex-1'>
                        <div className="flex flex-col items-end">
                            {item.quantity > 1 ? (
                                <p className="text-sm text-muted-foreground">₹{item.price}</p>
                            ) : null}
                            <p className="text-primary font-bold text-md">₹{item.price * item.quantity}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}