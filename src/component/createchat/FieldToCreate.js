import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Stack, Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { actionCheckUser } from '../../functional/actionCheckUser';
import { API_URL } from '../../constants/chatApiUrl';
import { CustomAlert } from './CustomAlert';
import { chatCreate } from '../../API/gql';



const FieldCreate = () => {
   const isButtonClicked = useSelector((state) => state.button.isButtonClicked);
   const [id, setId] = useState("");
   const [title, setTitle] = useState("");
   const [userData, setUserData] = useState([]);
   const [showTitleAlert, setShowTitleAlert] = useState(false);
   const [showUserAlert, setShowUserAlert] = useState(false);
   const dispatch = useDispatch();

   const clearInput = () => {
      setId("");
   };

   const checkUser = async () => {
      try {
         const data = await dispatch(actionCheckUser(id));
         if (data !== null) {
            if (userData.some((user) => user._id === data._id)) {
               alert("User already exists in the list.");
            } else {
               setUserData((prevData) => [...prevData, data]);
            }
         } else {
            alert("User not found");
         }
      } catch (error) {
         console.log(error);
      }
      clearInput();
   };



   const handleCreateChat = async () => {
      if (userIDs.length === 0) {
         setShowUserAlert(true);
      } else if (!title.trim()) {
         setShowTitleAlert(true);
      } else {
         const data = await dispatch(chatCreate(userIDs, title))
         console.log(data);
      }
   };



   const userIDs = userData.map((user) => user._id);
   const handleDeleteUser = (userID) => {
      setUserData((prevData) => prevData.filter((user) => user._id !== userID));
   };
   console.log(userIDs)

   return (
      <div className={isButtonClicked ? 'asidecreateactive' : 'asidecreate'}>
         <div>
            <Box>
               <TextField
                  sx={{ width: '200px' }}
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  label="User ID"
                  variant="outlined"
               />
            </Box>
            <Stack spacing={2} direction="row" onClick={checkUser} sx={{ cursor: "pointer" }}>
               <Button variant="contained" style={{ width: '200px', height: '20px', marginTop: '10px' }}>
                  <p className='username'>Find user</p><PersonAddIcon fontSize="medium" style={{ marginLeft: '10px' }} />
               </Button>
            </Stack>
         </div>
         <div className='titleforchat'>
            <Stack sx={{ width: '200px', marginTop: '10px' }} spacing={2}>
               {showTitleAlert && userIDs.length >= 2 && (
                  <CustomAlert message="Enter the name of the chat" height="40px" />
               )}
            </Stack>
            <Box>
               <TextField
                  sx={{ width: '200px', marginTop: '18px', display: userIDs.length >= 2 ? 'block' : 'none' }}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  label="Chat Title"
                  variant="outlined"
               />
            </Box>
         </div>
         <div className='userforcreate'>
            {userData.map((user) => (
               <div key={user._id} className="userwraper">
                  {user.avatar && user.avatar.url ? (
                     <div className="useravatar"><img src={`${API_URL}/${user.avatar.url}`} className="userimg" /></div>
                  ) : (
                     <div className="nouserimg">{user.login.charAt(0).toUpperCase()}</div>
                  )}
                  <p className='username'>{user.login.length > 8
                     ? `${user.login.charAt(0).toUpperCase()}${user.login.slice(1, 6)}...`
                     : user.login.charAt(0).toUpperCase() + user.login.slice(1)}
                  </p>
                  <DeleteIcon
                     fontSize="small"
                     onClick={() => handleDeleteUser(user._id)}
                     sx={{ cursor: "pointer", marginRight: "10px" }}
                  />
               </div>
            ))}
         </div>
         {showUserAlert && userIDs.length === 0 && <CustomAlert message="You need to add users to create a chat" height="80px" />}
         <Stack direction="row" spacing={2}>
            <Button variant="contained" endIcon={<SendIcon />} style={{ width: '200px', height: '30px' }} onClick={handleCreateChat}>
               <p className='username'>Create chat</p>
            </Button>
         </Stack>
      </div>
   );
};

export default FieldCreate;
