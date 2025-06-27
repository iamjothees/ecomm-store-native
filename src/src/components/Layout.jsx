import React from 'react'

function Layout({children}) {
  return (
    <div className='w-screen h-screen bg-secondary-50 overflow-y-scroll overflow-x-hidden'>
        {children}
    </div>
  )
}

export default Layout