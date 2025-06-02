import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/watch/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/watch_$id/"!</div>
}
