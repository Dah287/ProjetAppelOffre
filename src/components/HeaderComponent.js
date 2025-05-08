import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem, 
  Drawer, 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText 
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ListAlt as TicketsIcon,
  People as UsersIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

const HeaderComponent = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const history = useHistory();
    const location = useLocation();
    const [drawerOpen, setDrawerOpen] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleLogout = () => {
        localStorage.removeItem('user');
        history.push('/login');
    };

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {/* Barre de navigation */}
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(!drawerOpen)}>
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <Avatar 
                            src="/ormvad_1.jpg" 
                            sx={{ 
                                mr: 2,
                                width: 40,
                                height: 40,
                                border: '3px solid #fff',
                                borderRadius: '12px'
                            }}
                        />
                        <Typography variant="h6" component="div">
                            Application d'Appels d'Offres
                        </Typography>
                    </Box>

                    <IconButton color="inherit">
                        <NotificationsIcon />
                    </IconButton>
                    
                    <IconButton onClick={handleAvatarClick} color="inherit">
                        <Avatar sx={{ marginLeft: 2 }}>
                            {user ? user.nom.charAt(0) : 'A'}
                        </Avatar>
                    </IconButton>
                    
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        {user && (
                            <MenuItem disabled>
                                <Typography variant="body1">{user.nom}</Typography>
                            </MenuItem>
                        )}
                        <MenuItem onClick={handleLogout}>
                            <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                            Déconnexion
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            
            {/* Menu latéral */}
            <Drawer
                variant="persistent"
                open={drawerOpen}
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { 
                        width: 240, 
                        boxSizing: 'border-box',
                        backgroundColor: '#f5f5f5'
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {user && location.pathname !== '/login' && user.role === 'admin' && (
                            <>
                                <ListItem 
                                    button 
                                    component={Link} 
                                    to="/dashboard"
                                    selected={location.pathname === '/dashboard'}
                                >
                                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                                    <ListItemText primary="RECAP" />
                                </ListItem>
                                <ListItem 
                                    button 
                                    component={Link} 
                                    to="/appelOffres"
                                    selected={location.pathname === '/appelOffres'}
                                >
                                    <ListItemIcon><TicketsIcon /></ListItemIcon>
                                    <ListItemText primary="Liste des Appels d'Offres" />
                                </ListItem>
                                <ListItem 
                                    button 
                                    component={Link} 
                                    to="/recapp"
                                    selected={location.pathname === '/recapp'}
                                >
                                    <ListItemIcon><UsersIcon /></ListItemIcon>
                                    <ListItemText primary="Suivi de Visa" />
                                </ListItem>
                                <ListItem 
                                    button 
                                    component={Link} 
                                    to="/bande-commandes"
                                    selected={location.pathname === '/bande-commandes'}
                                >
                                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                                    <ListItemText primary="Suivi des BC" />
                                </ListItem>
                            </>
                        )}
                    </List>
                </Box>
            </Drawer>
            
            {/* Espace pour le contenu principal */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px' }}>
                {/* Votre contenu ira ici */}
            </Box>
        </>
    );
}

export default HeaderComponent;