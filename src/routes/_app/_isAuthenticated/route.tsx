import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_isAuthenticated')({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      })
    }
  }
})


function RouteComponent() {
  return <div>Hello "/_app/_isAuthenticated"!</div>
}
