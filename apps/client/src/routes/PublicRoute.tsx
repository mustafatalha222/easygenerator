import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./isAuthenticated";
import { ROUTES } from "@/lib/routeConstant";

export const PublicRoute = ({ element }: { element: React.ReactElement }) => {
  return !isAuthenticated() ? element : <Navigate to={ROUTES.WELCOME} />;
};
