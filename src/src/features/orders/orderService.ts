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

  getOrders(): Promise<Order[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const mockOrders: Order[] = [
          {
            id: 'ord123',
            items: [
              {
                id: '1',
                name: 'Classic T-Shirt',
                price: 25,
                featured_image: { uri: 'https://placehold.co/200x200' },
                quantity: 2,
                selectedVariants: { 'Size': 'M', 'Color': 'Black' },
              } as any, // Using 'as any' to simplify mock data
            ],
            total: 50,
            shippingAddress: { address: '123 Main St, Anytown USA' },
            billingAddress: { address: '123 Main St, Anytown USA' },
            status: 'delivered',
          },
          {
            id: 'ord456',
            items: [
              {
                id: '2',
                name: 'Wireless Headphones',
                price: 150,
                featured_image: { uri: 'https://placehold.co/200x200' },
                quantity: 1,
                selectedVariants: { 'Color': 'Silver' },
              } as any,
              {
                id: '3',
                name: 'Coffee Mug',
                price: 15,
                featured_image: { uri: 'https://placehold.co/200x200' },
                quantity: 1,
                selectedVariants: {},
              } as any,
            ],
            total: 165,
            shippingAddress: { address: '123 Main St, Anytown USA' },
            billingAddress: { address: '123 Main St, Anytown USA' },
            status: 'shipped',
          },
        ];
        resolve(mockOrders);
      }, 500);
    });
  }
}

export default new OrderService();
