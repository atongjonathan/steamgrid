// import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import { getUser, type ResponseUser, type User } from '@/api';
import { useQuery } from '@tanstack/react-query';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
// import { getErrorMessage, getUser, login, logout, toastConfig } from '../api';
import { toast } from 'sonner';

// Type definitions

export type Theme = "dark-high-contrast" | "high-contrast" | "dark" | "default"
export interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  user?: User;
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
  const token = getTokenFromCookies()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const [user, setUser] = useState<User | undefined>(undefined)
  const userQuery = useQuery({
    queryKey: ["userQuery", token],
    queryFn: getUser,
    enabled: !!token,
    retry: false
  })
  const responseUser = userQuery.data
  const image = responseUser?.image ??
    `https://ui-avatars.com/api/?name=${responseUser?.name || responseUser?.username}&rounded=true&background=14759f&size=35&color=fff`;

  // const isAuthenticated = !!responseUser
  // const loginMutation = useMutation(
  //   {
  //     mutationKey: ["loginMutation"],
  //     mutationFn: (data: LoginDataT) => login(data),
  //     onSuccess: (data) => {
  //       setToken(data.token);
  //       setIsAuthenticated(true);
  //       setTokenCookie(data.token);
  //     },
  //     onError: (err) => {        
  //       toast.error(getErrorMessage(err), toastConfig.error)
  //     }
  //   }
  // )
  // const logoutMutation = useMutation(
  //   {
  //     mutationKey: ["logoutMutation"],
  //     mutationFn: () => logout(),
  //     onSuccess: () => {
  //       toast.info("Logged Out", toastConfig.info)
  //       localLogout()
  //     },
  //     onError: (err) => {
  //       toast.error(getErrorMessage(err), toastConfig.error)
  //     }
  //   }
  // )


  useEffect(() => {
    
    setUser(responseUser ? { ...responseUser, image } : undefined)
  
  }, [userQuery.data]);



  const localLogout = () => {
    clearTokenCookie();
    setTokenCookie("");
    setIsAuthenticated(false);
    toast.info("Logged Out")

  }

  // useEffect(() => {
  //   if (userQuery.isError) {
  //     toast.error(getErrorMessage(userQuery.error), toastConfig.error)
  //     localLogout()
  //   }


  // }, [userQuery.error, userQuery.isSuccess]);

  console.log(responseUser);


  const value: AuthContextType = {
    token,
    isAuthenticated,
    user,
    // user: userQuery.data,
    // loginMutation: loginMutation,
    // logout: () => logoutMutation.mutate(),
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
