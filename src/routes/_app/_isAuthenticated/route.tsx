import { useAuth } from '@/components/context/AuthContext';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/_app/_isAuthenticated')({
  component: RouteComponent,

})


function RouteComponent() {
  const auth = useAuth(); // or use context.auth if passed from router

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate({
        to: '/',
        search: { redirect: location.href },
        replace: true,
      });
    }
  }, [auth.user]);


  return <Outlet />
}

