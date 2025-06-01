import { createFileRoute, Outlet } from '@tanstack/react-router'
import Navbar from './-components/Navbar'
import MobileFooterNav from './-components/MobileFooterNav'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className='bg-main text-white relative min-h-[95vh] lg:min-h-[100vh]'>
        <Navbar/>
        
        <MobileFooterNav/>
        <Outlet />

        {/* <h1 className='bg-red text-3xl font-bold underline'>Hello World</h1> */}
      </div>


    </>
  )
}
