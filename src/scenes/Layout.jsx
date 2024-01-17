import React, {useState} from 'react';
import {Box, useMediaQuery} from "@mui/material";
import {Outlet} from "react-router-dom";
import Header from '../components/Header';


export default function Layout() {
  return (
    <>
    <Box width="100%" height="100%" >
      <Box>
        <Header/>
        <Outlet/>
      </Box>
    </Box>
    </>
    
  )
}
