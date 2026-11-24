
import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const pageTitles: Record<string, string> = {
    "/": "Dashboard",
    "/students": "Data Siswa",
    "/settings": "Pengaturan",
  };

  const title = pageTitles[location.pathname] || "Dashboard";

  return (
    <Box className="app-layout">
      <Sidebar open={sidebarOpen} />

      <Box className="main-content">
        <Navbar
          title={title}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <Box className="page-content">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
