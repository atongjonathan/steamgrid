import { createFileRoute, Outlet } from '@tanstack/react-router'
import Navbar from './-components/Navbar/Navbar'
import MobileFooterNav from './-components/Navbar/MobileFooterNav'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className='bg-main text-white relative min-h-[95vh] lg:min-h-[100vh]'>
        <Navbar />

        <MobileFooterNav />
        <div className="lg:mt-20 md:mt-[70px] mt-14">
          <Outlet />
        </div>

        {/* <h1 className='bg-red text-3xl font-bold underline'>Hello World</h1> */}
      </div>


    </>
  )
}
