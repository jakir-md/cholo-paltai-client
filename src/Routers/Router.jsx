import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import LoginPage from "../Pages/LoginPage";
import { RegisterPage } from "../Pages/RegisterPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: '/auth/login',
          element: <LoginPage></LoginPage>
        },
        {
          path: "/auth/register",
          element: <RegisterPage></RegisterPage>
        }
      ]
    },
  ]);

export default router;