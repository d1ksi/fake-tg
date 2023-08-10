export const truncateString = (str, maxLength) => {
   if (!str) {
      return '';
   }
   if (str.length <= maxLength) {
      return str;
   }
   return str.substring(0, maxLength - 3) + '...';
};
