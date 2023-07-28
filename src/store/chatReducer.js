export const setChats = (chats) => ({ type: 'SET_CHATS', chats });
export const addChat = (chat) => ({ type: 'ADD_CHAT', chat });
export const addMessages = (messages, chatId) => ({ type: 'ADD_MESSAGES', messages, chatId });



const initialState = {};

export const chatReducer = (state = initialState, action) => {
   if (action.type === 'SET_CHATS') {
      return {
         ...state,
         ...action.chats.map(chat => ({ [chat._id]: chat }))
      };
   } else if (action.type === 'ADD_CHAT') {
      const { chat } = action;
      return {
         ...state,
         [chat._id]: chat,
      };
   } else if (action.type === 'ADD_MESSAGES') {
      const { messages, chatId } = action;
      const existingMessages = state[chatId]?.messages || [];
      return {
         ...state,
         [chatId]: {
            ...state[chatId],
            messages: [...existingMessages, ...messages],
         },
      };
   } else {
      return state;
   }
};