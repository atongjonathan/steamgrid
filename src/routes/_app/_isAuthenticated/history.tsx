import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_isAuthenticated/history')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/history"!</div>
}
