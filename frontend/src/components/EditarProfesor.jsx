// EditarProfesor.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const EditarProfesor = ({ profesor, onClose, onProfesorUpdated }) => {
  const [nombre, setNombre] = useState(profesor.nombre || '');
  const [apellido, setApellido] = useState(profesor.apellido || '');

  const handleGuardar = () => {
    // Realiza la llamada al backend para actualizar el profesor
    fetch(`http://localhost:8080/profesores/${profesor.idProfesor}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, apellido }),
    })
      .then((response) => response.json())
      .then((data) => {
        onProfesorUpdated(data); // Actualiza el profesor en la lista
        onClose(); // Cierra el formulario de edición
      })
      .catch((error) => console.error('Error al actualizar profesor:', error));
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Editar Profesor
      </Typography>
      <TextField
        label="Nombre"
        fullWidth
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        sx={{ marginBottom: '1rem' }}
      />
      <TextField
        label="Apellido"
        fullWidth
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        sx={{ marginBottom: '1rem' }}
      />
      <Button variant="contained" color="primary" onClick={handleGuardar} sx={{ marginRight: '1rem' }}>
        Guardar
      </Button>
      <Button variant="outlined" color="secondary" onClick={onClose}>
        Cancelar
      </Button>
    </div>
  );
};

export default EditarProfesor;
