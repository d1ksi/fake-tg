import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { actionAuthLogout } from "../store/authReducer";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";


export default function BasicMenu() {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { payload } = useSelector(state => state.auth);
   const userId = React.useMemo(() => payload?.sub?.id, [payload]);




   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };
   const profileSet = () => {
      navigate(`/profile/${userId}`)
      setAnchorEl(null);
   };
   const Logout = () => {
      dispatch(actionAuthLogout());
   }


   return (
      <div>
         <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
         >
            <Box
               sx={{
                  "& > :not(style)": {
                     m: "10px"
                  }
               }}
            >
               <AccountCircleIcon fontSize="large" sx={{ color: "black", width: "50px", height: "50px" }} />
            </Box>
         </Button>
         <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
               "aria-labelledby": "basic-button"
            }}
         >
            <MenuItem onClick={profileSet}>Profile</MenuItem>
            <MenuItem onClick={Logout}>Logout</MenuItem>
         </Menu>
      </div>
   );
}