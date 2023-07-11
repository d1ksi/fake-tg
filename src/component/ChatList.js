import { getUserByLogin } from "../API/gql";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actionPromise } from "../store/promiseReduser";

const ChatList = () => {
   const dispatch = useDispatch();
   const { payload } = useSelector((state) => state.auth);
   console.log(payload)

   useEffect(() => {
      if (payload && payload.sub && payload.sub.id) {
         const login = payload.sub.id;
         dispatch(actionPromise(getUserByLogin(login)))
            .then((response) => {
               console.log("GraphQL Response:", response);
            })
            .catch((error) => {
               console.log("Error:", error);
            });
      }
   }, [dispatch, payload]);

   return <div>list</div>;
};

export default ChatList;