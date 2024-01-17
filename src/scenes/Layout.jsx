import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useGetUserQuery } from "../redux/api";
import { useSelector } from "react-redux";

export default function Layout() {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);
  //console.log(data);

  return (
    <>
      <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
        <Sidebar
          user={data || {}}
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <Box>
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <Outlet />
        </Box>
      
      </Box>
    </>
  );
}
