// TablaProfesores.jsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const TablaProfesores = ({ profesores, onEditar, onEliminar }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID Profesor</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {profesores.map((profesor) => (
            <TableRow key={profesor.idProfesor}>
              <TableCell>{profesor.idProfesor}</TableCell>
              <TableCell>{profesor.nombre}</TableCell>
              <TableCell>{profesor.apellido}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" onClick={() => onEditar(profesor)}>
                  Editar
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => onEliminar(profesor.idProfesor)}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaProfesores;
