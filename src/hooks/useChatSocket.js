import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { chatFindById, messagesById } from "../API/gql";
import { actionPromise } from "../store/promiseReduser";
import { addChat, addMessage } from "../store/chatsReducer";
import io from "socket.io-client"
import { API_FOR_SOCKET } from "../constants/chatApiUrl";


export const useChatSocket = () => {
   const dispatch = useDispatch();
   const [messageSocket, setMessageSocket] = useState(null);
   const [chatSocket, setChatSocket] = useState(null);
   useEffect(() => {
      const socket = io(API_FOR_SOCKET);

      if (localStorage.authToken) {
         socket.emit('jwt', localStorage.authToken);
      }
      socket.on('jwt_ok', data => console.log('jwt_ok', data));
      socket.on('jwt_fall', error => console.log('jwt_fall', error));

      socket.on('msg', async msg => {

         // console.log("msg", msg)
         const promiseMessage = await dispatch(actionPromise("getChatById", messagesById(msg._id)));
         const newMessage = promiseMessage?.data?.MessageFindOne;
         // // console.log("newMessage", newMessage)
         const chatId = msg?.chat?._id;
         dispatch(addMessage(newMessage, chatId));
      });

      socket.on('msg', async msg => {
         // console.log(msg);
         // const idOwnerMessage = msg.owner._id;
         const chatId = msg?.chat?._id;
         dispatch(addMessage(msg, chatId));
      });




      socket.on('chat', async chat => {
         const promiseChat = await dispatch(actionPromise("promiseGetChatById", chatFindById(chat._id)));
         const dataChat = promiseChat?.data?.ChatFindOne;
         dispatch(addChat(dataChat));
         // console.log('chat', chat, chat._id);
      });

      socket.on('chat_left', data => console.log('chat_left', data));
   }, [dispatch]);
   return {
      messageSocket, chatSocket
   };
};