export const promiseReducer = (state = {}, action) => {
   if (action.type === 'PROMISE') {
      return {
         ...state,
         [action.promiseName]: {
            status: action.status,
            payload: action.payload,
            error: action.error
         }
      };
   }
   return state;
}

export const actionPromise = (promiseName, promise) => {
   return async dispatch => {
      try {
         dispatch(actionPending(promiseName));
         const result = await promise;
         dispatch(actionFulfilled(promiseName, result));
         return result;
      } catch (error) {
         dispatch(actionRejected(promiseName, error));
      }
   };
}


const actionPending = (promiseName) => ({
   type: "PROMISE",
   status: "PENDING",
   promiseName
});

const actionFulfilled = (promiseName, payload) => ({
   type: "PROMISE",
   status: "FULFILLED",
   promiseName,
   payload
});

const actionRejected = (promiseName, error) => ({
   type: "PROMISE",
   status: "REJECTED",
   promiseName,
   error
});

