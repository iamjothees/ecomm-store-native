import "@/App.css"
import AppRouter from "@/AppRouter"
import { ScreenContextProvider } from "@/contexts/ScreenContext"

function App() {
    return (
        <ScreenContextProvider>
            <AppRouter />
        </ScreenContextProvider>
    )
}

export default App
