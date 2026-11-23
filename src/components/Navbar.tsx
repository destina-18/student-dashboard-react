
import {
  Box,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import { useNavigate } from "react-router-dom";

type NavbarProps = {
  onToggleSidebar: () => void;
  title: string;
};

export default function Navbar({
  onToggleSidebar,
  title,
}: NavbarProps) {
  const navigate = useNavigate();

  return (
    <Box className="navbar">
      <Box className="navbar-left">
        <IconButton
          onClick={onToggleSidebar}
          className="menu-toggle"
          aria-label="Buka menu"
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6">
          {title}
        </Typography>
      </Box>

      <Box className="navbar-right">
        <IconButton className="notification-button">
          <NotificationsNoneIcon />
        </IconButton>

        <Box
          className="navbar-profile"
          onClick={() => navigate("/settings")}
          sx={{ cursor: "pointer" }}
        >
          <Avatar className="profile-avatar">
            A
          </Avatar>

          <Box className="profile-text">
            <Typography variant="caption">
              Admin Sekolah
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
