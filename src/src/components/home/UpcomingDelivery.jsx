import { Truck } from 'lucide-react';

function UpcomingDelivery() {
    return (
        <div className="w-100 bg-primary-100 p-4 rounded-lg flex items-center gap-4">
            <Truck className="text-primary-700" />
            <div>
                <p className="font-semibold">Upcoming Delivery</p>
                <p className="text-sm text-gray-600">Your order is on its way!</p>
            </div>
        </div>
    );
}

export default UpcomingDelivery;
