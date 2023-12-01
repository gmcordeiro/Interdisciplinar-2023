import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./auth/contexts/AuthContext";
import AuthGuard from "./auth/guards/AuthGuard";
import GuestGuard from "./auth/guards/GuestGuard";
import RoleGuard from "./auth/guards/RoleGuard";
import LoginPage from "./auth/pages/LoginPage";
import { UserRole } from "./auth/types";
import { FakeStorageProvider } from "./common/contexts/FakeStorageContext";
import MenuLayout from "./common/layouts/MenuLayout";
import SimpleLayout from "./common/layouts/SimpleLayout";
import ProjectsCreatePage from "./tasks/pages/ProjectsCreatePage";
import ProjectsEditPage from "./tasks/pages/ProjectsEditPage";
import ProjectsPage from "./tasks/pages/ProjectsPage";
import UsersCreatePage from "./users/pages/UsersCreatePage";
import UsersEditPage from "./users/pages/UsersEditPage";
import UsersPage from "./users/pages/UsersPage";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <GuestGuard>
        <SimpleLayout />
      </GuestGuard>
    ),
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <MenuLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="/projects" />,
      },
      {
        path: "/projects",
        element: (
          <RoleGuard
            roles={[
              UserRole.ADMIN,
              UserRole.COLLABORATOR,
              UserRole.COORDINATOR,
            ]}
          >
            <Outlet />
          </RoleGuard>
        ),
        children: [
          {
            path: "",
            element: <ProjectsPage />,
          },
          {
            path: ":id/edit",
            element: <ProjectsEditPage />,
          },
          {
            path: "create",
            element: <ProjectsCreatePage />,
          },
        ],
      },
      {
        path: "/users",
        element: (
          <RoleGuard roles={[UserRole.ADMIN]}>
            <Outlet />
          </RoleGuard>
        ),
        children: [
          {
            path: "",
            element: <UsersPage />,
          },
          {
            path: "create",
            element: <UsersCreatePage />,
          },
          {
            path: "edit/:id",
            element: <UsersEditPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <FakeStorageProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </FakeStorageProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
