import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import GestionarProfesores from './components/GestionarProfesores';
import CrearProfesor from './components/CrearProfesor';
import TablaProyectores from './components/TablaProyectores';
import OpcionesPrestamo from './components/OpcionesPrestamo';
import Solicitud from './components/Solicitud';
import Devolucion from './components/Devolucion';
import Reporte from './components/Reporte';


function App() {

  return (
    <BrowserRouter>
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/GestionarProfesores" element={<GestionarProfesores />} />
            <Route path="/CrearProfesor" element={<CrearProfesor />} />
            <Route path="/TablaProyectores" element={<TablaProyectores />} />
            <Route path="/OpcionesPrestamo" element={<OpcionesPrestamo />} />
            <Route path="/Solicitud" element={<Solicitud />} />
            <Route path="/Devolucion" element={<Devolucion />} />
            <Route path="/Reporte" element={<Reporte />} />

            
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
