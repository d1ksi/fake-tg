import { checkUser } from "../API/gql";


export function actionCheckUser(id) {
   return async (dispatch) => {
      try {
         const data = await checkUser(id);
         console.log(data);
         if (data && data?.data?.UserFindOne) {
            return data.data.UserFindOne;
         }
         if (data?.data?.UserFindOne === null) {
            return null;
         }
      } catch (error) {
         console.log(error);
         return null;
      };
   }
}