import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { actionCheckUser } from '../../functional/actionCheckUser';
import { API_URL } from '../../constants/chatApiUrl';

const FieldCreate = () => {
   const isButtonClicked = useSelector((state) => state.button.isButtonClicked);
   const [id, setId] = useState("");
   const [userData, setUserData] = useState([]); // Store user data as an array
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



   const userIDs = userData.map((user) => user._id);
   const handleDeleteUser = (userID) => {
      setUserData((prevData) => prevData.filter((user) => user._id !== userID));
   };
   console.log(userIDs)

   return (
      <div className={isButtonClicked ? 'asidecreateactive' : 'asidecreate'}>
         <div className='inputcreatechat'>
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
            <PersonAddIcon fontSize="large" onClick={checkUser} sx={{ cursor: "pointer", marginLeft: "10px" }} />
         </div>
         <div className='titleforchat'>
            <Box>
               <TextField
                  sx={{ width: '200px', marginTop: '18px' }}
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
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
      </div>
   );
};

export default FieldCreate;
