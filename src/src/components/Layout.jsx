import Footer from "@/components/layout/Footer"

function Layout({children}) {
  return (
    <div className='w-screen h-screen overflow-y-scroll overflow-x-hidden m-0 p-0 bg-background text-foreground'>
        <section className="h-screen flex flex-col">
          <main className="flex-1 overflow-y-scroll">
            {children}
          </main>
          <footer className="flex-0">
            <Footer />
          </footer>
        </section>
    </div>
  )
}

export default Layout