import { QueryClient } from "react-query";
import { createBrowserRouter } from "react-router-dom";
import Dashboard, {
  loader as dashboardLoader,
  action as dashboardAction,
} from "./components/Dashboard/Dashboard";
import DashboardMainContent from "./components/Dashboard/DashboardMainContent";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./components/Login/Login";
import ErrorPage from "./components/global/ErrorPage";
import Users, { loader as studentLoader } from "./components/Users/Users";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    loader: dashboardLoader(queryClient),
    action: dashboardAction(queryClient),
    children: [
      {
        path: "dashboard",
        element: <DashboardMainContent />,
      },
      {
        path: "user",
        element: <Users />,
        loader: studentLoader(queryClient),
      },
      {
        path: "student/:studentId",
        element: <Users />,
      },
      {
        path: "location",
        element: <Users />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: loginLoader(queryClient),
    action: loginAction(queryClient),
    errorElement: <ErrorPage />,
  },
]);

export default router;
