import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

const Solicitud = () => {
  const navigate = useNavigate();

  const [profesoresList, setProfesoresList] = useState([]);
  const [selectedProfesor, setSelectedProfesor] = useState(null);
  const [isApto, setIsApto] = useState(null);
  const [tipoUso, setTipoUso] = useState('');
  const [dataProyector, setDataProyector] = useState('');
  const [dataProyectorOptions, setDataProyectorOptions] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await axios.get('http://localhost:8080/profesores');
        setProfesoresList(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de profesores', error);
      }
    };

    fetchProfesores();
  }, []);

  useEffect(() => {
    const fetchDataProyectorOptions = async () => {
      try {
        if (tipoUso === 'dictado' || tipoUso === 'reuniones') {
          const response = await axios.get('http://localhost:8080/proyectores');
          const proyectoresOptions = response.data
            .filter(
              (proyector) => proyector.marca === 'EPSON' && proyector.estado === 'Activo'
            )
            .sort((a, b) => a.idProyector - b.idProyector);
          setDataProyectorOptions(proyectoresOptions);
        } else if (tipoUso === 'examen') {
          const response = await axios.get('http://localhost:8080/proyectores');
          const proyectoresOptions = response.data
            .filter((proyector) => proyector.marca === 'ViewSonic')
            .sort((a, b) => a.idProyector - b.idProyector);
          setDataProyectorOptions(proyectoresOptions);
        } else {
          setDataProyectorOptions([]);
        }
      } catch (error) {
        console.error('Error al obtener las opciones del Data Proyector', error);
      }
    };

    fetchDataProyectorOptions();
  }, [tipoUso]);

  const handleProfesorChange = async (event, newValue) => {
    setSelectedProfesor(newValue);

    if (newValue) {
      try {
        const response = await axios.get(
          `http://localhost:8080/devoluciones/apto/${newValue.idProfesor}`
        );

        setIsApto(response.data);
        setTipoUso('');
        setDataProyector('');
      } catch (error) {
        console.error('Error al verificar la aptitud del profesor', error);
      }
    }
  };

  const handleTipoUsoChange = (event) => {
    setTipoUso(event.target.value);
  };

  const handleDataProyectorChange = (event) => {
    setDataProyector(event.target.value);
  };

  const handlePrestarProyector = async () => {
    try {
      // Obtén la fecha actual en la zona horaria de Santiago
      const fechaSantiago = DateTime.local().setZone('America/Santiago');
  
      // Formatea la fecha en un formato deseado
      const fechaPrestamo = fechaSantiago.toFormat("yyyy-MM-dd'T'HH:mm:ss");
  
      const prestamoResponse = await axios.post('http://localhost:8080/prestamos', {
        fechaPrestamo: fechaPrestamo,
        uso: tipoUso,
        estado: 'En curso',
        idProyector: dataProyector,
        idProfesor: selectedProfesor.idProfesor,
      });

      await axios.put(`http://localhost:8080/proyectores/${dataProyector}`, {
        estado: 'Ocupado',
      });

      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate('/OpcionesPrestamo');
      }, 2000);
    } catch (error) {
      console.error('Error al prestar el proyector', error);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <div>
      <br />
      <Typography variant="h5" gutterBottom>
        Solicitud de Proyector
      </Typography>
      <hr />
      <Button variant="contained" color="error" component={Link} to="/OpcionesPrestamo">
        Volver
      </Button>
      <br />

      {isApto !== null && (
        <div>
          <Alert severity={isApto ? 'success' : 'error'}>
            {isApto ? 'El profesor es apto' : 'El profesor no es apto'}
          </Alert>
        </div>
      )}
      <br />
      <Autocomplete
        options={profesoresList}
        getOptionLabel={(profesor) => profesor.idProfesor}
        onChange={handleProfesorChange}
        renderInput={(params) => (
          <TextField {...params} label="Selecciona un profesor" />
        )}
      />

      {isApto && (
        <div>
          <br />
          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <Select
              value={tipoUso}
              onChange={handleTipoUsoChange}
              displayEmpty
              input={<Input />}
            >
              <MenuItem value="" disabled>
                Seleccione el tipo de uso
              </MenuItem>
              <MenuItem value="dictado">Dictado de clases</MenuItem>
              <MenuItem value="reuniones">Reuniones varias</MenuItem>
              <MenuItem value="examen">Examen de título</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}

      {isApto && tipoUso && (
        <div>
          <br />
          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <Select
              value={dataProyector}
              onChange={handleDataProyectorChange}
              displayEmpty
              input={<Input />}
              disabled={!tipoUso}
            >
              <MenuItem value="" disabled>
                Proyectores disponibles
              </MenuItem>
              {dataProyectorOptions.map((option) => (
                <MenuItem key={option.idProyector} value={option.idProyector}>
                  {`Data ${option.idProyector}. ${option.marca}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}

      {isApto && tipoUso && dataProyector && (
        <div>
          <br />
          <Button variant="contained" onClick={handlePrestarProyector}>
            Prestar Proyector
          </Button>
        </div>
      )}

      {/* Snackbar para mostrar el mensaje de éxito */}
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="success"
        >
          Préstamo exitoso. Redirigiendo...
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Solicitud;
