import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { API_URL } from '../../constants/chatApiUrl';

export const PreviewImg = ({ arrImg, setArrImg }) => {
   const delImg = (idImg) => {
      const filterArrImg = [...arrImg].filter(objImg => objImg._id !== idImg);
      setArrImg(prevState => prevState = filterArrImg);
   };
   return (<>
      {arrImg?.length ? (
         <div className="imgsWrapper">
            {arrImg.map(({ url, _id }) => (
               <div
                  className="imgWrapper"
                  key={_id}
               >
                  <CloseIcon
                     sx={{ color: "black" }}
                     className="CloseIcon"
                     onClick={() => delImg(_id)}
                  />
                  <img
                     alt={_id}
                     className="imgPreview"
                     src={`${API_URL}/${url}`}
                  />
               </div>
            ))}
         </div>
      ) : null}
   </>
   );
};