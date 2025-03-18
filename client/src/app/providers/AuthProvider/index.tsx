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
  signIn: (login: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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
            setIsAuthenticated(false);
            localStorage.removeItem("accessToken");
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
      console.log(response);

      localStorage.setItem("accessToken", response.access_token);
      setIsAuthenticated(true);

      const user = await getCurrent();
      setUser(user);
    } catch {
      setIsAuthenticated(false);
      throw new Error("Неправильный логин или пароль");
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("accessToken");
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
