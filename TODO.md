## Action Plan

### High Priority

*   **Authentication:**
    *   Implement user registration and login functionality.
    *   Create a user profile page.
    *   Implement password reset functionality.
*   **Shopping Cart:**
    *   [x] Implement "Add to Cart" functionality from the product page.
    *   [x] Create a shopping cart page to view and edit cart items.
    *   [x] Implement "Remove from Cart" functionality.
    *   [x] Replace the "Add to Cart" CTA with "Go to Cart" if item of same variant already available in Cart.
    *   [x] Create CartItemModel and CartModel in Cart Feature for strict type maintenance using ts. and use in cartService.ts
    *   [x] Improve the cart Item with variant switcher and quantity updater.
*   **Checkout:**
    *   Create a checkout page with a summary of the order.
    *   Implement a form to collect shipping and billing information.
    *   Integrate a dummy payment gateway.

### Medium Priority

*   **Product:**
    *   Implement a product search functionality on the search page.
    *   Implement sorting and filtering options for products.
    *   Add a product reviews and ratings feature.
*   **Categories:**
    *   Implement a search functionality for categories.
    *   Display sub-categories on the category page.
*   **Orders:**
    *   Create an order history page for users.
    *   Implement order tracking functionality.

### Low Priority

*   **UI/UX:**
    *   [x] Implement in-app toast notification system.
    *   Improve the overall design and user experience of the application.
    *   Add animations and transitions to make the application more interactive.
*   **Performance:**
    *   Optimize the application for better performance.
    *   Implement caching for frequently accessed data.
*   **Testing:**
    *   Write unit and integration tests for the application.
