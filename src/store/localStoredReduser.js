export function localStoredReduser(originalReducer, localStorageKey) {

   return function wrapper(state, action) {
      if (state === undefined) {
         const keyData = localStorage.getItem(localStorageKey);

         if (keyData !== '{}' && keyData !== null) {
            return JSON.parse(keyData);
         }
      }

      const newState = originalReducer(state, action);
      localStorage.setItem(localStorageKey, JSON.stringify(newState));
      return newState;
   };
}