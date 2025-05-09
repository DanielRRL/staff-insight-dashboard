
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

// Define user roles
export enum UserRole {
  ADMIN = "admin",
  EMPLOYEE = "employee",
}

// Define user interface
export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  employeeId?: number;
}

// Define auth context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Mock users for demonstration
const mockUsers = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    name: "Admin User",
    email: "admin@example.com",
    role: UserRole.ADMIN,
  },
  {
    id: 2,
    username: "employee",
    password: "employee123",
    name: "John Doe",
    email: "john.doe@example.com",
    role: UserRole.EMPLOYEE,
    employeeId: 101,
  },
];

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in when the app loads
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find user in mock data
      const foundUser = mockUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (!foundUser) {
        throw new Error("Invalid credentials");
      }

      // Remove password from user object
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      
      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      
      // Redirect based on role
      if (userWithoutPassword.role === UserRole.ADMIN) {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/profile");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
