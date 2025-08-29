import { useEffect, useState } from 'react';
import orderService from '@/features/orders/orderService';
import usePagination from '@/hooks/usePagination';
import OrderCard from '@/features/orders/components/OrderCard';
import OrderCardSkeleton from '@/features/orders/components/OrderCardSkeleton';
import useScreenContext from "@/contexts/ScreenContext";

function Orders() {
  const { defaultScreen, setScreen } = useScreenContext();
  const [orders, setOrders] = useState([]);
  const { page, initiatePage, moveNextPage, handlePageEndReached, handlePageError, handlePageLoading, handlePageLoaded, nextPageTrigger } = usePagination();

  useEffect(() => {
    setScreen(() => ({ ...defaultScreen, screenTitle: "Orders" }));
    initiatePage();
  }, []);

  useEffect(() => {
    if (page.current === null) return;
    if (page.loading) return;
    if (page.endReached) return;

    handlePageLoading();
    orderService.getOrders({ page: page.current, limit: page.perPage })
      .then(newOrders => {
        if (newOrders.length === 0) {
          handlePageEndReached();
          return;
        }
        setOrders(prevOrders => [...prevOrders, ...newOrders]);
        handlePageLoaded();
      })
      .catch(() => {
        handlePageError();
      });
  }, [page.current]);

  return (
    <div className="flex flex-col pt-18">
      <main className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
        {page.loading && [...Array(3)].map((_, i) => <OrderCardSkeleton key={i} />)}
        {!page.loading && !page.endReached && <div ref={nextPageTrigger} />} 
        {page.endReached && orders.length > 0 && <p className="text-center text-muted-foreground">You've reached the end.</p>}
        {orders.length === 0 && !page.loading && <p className="text-center text-muted-foreground">You have no orders.</p>}
      </main>
    </div>
  );
}

export default Orders;
