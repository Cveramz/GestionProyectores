import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';


const Devolucion = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [estadoDevolucion, setEstadoDevolucion] = useState('');
  const [idPrestamoSeleccionado, setIdPrestamoSeleccionado] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const fetchPrestamos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/prestamos');
      // Filtrar la lista para mostrar solo los préstamos en curso
      const prestamosEnCurso = response.data.filter((prestamo) => prestamo.estado === 'En curso');
      setPrestamos(prestamosEnCurso);
    } catch (error) {
      console.error('Error al obtener la lista de préstamos', error);
    }
  };

  useEffect(() => {
    fetchPrestamos();
  }, []);

  const formatFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.toLocaleDateString('es-ES');
    const hora = fechaObj.toLocaleTimeString('es-ES');
    return `${dia} - ${hora}`;
  };

  const getUsoTraducido = (uso) => {
    switch (uso) {
      case 'dictado':
        return 'Dictado de clases';
      case 'reuniones':
        return 'Reuniones Varias';
      case 'examen':
        return 'Examen de título';
      default:
        return uso;
    }
  };

  const confirmarDevolucion = (idPrestamo) => {
    setIdPrestamoSeleccionado(idPrestamo);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIdPrestamoSeleccionado(null);
    setEstadoDevolucion('');
  };

  const handleConfirmarDevolucion = async () => {
    try {
      const prestamoSeleccionado = prestamos.find(
        (prestamo) => prestamo.idPrestamo === idPrestamoSeleccionado
      );
  
      if (!prestamoSeleccionado) {
        console.error('No se encontró el préstamo seleccionado');
        handleCloseModal();
        return;
      }
  
      // Obtén la fecha actual en la zona horaria de Santiago
      const fechaSantiago = DateTime.local().setZone('America/Santiago');
  
      // Formatea la fecha en un formato deseado
      const fechaDevolucion = fechaSantiago.toFormat("yyyy-MM-dd'T'HH:mm:ss");
  
      await axios.put(`http://localhost:8080/prestamos/${idPrestamoSeleccionado}`, {
        estado: 'Devuelto',
      });
  
      const response = await axios.post('http://localhost:8080/devoluciones', {
        fechaDevolucion,
        estadoDevolucion,
        idPrestamo: idPrestamoSeleccionado,
        idProfesor: prestamoSeleccionado.idProfesor,
      });
  
      await axios.put(`http://localhost:8080/proyectores/${prestamoSeleccionado.idProyector}`, {
        estado: 'Activo',
      });
  
      setAlertOpen(true);
    } catch (error) {
      console.error('Error al confirmar devolución', error);
    }
  
    handleCloseModal();
  };
  


  const handleAlertClose = () => {
    setAlertOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <br />
      <Snackbar
        open={alertOpen}
        autoHideDuration={2000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleAlertClose}
          severity="success"
        >
          Devolución realizada con éxito.
        </Alert>
      </Snackbar>
      <Button variant="contained" color="error" component={Link} to="/OpcionesPrestamo">
        Volver
      </Button>
      <Alert severity="info">Seleccione un préstamo en curso</Alert>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Préstamo</TableCell>
              <TableCell>Fecha de Préstamo</TableCell>
              <TableCell>Uso</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>N° Proyector</TableCell>
              <TableCell>RUT Responsable</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prestamos.map((prestamo) => (
              <TableRow key={prestamo.idPrestamo}>
                <TableCell>{prestamo.idPrestamo}</TableCell>
                <TableCell>{formatFecha(prestamo.fechaPrestamo)}</TableCell>
                <TableCell>{getUsoTraducido(prestamo.uso)}</TableCell>
                <TableCell>{prestamo.estado}</TableCell>
                <TableCell>{prestamo.idProyector}</TableCell>
                <TableCell>{prestamo.idProfesor}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => confirmarDevolucion(prestamo.idPrestamo)}
                  >
                    Confirmar Devolución
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Confirmar Devolución</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Estado de Devolución</InputLabel>
            <Select
              value={estadoDevolucion}
              onChange={(e) => setEstadoDevolucion(e.target.value)}
            >
              <MenuItem value="Con Daños">Con Daños</MenuItem>
              <MenuItem value="Buenas Condiciones">Buenas Condiciones</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmarDevolucion} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Devolucion;
