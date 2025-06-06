import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_isAuthenticated/_isAdmin/add')({
    component: RouteComponent,
    beforeLoad: ({ context, location }) => {
        if (!context.auth.user?.is_superuser) {
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
    return <div>Hello "/_app/_isAuthenticated/_isAdmin/add"!</div>
}
