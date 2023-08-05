import ChatList from "./ChatList"
import FieldCreate from "./createchat/FieldToCreate";
import MessageChat from "./MessageFromOneChat"


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

