import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ChatPage from "../pages/ChatPage"

const router = createBrowserRouter([
   {
      path: "/",
      element: <HomePage />,
   },
   {
      path: "/:chatId",
      element: <ChatPage />,
   },
   {
      path: "/register",
      element: <RegisterPage />,
   },
   {
      path: "/login",
      element: <LoginPage />,
   },
]);
export default router
