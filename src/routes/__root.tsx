import { AuthProvider } from '@/components/context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'sonner'
import 'react-loading-skeleton/dist/skeleton.css'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
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

      </AuthProvider>
    </QueryClientProvider>
  ),
})
