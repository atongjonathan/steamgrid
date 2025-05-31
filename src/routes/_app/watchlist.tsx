import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/watchlist')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/watchlist"!</div>
}
