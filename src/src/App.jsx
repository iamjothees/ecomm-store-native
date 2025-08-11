import "@/App.css"
import AppRouter from "@/AppRouter"
import ScrollToTopFAB from "@/components/common/ScrollToTopFAB";
import { ScreenContextProvider } from "@/contexts/ScreenContext"
import { CartProvider } from "@/contexts/CartContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
    return (
        <AuthProvider>
            <ScreenContextProvider>
                <ToastProvider>
                    <CartProvider>
                        <AppRouter />
                        <ScrollToTopFAB />
                    </CartProvider>
                </ToastProvider>
            </ScreenContextProvider>
        </AuthProvider>
    )
}

export default App
