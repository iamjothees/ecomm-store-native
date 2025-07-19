import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "@/components/Layout"
import Home from "@/screens/Home"
import Categories from "@/screens/Categories/index"
import Category from "@/screens/Categories/show"

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout hideHeader />}>
          <Route index element={<Home />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="categories">
            <Route index element={<Categories />} />
            <Route path=":slug" element={<Category />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter