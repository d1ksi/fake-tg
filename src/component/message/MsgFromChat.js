import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import Sms from './Sms';


const MsgFromChat = () => {
   const state = useSelector(state => state?.promise?.OneChatByID);
   const chat = useMemo(() => state?.payload?.data?.ChatFindOne, [state]);
   // console.log(chat);

   return (
      <>
         {chat && chat.messages && chat.messages.length > 0 ? <div className='messagefromonechat'><Sms /></div> : <div className='messagefromonechat'><p className='textinsteadofchat'>Do not be pussy, send 1st<br /> message</p></div>}
      </>
   )
}


export default MsgFromChat