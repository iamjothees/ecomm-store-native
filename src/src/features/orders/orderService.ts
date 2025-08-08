import { Order } from './models/OrderModel';

class OrderService {
  placeOrder(order: Order): Promise<Order> {
    return new Promise(resolve => {
      // Mock API call
      setTimeout(() => {
        resolve({ ...order, id: new Date().getTime().toString() });
      }, 1000);
    });
  }
}

export default new OrderService();
