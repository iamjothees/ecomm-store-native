import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "@/components/Layout"
import Home from "@/screens/Home"
import Categories from "@/screens/categories/index"
import Category from "@/screens/categories/show"
import Product from "@/screens/products/show"
import SearchScreen from "@/screens/Search"
import Cart from "@/screens/Cart";
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
              <Route path=":slug" element={<Product />} />
            </Route>
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="">
            </Route>
          </Route>
        </Routes>
      </ScrollToTopOnNavigate>
    </BrowserRouter>
  )
}

export default AppRouter