import { BrowserRouter, Route, Routes } from "react-router"
import Home from "@/screens/Home"
import Categories from "@/screens/Categories"

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter