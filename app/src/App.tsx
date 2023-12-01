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
import LoginPage from "./auth/pages/LoginPage";
import { FakeStorageProvider } from "./common/contexts/FakeStorageContext";
import MenuLayout from "./common/layouts/MenuLayout";
import SimpleLayout from "./common/layouts/SimpleLayout";
import ProjectsPage from "./tasks/pages/ProjectsPage";
import { UsersProvider } from "./users/contexts/UsersContext";
import UsersCreatePage from "./users/pages/UsersCreatePage";
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
        children: [
          {
            path: "",
            element: <ProjectsPage />,
          },
        ],
      },
      {
        path: "/users",
        element: (
          <UsersProvider>
            <Outlet />
          </UsersProvider>
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
