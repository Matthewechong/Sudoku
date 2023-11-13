import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useProfileContext } from "../contexts/CurrentGridContext";
import { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';
import { GetUser } from '../services/ProfileService';
import axios from 'axios';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const styles = {
  github: {
    color: 'white',
    backgroundColor: 'black',
    marginBottom: '10px'
  },
  google: {
    color: 'white',
    backgroundColor: 'blue',
    marginBottom: '10px'
  }
}
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { profile, setProfile } = useProfileContext();
  const [open, setOpen] = React.useState(false);

  const BASE = import.meta.env.VITE_BASEURL
  const GOOGLE_LOGIN = BASE + import.meta.env.VITE_GOOGLE_LOGIN_URL
  const GITHUB_LOGIN = BASE + import.meta.env.VITE_GITHUB_LOGIN_URL
  const logoutUrl = BASE + import.meta.env.VITE_LOGOUT
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      // If the reason is backdropClick, do not close the dialog
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE + '/api/user'); // Replace with your actual endpoint
        setProfile(response.data['name'])
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    console.log(profile);
    console.log(profile === " ");
    if (profile === " ") {
      setOpen(true);
    }
    else {
      setOpen(false);
    }
    console.log(profile)
  }, [profile])


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          backdrop="static"
          disableBackdropClick
        >
          <DialogTitle id="alert-dialog-title">
            {"Log in to Your Account"}
          </DialogTitle>
          <DialogContent>
            <Stack>
              <Button sx={styles.google} variant='contained' href={GOOGLE_LOGIN}>Continue with Google</Button>

              <Button sx={styles.github} variant='contained' href={GITHUB_LOGIN}>Continue with Git Hub</Button>
            </Stack>

          </DialogContent>

        </Dialog>
      </div>

      <AppBar position="static">
        <Container maxWidth="false">
          <Toolbar disableGutters>
            <Typography
              variant="h3"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: "#06f1e6",
                textDecoration: 'none',
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
              }}
            >
              Sudoku
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: "#06f1e6" }}>{
                    profile[0]}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
              
                  <MenuItem href="{logoutUrl}"onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{Logout}</Typography>
                  </MenuItem>
            
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
