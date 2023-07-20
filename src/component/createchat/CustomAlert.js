import Stack from '@mui/material/Stack';


export const CustomAlert = ({ message, height }) => (
   <Stack sx={{ width: '200px', height: height }} spacing={2} >
      <div style={{ background: 'red', color: 'white', padding: '10px', border: '1px solid #ccc' }}>
         {message}
      </div>
   </Stack >
);