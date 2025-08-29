import { useEffect, useState } from 'react';
import orderService from '@/features/orders/orderService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from "lucide-react";
import { Link } from 'react-router';
import OrderCard from '@/features/orders/components/OrderCard';
import OrderCardSkeleton from '@/features/orders/components/OrderCardSkeleton';

function OrderHistory() {
  const [orders, setOrders] = useState(undefined);

  useEffect(() => {
    orderService.getOrders().then(setOrders);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        {orders === undefined && <OrderHistorySkeleton />}
        {orders?.length === 0 && <p>You have no past orders.</p>}
        {orders?.length > 0 && (
          <div className="space-y-4">
            { orders.slice(0, 2).map(order => ( <OrderCard key={order.id} order={order} /> )) }
            {
              orders.length > 2 && (
                <Link to="/account/orders" className="flex items-center justify-center text-sm text-muted-foreground mt-3">
                  View All Orders
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              )
            }
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const OrderHistorySkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(2)].map((_, i) => (
        <OrderCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default OrderHistory;