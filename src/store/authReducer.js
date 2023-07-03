export function jwtDecode(token) {
   if (typeof token !== 'undefined' && token.length > 0) {
      const [, payload] = token.split(".");
      const secretPart = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
      return JSON.parse(secretPart);
   }
   return null; // или другое значение по умолчанию, если token не является корректным
}


export const actionAuthLogin = (token) => ({ type: "AUTH_LOGIN", token });
export const actionAuthLogout = () => ({ type: "AUTH_LOGOUT" });



export function authReducer(state = {}, { type, token }) {
   if (type === "AUTH_LOGIN") {
      const payload = jwtDecode(token);
      // console.log(payload);
      localStorage.authToken = token;
      // console.log(token);
      // if (localStorage.authToken) {
      //    userName.innerHTML = `Добро пожаловать,${payload.sub.login}`;
      // }
      return { token, payload };
   }
   if (type === "AUTH_LOGOUT") {
      delete localStorage.authToken;
      return {};
   }
   return state;
}