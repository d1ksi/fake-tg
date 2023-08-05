import { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Stack, Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { actionCheckUser } from '../../functional/actionCheckUser';
import { API_URL } from '../../constants/chatApiUrl';
import { CustomAlert } from './CustomAlert';
import { chatCreate } from '../../API/gql';
import { actionPromise } from '../../store/promiseReduser';
import { resetButton } from "../../store/buttonReducer"



const FieldCreate = () => {
   const isButtonClicked = useSelector((state) => state.button.isButtonClicked);
   const [login, setLogin] = useState("");
   const [userData, setUserData] = useState([]);
   const [showUserAlert, setShowUserAlert] = useState(false);
   const dispatch = useDispatch();

   const clearInput = () => {
      setLogin("");
   };

   const checkUser = async () => {
      try {
         const data = await dispatch(actionCheckUser(login));
         // console.log(data)
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
      } else {
         const data = await dispatch(actionPromise("chatCreate", chatCreate(userData.map((user) => ({ _id: user._id })))));
         if (data.data && data.data.ChatUpsert) {
            setLogin("");
            setUserData([]);
            dispatch(resetButton());
         }
      }
   };



   const userIDs = useMemo(() => userData.map((user) => user._id), [userData]);
   const handleDeleteUser = (userID) => {
      setUserData((prevData) => prevData.filter((user) => user._id !== userID));
   };
   // console.log(userIDs)

   return (
      <div className={isButtonClicked ? 'asidecreateactive' : 'asidecreate'}>
         <div>
            <Box>
               <TextField
                  sx={{ width: '200px' }}
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  label="User Login"
                  variant="outlined"
               />
            </Box>
            <Stack spacing={2} direction="row" onClick={checkUser} sx={{ cursor: "pointer" }}>
               <Button variant="contained" style={{ width: '200px', height: '20px', marginTop: '10px' }}>
                  <p className='username'>Find user</p><PersonAddIcon fontSize="medium" style={{ marginLeft: '10px' }} />
               </Button>
            </Stack>
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
