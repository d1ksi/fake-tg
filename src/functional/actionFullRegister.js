import { register } from "../API/gql"
import { actionFullLogin } from "./actionFullLogin";



export function actionFullRegister(login, password) {
   return async () => {
      try {
         const data = await register(login, password);
         console.log(data)
         if (data?.data?.UserUpsert?.login) {
            await actionFullLogin(login, password);
            console.log(login, password)
         }
         if (data.errors && data.errors.length > 0) {
            alert('Пользователь уже зарегистрирован, выберите другой Login');
         }
      } catch (error) {
         console.log(error);
      }
   };
}

