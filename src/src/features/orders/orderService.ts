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

  getOrders({ page = 1, limit = 10 } = {}): Promise<Order[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedOrders = testOrders.slice(start, end);
        resolve(paginatedOrders.map((order: any): Order => Order.fromJSON(order)));
      }, 1000);
    });
  }

  getOrderById(id: string): Promise<Order | undefined> {
    return new Promise(resolve => {
      setTimeout(() => {
        const order = testOrders.find(o => o.id === id);
        resolve(order ? Order.fromJSON(order) : undefined);
      }, 500);
    });
  }
}

export default new OrderService();
