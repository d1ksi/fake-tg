import ProfileMenu from "./ProfileMenu";
import CreateBtn from "./createchat/CreateChatBtn";

function Header() {
   return (
      <div className="headerwraper">
         <ProfileMenu />
         <p className="appname">FAKEgram</p>
         <CreateBtn />
      </div>
   );
}

export default Header;