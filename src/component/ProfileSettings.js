import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUserById, userUpsert } from "../API/gql";
import { API_URL } from "../constants/chatApiUrl";
import { actionPromise } from "../store/promiseReduser";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import NorthIcon from '@mui/icons-material/North';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import Alert from '@mui/material/Alert';
import { CircularProgress } from '@mui/material';

const ProfileSet = () => {
   const state = useSelector(state => state?.promise?.getUserChatById);
   const isLoading = state?.status === 'PENDING';
   const [input, setInput] = useState('');
   const [arrImg, setArrImg] = useState([]);

   const isButtonClicked = useSelector((state) => state.button.isButtonClicked);
   const { payload } = useSelector(state => state.auth);
   const [userData, setUserData] = useState(null);

   const userId = payload?.sub?.id;
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      (async () => {
         if (payload && payload.sub && payload.sub.id) {
            const id = payload.sub.id;
            const info = await dispatch(actionPromise('getUserChatById', getUserById(id)));
            setUserData(info.data);
         }
      })();
   }, [dispatch, payload]);

   const userNick = userData?.UserFindOne?.nick;

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
   };

   const fileUploadHandler = async (e) => {
      const files = e.target.files;
      await handleFileUpload(files);
   };

   const handleChange = (event) => {
      setInput(event.target.value);
   };

   const handleSubmit = async () => {
      const imgId = arrImg[0]?._id;
      if (input || imgId?.length > 0) {
         await dispatch(actionPromise("User update", userUpsert(userId, input, imgId)));
         setInput("");
         setArrImg([]);
         navigate('/')
      } else {
         navigate('/')
      }
   };
   const userAvatar = userData && userData?.UserFindOne && userData?.UserFindOne?.avatar && userData?.UserFindOne?.avatar !== null ? userData?.UserFindOne?.avatar?.url : '';

   return (
      <div className={isButtonClicked ? 'messagemain' : 'usersettings'}>
         {isLoading ? (
            <CircularProgress />
         ) : (
            <div className="profSet">
               <label>
                  {userAvatar ? (
                     <div className="usergodchat">
                        <img src={`${API_URL}/${userAvatar}`} className="chatphoto" />
                     </div>
                  ) : (
                     <div className="noimg">
                        <ImageNotSupportedIcon />
                     </div>
                  )}
                  <input
                     accept=".jpg,.jpeg,.png,.pdf"
                     multiple={true}
                     onChange={fileUploadHandler}
                     type="file"
                     style={{ display: "none" }}
                  />
               </label>
               {arrImg && arrImg.length > 0 ?
                  <Stack sx={{ width: '100%' }} spacing={2}>
                     <Alert severity="success" sx={{ maxWidth: "200px", marginTop: "10px" }}>Photo - uploaded successfully!</Alert>
                  </Stack> : null
               }
               <Stack direction="row" spacing={2} sx={{ marginTop: "10px" }}>
                  <Button variant="text" disabled>
                     <NorthIcon sx={{ marginRight: "5px" }} />Click on your photo<br /> to upload
                  </Button>
               </Stack>
               <p className="userNickName">Nick:{userNick}</p>
               <input type="text" value={input} onChange={handleChange} className='nickName' placeholder='New nick name' />
               <Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
                  <Button variant="contained" color="success" onClick={handleSubmit}>
                     Save and exit< DownloadDoneIcon sx={{ marginLeft: "5px" }} />
                  </Button>
               </Stack>
            </div>
         )}
      </div>
   );

}
export default ProfileSet