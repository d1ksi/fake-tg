import MainPage from "../component/MainPage"
import { useEffect } from "react";
import { useNavigate } from "react-router";

const HomePage = () => {
   const navigate = useNavigate();
   useEffect(() => {
      const token = localStorage.authToken;
      if (token) {
         navigate('/');
      } else {
         navigate('/register');
      }
   }, [navigate]);
   return (
      <MainPage />
   )
}
export default HomePage