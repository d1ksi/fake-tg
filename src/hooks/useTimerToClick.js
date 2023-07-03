import { useState, useEffect } from 'react';

const useTimerToClick = (delay) => {
   const [isClickable, setIsClickable] = useState(true);
   useEffect(() => {
      const timer = setTimeout(() => {
         setIsClickable(true);
      }, delay);
      return () => {
         clearTimeout(timer);
      };
   }, [delay]);
   const handleClick = () => {
      setIsClickable(false);
   };
   return [isClickable, handleClick];
};

export default useTimerToClick;
