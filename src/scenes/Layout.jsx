import React, {useState} from 'react';
import {Box, useMediaQuery} from "@mui/material";
import {Outlet} from "react-router-dom";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';


export default function Layout() {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
    <Box display={isNonMobile? "flex": "block"} width="100%" height="100%" >
      <Sidebar isNonMobile = {isNonMobile} drawerWidth = "250px" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      <Box>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <Outlet/>
      </Box>
    </Box>
    </>
    
  )
}
