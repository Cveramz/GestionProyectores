package com.example.devolucion.repository;

import com.example.devolucion.entity.Devolucion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DevolucionRepository extends JpaRepository<Devolucion, Long> {
}
