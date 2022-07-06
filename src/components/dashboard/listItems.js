import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import FlightIcon from '@mui/icons-material/Flight';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ConstructionIcon from '@mui/icons-material/Construction';
import GppGoodIcon from '@mui/icons-material/GppGood';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import {useNavigate} from 'react-router-dom';

export default function MainListItems() {
  const history = useNavigate();
  const [openReserva, setOpenReserva] = React.useState(false);
  const [openAdministracion, setOpenAdministracion] = React.useState(false);

  const handleClick = (param) => {

    switch (param) {
      case 1: setOpenReserva(!openReserva);
        break;
      case 2: setOpenAdministracion(!openAdministracion);
      break;
      default:
    }

  };

  return (
    <List>
    <ListItemButton> 
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton onClick={() => handleClick(1) }>
        <ListItemIcon>
          <FlightIcon />
        </ListItemIcon>
        <ListItemText primary="Reservas" />
        {openReserva ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
      <Collapse in={openReserva} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>

    <ListItemButton onClick={() => handleClick(2)}>
      <ListItemIcon>
        <MarkunreadMailboxIcon />
      </ListItemIcon>
      <ListItemText primary="Administración" />
      {openAdministracion ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={openAdministracion} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Cambio(TRM/IATA)" />
          </ListItemButton>
        </List>
    </Collapse>
    

    <ListItemButton>
      <ListItemIcon>
        <InventoryIcon />
      </ListItemIcon>
      <ListItemText primary="Producto" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AccountBalanceIcon />
      </ListItemIcon>
      <ListItemText primary="Contabilidad" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ConstructionIcon />
      </ListItemIcon>
      <ListItemText primary="Parametrización" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <GppGoodIcon />
      </ListItemIcon>
      <ListItemText primary="Seguridad" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reportes" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SupportAgentIcon />
      </ListItemIcon>
      <ListItemText primary="Soporte" />
    </ListItemButton>
    </List>
  );
}

