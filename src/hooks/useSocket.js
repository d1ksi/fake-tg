import { useEffect, useState } from "react";
import { API_FOR_SOCKET } from "../constants/chatApiUrl";
import { io } from 'socket.io-client'


const useSocket = () => {
   const [message, setMessage] = useState(null);
   const [chat, setChat] = useState(null);

   useEffect(() => {
      const socket = io(API_FOR_SOCKET);
      console.log("useeffect work");
      if (localStorage.authToken) {
         socket.emit("jwt", localStorage.authToken);
      }
      socket.on('jwt_ok', data => console.log('socket rabotaet i beret token', data));
      socket.on('jwt_fail', error => console.log('socket rabotaet no token bad', error));

      socket.on('msg', (data) => {
         console.log(data);
         setMessage(data);
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