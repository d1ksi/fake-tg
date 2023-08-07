import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from '../constants/chatApiUrl';
import { Link } from 'react-router-dom';
import { resetButton } from '../store/buttonReducer';
import Diversity3Icon from '@mui/icons-material/Diversity3';

const AllChats = () => {
   const dispatch = useDispatch();
   const { payload } = useSelector((state) => state.auth);
   const user = payload?.sub;
   const chats = useSelector(state => state?.chat);
   const userAvatar = useSelector((state) => state?.promise?.getUserChatById?.payload?.data?.UserFindOne?.avatar?.url);

   const truncateString = (str, maxLength) => {
      if (str.length <= maxLength) {
         return str;
      }
      return str.substring(0, maxLength - 3) + '...';
   };

   const setBtn = () => {
      dispatch(resetButton());
   };



   const memoizedChats = useMemo(() => {
      return (
         chats && Object.keys(chats).length ? (
            Object.values(chats).filter(chat => chat.members && chat.members.length >= 2).slice().reverse().map(chat => {
               let chatName;
               if (chat.members.length === 2) {
                  if (chat.members[0].login !== user.login) {
                     chatName = chat.members[0].login;
                  } else if (chat.members[0].login === user.login) {
                     chatName = chat.members[1].login;
                  }
               } else {
                  chatName = "Group";
               }
               let lastMessage;
               if (chat.messages && chat.messages.length > 0) {
                  const lastSms = chat.messages.length - 1;
                  const { owner, text } = chat.messages[lastSms];
                  lastMessage = `${owner.login}: ${text}`;
                  lastMessage = truncateString(lastMessage, 18);
               } else {
                  lastMessage = "write 1st sms";
               }
               let avatarUrl;
               if (chat.members && chat.members.length === 2) {
                  if (chat.members[0]?.avatar?.url !== userAvatar) {
                     avatarUrl = chat.members[0]?.avatar?.url || "";
                  } else if (chat.members[0]?.avatar?.url === userAvatar) {
                     avatarUrl = chat.members[1]?.avatar?.url || "";
                  }
               } else {
                  avatarUrl = '';
               }
               return (
                  <Link key={chat._id} className="chats" to={`/${chat._id}`} onClick={setBtn}>
                     <div className='chat'>
                        {chat.members && chat.members.length > 2 ? (
                           <div className="nochatimg">
                              <Diversity3Icon />
                           </div>
                        ) : avatarUrl ? (
                           <div className="avatar">
                              <img src={`${API_URL}/${avatarUrl}`} className="chatimg" />
                           </div>
                        ) : (
                           <div className="nochatimg">{chatName.charAt(0)}</div>
                        )}
                        <div className='chattitleandlastmessage'>
                           <span>{chatName}</span>
                           <span>{lastMessage}</span>
                        </div>
                     </div>
                  </Link>
               );
            })
         ) : (
            ''
         )
      );
   }, [chats]);



   return (
      <div>{memoizedChats}</div>
   )
}


export default AllChats