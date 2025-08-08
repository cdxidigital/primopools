import { useState, useEffect, createContext, useContext } from "react";
import { apiRequest } from "@/lib/queryClient";

interface Customer {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  suburb?: string;
  postcode?: string;
}

interface CustomerAuthContext {
  customer: Customer | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<Customer>) => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  suburb?: string;
  postcode?: string;
}

const CustomerAuthContext = createContext<CustomerAuthContext | null>(null);

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error("useCustomerAuth must be used within CustomerAuthProvider");
  }
  return context;
}

export function useCustomerAuthProvider() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on app load
    const storedToken = localStorage.getItem("customerToken");
    if (storedToken) {
      setToken(storedToken);
      // Validate token by fetching profile
      fetchProfile(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchProfile = async (authToken: string) => {
    try {
      const response = await fetch("/api/customer/profile", {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCustomer(data.customer);
      } else {
        // Invalid token
        localStorage.removeItem("customerToken");
        setToken(null);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      localStorage.removeItem("customerToken");
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/customer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (data.success) {
        setToken(data.token);
        setCustomer(data.customer);
        localStorage.setItem("customerToken", data.token);
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await fetch("/api/customer/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      
      if (result.success) {
        setToken(result.token);
        setCustomer(result.customer);
        localStorage.setItem("customerToken", result.token);
      } else {
        throw new Error(result.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = () => {
    setCustomer(null);
    setToken(null);
    localStorage.removeItem("customerToken");
  };

  const updateProfile = async (data: Partial<Customer>) => {
    try {
      const response = await fetch("/api/customer/profile", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.success) {
        setCustomer(result.customer);
      } else {
        throw new Error(result.message || "Profile update failed");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  };

  return {
    customer,
    token,
    isLoading,
    isAuthenticated: !!customer && !!token,
    login,
    register,
    logout,
    updateProfile
  };
}

export { CustomerAuthContext };