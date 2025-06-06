import { useAuth } from '@/components/context/AuthContext';
import { Outlet, useNavigate } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/_app/_isAuthenticated/_isAdmin')({
  component: RouteComponent,
})

function RouteComponent() {
  const auth = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user && !auth.user.is_superuser) {
      navigate({
        to: '/',
        search: { redirect: location.href },
        replace: true,
      });
    }
  }, [auth.user]);

  if (!auth.user) {
    return <div>Loading...</div>; // Or show a spinner
  }

  if (!auth.user.is_superuser) {
    return null; // Prevent render before redirect
  }

  return <Outlet/>
}
