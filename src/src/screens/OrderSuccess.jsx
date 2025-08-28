import { Link, useLocation, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import useScreenContext from '@/contexts/ScreenContext';

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { defaultScreen, setScreen } = useScreenContext();

    const { order } = location.state || {};

    useEffect(() => {
        setScreen({ ...defaultScreen, screenTitle: "Order Confirmed" });
        if (!order) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [order, navigate]);


    if (!order) {
        return (
            <div className="container mx-auto p-4 text-center flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
                <p>We couldn't find your order details. Redirecting to homepage...</p>
                <Link to="/" className="text-blue-500 mt-4 inline-block">Go to Home</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 pt-18 max-w-2xl">
            <Card>
                <CardHeader className="text-center">
                    <div className="flex justify-center items-center mb-4">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Order Successful!</CardTitle>
                    <p className="text-muted-foreground">Thank you for your purchase.</p>
                    <p className="text-sm text-muted-foreground">Your order ID is: <strong>{order.id}</strong></p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                        <div className="space-y-4">
                            {order.items.map(item => (
                                <div key={item.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <ImageWithFallback src={item.featured_image?.uri} className="h-16 w-16 rounded-md object-cover" />
                                        <div>
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Subtotal</p>
                            <p>{formatPrice(order.total)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Shipping</p>
                            <p>Free</p>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <p>Total</p>
                            <p>{formatPrice(order.total)}</p>
                        </div>
                    </div>

                    <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold mb-2">Shipping Address</h4>
                            <address className="text-muted-foreground not-italic space-y-1">
                                <p className="font-semibold">{order.shippingAddress.name}</p>
                                <p>{order.shippingAddress.addressLine1}</p>
                                {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                                <p>{order.shippingAddress.country}</p>
                                <p>
                                    <span className="font-medium">Phone:</span> {order.shippingAddress.phoneNumberCountryCode} {order.shippingAddress.phoneNumber}
                                </p>
                            </address>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Billing Address</h4>
                            <address className="text-muted-foreground not-italic space-y-1">
                                <p className="font-semibold">{order.billingAddress.name}</p>
                                <p>{order.billingAddress.addressLine1}</p>
                                {order.billingAddress.addressLine2 && <p>{order.billingAddress.addressLine2}</p>}
                                <p>{order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.postalCode}</p>
                                <p>{order.billingAddress.country}</p>
                                <p>
                                    <span className="font-medium">Phone:</span> {order.billingAddress.phoneNumberCountryCode} {order.billingAddress.phoneNumber}
                                </p>
                            </address>
                        </div>
                    </div>

                    <div className="border-t pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild>
                            <Link to="/">Continue Shopping</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link to="/account/orders">View Order History</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default OrderSuccess;