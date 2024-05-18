import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "@/components/Layout";
import Signup from "@/pages/Signup";
import Signin from "@/pages/Signin";
import Welcome from "@/pages/Welcome";
import { ROUTES } from "@/lib/routeConstant";

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token");
};

const PrivateRoute = ({ element }: { element: React.ReactElement }) => {
  return isAuthenticated() ? element : <Signin />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path={ROUTES.SIGN_UP} element={<Signup />} />
      <Route path={ROUTES.SIGN_IN} element={<Signin />} />
      <Route
        path={ROUTES.WELCOME}
        element={<PrivateRoute element={<Welcome />} />}
      />
      <Route path={ROUTES.HOME} element={<Signin />} />
    </Route>
  )
);

const AppRoutes: React.FC = () => <RouterProvider router={router} />;

export default AppRoutes;
