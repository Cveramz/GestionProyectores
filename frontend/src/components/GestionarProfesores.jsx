// GestionarProfesores.jsx
import React, { useState, useEffect } from 'react';
import { Button, Typography, Paper, IconButton } from '@mui/material';
import CrearProfesor from './CrearProfesor';
import EditarProfesor from './EditarProfesor'; // Importa el nuevo componente
import TablaProfesores from './TablaProfesores';
import { Link } from 'react-router-dom';

const GestionarProfesores = () => {
  const [openCrearProfesor, setOpenCrearProfesor] = useState(false);
  const [autoClosePaper, setAutoClosePaper] = useState(false);
  const [profesores, setProfesores] = useState([]);
  const [profesorSeleccionado, setProfesorSeleccionado] = useState(null);

  const handleOpenCrearProfesor = () => {
    setOpenCrearProfesor(true);
    setAutoClosePaper(false);
    setProfesorSeleccionado(null);
  };

  const handleCloseCrearProfesor = () => {
    setOpenCrearProfesor(false);
    setProfesorSeleccionado(null);
  };

  const handleProfesorCreated = () => {
    setAutoClosePaper(true);
    setProfesorSeleccionado(null);
    // Actualizar la lista de profesores después de agregar uno nuevo
    fetchProfesores();
  };

  const handleEditarProfesor = (profesor) => {
    setOpenCrearProfesor(true);
    setAutoClosePaper(false);
    setProfesorSeleccionado(profesor);
  };

  const handleEliminarProfesor = (idProfesor) => {
    // Realizar la llamada al backend para eliminar al profesor con el ID proporcionado
    fetch(`http://localhost:8080/profesores/${idProfesor}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Actualizar la lista de profesores después de eliminar uno
          fetchProfesores();
        } else {
          console.error('Error al eliminar profesor');
        }
      })
      .catch((error) => console.error('Error al eliminar profesor:', error));
  };

  const fetchProfesores = () => {
    // Llamada al endpoint para obtener el listado de profesores
    fetch('http://localhost:8080/profesores')
      .then((response) => response.json())
      .then((data) => setProfesores(data))
      .catch((error) => console.error('Error fetching profesores:', error));
  };

  // Llamada inicial para obtener el listado de profesores al montar el componente
  useEffect(() => {
    fetchProfesores();
  }, []);

  // Efecto para cerrar automáticamente el Paper después de 1 segundo
  useEffect(() => {
    if (autoClosePaper) {
      const timeoutId = setTimeout(() => {
        setOpenCrearProfesor(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [autoClosePaper]);

  return (
    <div>
      <br />
      <Typography variant="h4" gutterBottom>
        Gestionar Profesores
      </Typography>
      <hr />
      <Button variant="contained" color="error" component={Link} to="/Inicio">
        Volver al inicio
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenCrearProfesor}
      >
        Crear Profesor
      </Button>

      {openCrearProfesor && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro
              zIndex: 999,
            }}
          ></div>
          <Paper
            elevation={3}
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              padding: '2rem',
              zIndex: 1000,
            }}
          >
            {profesorSeleccionado ? (
              <EditarProfesor
                profesor={profesorSeleccionado}
                onClose={handleCloseCrearProfesor}
                onProfesorUpdated={() => {
                  fetchProfesores(); // Actualiza la lista de profesores después de editar uno
                  handleCloseCrearProfesor(); // Cierra el formulario de edición
                }}
              />
            ) : (
              <CrearProfesor
                onClose={handleCloseCrearProfesor}
                onProfesorCreated={handleProfesorCreated}
              />
            )}
            <IconButton
              aria-label="Cerrar"
              onClick={handleCloseCrearProfesor}
              sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
            >
              X
            </IconButton>
          </Paper>
        </>
      )}

      <TablaProfesores
        profesores={profesores}
        onEditar={handleEditarProfesor}
        onEliminar={handleEliminarProfesor}
      />
    </div>
  );
};

export default GestionarProfesores;
