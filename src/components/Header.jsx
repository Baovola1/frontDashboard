import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
  DarkMode,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../redux";

import profileImage from "../assets/pika.png";
import {
  AppBar,
  Button,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  useTheme,
  Typography
} from "@mui/material";



export default function Header({user, sidebarOpen, setSidebarOpen}) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handelClick =(event)=> setAnchorEl(event.currentTarget);
  const handelClose= (event)=>setAnchorEl(null);
  

  return (
    <>
      <AppBar
        sx={{
          position: "static",
          background: "none",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/*LEFT SIDE*/}
          <FlexBetween>
            <IconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
              <MenuIcon />
            </IconButton>
            <FlexBetween
              backgroundColor={theme.palette.background.alt}
              borderRadius="9px"
              gap="3rem"
              p="0.1rem 1.5rem"
            >
              <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          </FlexBetween>
          {/*RIGHT SIDE*/}
          <FlexBetween gap="1.5rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlined sx={{ fontSize: "25px" }} />
              ) : (
                <LightModeOutlined sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton>
              <SettingsOutlined sx={{ fontSize: "25px" }} />
            </IconButton>
            <FlexBetween>
                <Button onClick={handelClick} sx={{display:"flex", justifyContent:"space-between", alignItems:"center", textTransform: "none", gap:"1rem"}}>
                <Box component="img" alt='profileImage' src={profileImage} height="32px" width="32px" borderRadius="50%" sx={{objectFit:"cover"}}/>
                <Box textAlign = "left">
              <Typography fontWeight="bold" fontSize="0.85rem" sx={{color:theme.palette.secondary[100]}}>{user.name}</Typography>
              <Typography fontSize="0.75rem" sx={{color:theme.palette.secondary[200]}}>{user.occupation}</Typography>
            </Box>
                <ArrowDropDownOutlined sx={{color: theme.palette.secondary[300], fontSize:"25px"}}/>
                </Button>
                <Menu anchorEl={anchorEl} open={isOpen} onClose={handelClose} anchorOrigin={{vertical:"bottom", horizontal:"center"}}>
                  <MenuItem onClick={handelClose}>Log Out</MenuItem>
                </Menu>

            </FlexBetween>
          </FlexBetween>
        </Toolbar>
      </AppBar>
    </>
  );
}
