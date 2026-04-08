import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/mainLayout";
import HomePage from "../pages/home";
import CoursesPage from "../pages/courses";
import CourseDetail from "../pages/courseDetails";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/courses", element: <CoursesPage /> },
      { path: "/courses/:id", element: <CourseDetail /> },
    ],
  },
]);
