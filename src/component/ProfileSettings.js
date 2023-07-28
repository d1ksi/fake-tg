import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUserById } from "../API/gql";
import { actionPromise } from "../store/promiseReduser";


const ProfileSet = () => {
   const isButtonClicked = useSelector((state) => state.button.isButtonClicked);
   const { payload } = useSelector(state => state.auth);
   const [userData, setUserData] = useState(null);

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

   console.log(userData);

   const userAvatar = userData && userData?.avatar && userData?.avatar?.length > 0 ? userData?.avatar?.url : '';

   return (
      <div className={isButtonClicked ? 'messagemain' : 'messagemainwithcreate'}>1111</div>
   )
}
export default ProfileSet