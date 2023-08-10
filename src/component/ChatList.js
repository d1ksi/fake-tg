import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { getUserById } from '../API/gql';
import { actionPromise } from '../store/promiseReduser';
import { useChatSocket } from '../hooks/useChatSocket';
import { addChats } from '../store/chatsReducer';
import AllChats from './AllChats';

const ChatList = () => {
   const dispatch = useDispatch();
   const { payload } = useSelector(state => state.auth);
   const state = useSelector(state => state?.promise?.getUserChatById);
   const isLoading = state?.status === 'PENDING';


   useEffect(() => {
      (async () => {
         if (payload && payload.sub && payload.sub.id) {
            const id = payload.sub.id;
            const userById = await dispatch(actionPromise('getUserChatById', getUserById(id)));
            dispatch(addChats(userById.data.UserFindOne.chats));
         }
      })();
   }, [dispatch, payload]);


   useChatSocket();

   return (
      <div className="allchat">
         {isLoading ? (
            <CircularProgress className='circularprogress' />
         ) : < AllChats />}
      </div>
   );
};

export default ChatList;