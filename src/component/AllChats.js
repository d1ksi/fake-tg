import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from '../constants/chatApiUrl';
import { Link } from 'react-router-dom';
import { resetButton } from '../store/buttonReducer';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { truncateString } from "../functional/truncateString";


const AllChats = () => {
   const dispatch = useDispatch();
   const { payload } = useSelector((state) => state.auth);
   const user = payload?.sub;
   const chats = useSelector(state => state?.chat);
   const userAvatar = useSelector((state) => state?.promise?.getUserChatById?.payload?.data?.UserFindOne?.avatar?.url);

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
                     chatName = truncateString(chatName, 8);
                  } else if (chat.members[0].login === user.login) {
                     chatName = chat.members[1].login;
                     chatName = truncateString(chatName, 8);
                  }
               } else {
                  chatName = "Group";
               }
               let lastMessageOrImg;
               if (chat.messages && chat.messages.length > 0) {
                  const lastSms = chat.messages.length - 1;
                  const { owner, text, media } = chat.messages[lastSms];
                  let textInPhoto = '';
                  if (media && media.length > 0) {
                     textInPhoto = '📷 photo';
                  }
                  const ownerLogin = truncateString(owner.login, 5);
                  lastMessageOrImg = `${ownerLogin}: ${textInPhoto || text}`;
                  lastMessageOrImg = truncateString(lastMessageOrImg, 15);
               } else {
                  lastMessageOrImg = "write 1st sms";
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
                           <span>{lastMessageOrImg}</span>
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