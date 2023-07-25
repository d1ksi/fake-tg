import { useEffect } from "react";
import { useNavigate } from "react-router";
import ChatList from "../component/ChatList";
import FieldCreate from "../component/createchat/FieldToCreate";
import Header from "../component/Header";
import MessageChat from "../component/MessageFromOneChat";



function ChatPage() {
   const navigate = useNavigate();
   useEffect(() => {
      const token = localStorage.authToken;
      if (!token) {
         navigate('/register');
      }
   }, [navigate]);
   return (
      <div>
         <Header />
         <div className="contentwraper">
            <ChatList />
            <MessageChat />
            <FieldCreate />
         </div>
      </div>
   );
}

export default ChatPage; 