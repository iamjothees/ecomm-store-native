import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "@/components/Layout"
import Home from "@/screens/Home"
import Categories from "@/screens/Categories"

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout hideHeader />}>
          <Route index element={<Home />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="categories" element={<Categories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter