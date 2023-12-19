import React from 'react';
import { AppBar, Toolbar, Button, Hidden } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const CustomButton = styled(Button)({
  color: 'white',
});

const useStyles = {
  appBar: {
    backgroundColor: '#394049',
  },
  logo: {
    width: '150px',
  },
  buttonContainer: {
    marginLeft: 'auto', // Alinear el contenedor de botones a la derecha
  },
};

const Navbar = () => {
  return (
    <AppBar position="static" sx={useStyles.appBar}>
      <Toolbar>
        <img
          src="https://array.informatica.usach.cl/images/DIINF-opc.blanco%20(1).png"
          alt="logo"
          style={useStyles.logo}
        />
        <Hidden smDown>
          <div style={useStyles.buttonContainer}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CustomButton>Inicio</CustomButton>
            </Link>
            <Link to="/GestionarProfesores" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CustomButton>Profesores</CustomButton>
            </Link>
            <Link to="/TablaProyectores" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CustomButton>Proyectores</CustomButton>
            </Link>
            <Link to="/OpcionesPrestamo" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CustomButton>Prestamo</CustomButton>
            </Link>
          </div>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
