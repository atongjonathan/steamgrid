import { createFileRoute } from '@tanstack/react-router'
import Banner from './-components/Banner/Banner'

export const Route = createFileRoute('/_app/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <Banner />
  </>
}
