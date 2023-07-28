import ProfileMenu from "./ProfileMenu";
import CreateBtn from "./createchat/CreateChatBtn";
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

function Header() {
   return (
      <div className="headerwraper">
         <ProfileMenu />
         <Box>
            <Link href="/" color="inherit" underline="none">
               <p className="appname">FAKEgram</p>
            </Link>
         </Box>
         <CreateBtn />
      </div>
   );
}

export default Header;