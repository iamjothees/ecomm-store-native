import React, { useEffect, useState } from 'react';
import orderService from '@/features/orders/orderService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

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
            {orders.map(order => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const OrderItem = ({ order }) => {
  return (
    <div className="border p-4 rounded-lg flex justify-between items-center">
      <div>
        <p className="font-semibold">Order #{order.id}</p>
        <p className="text-sm text-muted-foreground">Total: ${order.total}</p>
        <p className="text-sm text-muted-foreground">Status: <span className="capitalize">{order.status}</span></p>
      </div>
      <div>
        {/* Could add a button to view order details */}
      </div>
    </div>
  )
}

const OrderHistorySkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="border p-4 rounded-lg flex justify-between items-center">
          <div>
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderHistory;
