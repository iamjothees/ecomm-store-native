import { Badge } from "@/components/ui/badge";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { cn, formatPrice } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router";

const OrderCard = ({ order }) => {
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
    <Link to={`/account/orders/${order.id}`}>
      <Card className="overflow-hidden pt-2">
        <CardHeader className="relative">
          <div className="flex justify-between">
            <div>
              <h2 className='font-medium text-base'>#{order.id}</h2>
              <p className="text-xs text-muted-foreground">{order.readableCreatedAt()}</p>

            </div>
            <div className="flex items-center gap-2">
              <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <section>
            <main className="flex flex-col">
              {order.items.map((item, index) => (
                <section key={item.id} className={cn("flex flex-col gap-2 pb-3 border-b border-gray-300 mb-3", { "border-b-2 border-gray-400": index === (order.items.length-1) })}>
                  <main className="flex gap-2">
                    <ImageWithFallback src={item.featured_image.uri} alt={item.name} className="h-16 w-16 rounded-md" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs font-light">{item.category.name}</p>
                    </div>
                  </main>
                  <footer className="flex justify-between">
                      <p className="text-xs font-medium">{formatPrice(item.price)}</p>
                      <p className="text-xs font-medium">Qty : {item.quantity}</p>
                      <p className="text-xs font-medium">SubTotal : {formatPrice(item.price * item.quantity)}</p>
                  </footer>
                </section>
              ))}
            </main>
            <footer className="flex flex-row-reverse justify-between">
                <p className="text-xs font-medium">Total : {formatPrice(order.total)}</p>
            </footer>
          </section>
        </CardContent>
      </Card>
    </Link>
  );
};

export default OrderCard;
