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
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import NotFound from "@/pages/NotFound";

const PUBLIC_ROUTES = [
  { path: ROUTES.HOME, element: <Signin /> },
  { path: ROUTES.SIGN_IN, element: <Signin /> },
  { path: ROUTES.SIGN_UP, element: <Signup /> },
];

const PRIVATE_ROUTES = [{ path: ROUTES.WELCOME, element: <Welcome /> }];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      {PUBLIC_ROUTES.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<PublicRoute element={route.element} />}
        />
      ))}
      {PRIVATE_ROUTES.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<PrivateRoute element={route.element} />}
        />
      ))}
      <Route path={`*`} element={<NotFound />} />
    </Route>
  )
);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
