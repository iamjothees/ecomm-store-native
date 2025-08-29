import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import orderService from '@/features/orders/orderService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import { formatPrice } from '@/lib/utils';
import useScreenContext from "@/contexts/ScreenContext";
import AddressDisplay from '@/components/common/AddressDisplay';
import AddressDisplaySkeleton from '@/components/common/AddressDisplaySkeleton';


function OrderPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { defaultScreen, setScreen } = useScreenContext();

  useEffect(() => {
    setScreen(() => ({ ...defaultScreen, screenTitle: "Order Details" }));
    orderService.getOrderById(orderId)
      .then(order => {
        setOrder(order);
        setLoading(false);
        if (order && order.id) {
          setScreen((screen) => ({ ...screen, screenTitle: `Order Details - ${order.id}` }));
        } else {
          setScreen((screen) => ({ ...screen, screenTitle: "Order Details - Not Found" }));
        }
      })
      .catch(error => {
        setOrder(null);
        setLoading(false);
        setScreen((screen) => ({ ...screen, screenTitle: "Order Details - Error" }));
        // Optionally log error or show notification
        console.error("Failed to fetch order:", error);
      });
  }, [orderId]);

  if (loading) {
    return <OrderSkeleton />;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'confirmed': return 'default';
      case 'shipped': return 'outline';
      case 'delivered': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="flex flex-col pt-18">
        <main className="flex-1 overflow-y-auto p-4 space-y-4">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Order #{order.id}</CardTitle>
                            <p className="text-sm text-muted-foreground">{order.readableCreatedAt()}</p>
                        </div>
                        <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <section>
                        <h3 className="font-semibold mb-2">Items</h3>
                        <div className="flex flex-col gap-3">
                            {order.items.map(item => (
                                <div key={item.id} className="flex items-center gap-4">
                                    <ImageWithFallback src={item.featured_image.uri} alt={item.name} className="h-16 w-16 rounded-md" />
                                    <div className="flex-1">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="flex justify-end">
                         <p className="font-semibold text-lg">Total: {formatPrice(order.total)}</p>
                    </section>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
                <AddressDisplay title="Shipping Address" address={order.shippingAddress} />
                <AddressDisplay title="Billing Address" address={order.billingAddress} />
            </div>
        </main>
    </div>
  );
}

const OrderSkeleton = () => {
  return (
    <div className="flex flex-col h-screen">
        <header className="flex items-center justify-between p-4 border-b">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-32" />
            <div className="w-6"></div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 space-y-4">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <Skeleton className="h-7 w-48 mb-1" />
                            <Skeleton className="h-4 w-56" />
                        </div>
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <section>
                        <Skeleton className="h-6 w-20 mb-2" />
                        <div className="space-y-4">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <Skeleton className="h-16 w-16 rounded-md" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/4" />
                                    </div>
                                    <Skeleton className="h-5 w-20" />
                                </div>
                            ))}
                        </div>
                    </section>
                     <section className="flex justify-end">
                         <Skeleton className="h-7 w-32" />
                    </section>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
                <AddressDisplaySkeleton />
                <AddressDisplaySkeleton />
            </div>
        </main>
    </div>
  );
};

export default OrderPage;
