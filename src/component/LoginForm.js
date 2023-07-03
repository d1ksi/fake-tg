import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { actionFullLogin } from "../functional/actionFullLogin";
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';






const LoginPageForm = () => {
   const [login, setLogin] = useState("");
   const [password, setPassword] = useState("");
   const [isDarkMode, setIsDarkMode] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const handleLoginPage = () => {
      dispatch(actionFullLogin(password, login));
   }
   const handleButtonClick = () => {
      // Перенаправление на страницу "/login"
      navigate('/');
   };
   const handleSwitchChange = () => {
      setIsDarkMode(!isDarkMode); // Инвертируем текущее состояние isDarkMode
   };

   const getLoginWrapperClassName = () => {
      return isDarkMode ? 'darkmode' : 'lightmode';
   };
   const switchText = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';
   return (
      <div className={getLoginWrapperClassName()}>
         <div className='switcher'>
            <p>{switchText}</p>
            <Switch
               checked={isDarkMode}
               onChange={handleSwitchChange}
            />
         </div>
         <div className='registerformwraper'>
            <Stack spacing={2} sx={{ width: '200px' }}>
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
            </Stack>
            <Box sx={{ margin: '20px 0px 10px 0px' }}>
               <div>
                  <Button size="small" onClick={handleButtonClick}>
                     Register
                  </Button>
               </div>
            </Box>
            <Stack direction="row" spacing={2}>
               <Button variant="contained" color="success" onClick={handleLoginPage}>
                  Login
               </Button>
            </Stack>
         </div>
      </div>
   )
}
export default LoginPageForm