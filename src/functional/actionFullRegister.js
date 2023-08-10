import { register } from "../API/gql"
import { actionFullLogin } from "./actionFullLogin";



export function actionFullRegister(login, password) {
   return async (dispatch) => {
      try {
         const reg = await register(login, password);
         if (reg?.data?.UserUpsert?.login) {
            await dispatch(actionFullLogin(login, password));
         }
         if (register.errors && register.errors.length > 0) {
            alert('Пользователь уже зарегистрирован, выберите другой Login');
         }
      } catch (error) {
         console.log(error);
      }
   };
}

