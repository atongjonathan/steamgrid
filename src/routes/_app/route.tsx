import { createFileRoute, Outlet } from '@tanstack/react-router'
import Navbar from './-components/Navbar'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className='bg-main text-white relative min-h-[95vh] lg:min-h-[100vh]'>
        <Navbar/>
        <Outlet />

        {/* <h1 className='bg-red text-3xl font-bold underline'>Hello World</h1> */}
      </div>


    </>
  )
}
