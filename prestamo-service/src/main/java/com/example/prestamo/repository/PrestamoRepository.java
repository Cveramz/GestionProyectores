package com.example.prestamo.repository;

import com.example.prestamo.entity.Prestamo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PrestamoRepository extends JpaRepository<Prestamo, Long> {
    @Query("SELECT p FROM Prestamo p WHERE p.idProfesor = :rut ORDER BY p.fechaPrestamo DESC")
    List<Prestamo> findByIdProfesorOrderByFechaPrestamoDesc(@Param("rut") String rut);

}
