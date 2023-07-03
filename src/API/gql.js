import { getGQL } from "../utils/index";

export const register = (login, password) => {
   const register = `
    mutation register($login: String!, $password: String!) {
      UserUpsert(user: { login: $login, password: $password }) {
        _id
        createdAt
        login
      }
    }
  `;

   return getGQL(register, { login, password });
};


export const log = (login, password) => {
   const logqwery = `query login($login:String, $password:String){
      login(login:$login, password:$password)
      }`;
   return getGQL(logqwery, { login: login, password: password });
};