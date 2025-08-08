import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import CustomerLogin from "@/pages/CustomerLogin";
import CustomerDashboard from "@/pages/CustomerDashboard";
import CustomerPortalGuard from "@/components/CustomerPortalGuard";
import { CustomerAuthContext, useCustomerAuthProvider } from "@/hooks/useCustomerAuth";

function Router() {
  const authContext = useCustomerAuthProvider();
  
  return (
    <CustomerAuthContext.Provider value={authContext}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/customer/login" component={CustomerLogin} />
        <Route path="/customer/dashboard">
          <CustomerPortalGuard>
            <CustomerDashboard />
          </CustomerPortalGuard>
        </Route>
        {/* Add more routes as needed */}
      </Switch>
    </CustomerAuthContext.Provider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
