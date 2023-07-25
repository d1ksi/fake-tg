import { getGQL } from "../utils/index";

export const register = async (login, password) => {
  const register = `
    mutation register($login: String!, $password: String!) {
      UserUpsert(user: { login: $login, password: $password }) {
        _id
        createdAt
        login
      }
    }
  `;

  return getGQL(register, { login, password });
};


export const log = async (login, password) => {
  const logqwery = `query login($login:String, $password:String){
      login(login:$login, password:$password)
      }`;
  return getGQL(logqwery, { login: login, password: password });
};


export const checkUser = async (userlogin) => {
  const UserFindOne = `query checkid($query: String){
    UserFindOne(query: $query) {
      _id
      login
      avatar{url}
    }
  }`;
  return getGQL(UserFindOne, { "query": `[{"login": "${userlogin}"}]` })
}


export const getUserById = async (id) => {
  const UserFindOne = `query($query: String){
    UserFindOne(query: $query) {
      _id
      login
      nick
      avatar{url}
      chats{ 
        _id
        lastModified
        members{
          _id
          login
          nick
          avatar{url}
        }
        messages{   
          owner{
            _id
            login
            nick
            avatar{url}
          }
          text    
            }
      }
      
    }
  }`;
  return getGQL(UserFindOne, { "query": `[{ "_id": "${id}" }]` })
}


export const chatCreate = async (arr) => {
  const ChatUpsert = `mutation createChat($chat: ChatInput){
      ChatUpsert(chat: $chat){
        _id
        title
        avatar{url}
        owner{
          _id
          login
          nick
          avatar{url}
        }
        members{
          _id
          login
          nick
          avatar{url}
        }
      }
    }`;
  return getGQL(ChatUpsert, { "chat": { "members": arr } })
}


export const deleteChat = async (chatId, members) => {
  const delChat = `mutation delChat($chat: ChatInput){
    ChatUpsert(chat: $chat){
      _id
      members{
        _id
      }
    }
  }`;
  return getGQL(delChat, { "chat": { "_id": chatId, "members": members } })
}



export const chatFindById = async (id) => {
  const ChatFindOne = `query getChatById($query: String){
      ChatFindOne(query: $query){
        _id
        lastModified
        lastMessage{
          owner{
            login
            nick
            avatar{url}
          }
          text
          media{url}
        }
        title
        avatar{url}
        members{
          _id
          login
          nick
          avatar{url}
        }
        messages{
          _id
          owner{
            login
            nick
            avatar{url}
          }
          text
          media{url}
        }
      }
    }`;
  return getGQL(ChatFindOne, { "query": `[{"_id": "${id}"}]` })
}


export const messageCreate = async (chatId, message) => {
  const MessageUpsert = `mutation messagecreate($message: MessageInput){
      MessageUpsert(message: $message){
        _id
        owner{
          nick
          login
          avatar{url}
        }
        text
      }
    }`;
  return getGQL(MessageUpsert, { "message": { "chat": { "_id": `${chatId}` }, "text": `${message}` } })
}