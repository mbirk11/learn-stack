import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser } from "../api/auth";

interface User {
  id?: number;
  email?: string;
  username?: string;
  avatar?: string;
  fullName?: string;
  mobileNumber?: string;
  age?: number;
  profileComplete?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = "token";

function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setStoredToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

function removeStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(getStoredToken());
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = Boolean(user && token);

  const refreshUser = async () => {
    const savedToken = getStoredToken();

    if (!savedToken) {
      setUser(null);
      setToken(null);
      return;
    }

    try {
      const response = await getCurrentUser();
      setUser(response.data);
      setToken(savedToken);
    } catch (error) {
      removeStoredToken();
      setUser(null);
      setToken(null);
      throw error;
    }
  };

  const login = async (newToken: string) => {
    setStoredToken(newToken);
    setToken(newToken);
    await refreshUser();
  };

  const logout = () => {
    removeStoredToken();
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = getStoredToken();

      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        setToken(savedToken);
        const response = await getCurrentUser();
        setUser(response.data);
      } catch {
        removeStoredToken();
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      isLoading,
      login,
      logout,
      refreshUser,
    }),
    [user, token, isAuthenticated, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
