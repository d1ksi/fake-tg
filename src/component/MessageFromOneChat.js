import { CircularProgress } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { chatFindById, deleteChat } from '../API/gql';
import { actionPromise } from '../store/promiseReduser';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import MessageForm from './MessageForm';
import { useNavigate } from "react-router";
import CloseIcon from '@mui/icons-material/Close';



const MessageChat = () => {
   const isButtonClicked = useSelector((state) => state.button.isButtonClicked);
   const settingsIconClicked = useSelector((state) => state.button.settingsIconClicked);
   const navigate = useNavigate();
   const chatId = useParams();
   const dispatch = useDispatch();
   const state = useSelector(state => state?.promise?.OneChatByID);
   const { payload } = useSelector(state => state.auth);
   // console.log(payload)
   // console.log(state)
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
         console.log(membersWithOutMe)
         const out = await dispatch(actionPromise("Out from chat", deleteChat(chatId, membersWithOutMe)))
         // console.log(out)
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

   // console.log(chat)



   return (
      <div className={isButtonClicked ? 'messagemain' : 'messagemainwithcreate'}>
         {isLoading ? (
            <CircularProgress className='circularprogress' />
         ) : chat ? (
            <div className={isButtonClicked ? 'chatms' : 'chatwithcreate'}>
               <Box>
                  <Link href="/" color="inherit" underline="none">
                     <SpeakerNotesIcon sx={{ fontSize: "30px", cursor: "pointer" }} />
                  </Link>
               </Box>
               <p className='chattitle'>
                  {
                     chat.title && chat.title !== "undefined" && chat.title.length > 0
                        ? chat.title
                        : chat.members && chat.members.length === 2
                           ? chat.members[0].login.charAt(0).toUpperCase() + chat.members[0].login.slice(1)
                           : "Group"
                  }
               </p>
               {chat && chat.owner && chat.owner._id === userId ? <div style={{ display: "flex" }}>
                  {chat.members && chat.members.length > 2 ? (
                     settingsIconClicked ? (
                        <CloseIcon sx={{ marginRight: "20px", cursor: "pointer" }} onClick={handleClick} />
                     ) : (
                        <SettingsIcon sx={{ marginRight: "20px", cursor: "pointer" }} onClick={handleClick} />
                     )
                  ) : null}
                  <LogoutIcon sx={{ cursor: "pointer" }} onClick={outFromChat} />
               </div> : <p className='adminname'>Admin: {chat.owner.login}</p>}
            </div>
         ) : (
            <p className='textinsteadofchat'>Start chatting with friends on<br />FAKEgram</p>
         )
         }
         <MessageForm />
      </div >
   );
};

export default MessageChat;
