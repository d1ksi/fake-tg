import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { actionFullLogin } from "../functional/actionFullLogin";
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';






const LoginPageForm = () => {
   const [login, setLogin] = useState("");
   const [password, setPassword] = useState("");
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const handleLoginPage = () => {
      dispatch(actionFullLogin(password, login));
   }
   const handleButtonClick = () => {
      navigate('/register');
   };
   return (
      <div className='registerformwraper'>
         <Stack spacing={2} sx={{ width: '200px' }}>
            <TextField
               sx={{
                  marginTop: '112px',
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                     borderColor: "#ea0000"
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                     color: "white"
                  }
               }}
               type="text"
               value={login}
               onChange={(e) => setLogin(e.target.value)}
               label="Login"
               variant="outlined"
            />
            <TextField
               sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                     borderColor: "#ea0000"
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                     color: "white"
                  }
               }}
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               label="Password"
               variant="outlined"
            />
         </Stack>
         <Box sx={{ margin: '20px 0px 10px 0px' }}>
            <div>
               <Button size="small" onClick={handleButtonClick} sx={{ color: "white" }}>
                  Register
               </Button>
            </div>
         </Box>
         <Stack direction="row" spacing={2}>
            <Button variant="contained" color="success" onClick={handleLoginPage} sx={{ width: "200px" }}>
               Login
            </Button>
         </Stack>
      </div>
   )
}
export default LoginPageForm