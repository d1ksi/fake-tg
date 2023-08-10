export function jwtDecode(token) {
   if (typeof token !== 'undefined' && token.length > 0) {
      const [, payload] = token.split(".");
      const secretPart = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
      return JSON.parse(secretPart);
   }
   return null;
}


export const actionAuthLogin = (token) => ({ type: "AUTH_LOGIN", token });
export const actionAuthLogout = () => ({ type: "AUTH_LOGOUT" });



export function authReducer(state = {}, { type, token }) {
   if (type === "AUTH_LOGIN") {
      const payload = jwtDecode(token);
      localStorage.authToken = token;
      window.location.href = '/';
      return { token, payload };
   }
   if (type === "AUTH_LOGOUT") {
      delete localStorage.authToken;
      window.location.href = '/login';
      return {};
   }
   return state;
}