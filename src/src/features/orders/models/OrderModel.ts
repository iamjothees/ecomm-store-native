import { OrderItem } from "@/features/orders/models/OrderItemModel";
import { OrderData } from "../orderService";

export class Order {
  id: string;
  items: OrderItem[];
  total: number;
  shippingAddress: any;
  billingAddress: any;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
  readableCreatedAt() {
    return new Date(this.createdAt).toLocaleDateString();
  }

  static fromJSON(data: any): Order {
    const order = new Order();
    order.id = data.id;
    order.items = data.items.map((item: any) => new OrderItem(item));
    order.total = data.total;
    order.shippingAddress = data.shippingAddress;
    order.billingAddress = data.billingAddress;
    order.status = data.status;
    order.createdAt = data.createdAt;
    return order;
  }

  static fromData(orderData: OrderData): Order {
    const order = new Order();
    order.id = `Order ${`${Date.now()}`.slice(-6)}`;
    order.items = orderData.items.map(item => new OrderItem(item));
    order.total = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    order.shippingAddress = orderData.shippingAddress;
    order.billingAddress = orderData.billingAddress;
    order.status = 'pending';
    order.createdAt = new Date().toISOString();
    return order;
  }
}
