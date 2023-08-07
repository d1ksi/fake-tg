import { useSelector } from 'react-redux';
import Sms from './OneMessage';
import { useParams } from 'react-router';


const MsgFromChat = () => {
   const chatId = useParams();
   const allMessage = useSelector((state) => state?.chat[chatId]?.messages) || [];

   return (
      <div className='messagefromonechat'>
         <Sms allMessage={allMessage} />
      </div>
   )
}


export default MsgFromChat