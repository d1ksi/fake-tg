import { useEffect, useState } from "react";
import { API_FOR_SOCKET } from "../constants/chatApiUrl";
import io from "socket.io-client"
import { useDispatch } from "react-redux";
import { addMessages } from "../store/chatReducer";


const useSocket = () => {
   const [message, setMessage] = useState(null);
   const [chat, setChat] = useState(null);
   const dispatch = useDispatch();

   useEffect(() => {
      const socket = io(API_FOR_SOCKET);
      console.log("useeffect work");
      if (localStorage.authToken) {
         socket.emit("jwt", localStorage.authToken);
      }
      socket.on('jwt_ok', data => console.log('socket rabotaet i beret token', data));
      socket.on('jwt_fail', error => console.log('socket rabotaet no token bad', error));

      socket.on('msg', (data) => {
         dispatch(addMessages(data.chat._id, data.text))
         // if (data.chat._id.length > 0 && data.text.length > ) {

         // }
         setMessage(data)
      });

      socket.on('chat', (data) => {
         console.log(data);
         setChat(data);
      });

      socket.on('chat_left', (data) => console.log(data));
   }, []);


   return {
      message,
      chat
   }
}


export default useSocket