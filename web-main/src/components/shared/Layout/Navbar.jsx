// web/src/components/shared/Layout/NavBar.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Material UI Components
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Tooltip,
} from '@mui/material';

// Material UI Icons
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
  Assignment as AssignmentIcon,
  Description as DescriptionIcon,
  SupervisorAccount as AdminIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('userName');

  const handleNavigate = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const adminMenuItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon />, 
      path: '/admin/dashboard',
      onClick: () => handleNavigate('/admin/dashboard')
    },
    { 
      text: 'All Certificates', 
      icon: <DescriptionIcon />, 
      path: '/admin/certificates',
      onClick: () => handleNavigate('/admin/certificates')
    },
    { 
      text: 'Manage Users', 
      icon: <AdminIcon />, 
      path: '/admin/users',
      onClick: () => handleNavigate('/admin/users')
    }
  ];

  const userMenuItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon />, 
      path: '/user/dashboard',
      onClick: () => handleNavigate('/user/dashboard')
    },
    { 
      text: 'My Certificates', 
      icon: <AssignmentIcon />, 
      path: '/user/certificates',
      onClick: () => handleNavigate('/user/certificates')
    },
    { 
      text: 'Request Certificate', 
      icon: <AddIcon />, 
      path: '/user/request',
      onClick: () => handleNavigate('/user/request')
    }
  ];

  const menuItems = role === 'ADMIN' ? adminMenuItems : userMenuItems;

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => setDrawerOpen(true)}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => handleNavigate('/')}
        >
          OCMS
        </Typography>

        {username && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton 
                onClick={(e) => setMenuAnchor(e.currentTarget)}
                sx={{ ml: 2 }}
              >
                <Avatar sx={{ bgcolor: role === 'ADMIN' ? 'secondary.main' : 'primary.main' }}>
                  {username.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem disabled>
                <Typography variant="body2">
                  Signed in as: {username}
                </Typography>
              </MenuItem>
              <MenuItem disabled>
                <Typography variant="body2" color="primary">
                  Role: {role}
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={onLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
        >
          <List>
            {menuItems.map((item) => (
              <ListItem 
                button 
                key={item.text}
                onClick={item.onClick}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;