import { AuthProvider } from '@/components/context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'sonner'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" closeButton toastOptions={{
          classNames: {
            toast: '!bg-subMain',
            title: '!text-white',
            closeButton: '!bg-subMain !text-white !hover:text-subMain',
            icon: '!text-white'
          },
        }} />

        <Outlet />
        <TanStackRouterDevtools />
      </QueryClientProvider>

    </AuthProvider>
  ),
})
