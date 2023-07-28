import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ChatPage from "../pages/ChatPage"
import ChatAndProfilePage from "../pages/ProfileSet";

const router = createBrowserRouter([
   {
      path: "/",
      element: <HomePage />,
   },
   {
      path: "/profile/:userId",
      element: <ChatAndProfilePage />,
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
