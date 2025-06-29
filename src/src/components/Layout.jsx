import Footer from "@/components/layout/Footer"

function Layout({children}) {
  return (
    <div className='w-screen h-screen overflow-y-scroll overflow-x-hidden m-0 p-0 bg-background text-foreground'>
        <section className="h-screen">
          <main className="h-full flex flex-col overflow-y-scroll pb-25">
            {children}
          </main>
          <footer className="fixed bottom-0">
            <Footer />
          </footer>
        </section>
    </div>
  )
}

export default Layout