import ProfileMenu from "./ProfileMenu";
import CreateBtn from "./createchat/CreateChatBtn";

function Header() {
   return (
      <div className="headerwraper">
         <ProfileMenu />
         <CreateBtn />
      </div>
   );
}

export default Header;