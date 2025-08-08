import { useEffect } from "react";
import { useLocation } from "wouter";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";

interface CustomerPortalGuardProps {
  children: React.ReactNode;
}

export default function CustomerPortalGuard({ children }: CustomerPortalGuardProps) {
  const { isAuthenticated, isLoading } = useCustomerAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/customer/login");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-deep-blue via-turquoise/10 to-quartz-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-turquoise mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}