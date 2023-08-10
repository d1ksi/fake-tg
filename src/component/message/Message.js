import MessageField from "./MessageField"
import OneMessage from './OneMessage';


const Message = () => {
   return (
      <>
         <div className='messagefromonechat'>
            <OneMessage />
         </div>
         < MessageField />
      </>
   )
}


export default Message;