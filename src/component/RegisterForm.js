import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { actionFullRegister } from "../functional/actionFullRegister";
import { useNavigate } from 'react-router-dom';


const RegisterPageForm = () => {
   const [login, setLogin] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [showAlert, setShowAlert] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleRegisterPage = () => {
      if (password !== confirmPassword) {
         setShowAlert(true);
         return;
      }
      dispatch(actionFullRegister(password, login));
   }
   const handleButtonClick = () => {
      navigate('/login');
   };

   const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
         event.preventDefault();
         handleRegisterPage();
      }
   };

   return (
      <div className='registerformwraper'>
         <Stack spacing={2} sx={{ marginBottom: showAlert ? '20px' : 0, width: '200px' }}>
            {showAlert && (
               <Alert severity="error" onClose={() => setShowAlert(false)}>
                  <AlertTitle>Error</AlertTitle>
                  Passwords — <strong>do not match!</strong>
               </Alert>
            )}
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
               onKeyDown={handleKeyDown}
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
               onKeyDown={handleKeyDown}
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
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               label="Confirm Password"
               variant="outlined"
               onKeyDown={handleKeyDown}
            />
         </Stack>
         <Box sx={{ margin: '20px 0px 10px 0px' }}>
            <div>
               <Button size="small" onClick={handleButtonClick} sx={{ color: "white" }}>
                  Already registered
               </Button>
            </div>
         </Box>
         <Stack direction="row" spacing={2} sx={{ margin: '10px 0px 20px 0px' }}>
            <Button variant="contained" color="success" onClick={handleRegisterPage} sx={{ width: "200px" }}>
               Register
            </Button>
         </Stack>
      </div>
   );
}

export default RegisterPageForm;