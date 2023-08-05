import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionPromise } from '../../store/promiseReduser';
import { messageCreate } from '../../API/gql';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { API_URL } from '../../constants/chatApiUrl';
import { CircularProgress } from '@mui/material';
import { PreviewImg } from '../createchat/Pre';

const MessageField = () => {
   const state = useSelector(state => state?.promise?.OneChatByID);
   const [input, setInput] = useState('');
   const [arrImg, setArrImg] = useState([]);
   const dispatch = useDispatch();
   const chat = useMemo(() => state?.payload?.data?.ChatFindOne, [state]);




   const [isLoading, setIsLoading] = useState(false);
   const [dragEnter, setDragEnter] = useState(false);

   const dragEnterHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragEnter(true);
   };
   const dragLeaveHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragEnter(false);
   };


   const postFiles = async (file) => {
      const formData = new FormData();
      formData.append("media", file);

      try {
         const response = await fetch(`${API_URL}/upload`, {
            method: "POST",
            headers: localStorage.authToken ? { Authorization: "Bearer " + localStorage.authToken } : {},
            body: formData,
         });

         const data = await response.json();
         return data;


      } catch (error) {
         console.error("Error uploading file:", error);
      }
   };

   const handleFileUpload = async (files) => {
      setIsLoading(true);
      try {
         for (const fileKey in files) {
            if (files.hasOwnProperty(fileKey)) {
               const response = await postFiles(files[fileKey]);
               setArrImg(prevState => [...prevState, response]);
            }
         }
      } catch (error) {
         console.error("Error uploading file:", error);
      }
      setIsLoading(false);

   };



   const dropHandler = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragEnter(false);
      const files = e.dataTransfer.files;
      await handleFileUpload(files);
   };
   const fileUploadHandler = async (e) => {
      const files = e.target.files;
      await handleFileUpload(files);
   };




   const handleChange = (event) => {
      setInput(event.target.value);
   };


   const handleSubmit = async () => {
      const imgId = arrImg.map(({ _id }) => ({ _id: _id }));
      if (input || imgId.length > 0) {
         await dispatch(actionPromise("New message", messageCreate(chat._id, input, imgId)));
         setInput("");
         setArrImg([]);
      }
   };


   return (
      <div>
         <PreviewImg arrImg={arrImg} setArrImg={setArrImg} />
         <div className='msgfield'>
            <div>
               {!dragEnter ? (
                  <>
                     {isLoading ? (
                        <CircularProgress />
                     ) : (
                        <label>
                           <AddPhotoAlternateIcon
                              fontSize="large"
                              onDragEnter={dragEnterHandler}
                              onDragLeave={dragLeaveHandler}
                              onDragOver={dragEnterHandler}
                           />
                           <input
                              accept=".jpg,.jpeg,.png,.pdf"
                              multiple={true}
                              onChange={fileUploadHandler}
                              type="file"
                              style={{ display: "none" }}
                           />
                        </label>
                     )}
                  </>
               ) : (
                  <AddPhotoAlternateIcon
                     fontSize="large"
                     color="success"
                     onDragEnter={dragEnterHandler}
                     onDragOver={dragEnterHandler}
                     onDragLeave={dragLeaveHandler}
                     onDrop={dropHandler}
                     style={{ display: "none" }}
                  ></AddPhotoAlternateIcon>
               )}
            </div>
            <input type="text" value={input} onChange={handleChange} className='msginput' />
            <Stack spacing={2} direction="row">
               <Button variant="contained" sx={{
                  borderRadius: '50%', width: 40, height: 40, minWidth: 0,
               }} onClick={handleSubmit}><SendIcon /></Button>
            </Stack>
         </div>
      </div>
   );
}

export default MessageField;
