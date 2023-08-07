const stateDefault = {};

export const chatsReducer = (state = stateDefault, action) => {
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
   if (action.type === 'ADD_MESSAGE') {
      const { msg, chatId } = action;
      const chat = state[chatId];
      const messageInChat = chat.messages || [];
      const updatedMessages = [...messageInChat, msg];
      const uniqueMessages = updatedMessages.reduce((acc, message) => {
         if (!message._id || !acc.some((m) => m._id === message._id)) {
            acc.push(message);
         }
         return acc;
      }, []);
      const updatedChat = { ...chat, messages: uniqueMessages };
      const newState = { ...state, [chatId]: updatedChat };
      return newState
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
export const addChat = (chat) => ({ type: 'ADD_CHAT', chat });
export const addMessage = (msg, chatId) => ({ type: 'ADD_MESSAGE', msg, chatId });
export const deleteChatAction = (memberId, chatId) => ({ type: 'DEL_CHAT', memberId, chatId });