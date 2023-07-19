import React from 'react';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';

const CreateBtn = () => {
   const isButtonClicked = useSelector((state) => state.button.isButtonClicked);
   const dispatch = useDispatch();

   const handleClick = () => {
      dispatch({ type: 'TOGGLE_BUTTON' });
   };

   return (
      <div className="createchatbtn">
         <Button variant="contained" onClick={handleClick}>
            {isButtonClicked ? 'Cancel' : 'Create Chat'}
         </Button>
      </div>
   );
};

export default CreateBtn;
