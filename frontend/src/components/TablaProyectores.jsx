import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material';
import axios from 'axios';

const TablaProyectores = () => {
  const [proyectores, setProyectores] = useState([]);
  const [orderBy, setOrderBy] = useState('idProyector');
  const [order, setOrder] = useState('asc');

  // Llamada al endpoint para obtener el listado de proyectores
  useEffect(() => {
    fetchProyectores();
  }, []);

  const fetchProyectores = () => {
    axios.get('http://localhost:8080/proyectores')
      .then((response) => setProyectores(response.data))
      .catch((error) => console.error('Error fetching proyectores:', error));
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      <br />
      <Typography variant="h4" gutterBottom>
        Lista de Proyectores
      </Typography>
      <hr />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'idProyector'}
                  direction={order}
                  onClick={() => handleRequestSort('idProyector')}
                >
                  ID Proyector
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'marca'}
                  direction={order}
                  onClick={() => handleRequestSort('marca')}
                >
                  Marca
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'estado'}
                  direction={order}
                  onClick={() => handleRequestSort('estado')}
                >
                  Estado
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(proyectores, getComparator(order, orderBy)).map((proyector) => (
              <TableRow key={proyector.idProyector}>
                <TableCell>{proyector.idProyector}</TableCell>
                <TableCell>{proyector.marca}</TableCell>
                <TableCell>{proyector.estado}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TablaProyectores;
