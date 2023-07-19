import React from 'react';
import { useSelector } from 'react-redux';

const MessageChat = () => {
   const isButtonClicked = useSelector((state) => state.button.isButtonClicked);

   return (
      <div className={isButtonClicked ? 'messagemain' : 'messagemainwithcreate'}>
         1111
      </div>
   );
};

export default MessageChat;
