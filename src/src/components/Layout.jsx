import Footer from "@/components/layout/Footer"
import { Outlet, useNavigate } from "react-router"
import useScreenContext from "@/contexts/ScreenContext";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

function Layout() {
    const { screen } = useScreenContext();
    const { user } = useAuth();

    return (
        <div className='max-w-screen h-screen overflow-y-scroll overflow-x-hidden m-0 p-0 bg-background text-foreground'>
            <section className="h-screen">
                { screen.showHeader && <Header title={screen.screenTitle} /> }
                <main id="app-main" className="h-full flex flex-col overflow-y-scroll pb-24">
                    <Outlet />
                </main>
                {
                    user && (
                        <footer className="fixed bottom-0 z-999">
                            <Footer />
                        </footer>
                    )
                }
            </section>
        </div>
    )
}

export default Layout

const Header = function ({ title = "" }) {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }
    return (
        <header className={cn("z-999 fixed top-0 left-0 h-12 w-full px-3 bg-primary-300 text-primary flex items-end justify-between text-xl font-semibold rounded-b-sm truncate flex items-center", title.length > 15 && "text-lg")}>
            <ChevronLeft onClick={handleBack} />
            <p className="text-center flex-1">{ title }</p>
        </header>
    )
}