import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/movies')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/movies"!</div>
}
