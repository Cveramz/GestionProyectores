import React from 'react';
import { Typography, Paper, Container, Box } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

function Inicio() {
  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
      <Paper elevation={3} sx={{ padding: '2rem', textAlign: 'center' }}>
        <Box sx={{ marginBottom: '1rem' }}>
          <InfoIcon fontSize="large" color="primary" />
        </Box>
        <Typography variant="h4" gutterBottom>
          Bienvenido a la Aplicación de Gestión de proyectores
        </Typography>
        <Typography variant="body1" paragraph>
          Explora las funcionalidades a través del menú de navegación.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Inicio;
