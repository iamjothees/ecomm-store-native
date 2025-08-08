### Checkout Module Action Plan

1.  **Create Checkout Screen:**
    *   Create a new route for `/checkout` in `src/AppRouter.jsx`.
    *   Create the `src/screens/Checkout.jsx` component.
    *   This screen will display the items in the cart, the total amount, and the shipping/billing address form.

2.  **Order Summary Component:**
    *   Create a component to display the order summary.
    *   It will show each item from the cart with its price and quantity.
    *   It will display the subtotal, shipping charges (if any), and the final total.

3.  **Address Form Component:**
    *   Create a reusable form for shipping and billing addresses.
    *   Include fields for full name, address, phone number, etc.
    *   Add a "Same as Shipping" checkbox for the billing address.

4.  **Create Order Service:**
    *   Create `src/features/orders/orderService.ts` to handle order placement.
    *   Create `src/features/orders/models/OrderModel.ts` for the order data structure.
    *   The service will have a function to "place" the order. Since there is no backend, this will be a mock function for now.

5.  **Order Confirmation Page:**
    *   Create a new route and a `src/screens/OrderSuccess.jsx` component.
    *   After placing an order, the user will be redirected here.
    *   This page will display a confirmation message and the order details.
    *   The cart will be cleared after a successful order.
