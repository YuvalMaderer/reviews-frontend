import api from "@/services/api.service";
import { useLocalStorage } from "@uidotdev/usehooks";
import { AxiosError } from "axios";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  FC,
} from "react";

interface AuthContextType {
  loggedInUser: object | null | undefined;
  login: (userData: LoginData) => Promise<LoginResponse>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginResponse {
  token: string;
  user: object;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<object | null | undefined>(
    undefined
  );
  const [token, setToken] = useLocalStorage<string | null>("token", null);

  useEffect(() => {
    if (!token) {
      setLoggedInUser(null);
      return;
    }

    async function fetchUser() {
      try {
        const response = await api.get("/auth/loggedInUser");
        setLoggedInUser(response.data);
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          console.error("Invalid token, logging out");
          logout();
        } else if (axiosError.response?.status === 404) {
          console.error("User not found, logging out");
          logout();
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    }

    fetchUser();
  }, [token]);

  const logout = () => {
    setToken(null);
    setLoggedInUser(null);
  };

  const login = async (userData: LoginData): Promise<LoginResponse> => {
    try {
      const response = await api.post("/auth/login", userData);
      setToken(response.data.token);
      return response.data;
    } catch (error: unknown) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      await api.post("/auth/register", userData);
    } catch (error: unknown) {
      console.error("Error registering:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
