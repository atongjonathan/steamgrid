// import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import { getUser, type User } from '@/api';
import { useQuery } from '@tanstack/react-query';
import React, {
  createContext,
  useContext
} from 'react';
// import { getErrorMessage, getUser, login, logout, toastConfig } from '../api';
import { toast } from 'sonner';

// Type definitions

export type Theme = "dark-high-contrast" | "high-contrast" | "dark" | "default"
export interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  user?: User;
  fetchUser: () => Promise<void>;
  // loginMutation: UseMutationResult<any, Error, LoginDataT, unknown>
  // logout: () => void;
  localLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Utility functions for working with cookies
export const getTokenFromCookies = (): string | null => {
  const match = document.cookie.match(/(^| )token=([^;]+)/);
  return match ? match[2] : null;
};

export const setTokenCookie = (token: string): void => {
  document.cookie = `token=${token}; path=/; secure; samesite=strict`;
};

export const clearTokenCookie = (): void => {
  document.cookie = 'token=; Max-Age=0; path=/';
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const token = getTokenFromCookies();
  const isAuthenticated = !!token;

  const userQuery = useQuery({
    queryKey: ["userQuery", token],
    queryFn: getUser,
    enabled: !!token,
    retry: false,
  });

  const responseUser = userQuery.data;

  const image =
    responseUser?.image ??
    `https://ui-avatars.com/api/?name=${responseUser?.name || responseUser?.username}&rounded=true&background=14759f&size=35&color=fff`;

  const user = responseUser
    ? { ...responseUser, image }
    : undefined;

  const fetchUser = async () => {
    await userQuery.refetch();
  };

  const localLogout = () => {
    clearTokenCookie();
    setTokenCookie("");
    toast.info("Logged Out");
    // Optional: clear React Query cache if needed
    // queryClient.removeQueries(['userQuery']);
  };

  const value: AuthContextType = {
    token,
    isAuthenticated,
    user,
    fetchUser,
    localLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
