import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChat, addMessage } from "../store/chatsReducer";
import io from "socket.io-client"
import { API_FOR_SOCKET } from "../constants/chatApiUrl";


export const useChatSocket = () => {
   const { payload } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const [messageSocket, setMessageSocket] = useState(null);
   const [chatSocket, setChatSocket] = useState(null);
   const userId = payload?.sub?.id;


   useEffect(() => {
      const socket = io(API_FOR_SOCKET);

      if (localStorage.authToken) {
         socket.emit('jwt', localStorage.authToken);
      }
      socket.on('jwt_ok', data => console.log('jwt_ok', data));
      socket.on('jwt_fall', error => console.log('jwt_fall', error));

      socket.on('msg', async msg => {
         if (msg?.owner?._id !== userId) {
            await dispatch(addMessage(msg, msg?.chat?._id));
         }
      });

      socket.on('chat', chat => {
         dispatch(addChat(chat));
      });

      socket.on('chat_left', data => console.log('chat_left', data));
   }, [dispatch]);
   return {
      messageSocket, chatSocket
   };
};