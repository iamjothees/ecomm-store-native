
function Layout({children}) {
  return (
    <div className='w-screen h-screen overflow-y-scroll overflow-x-hidden m-0 p-0 bg-background text-foreground'>
        {children}
    </div>
  )
}

export default Layout