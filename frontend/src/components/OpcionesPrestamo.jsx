import React from 'react';
import { Typography, Paper, Container, Button } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';

function OpcionesPrestamo() {
  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
      <Paper elevation={3} sx={{ padding: '2rem', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
        Control de Préstamos
        </Typography>
        <Typography variant="body1" paragraph>
          Seleccione una opción
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          href="/Solicitud"
          startIcon={<SendIcon />}
          sx={{ margin: '0.5rem' }}
        >
          Solicitud
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          href="/Devolucion"
          startIcon={<ReplyIcon />}
          sx={{ margin: '0.5rem' }}
        >
          Devolver
        </Button>
        <Button
          variant="outlined"
          color="info"
          href="/Reporte"
          startIcon={<LibraryBooksIcon />}
          sx={{ margin: '0.5rem' }}
        >
          Reporte
        </Button>
      </Paper>
    </Container>
  );
}

export default OpcionesPrestamo;
