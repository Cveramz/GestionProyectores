import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Alert } from '@mui/material';

const CrearProfesor = ({ onClose, onProfesorCreated }) => {
  const [profesorData, setProfesorData] = useState({
    idProfesor: '',
    nombre: '',
    apellido: '',
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfesorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const validarFormatoRUT = (rut) => {
    const rutRegex = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]$/;
    return rutRegex.test(rut);
  };

  const handleSubmitNuevoProfesor = async (event) => {
    event.preventDefault();

    // Verificar si hay campos en blanco
    if (!profesorData.idProfesor || !profesorData.nombre || !profesorData.apellido) {
      setAlertSeverity('error');
      setAlertMessage('Por favor, complete todos los campos antes de enviar el formulario');
      setAlertOpen(true);
      return;
    }

    const isFormatValid = validarFormatoRUT(profesorData.idProfesor);

    if (!isFormatValid) {
      setAlertSeverity('error');
      setAlertMessage('Formato de RUT no válido. Debe ser "xx.xxx.xxx-x" o "x.xxx.xxx-x"');
      setAlertOpen(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/profesores', profesorData);
      console.log('Respuesta del backend:', response.data);
      console.log('Profesor creado exitosamente');

      // Mostrar el Alert de éxito
      setAlertSeverity('success');
      setAlertMessage('Profesor creado exitosamente');
      setAlertOpen(true);

      // Cerrar el componente después de 1 segundo
      setTimeout(() => {
        onClose();
        // Llamar a la función para informar a GestionarProfesores
        onProfesorCreated();
      }, 1000);

    } catch (error) {
      console.error('Error al crear el profesor', error.response || error);

      // Mostrar el Alert de error
      setAlertSeverity('error');
      setAlertMessage('Error al crear el profesor');
      setAlertOpen(true);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Crear Nuevo Profesor
      </Typography>
      {alertOpen && (
          <Alert
            severity={alertSeverity}
            onClose={handleAlertClose}
            sx={{ marginTop: '1rem' }}
          >
            {alertMessage}
          </Alert>
        )}
      <form onSubmit={handleSubmitNuevoProfesor}>
        <TextField
          label="RUT"
          variant="outlined"
          fullWidth
          margin="normal"
          name="idProfesor"
          value={profesorData.idProfesor}
          onChange={handleChange}
        />
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          name="nombre"
          value={profesorData.nombre}
          onChange={handleChange}
        />
        <TextField
          label="Apellido"
          variant="outlined"
          fullWidth
          margin="normal"
          name="apellido"
          value={profesorData.apellido}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '1rem' }}>
          Crear Profesor
        </Button>
        
      </form>
    </div>
  );
};

export default CrearProfesor;
