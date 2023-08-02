import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import { API_URL } from '../../constants/chatApiUrl';
import { deleteMessage, getCountMessagesByChatId, getMessagesByChatId } from '../../API/gql';
import { actionPromise } from '../../store/promiseReduser';
import { addMessages } from '../../store/chatsReducer';

const Sms = () => {
   const state = useSelector((state) => state?.promise?.OneChatByID);
   const { payload } = useSelector((state) => state.auth);
   const chat = useMemo(() => state?.payload?.data?.ChatFindOne, [state]);
   const [messages, setMessages] = useState([]);
   const chatId = chat?._id;
   const userId = payload?.sub?.id;
   const dispatch = useDispatch();

   const allMessage = useSelector((state) => state?.chat[chat._id]?.messages);
   const userPromise = useSelector((state) => state?.promise?.getUserChatById);

   const bottomRef = useRef(null);

   useEffect(() => {
      if (userPromise?.status === 'FULFILLED') {
         (async () => {
            const dataMessages = await dispatch(actionPromise('messageByChatId', getMessagesByChatId(chatId)));
            const downloadMessages = dataMessages?.data?.MessageFind;
            let uniqueMessages = [];
            for (let i = 0; i < downloadMessages.length; i++) {
               let unique = true;
               for (let j = 0; j < messages.length; j++) {
                  if (messages[j]._id === downloadMessages[i]._id) {
                     unique = false;
                     break;
                  }
               }
               if (unique) {
                  uniqueMessages.push(downloadMessages[i]);
               }
            }
            dispatch(addMessages(uniqueMessages, chatId));

            dispatch(actionPromise('promiseCountMessagesByChatId', getCountMessagesByChatId(chatId)));
         })();
      }
   }, [chatId, dispatch, userPromise]);

   const handleDeleteMessage = async (messageId) => {
      if (chat && chat.messages) {
         const updatedMessages = chat.messages.filter((message) => message._id !== messageId).map(({ _id }) => ({ _id }));
         await dispatch(actionPromise("Delete one user", deleteMessage(chat._id, updatedMessages)))
      }
   };



   useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [allMessage]);

   return (
      <>
         {allMessage && allMessage.length > 0 ? (
            <div>
               {allMessage.map((message) => (
                  <div className='onemessagewraper' key={message._id}>
                     <Box>
                        <Link underline='none' sx={{ color: 'white' }}>
                           <div className={message.owner._id === userId ? 'mymsg' : 'usermsg'}>
                              <div className='msg'>
                                 <p className='owner'>{message.owner.login}</p>
                                 <div>
                                    {message.media && message.media.length > 0 ? (
                                       <>
                                          {message.media.map((photo, index) => (
                                             <div key={index} className='chatsendphoto'>
                                                <img src={`${API_URL}/${photo.url}`} className='chatmessageimg' alt='Error' />
                                             </div>
                                          ))}
                                       </>
                                    ) : null}
                                 </div>
                                 <p className='text'>{message.text}</p>
                              </div>
                              {message.owner._id === userId ? (
                                 <DeleteIcon
                                    sx={{ color: 'black', cursor: 'pointer' }}
                                    onClick={() => handleDeleteMessage(message._id)}
                                 />
                              ) : null}
                           </div>
                        </Link>
                     </Box>
                  </div>
               ))}
               <div ref={bottomRef} />
            </div>
         ) : null}
      </>
   );
};

export default Sms;