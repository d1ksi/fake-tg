import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { getUserById } from '../API/gql';
import { actionPromise } from '../store/promiseReduser';
import { API_URL } from '../constants/chatApiUrl';
import { Link } from 'react-router-dom';
import { resetButton } from '../store/buttonReducer';
import { useChatSocket } from '../hooks/useChatSocket';
import Diversity3Icon from '@mui/icons-material/Diversity3';

const ChatList = () => {
   const dispatch = useDispatch();
   const { payload } = useSelector(state => state.auth);
   const state = useSelector(state => state?.promise?.getUserChatById);

   const chats = useMemo(() => state?.payload?.data?.UserFindOne.chats, [state]);
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

   const setBtn = () => {
      dispatch(resetButton());
   };

   useChatSocket();

   return (
      <div className="allchat">
         {isLoading ? (
            <CircularProgress className='circularprogress' />
         ) : (
            chats && chats.length ? (
               chats.filter(chat => chat.members.length >= 2).slice().reverse().map(chat => {
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
                  let avatarUrl = chat.members.length === 2 ? chat.members[0]?.avatar?.url || "" : "";

                  return (
                     <Link key={chat._id} className="chats" to={`/${chat._id}`} onClick={setBtn}>
                        <div className='chat'>
                           {chat.members.length > 2 ? (
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
         )}
      </div>
   );
};

export default ChatList;
