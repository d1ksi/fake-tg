import { log } from "../API/gql";
import { actionAuthLogin } from "../store/authReducer";



export function actionFullLogin(login, password) {
   return async (dispatch) => {
      try {
         const data = await log(login, password);
         console.log(data);
         if (data && data?.data?.login) {
            await dispatch(actionAuthLogin(data?.data?.login));
            window.location.href = '/';
         }
         if (data?.data?.login === null) {
            alert("Не верные данные для входа")
         }
      } catch (error) {
         console.log(error);
      };
   }
} 