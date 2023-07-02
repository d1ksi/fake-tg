import { log } from "../API/gql";
import { actionAuthLogin } from '../store/promiseReduser'


export function actionFullLogin(login, password) {
   return async () => {
      try {
         const data = await log(login, password);
         console.log(data);
         if (data && data?.data?.login) {
            await actionAuthLogin(data?.data?.login);
         };
         // if (data?.data?.login.length > 0) {
         //    <div>all good</div>
         // }
         if (data?.data?.login === null) {
            alert("Не верные данные для входа")
         }

      } catch (error) {
         console.log(error);
      };
   }
}