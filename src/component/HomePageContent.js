import ChatList from "../component/ChatList"
import FieldCreate from "./createchat/FieldToCreate";
import MessageChat from "../component/MessageFromOneChat"


const HomePageContent = () => {
   return (
      <div className="contentwraper">
         <ChatList />
         < MessageChat />
         <FieldCreate />
      </div>
   )
}
export default HomePageContent

