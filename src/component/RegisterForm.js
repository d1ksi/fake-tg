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
import Switch from '@mui/material/Switch';


const RegisterPageForm = () => {
   const [login, setLogin] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [showAlert, setShowAlert] = useState(false);
   const [isDarkMode, setIsDarkMode] = useState(false);
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
      // Перенаправление на страницу "/login"
      navigate('/login');
   };

   const handleSwitchChange = () => {
      setIsDarkMode(!isDarkMode); // Инвертируем текущее состояние isDarkMode
   };

   const getRegisterWrapperClassName = () => {
      return isDarkMode ? 'darkmode' : 'lightmode';
   };
   const switchText = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';

   return (
      <div className={getRegisterWrapperClassName()}>
         <div className='switcher'>
            <p>{switchText}</p>
            <Switch
               checked={isDarkMode}
               onChange={handleSwitchChange}
            />
         </div>
         <div className='registerformwraper'>
            <Stack spacing={2} sx={{ marginBottom: showAlert ? '20px' : 0, width: '200px' }}>
               {showAlert && (
                  <Alert severity="error" onClose={() => setShowAlert(false)}>
                     <AlertTitle>Error</AlertTitle>
                     Passwords — <strong>do not match!</strong>
                  </Alert>
               )}
               <TextField
                  sx={{ marginTop: '112px' }}
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  label="Login"
                  variant="outlined"
               />
               <TextField
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  variant="outlined"
               />
               <TextField
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  label="Confirm Password"
                  variant="outlined"
               />
            </Stack>
            <Box sx={{ margin: '20px 0px 10px 0px' }}>
               <div>
                  <Button size="small" onClick={handleButtonClick}>
                     Already registered
                  </Button>
               </div>
            </Box>
            <Stack direction="row" spacing={2} sx={{ margin: '10px 0px 20px 0px' }}>
               <Button variant="contained" color="success" onClick={handleRegisterPage}>
                  Register
               </Button>
            </Stack>
         </div>
      </div>
   );
}

export default RegisterPageForm;
