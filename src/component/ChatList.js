import * as React from 'react';
import Link from '@mui/material/Link';
import { CircularProgress } from '@mui/material';
import { getUserById } from "../API/gql";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actionPromise } from "../store/promiseReduser";

const ChatList = () => {
   const dispatch = useDispatch();
   const { status, payload } = useSelector((state) => state.auth);
   const state = useSelector((state) => state?.promise?.getUserChatById);

   console.log("payload:", payload);
   console.log("state:", state);

   useEffect(() => {
      (async () => {
         if (payload && payload.sub && payload.sub.id) {
            const id = payload.sub.id;
            const data = await dispatch(actionPromise('getUserChatById', getUserById(id)));
            console.log("data:", data);
         }
      })();
   }, [dispatch, payload]);
   return (
      <div className='chats'>
         {
            status === 'PENDING' || !status ? (<div className='circularaside'><CircularProgress /></div>) :
               (<div className='allchat'>
                  {payload &&
                     payload.data &&
                     payload.data.UserFindOne &&
                     payload.data.UserFindOne.chats &&
                     payload.data.UserFindOne.chats.length ? (
                     payload.data.UserFindOne.chats.reverse().map(item => (
                        <Link key={item._id}>{item._id}</Link>
                     ))
                  ) : (
                     <div>1212</div>
                  )}
               </div>)
         }
      </div>
   )
};

export default ChatList;