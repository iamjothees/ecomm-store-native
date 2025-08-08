import { CartItem } from "@/features/cart/models/CartItemModel";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  shippingAddress: any;
  billingAddress: any;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}
