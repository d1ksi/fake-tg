import { useEffect, useState } from "react";
import { API_URL_GRAPHQL } from "../constants/chatApiUrl"


const useFetch = (url=`${API_URL_GRAPHQL}`, options) => {
   const [payload, setPayload] = useState();
   const [error, setError] = useState();
   useEffect(() => {
      fetch(url, options).then(res => res.json()).then(setPayload, setError)
   }, [])
   return {
      status: (payload && 'FULFILLED') || (error && 'REJECTED') || 'PENDING',
      isLoading: !payload && !error,
      payload, error
   }
}

export default useFetch