import { CircularProgress } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { chatFindById, deleteChat } from '../API/gql';
import { actionPromise } from '../store/promiseReduser';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import MessageForm from './MessageForm';
import { useNavigate } from "react-router";
import CloseIcon from '@mui/icons-material/Close';
import { deleteChatAction } from '../store/chatsReducer';
import { truncateString } from '../functional/truncateString';
import Person4Icon from '@mui/icons-material/Person4';

const MessageChat = () => {
   const isButtonClicked = useSelector((state) => state.button.isButtonClicked);
   const settingsIconClicked = useSelector((state) => state.button.settingsIconClicked);
   const navigate = useNavigate();
   const chatId = useParams();
   const dispatch = useDispatch();
   const state = useSelector(state => state?.promise?.OneChatByID);
   const { payload } = useSelector(state => state.auth);
   const chatList = useSelector((state) => state?.promise?.getUserChatById)
   const chatListIsLoading = chatList?.status === 'FULFILLED';
   const isLoading = state?.status === 'PENDING';

   useEffect(() => {
      (async () => {
         if (chatId && chatId.chatId) {
            const id = chatId.chatId
            await dispatch(actionPromise('OneChatByID', chatFindById(id)));
         }
      })();
   }, [dispatch, payload, chatId]);

   const chat = useMemo(() => state?.payload?.data?.ChatFindOne, [state]);
   const userId = useMemo(() => payload?.sub?.id, [payload]);

   const outFromChat = async () => {
      if (payload && payload.sub && payload.sub.id && chat && chat.members && chat._id) {
         const chatId = chat._id;
         const userId = payload.sub.id;
         const member = chat.members;
         const membersWithOutMe = member.filter((member) => member._id !== userId).map(({ _id }) => ({ _id }));
         await dispatch(actionPromise("Out from chat", deleteChat(chatId, membersWithOutMe)))
         dispatch(deleteChatAction(userId, chatId))
         navigate('/');
      }
   };

   if (window.location.pathname === "/") {
      return (
         <div className={isButtonClicked ? 'messagemain' : 'messagemainwithcreate'}>
            <p className='textinsteadofchat'>Start chatting with friends on<br />FAKEgram</p>
         </div>
      );
   }

   const handleClick = () => {
      dispatch({ type: 'TOGGLE_SETTINGS_ICON' });
   };

   const chatOwner = chat?.owner?.login;
   const owner = truncateString(chatOwner, 10);

   return (
      <div className={isButtonClicked ? 'messagemain' : 'messagemainwithcreate'}>
         {chatListIsLoading ? (
            isLoading ? (
               <CircularProgress className='circularprogress' />
            ) : chat ? (
               <div className={isButtonClicked ? 'chatms' : 'chatwithcreate'}>
                  <Box>
                     <Link href="/" color="inherit" underline="none">
                        <SpeakerNotesIcon sx={{ fontSize: '30px', cursor: 'pointer' }} />
                     </Link>
                  </Box>
                  <p className='chattitle'>
                     {chat.title && chat.title !== 'undefined' && chat.title.length > 0
                        ? chat.title
                        : chat.members && chat.members.length === 2
                           ? chat.members[0].login.charAt(0).toUpperCase() + chat.members[0].login.slice(1)
                           : 'Group'}
                  </p>
                  {chat && chat.owner && chat.owner._id === userId ? (
                     <div style={{ display: 'flex' }}>
                        {chat.members && chat.members.length > 2 ? (
                           settingsIconClicked ? (
                              <CloseIcon sx={{ marginRight: '20px', cursor: 'pointer' }} onClick={handleClick} />
                           ) : (
                              <SettingsIcon sx={{ marginRight: '20px', cursor: 'pointer' }} onClick={handleClick} />
                           )
                        ) : null}
                        <ExitToAppIcon sx={{ cursor: 'pointer' }} onClick={outFromChat} />
                     </div>
                  ) : (
                     <p className='adminname'><Person4Icon sx={{ marginRight: '5px' }} /> {owner}</p>
                  )}
               </div>
            ) : (
               <p className='textinsteadofchat'>Start chatting with friends on<br /> FAKEgram</p>
            )
         ) : <CircularProgress className='circularprogress' />}
         <MessageForm />
      </div >
   );
};

export default MessageChat;
