import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_isAuthenticated/watchlist')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/watchlist"!</div>
}
