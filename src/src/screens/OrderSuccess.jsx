import { Link, useLocation } from 'react-router';

const OrderSuccess = () => {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p>We couldn't find your order details.</p>
        <Link to="/" className="text-blue-500 mt-4 inline-block">Go to Home</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Successful!</h1>
      <p>Thank you for your order. Your order ID is: <strong>{order.id}</strong></p>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {/* You can reuse the OrderSummary component here or create a new one */}
      </div>
      <Link to="/" className="text-blue-500 mt-8 inline-block">Continue Shopping</Link>
    </div>
  );
};

export default OrderSuccess;
