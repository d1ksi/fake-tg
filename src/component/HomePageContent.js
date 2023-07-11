import ChatList from "../component/ChatList"
import Chat from "../component/Chat"


const HomePageContent = () => {
   return (
      <div className="contentwraper">
         <ChatList />
         <Chat />
      </div>
   )
}
export default HomePageContent