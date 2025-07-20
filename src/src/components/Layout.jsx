import Footer from "@/components/layout/Footer"
import { Outlet } from "react-router"
import useScreenContext from "@/contexts/ScreenContext";

function Layout() {
    const { screen } = useScreenContext();

    return (
        <div className='w-screen h-screen overflow-y-scroll overflow-x-hidden m-0 p-0 bg-background text-foreground'>
            <section className="h-screen">
                { screen.showHeader && <Header title={screen.screenTitle} /> }
                <main className="h-full flex flex-col overflow-y-scroll pb-24">
                    <Outlet />
                </main>
                <footer className="fixed bottom-0 z-999">
                    <Footer />
                </footer>
            </section>
        </div>
    )
}

export default Layout

const Header = function ({ title = "" }) {
    return (
        <header className="z-999 fixed top-0 left-0 h-auto w-full py-4 px-3 bg-primary-300 text-primary flex items-end justify-between text-2xl font-semibold rounded-b-sm">
            { title }
        </header>
    )
}