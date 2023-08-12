import { useMemo, useState } from 'react';
import { Box, TextField } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useDispatch, useSelector } from 'react-redux';
import { actionCheckUser } from '../functional/actionCheckUser';
import { actionPromise } from '../store/promiseReduser';
import { deleteChat } from '../API/gql';



const AddUserToChat = () => {
   const state = useSelector(state => state?.promise?.OneChatByID);
   const [login, setLogin] = useState("");
   const dispatch = useDispatch();
   const chat = useMemo(() => state?.payload?.data?.ChatFindOne, [state]);

   const checkUser = async () => {
      if (chat && chat.members && chat._id) {
         const data = await dispatch(actionCheckUser(login));
         if (data === null) {
            alert("User not found")
         }
         const newUserId = data?._id;
         const member = chat.members;
         const memberIds = member.map(({ _id }) => _id);
         if (memberIds.includes(newUserId)) {
            alert("User already in chat");
         } else {
            memberIds.push(newUserId);
         }
         const membersWithMe = memberIds.map((_id) => ({ _id }));
         await dispatch(actionPromise("Add user", deleteChat(chat._id, membersWithMe)));
         alert("User add");
         setLogin("");
      }
   };


   return (
      <div>
         <Box sx={{ display: "flex", alignItems: "center", marginLeft: "41px" }}>
            <TextField
               sx={{ width: '200px' }}
               type="text"
               value={login}
               onChange={(e) => setLogin(e.target.value)}
               label="User Login"
               variant="outlined"
            />
            <GroupAddIcon sx={{ fontSize: "36px", marginLeft: "5px", cursor: "pointer" }} onClick={checkUser} />
         </Box>
      </div>
   )
}


export default AddUserToChat