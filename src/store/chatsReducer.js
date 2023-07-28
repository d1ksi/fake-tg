export const chatsReducer = (state = {}, action) => {
   if (action.type === 'ADD_CHATS') {
      const newState = { ...state };
      action.chats.forEach(chat => {
         newState[chat._id] = chat;
      });

      return newState;
   }

   if (action.type === 'ADD_CHAT') {
      return { ...state, [action.chat._id]: action.chat };
   }

   if (action.type === 'ADD_MESSAGES') {
      const { chatId, messages } = action;
      const chat = state[chatId];
      if (chat) {
         const chatMessages = chat.messages || []
         const updatedChat = { ...chat, messages: [...chatMessages, ...messages] };
         return { ...state, [chatId]: updatedChat };
      }
      return state;
   }

   if (action.type === 'ADD_MESSAGE') {
      const { chatId, message } = action;
      const chat = state[chatId];
      const updatedMessages = [...chat.messages, message];
      const updatedChat = { ...chat, messages: updatedMessages };
      return { ...state, [chatId]: updatedChat };

   }

   if (action.type === 'DEL_CHAT') {
      const { chatId, memberId } = action;
      const chat = state[chatId];
      const updatedMembers = chat.members.filter(member => member._id !== memberId);
      const updatedChat = { ...chat, members: updatedMembers };
      return { ...state, [chatId]: updatedChat };
   }

   return state;
};

export const addChats = (chats) => ({ type: 'ADD_CHATS', chats });
export const addChat = (chat, chatId) => ({ type: 'ADD_CHAT', chat });
export const addMessages = (messages, chatId) => ({ type: 'ADD_MESSAGES', messages, chatId });
export const addMessage = (message, chatId) => ({ type: 'ADD_MESSAGE', message, chatId });
export const deleteChatAction = (memberId, chatId) => ({ type: 'DEL_CHAT', memberId, chatId });