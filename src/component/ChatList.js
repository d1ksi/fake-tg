import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { getUserById } from '../API/gql';
import { actionPromise } from '../store/promiseReduser';
import { API_URL } from '../constants/chatApiUrl';
import { Link } from 'react-router-dom';
// import useSocket from '../hooks/useSocket';

const ChatList = () => {
   const dispatch = useDispatch();
   const { payload } = useSelector(state => state.auth);
   const state = useSelector(state => state?.promise?.getUserChatById);

   const chats = state?.payload?.data?.UserFindOne?.chats;
   // console.log(chats);
   const isLoading = state?.status === 'PENDING';

   const truncateString = (str, maxLength) => {
      if (str.length <= maxLength) {
         return str;
      }
      return str.substring(0, maxLength - 3) + '...';
   };

   useEffect(() => {
      (async () => {
         if (payload && payload.sub && payload.sub.id) {
            const id = payload.sub.id;
            await dispatch(actionPromise('getUserChatById', getUserById(id)));
         }
      })();
   }, [dispatch, payload]);


   // const { message, chat } = useSocket();
   // console.log("list sms", message);
   // console.log("list chat", chat);




   return (
      <div className="allchat">
         {isLoading ? (
            <CircularProgress className='circularprogress' />
         ) : (
            chats && chats.length ? (
               chats.slice().reverse().map(chat => {
                  let chatName;
                  if (chat.members.length === 2) {
                     chatName = chat.members[0].login;
                  } else {
                     chatName = "Group";
                  }
                  let lastMessage;
                  if (chat.messages.length > 0) {
                     const lastSms = chat.messages.length - 1;
                     const { owner, text } = chat.messages[lastSms];
                     lastMessage = `${owner.login}: ${text}`;
                     lastMessage = truncateString(lastMessage, 18);
                  } else {
                     lastMessage = "write 1st sms";
                  }
                  let avatarUrl;
                  if (chat.members.length === 2) {
                     avatarUrl = chat.members[0]?.avatar?.url || "";
                  } else {
                     avatarUrl = "";
                  }
                  return (
                     <Link key={chat._id} className="chats" to={`/${chat._id}`} >
                        <div className='chat'>
                           {avatarUrl ? (
                              <div className="avatar"><img src={`${API_URL}/${avatarUrl}`} className="chatimg" /></div>
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
         )}
      </div>
   );
};

export default ChatList;