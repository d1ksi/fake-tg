import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { chatFindById, messagesById } from "../API/gql";
import { actionPromise } from "../store/promiseReduser";
import { addChat, addMessage } from "../store/chatsReducer";
import io from "socket.io-client"


export const useChatSocket = () => {
   const dispatch = useDispatch();
   const [messageSocket, setMessageSocket] = useState(null);
   const [chatSocket, setChatSocket] = useState(null);
   useEffect(() => {
      const socket = io("ws://chat.ed.asmer.org.ua/");

      if (localStorage.authToken) {
         socket.emit('jwt', localStorage.authToken);
      }
      socket.on('jwt_ok', data => console.log('jwt_ok', data));
      socket.on('jwt_fall', error => console.log('jwt_fall', error));

      socket.on('msg', async msg => {
         const promiseMessage = await dispatch(actionPromise("Get msg by msg id", messagesById(msg._id)))
         const message = promiseMessage?.data?.MessageFindOne;
         console.log(message);
         const chatId = msg?.chat?._id;

         dispatch(addMessage(message, chatId));

      });

      socket.on('chat', async chat => {
         const promiseChat = await dispatch(actionPromise("promiseGetChatById", chatFindById(chat._id)));
         const dataChat = promiseChat?.data?.ChatFindOne;
         dispatch(addChat(dataChat));
         console.log('chat', chat, chat._id);
      });

      socket.on('chat_left', data => console.log('chat_left', data));
   }, []);
   return {
      messageSocket, chatSocket
   };
};