import { useEffect } from 'react';
import OrderSummary from '@/components/checkout/OrderSummary';
import AddressesSelector from '@/components/checkout/AddressesSelector';
import useScreenContext from '@/contexts/ScreenContext';

const Checkout = () => {
  const { defaultScreen, setScreen } = useScreenContext();

  useEffect(() => {
    setScreen(() => ({ ...defaultScreen, screenTitle: "Checkout" }));
  }, []);

  return (
    <div className="container mx-auto p-4 pt-18">
      <h1 className="text-lg sm:text-2xl font-bold mb-4 text-center">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <OrderSummary />
        </div>
        <div>
          <AddressesSelector />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
