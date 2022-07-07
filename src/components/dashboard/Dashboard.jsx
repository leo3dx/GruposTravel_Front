import React, {useState, useEffect} from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MainListItems  from './listItems';
import logo from '../../assets/img/logo.jpeg';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

import CambioTrmIata from '../administrador/administracion/cambiotrmiata/CambioTrmIata';

import CnfMoneda from '../administrador/parametrizacion/cnfmonedas/CnfMoneda';
import EditCnfMoneda from '../administrador/parametrizacion/cnfmonedas/EditCnfMoneda';
import CreateCnfMoneda from '../administrador/parametrizacion/cnfmonedas/CreateCnfMoneda';

import CnfTipoFactor from '../administrador/parametrizacion/cnftipofactor/CnfTipoFactor';
import EditCnfTipoFactor from '../administrador/parametrizacion/cnftipofactor/EditCnfTipoFactor';
import CreateCnfTipoFactor from '../administrador/parametrizacion/cnftipofactor/CreateCnfTipoFactor';


const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#278e8e',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    backgroundColor: '#278e8e',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [titulo, setTitulo] = useState('Administrador');
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Router>
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {titulo}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <img src={logo} alt="" width="200" height="60"/>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems />
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />

          {/* Contenido */}
          <div className="container-fluid mt-5">
            <Routes>
                <Route path='/administrador/cambio' exact element={<CambioTrmIata/>}/>

                <Route path='/administrador/cnfmoneda' exact element={<CnfMoneda/>}/>
                <Route path='/administrador/editcnfmoneda/:id' exact element={<EditCnfMoneda/>}/>
                <Route path='/administrador/createcnfmoneda' exact element={<CreateCnfMoneda/>}/>
                
                <Route path='/administrador/cnftipofactor' exact element={<CnfTipoFactor/>}/>
                <Route path='/administrador/editcnftipofactor/:id' exact element={<EditCnfTipoFactor/>}/>
                <Route path='/administrador/createcnftipofactor' exact element={<CreateCnfTipoFactor/>}/>
            </Routes>
          </div>
        </Box>
      </Box>
    </ThemeProvider>
    </Router>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
