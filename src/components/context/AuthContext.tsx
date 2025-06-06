// import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import { getNewToken, getUser, type User } from '@/api';
import { useQuery } from '@tanstack/react-query';
import React, {
  createContext,
  useContext,
  useEffect
} from 'react';
// import { getErrorMessage, getUser, login, logout, toastConfig } from '../api';
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
export const getAuthState = (access: string): boolean => {

  try {
    const decoded: { exp: number } = jwtDecode(access);
    return dayjs.unix(decoded.exp).diff(dayjs()) > 0;
  } catch {
    return false;
  }
};


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const access = Cookies.get("access");
  const refresh = Cookies.get("refresh");

  const isAuthenticated = access ? getAuthState(access) : false


  const userQuery = useQuery({
    queryKey: ["userQuery", access],
    queryFn: getUser,
    enabled: access ? getAuthState(access) : false,
    retry: false,
  });


  const responseUser = userQuery.data;

  const image =
    responseUser?.image ??
    `https://ui-avatars.com/api/?name=${responseUser?.name || responseUser?.username}&rounded=true&background=14759f&size=35&color=fff`;

  const user = responseUser ? { ...responseUser, image } : undefined;

  const fetchUser = async () => {
    await userQuery.refetch();
  };

  const localLogout = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    // Optionally clear query cache:
    // queryClient.removeQueries(['userQuery']);
  };

  useEffect(() => {
    if (userQuery.isError || !isAuthenticated) {
      localLogout()
    }
  }, [userQuery.isError, isAuthenticated]);

  useEffect(() => {
    if (!access || !refresh || !isAuthenticated) return;


    const interval = setInterval(async () => {
      const currentAccess = Cookies.get("access");
      const currentRefresh = Cookies.get("refresh");

      if (!currentAccess || !currentRefresh) return;

      try {
        const decoded: { exp: number } = jwtDecode(currentAccess);
        const isExpiringSoon = dayjs.unix(decoded.exp).diff(dayjs()) < 60 * 1000;


        if (isExpiringSoon) {
          const { access: newAccessToken, refresh: newRefreshToken } = await getNewToken(currentRefresh);
          Cookies.set("access", newAccessToken);
          Cookies.set("refresh", newRefreshToken);
          await fetchUser();
        }
      } catch (err) {
        console.error("Auto-refresh failed", err);
        localLogout();
      }
    }, 30 * 1000); // Check every 30s

    return () => clearInterval(interval);
  }, [isAuthenticated]);

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
