import { Truck } from 'lucide-react';

function UpcomingDelivery() {
    return (
        <div className="w-screen">
            <div className="mx-2 bg-primary-200 p-4 rounded-lg flex items-center gap-4">
                <Truck className="text-primary-700" />
                <div>
                    <p className="font-semibold">Upcoming Delivery</p>
                    <p className="text-sm text-gray-600">Your order is on its way!</p>
                </div>
            </div>
        </div>
    );
}

export default UpcomingDelivery;
