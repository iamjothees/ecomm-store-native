import "@/App.css"
import AppRouter from "@/AppRouter"
import ScrollToTopFAB from "@/components/common/ScrollToTopFAB";
import { ScreenContextProvider } from "@/contexts/ScreenContext"
import { CartProvider } from "@/contexts/CartContext";
import { ToastProvider } from "@/contexts/ToastContext";

function App() {
    return (
        <ScreenContextProvider>
            <ToastProvider>
                <CartProvider>
                    <AppRouter />
                    <ScrollToTopFAB />
                </CartProvider>
            </ToastProvider>
        </ScreenContextProvider>
    )
}

export default App
