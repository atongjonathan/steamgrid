// App.tsx
import { AuthProvider, useAuth } from '@/components/context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import 'react-loading-skeleton/dist/skeleton.css'
import { router } from './router'

const queryClient = new QueryClient()

function InnerApp() {
    const auth = useAuth()
    return <RouterProvider router={router} context={{ auth, queryClient }} />
}

const App = () => {
    return (
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
                <InnerApp />
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default App
