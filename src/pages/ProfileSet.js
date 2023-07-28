import ChatList from "../component/ChatList";
import FieldCreate from "../component/createchat/FieldToCreate";
import Header from "../component/Header";
import ProfileSet from "../component/ProfileSettings";




const ChatAndProfilePage = () => {
   return (
      <div>
         <Header />
         <div className="contentwraper">
            <ChatList />
            <ProfileSet />
            <FieldCreate />
         </div>
      </div>
   );
}

export default ChatAndProfilePage; 