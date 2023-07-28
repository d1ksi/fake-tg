export const resetButton = () => ({
   type: 'RESET_BUTTON',
});

const initialState = {
   isButtonClicked: false,
   settingsIconClicked: false,
   profileSettings: false,
};


export const buttonReducer = (state = initialState, action) => {
   if (action.type === 'TOGGLE_BUTTON') {
      return {
         ...state,
         isButtonClicked: !state.isButtonClicked,
      };
   } else if (action.type === 'TOGGLE_SETTINGS_ICON') {
      return {
         ...state,
         settingsIconClicked: !state.settingsIconClicked,
      };
   } else if (action.type === 'TOGGLE_PROFILE') {
      return {
         ...state,
         profileSettings: !state.profileSettings,
      };
   } else if (action.type === 'RESET_BUTTON') {
      return {
         ...state,
         isButtonClicked: false,
         settingsIconClicked: false,
         profileSettings: false,
      };
   } else {
      return state;
   }
};
