import { Card } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import { SearchCardContents } from './-components/Navbar/InputSearch'

export const Route = createFileRoute('/_app/search')({
  component: RouteComponent,
})

function RouteComponent() {


  return (
    <Card className="m-2 z-10 lg:mt-20 md:mt-[70px] mt-14 rounded-xl shadow-md bg-background text-white">
      <SearchCardContents />
    </Card>
  )
}
