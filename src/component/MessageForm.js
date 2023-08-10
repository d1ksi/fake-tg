import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../constants/chatApiUrl';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { Box, TextField, Stack, Button } from '@mui/material';
import { useState, useMemo } from 'react';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { actionPromise } from '../store/promiseReduser';
import { switchTitle } from '../API/gql';
import UserInChat from './UserInChat';
import AddUserToChat from './AddUserToChat';
import ChatIcon from '@mui/icons-material/Chat';
import { resetButton } from '../store/buttonReducer';
import Message from './message/Message';

const MessageForm = () => {
   const state = useSelector(state => state?.promise?.OneChatByID);
   const settingsIconClicked = useSelector((state) => state.button.settingsIconClicked);
   const chat = useMemo(() => state?.payload?.data?.ChatFindOne, [state]);
   const dispatch = useDispatch();
   const [title, setTitle] = useState("");
   const avatarUrl = chat ? chat.avatar : '';
   const avatarMembers = chat && chat?.members && chat?.members?.length === 2 ? chat?.members[0]?.avatar?.url : '';
   const chatList = useSelector((state) => state?.promise?.getUserChatById)
   const chatListIsLoading = chatList?.status === 'FULFILLED';

   const newTitle = async () => {
      if (chat) {
         await dispatch(actionPromise("Switch title", switchTitle(chat._id, title)));
      }
   }

   const setBtn = () => {
      dispatch(resetButton());
   }


   return (
      <>
         {chatListIsLoading ? (
            settingsIconClicked ? (
               <div className='setting'>
                  <div className='chatavatar'>
                     {avatarUrl && avatarMembers ? (
                        <div className="avatarchat">
                           <img src={`${API_URL}/${avatarUrl}`} className="chatphoto" alt="" />
                        </div>
                     ) : avatarMembers ? (
                        <div className="avatarchat">
                           <img src={`${API_URL}/${avatarMembers}`} className="chatphoto" alt="" />
                        </div>
                     ) : (
                        <div className="noimg">
                           <Diversity3Icon sx={{ fontSize: "34px" }} />
                        </div>
                     )}
                  </div>
                  {chat && chat.members && chat.members.length > 2 ? (
                     <Box sx={{ display: "flex", alignItems: "center", marginLeft: "40px" }}>
                        <TextField
                           sx={{ width: '200px' }}
                           type="text"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           label="Title"
                           variant="outlined"
                        />
                        <DriveFileRenameOutlineIcon sx={{ cursor: "pointer", fontSize: "40px" }} onClick={newTitle} />
                     </Box>
                  ) : null}
                  <UserInChat />
                  <AddUserToChat />
                  <Stack direction="row" spacing={2} sx={{ marginTop: "10px" }}>
                     <Button variant="contained" onClick={setBtn}>Back to chat<ChatIcon sx={{ marginLeft: "5px", cursor: "pointer" }} /></Button>
                  </Stack>
               </div>
            ) : <Message />
         ) : null}
      </>
   );

}

export default MessageForm;