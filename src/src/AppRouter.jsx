import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "@/components/Layout"
import Home from "@/screens/Home"
import Categories from "@/screens/categories/index"
import Category from "@/screens/categories/show"
import Product from "@/screens/products/show"
import FeaturedProducts from "@/screens/products/featured"
import RecentProducts from "@/screens/products/recently-viewed"
import SearchScreen from "@/screens/Search"
import Cart from "@/screens/Cart";
import Checkout from "@/screens/Checkout";
import OrderSuccess from "@/screens/OrderSuccess";
import Onboarding from "@/screens/Onboarding";
import Login from "@/screens/auth/Login";
import Signup from "@/screens/auth/Signup";
import ScrollToTopOnNavigate from "@/components/ScrollToTopOnNavigate"
import OnboardingLayout from "@/components/layouts/Onboarding"
import AuthLayout from "./components/layouts/Auth"

function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTopOnNavigate>
        <Routes>
          <Route element={<Layout />}>
            <Route path="onboarding" element={<OnboardingLayout />}>
              <Route index element={<Onboarding />} />
              <Route path="auth">
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
              </Route>
            </Route>
            <Route element={<AuthLayout />}>
              <Route index element={<Home />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="categories">
                <Route index element={<Categories />} />
                <Route path=":slug" element={<Category />} />
              </Route>
              <Route path="products">
                <Route path=":slug" element={<Product isScreen={true} />} />
                <Route path="featured" element={<FeaturedProducts />} />
                <Route path="recent" element={<RecentProducts />} />
              </Route>
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="">
              </Route>
            </Route>
          </Route>
        </Routes>
      </ScrollToTopOnNavigate>
    </BrowserRouter>
  )
}

export default AppRouter