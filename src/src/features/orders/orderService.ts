import { Product } from '../products/models/productModel';
import { AddressModel } from '../users/models/AddressModel';
import { Order } from './models/OrderModel';
import { testOrders } from '@/tests/data';
import { OrderItem } from './models/OrderItemModel';


export interface OrderData {
  items: OrderItem[];
  shippingAddress: AddressModel;
  billingAddress: AddressModel;
}


class OrderService {
  placeOrder(orderData: OrderData): Promise<Order> {
    return new Promise(resolve => {
      // Mock API call
      setTimeout(() => {
        resolve(Order.fromData(orderData));
      }, 1000);
    });
  }

  getOrders(): Promise<Order[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(testOrders.map((order: any): Order => Order.fromJSON(order)));
      }, 500);
    });
  }
}

export default new OrderService();
