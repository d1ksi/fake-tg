import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { chatFindById, deleteChat } from '../API/gql';
// import { API_URL } from '../constants/chatApiUrl';
import { actionPromise } from '../store/promiseReduser';
// import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';


const MessageChat = () => {
   const isButtonClicked = useSelector((state) => state.button.isButtonClicked);
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

   const chat = state?.payload?.data?.ChatFindOne;
   const userId = payload?.sub?.id;
   const membersInChat = chat?.members
   const membersWithOutMe = membersInChat ? membersInChat.filter((id) => id !== userId) : [];

   // const chatWithOutMe = useMemo(() => {
   //    return membersInChat ? membersInChat.filter((id) => id !== userId) : [];
   // }, [membersInChat, userId]);

   // const chatWithOutMe = membersInChat ? membersInChat.filter((id) => id !== userId) : [];

   const outFromChat = async () => {
      if (payload && payload.sub && payload.sub.id && chat && chat.members && chat._id) {
         const chatId = chat._id;
         const userId = payload.sub.id;
         const member = chat.members;
         const membersWithOutMe = member.filter((id) => id !== userId);
         console.log(membersWithOutMe)
         const out = await dispatch(actionPromise("Out from chat", deleteChat(chatId, membersWithOutMe)))
         console.log(out)
      }
   };

   console.log(membersWithOutMe)
   console.log(membersInChat)
   console.log(userId)
   console.log(chat);

   // const avatarUrl = chat ? chat.avatar : '';

   return (
      <div className={isButtonClicked ? 'messagemain' : 'messagemainwithcreate'}>
         {isLoading ? (
            <CircularProgress className='circularprogress' />
         ) : chat ? (
            <div className={isButtonClicked ? 'chatms' : 'chatwithcreate'}>
               {/* {avatarUrl ? (
                  <div className="avatar"><img src={`${API_URL}/${avatarUrl}`} className="chatimg" /></div>
               ) : (
                  <div className="nochatimg"><NoPhotographyIcon /></div>
               )} */}
               <Box>
                  <Link href="/" color="inherit" underline="none">
                     <SpeakerNotesIcon sx={{ fontSize: "30px", cursor: "pointer" }} />
                  </Link>
               </Box>
               <p className='chattitle'>
                  {chat.title && chat.title !== "undefined" && chat.title.length > 0
                     ? chat.title
                     : chat.members && chat.members.length === 2
                        ? chat.members[0].login
                        : "Group"}
               </p>
               <div style={{ display: "flex" }}>
                  {chat.members && chat.members.length > 2 ? <SettingsIcon sx={{ marginRight: "15px", cursor: "pointer" }} /> : null}
                  <LogoutIcon sx={{ cursor: "pointer" }} onClick={outFromChat} />
               </div>
            </div>
         ) : (
            <p className='textinsteadofchat'>Start chatting with friends on FAKEgram</p>
         )
         }
      </div >
   );
};

export default MessageChat;
