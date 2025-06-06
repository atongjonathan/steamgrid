import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_isAuthenticated/_isAdmin/add')({
    component: RouteComponent
})

function RouteComponent() {
    return <div>Hello "/_app/_isAuthenticated/_isAdmin/add"!</div>
}
