import { API_URL_GRAPHQL } from "../constants/chatApiUrl"


export async function getGQL(query, variables) {
   const url = API_URL_GRAPHQL;
   const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
   };
   if (localStorage.authToken) {
      headers.Authorization = "Bearer " + localStorage.authToken;
   }
   const result = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ query: query, variables: variables }),
   });
   const data = await result.json();
   return data;
}