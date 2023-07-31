import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import { API_URL } from '../../constants/chatApiUrl';
import { deleteMessage } from '../../API/gql';
import { actionPromise } from '../../store/promiseReduser';
import { useChatSocket } from '../../hooks/useChatSocket'



const Sms = () => {
   const state = useSelector(state => state?.promise?.OneChatByID);
   const { payload } = useSelector(state => state.auth);
   const chat = useMemo(() => state?.payload?.data?.ChatFindOne, [state]);
   const userId = payload?.sub?.id;
   const dispatch = useDispatch();

   const handleDeleteMessage = async (messageId) => {
      if (chat && chat.messages) {
         const updatedMessages = chat.messages.filter((message) => message._id !== messageId).map(({ _id }) => ({ _id }));
         await dispatch(actionPromise("Delete one user", deleteMessage(chat._id, updatedMessages)))
      }
   };

   useChatSocket();



   return (
      <>
         {chat && chat.messages && chat.messages.length > 0 ? (
            <div>
               {chat.messages.map((message) => (
                  <div className='onemessagewraper' key={message._id}>
                     <Box>
                        <Link underline="none" sx={{ color: "white" }}>
                           <div className={message.owner._id === userId ? 'mymsg' : 'usermsg'}>
                              <div className='msg'>
                                 <p className='owner'>{message.owner.login}</p>
                                 <div>
                                    {message.media && message.media.length > 0 ? (
                                       <>
                                          {message.media.map((photo) =>
                                             <div className="chatsendphoto">
                                                <img src={`${API_URL}/${photo.url}`} className="chatmessageimg" alt='Error' />
                                             </div>
                                          )}
                                       </>
                                    ) : null}
                                 </div>
                                 <p className='text'>{message.text}</p>
                              </div>
                              {message.owner._id === userId ? <DeleteIcon sx={{ color: "black", cursor: "pointer" }} onClick={() => handleDeleteMessage(message._id)} /> : null}
                           </div>
                        </Link>
                     </Box>
                  </div>
               ))}
            </div>
         ) : null}
      </>
   )
}

export default Sms


