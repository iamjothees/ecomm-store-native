import { BrowserRouter, Route, Routes } from "react-router"
import Home from "@/screens/Home"

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter