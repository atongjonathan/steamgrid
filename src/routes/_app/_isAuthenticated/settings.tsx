import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_isAuthenticated/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/settings"!</div>
}
