
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

import { useLocation, useNavigate } from "react-router-dom";

type SidebarProps = {
  open: boolean;
};

export default function Sidebar({ open }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      path: "/",
      icon: <DashboardIcon />,
    },
    {
      name: "Data Siswa",
      path: "/students",
      icon: <PeopleIcon />,
    },
    {
      name: "Pengaturan",
      path: "/settings",
      icon: <SettingsIcon />,
    },
  ];

  return (
    <Box className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <Box className="sidebar-logo">
        <Box className="sidebar-logo-icon">
          <img
            src="/images/logo-telkom.png"
            alt="Logo Telkom Schools"
            width={45}
            height={45}
            style={{ objectFit: "contain" }}
          />
        </Box>

        <Typography variant="h6">
          Student
        </Typography>
      </Box>

      <Typography className="sidebar-label">
        MENU UTAMA
      </Typography>

      <List className="sidebar-menu">
        {menus.map((menu) => (
          <ListItemButton
            key={menu.name}
            selected={location.pathname === menu.path}
            onClick={() => navigate(menu.path)}
            className="sidebar-item"
          >
            <ListItemIcon>
              {menu.icon}
            </ListItemIcon>

            <ListItemText primary={menu.name} />
          </ListItemButton>
        ))}
      </List>

      <Box className="sidebar-footer">
        <Typography variant="caption">
          Tahun Ajaran 2026/2027
        </Typography>
      </Box>
    </Box>
  );
}
