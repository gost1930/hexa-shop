import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import checkAuth from "../middleware/auth";
import { Spiner } from "../containers";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);
  useEffect(() => {
    const fetchAuth = async () => {
      const authStatus = await checkAuth();
      setIsAuthenticated(authStatus);
    };
    fetchAuth();
  }, []);

  if (isAuthenticated === null) return <Spiner />;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
