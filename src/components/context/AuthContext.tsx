// import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import { getUser, type User } from '@/api';
import { useQuery } from '@tanstack/react-query';
import React, {
  createContext,
  useContext
} from 'react';
// import { getErrorMessage, getUser, login, logout, toastConfig } from '../api';
import { toast } from 'sonner';
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs"
// Type definitions

export type Theme = "dark-high-contrast" | "high-contrast" | "dark" | "default"
export interface AuthContextType {
  isAuthenticated: boolean;
  user?: User;
  fetchUser: () => Promise<void>;
  // loginMutation: UseMutationResult<any, Error, LoginDataT, unknown>
  // logout: () => void;
  localLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Utility functions for working with cookies


interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const access = Cookies.get("access");
  const decoded: { exp: number } = access ? jwtDecode(access) : { exp: 0 };
  const isAuthenticated = dayjs.unix(decoded.exp).diff(dayjs()) < 0;

  const userQuery = useQuery({
    queryKey: ["userQuery", access],
    queryFn: getUser,
    enabled: !!access,
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
    Cookies.remove("access")
    Cookies.remove("refresh")
    toast.info("Logged Out");
    // Optional: clear React Query cache if needed
    // queryClient.removeQueries(['userQuery']);
  };

  const value: AuthContextType = {
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
