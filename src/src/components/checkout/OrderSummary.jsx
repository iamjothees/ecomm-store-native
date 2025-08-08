import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";

const OrderSummary = () => {
  const { cart } = useCart();

  const itemsTotal = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCharges = 5;
  const total = itemsTotal + shippingCharges;

  return (
    <div className="max-w-[400px] sm:flex-1 p-4 border-t border-gray-200 sm:border-t-0 space-y-3 bg-card shadow-sm rounded-sm">
      <h2 className="text-lg font-semibold">Order Summary</h2>
      <div className="flex justify-between text-md">
          <span>Subtotal:</span>
          <span className="font-semibold">{formatPrice(itemsTotal)}</span>
      </div>
      <div className="flex justify-between text-md">
          <span>Shipping:</span>
          <span className="font-semibold">Free</span>
      </div>
      <div className="flex justify-between text-lg font-bold text-primary">
          <span>Total:</span>
          <span>{formatPrice(total)}</span>
      </div>
  </div>
  );
};

export default OrderSummary;
