import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../constants/chatApiUrl';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Box, TextField, Stack, Button } from '@mui/material';
import { useState, useMemo } from 'react';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
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
   const [title, setTirle] = useState("");

   // console.log(chat)

   const avatarUrl = chat ? chat.avatar : '';
   const avatarMembers = chat && chat?.members && chat?.members?.length === 2 ? chat?.members[0]?.avatar?.url : '';


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
         {settingsIconClicked ? (
            <div className='setting'>
               <div className='chatavatar'>
                  {avatarUrl && avatarMembers ? (
                     <div className="avatarchat">
                        <img src={`${API_URL}/${avatarUrl}`} className="chatphoto" />
                     </div>
                  ) : avatarMembers ? (
                     <div className="avatarchat">
                        <img src={`${API_URL}/${avatarMembers}`} className="chatphoto" />
                     </div>
                  ) : (
                     <div className="noimg">
                        <AddPhotoAlternateIcon sx={{ fontSize: "34px" }} />
                     </div>
                  )}
                  <Stack spacing={2} direction="row">
                     <Button variant="text" sx={{ color: 'black', cursor: "pointer", fontWeight: "600" }}>Add photo<CameraswitchIcon sx={{ marginLeft: "10px" }} /></Button>
                  </Stack>
               </div>
               {chat && chat.members && chat.members.length > 2 ? <Box sx={{ display: "flex", alignItems: "center", marginLeft: "40px" }}>
                  <TextField
                     sx={{ width: '200px' }}
                     type="text"
                     value={title}
                     onChange={(e) => setTirle(e.target.value)}
                     label="Title"
                     variant="outlined"
                  />
                  <DriveFileRenameOutlineIcon sx={{ cursor: "pointer", fontSize: "40px" }} onClick={newTitle} />
               </Box> : null}
               < UserInChat />
               < AddUserToChat />
               <Stack direction="row" spacing={2} sx={{ marginTop: "10px" }}>
                  <Button variant="contained" onClick={setBtn}>Back to chat<ChatIcon sx={{ marginLeft: "5px", cursor: "pointer" }} /></Button>
               </Stack>
            </div>
         ) : < Message />}
      </>
   );
}

export default MessageForm;