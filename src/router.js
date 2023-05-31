import { QueryClient } from "@tanstack/react-query";
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
import Users, { loader as usersLoader } from "./components/Users/Users";
import Location, {
  loader as locationsLoader,
} from "./components/Location/Location";
import UserCreateForm, {
  loader as usersAddLoader,
  action as usersAddAction,
} from "./components/Users/UserCreateForm";
import UserEditForm, {
  action as usersEditAction,
} from "./components/Users/UserEditForm";
import UserDetail, {
  loader as userLoader,
} from "./components/Users/UserDetail";
import LocationForm, {
  action as locationsAction,
} from "./components/Location/LocationForm";
import LocationDetail, {
  loader as locationLoader,
  action as locationAction,
} from "./components/Location/LocationDetail";
import Internship, {
  loader as internshipsLoader,
  action as internshipsAction,
} from "./components/Internship/Internship";
import SchoolClass, {
  loader as schoolClassesLoader,
} from "./components/SchoolClass/SchoolClass";
import SchoolClassCreateForm, {
  loader as schoolClassLoader,
  action as schoolClassAction,
} from "./components/SchoolClass/SchoolClassCreateForm";
import SchoolClassDetail, {
  loader as schoolClassDetailLoader,
  action as schoolClassDetailAction,
} from "./components/SchoolClass/SchoolClassDetail";
import InternshipForm, {
  action as internshipAddAction,
} from "./components/Internship/InternshipForm";
import InternshipDetail, {
  loader as internshipLoader,
  action as internshipAction,
} from "./components/Internship/InternshipDetail";
import Journal, {
  loader as journalsLoader,
  action as journalsAction,
} from "./components/Journal/Journal";
import JournalDetail, {
  loader as journalLoader,
} from "./components/Journal/JournalDetail";
import JournalForm, {
  action as journalAction,
} from "./components/Journal/JournalForm";

export const queryClient = new QueryClient();

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
        loader: usersLoader(queryClient),
        children: [
          {
            path: "/user/add",
            element: <UserCreateForm />,
            loader: usersAddLoader(queryClient),
            action: usersAddAction(queryClient),
          },
          {
            path: "/user/:userId",
            element: <UserDetail />,
            loader: userLoader(queryClient),
          },
          {
            path: "/user/:userId/edit",
            element: <UserEditForm />,
            loader: userLoader(queryClient),
            action: usersEditAction(queryClient),
          },
        ],
      },

      {
        path: "location",
        element: <Location />,
        children: [
          {
            path: "/location/add",
            element: <LocationForm />,
            action: locationsAction(queryClient),
          },
          {
            path: "/location/:locationId",
            element: <LocationDetail />,
            loader: locationLoader(queryClient),
            action: locationAction(queryClient),
          },
          {
            path: "/location/:locationId/edit",
            element: <LocationForm />,
            loader: locationLoader(queryClient),
          },
        ],
        loader: locationsLoader(queryClient),
      },
      {
        path: "class",
        element: <SchoolClass />,
        loader: schoolClassesLoader(queryClient),
        children: [
          {
            path: "/class/add",
            element: <SchoolClassCreateForm />,
            loader: schoolClassLoader(queryClient),
            action: schoolClassAction(queryClient),
          },
          {
            path: "/class/:schoolClassId",
            element: <SchoolClassDetail />,
            loader: schoolClassDetailLoader(queryClient),
            action: schoolClassDetailAction(queryClient),
          },
        ],
      },
      {
        path: "internship",
        element: <Internship />,
        loader: internshipsLoader(queryClient),
        action: internshipsAction(queryClient),
        children: [
          {
            path: "/internship/add",
            element: <InternshipForm />,
            loader: internshipLoader(queryClient),
            action: internshipAddAction(queryClient),
          },
          {
            path: "/internship/:internshipId",
            element: <InternshipDetail />,
            loader: internshipLoader(queryClient),
            action: internshipAction(queryClient),
          },
          {
            path: "/internship/:internshipId/edit",
            element: <InternshipForm />,
            loader: internshipLoader(queryClient),
            action: internshipAddAction(queryClient),
          },
        ],
      },
      {
        path: "journal",
        element: <Journal />,
        loader: journalsLoader(queryClient),
        action: journalsAction(queryClient),
        children: [
          {
            path: "/journal/add",
            element: <JournalForm />,
            loader: journalLoader(queryClient),
            action: journalAction(queryClient),
          },
          {
            path: "/journal/:journalId/edit",
            element: <JournalForm />,
            loader: journalLoader(queryClient),
            action: journalAction(queryClient),
          },
          {
            path: "/journal/:journalId",
            element: <JournalDetail />,
            loader: journalLoader(queryClient),
          },
        ],
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
