import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "@/components/Layout"
import Home from "@/screens/Home"
import Categories from "@/screens/categories/index"
import Category from "@/screens/categories/show"
import Product from "@/screens/products/show"
import SearchScreen from "@/screens/Search"
import Cart from "@/screens/Cart";
import Checkout from "@/screens/Checkout";
import OrderSuccess from "@/screens/OrderSuccess";
import ScrollToTopOnNavigate from "@/components/ScrollToTopOnNavigate"

function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTopOnNavigate>
        <Routes>
          <Route element={<Layout hideHeader />}>
            <Route index element={<Home />} />
          </Route>
          <Route element={<Layout />}>
            <Route path="categories">
              <Route index element={<Categories />} />
              <Route path=":slug" element={<Category />} />
            </Route>
            <Route path="products">
              <Route path=":slug" element={<Product isScreen={true} />} />
            </Route>
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="">
            </Route>
          </Route>
        </Routes>
      </ScrollToTopOnNavigate>
    </BrowserRouter>
  )
}

export default AppRouter