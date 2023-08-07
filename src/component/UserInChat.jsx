import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Link from '@mui/material/Link';
import { actionPromise } from '../store/promiseReduser';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOneUser } from '../API/gql';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { API_URL } from '../constants/chatApiUrl';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
import { useEffect } from 'react';



const UserInChat = () => {
   const state = useSelector(state => state?.promise?.OneChatByID);
   const { payload } = useSelector(state => state.auth);
   const chat = state?.payload?.data?.ChatFindOne;
   const userId = payload?.sub?.id;
   const dispatch = useDispatch();


   const handleDeleteUser = async (userIdToDelete) => {
      if (chat && chat.members) {
         const updatedMembers = chat.members.filter((member) => member._id !== userIdToDelete).map(({ _id }) => ({ _id }));
         const deleteOneUserFromChat = await dispatch(actionPromise("Delete one user", deleteOneUser(chat._id, updatedMembers)))
         console.log(deleteOneUserFromChat);
      }
   };

   return (
      <div>
         {chat && chat.members && chat.members.length > 2 ? (
            <div className="userinchat">
               {chat.members.filter((member) => member._id !== userId).map((member) => (
                  <Link key={member._id} sx={{ textDecoration: "none", color: "black", display: "flex", alignItems: "center", width: "180px", justifyContent: "space-between" }}>
                     {member && member.avatar && member.avatar.url ?
                        <div className="avatar">
                           <img src={`${API_URL}/${member.avatar.url}`} className="userimg" />
                        </div> :
                        <div className="nochatimg">
                           <ImageNotSupportedIcon />
                        </div>}
                     <p className='nameuserinchat'>{member.login}</p>
                     <PersonRemoveIcon onClick={() => handleDeleteUser(member._id)} />
                  </Link>
               ))}
            </div>
         ) : null}
      </div>
   )
}


export default UserInChat