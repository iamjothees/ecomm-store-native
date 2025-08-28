import React, { useEffect, useState } from 'react';
import orderService from '@/features/orders/orderService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { formatPrice } from "@/lib/utils";
import { ChevronRight, ExpandIcon } from "lucide-react";
import { Link } from 'react-router';

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
              <Order key={order.id} order={order} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const Order = ({ order }) => {
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
    <Card className="overflow-hidden pt-2">
      <CardHeader className="relative">
        <div className="">
            <h2 className='font-medium text-base'>#{order.id}</h2>
            <p className="text-xs text-muted-foreground">{order.readableCreatedAt()}</p>
        </div>
      </CardHeader>
      <CardContent>
        {/* To Continued */}
      </CardContent>
    </Card>
  );
};

const OrderHistorySkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(2)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-4 bg-muted/50">
                <div className="grid gap-1">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <div className="grid gap-1 text-right">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-20" />
                </div>
                <div className="grid gap-1 text-right">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
                <div>
                    <Skeleton className="h-5 w-16 mb-2" />
                    <div className="flex space-x-4">
                        {[...Array(3)].map((_, j) => (
                            <div key={j} className="flex-shrink-0 w-24 text-center">
                                <Skeleton className="h-24 w-24 rounded-md" />
                                <Skeleton className="h-4 w-20 mt-2 mx-auto" />
                                <Skeleton className="h-3 w-12 mt-1 mx-auto" />
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderHistory;