import { getCurrent } from "@/entities/user/api/getCurrent";
import { User } from "@/entities/user/model/user";
import { loginRequest } from "@/shared/api/endpoints/loginRequest";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (login: string, password: string) => Promise<string | null>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const fetchUserData = async () => {
        let isCancelled = false;

        try {
          const user = await getCurrent();
          if (!isCancelled && user) {
            setUser(user);
            setIsAuthenticated(true);
          }
        } catch (error) {
          if (!isCancelled) {
            console.error(error);
            signOut();
          }
        }

        return () => {
          isCancelled = true;
        };
      };

      fetchUserData();
    }
  }, []);

  const signIn = useCallback(async (login: string, password: string) => {
    try {
      const response = await loginRequest(login, password);

      localStorage.setItem("accessToken", response.access_token);
      localStorage.setItem("refreshToken", response.refresh_token);
      setIsAuthenticated(true);

      const user = await getCurrent();
      setUser(user);
      setAuthError(null);
      return null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
      setIsAuthenticated(false);
      setAuthError(errorMessage);
      return errorMessage;
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
