package com.example.devolucion.repository;

import com.example.devolucion.entity.Devolucion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DevolucionRepository extends JpaRepository<Devolucion, Long> {

    @Query("SELECT COUNT(d) FROM Devolucion d WHERE d.idProfesor = :rut AND d.estadoDevolucion = 'Con Daños'")
    int countDevolucionesConDanosPorRut(@Param("rut") String rut);

    @Query("SELECT d FROM Devolucion d WHERE d.idProfesor = :rut ORDER BY d.fechaDevolucion DESC")
    List<Devolucion> findByidProfesorOrderByFechaDevolucionDesc(@Param("rut") String rut);
}
