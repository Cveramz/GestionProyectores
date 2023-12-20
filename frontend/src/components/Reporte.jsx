import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Reporte = () => {
  const [reporteData, setReporteData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prestamosResponse = await axios.get('http://localhost:8080/prestamos');
        const devolucionesResponse = await axios.get('http://localhost:8080/devoluciones');
        const profesoresResponse = await axios.get('http://localhost:8080/profesores');

        const prestamos = prestamosResponse.data;
        const devoluciones = devolucionesResponse.data;
        const profesores = profesoresResponse.data;

        const reporte = prestamos.map((prestamo) => {
          const devolucion = devoluciones.find((dev) => dev.idPrestamo === prestamo.idPrestamo);
          const profesor = profesores.find((prof) => prof.idProfesor === prestamo.idProfesor);

          return {
            fechaPrestamo: prestamo.fechaPrestamo,
            horaPrestamo: new Date(prestamo.fechaPrestamo).toLocaleTimeString(),
            profesorNombre: `${profesor.nombre} ${profesor.apellido}`,
            fechaDevolucion: devolucion ? devolucion.fechaDevolucion : 'No devuelto',
            horaDevolucion: devolucion
              ? new Date(devolucion.fechaDevolucion).toLocaleTimeString()
              : 'No devuelto',
            hrsEnPoder:
              devolucion && prestamo.fechaPrestamo && devolucion.fechaDevolucion
                ? calcularHorasEnPoder(
                    new Date(prestamo.fechaPrestamo),
                    new Date(devolucion.fechaDevolucion)
                  )
                : 'No devuelto',
            estadoDevolucion: devolucion ? devolucion.estadoDevolucion : 'No devuelto',
            usoProyector: prestamo.uso,
          };
        });

        setReporteData(reporte);
      } catch (error) {
        console.error('Error al obtener datos para el reporte', error);
      }
    };

    fetchData();
  }, []);

  const calcularHorasEnPoder = (fechaPrestamo, fechaDevolucion) => {
    const diferenciaHoras = (fechaDevolucion - fechaPrestamo) / (1000 * 60 * 60);
    return diferenciaHoras.toFixed(2);
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

  return (
    <div>
      <h2>Reporte de Préstamos</h2>
      <hr />
      <Button variant="contained" color="error" component={Link} to="/OpcionesPrestamo">
        Volver
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Profesor</TableCell>
              <TableCell>Fecha Préstamo</TableCell>
              <TableCell>Hora Préstamo</TableCell>
              <TableCell>Fecha Devolución</TableCell>
              <TableCell>Hora Devolución</TableCell>
              <TableCell>Número de Hrs en poder</TableCell>
              <TableCell>Estado Devolución</TableCell>
              <TableCell>Uso Proyector</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reporteData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.profesorNombre}</TableCell>
                <TableCell>{new Date(row.fechaPrestamo).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(row.fechaPrestamo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</TableCell>
                <TableCell>{row.fechaDevolucion !== 'No devuelto' ? new Date(row.fechaDevolucion).toLocaleDateString() : 'No devuelto'}</TableCell>
                <TableCell>{row.horaDevolucion !== 'No devuelto' ? new Date(row.fechaDevolucion).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'No devuelto'}</TableCell>
                <TableCell>{row.hrsEnPoder}</TableCell>
                <TableCell>{row.estadoDevolucion}</TableCell>
                <TableCell>{getUsoTraducido(row.usoProyector)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Reporte;