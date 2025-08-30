import { createBrowserRouter, RouteObject } from "react-router-dom";

import AppLayout from "./components/app-layout";
import {
  ProtectedRoute,
  RedirectRoute,
  RoleProtectedRoute,
} from "./components/protected-route";
import Login from "./pages/login";
import Tasks from "./pages/tasks";
import Categories from "./pages/categories";
import Projects from "./pages/projects";
import Users from "./pages/users";
import Register from "./pages/register";

const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Tasks />,
  },
  {
    element: <RoleProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <ProtectedRoute />
      </AppLayout>
    ),
    children: [...appRoutes],
  },

  {
    element: <RedirectRoute />,
    children: [...authRoutes],
  },
]);

export default router;
