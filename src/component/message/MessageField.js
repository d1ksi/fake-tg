import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionPromise } from '../../store/promiseReduser';
import { messageCreate } from '../../API/gql';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';




const MessageField = () => {
   const state = useSelector(state => state?.promise?.OneChatByID);
   const [input, setInput] = useState('');
   const dispatch = useDispatch();
   const chat = useMemo(() => state?.payload?.data?.ChatFindOne, [state]);


   const handleChange = (event) => {
      setInput(event.target.value);
   };
   const handleSubmit = async () => {
      if (input && input.length > 0) {
         const msg = await dispatch(actionPromise("New message", messageCreate(chat._id, input)))
         console.log(msg);
         setInput("");
      }
   };

   return (
      <div className='msgfield'>
         <AddPhotoAlternateIcon sx={{ fontSize: "40px" }} />
         <input type="text" value={input} onChange={handleChange} className='msginput' />
         <Stack spacing={2} direction="row">
            <Button variant="contained" sx={{
               borderRadius: '50%', width: 40, height: 40, minWidth: 0,
            }} onClick={handleSubmit}><SendIcon /></Button>
         </Stack>
      </div>
   )
}


export default MessageField