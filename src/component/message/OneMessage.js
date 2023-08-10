import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { API_URL } from '../../constants/chatApiUrl';



const OneMessage = () => {
   const { payload } = useSelector((state) => state.auth);
   const userId = payload?.sub?.id;
   const chatId = useSelector(state => state?.promise?.OneChatByID?.payload?.data?.ChatFindOne?._id);

   const allMessage = useSelector((state) => state?.chat[chatId]?.messages);

   const bottomRef = useRef(null);

   useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [allMessage]);


   return (
      <>
         {allMessage && allMessage.length ? (
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
                                          {message.media.map((photo) => (
                                             <div key={photo._id} className='chatsendphoto'>
                                                <img src={`${API_URL}/${photo.url}`} className='chatmessageimg' />
                                             </div>
                                          ))}
                                       </>
                                    ) : null}
                                 </div>
                                 <p className='text'>{message.text}</p>
                              </div>
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