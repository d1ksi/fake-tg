const initialState = {
   isButtonClicked: false,
};

export const buttonReducer = (state = initialState, action) => {
   if (action.type === 'TOGGLE_BUTTON') {
      return {
         ...state,
         isButtonClicked: !state.isButtonClicked,
      };
   } else {
      return state;
   }
};
