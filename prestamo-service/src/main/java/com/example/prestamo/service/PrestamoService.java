package com.example.prestamo.service;

import com.example.prestamo.entity.Prestamo;
import com.example.prestamo.repository.PrestamoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrestamoService {

    @Autowired
    private PrestamoRepository prestamoRepository;

    public List<Prestamo> obtenerTodosLosPrestamos() {
        return prestamoRepository.findAll();
    }

    public Prestamo obtenerPrestamoPorId(Long id) {
        return prestamoRepository.findById(id).orElse(null);
    }

    public Prestamo agregarPrestamo(Prestamo prestamo) {
        return prestamoRepository.save(prestamo);
    }

    public Prestamo actualizarPrestamo(Long id, Prestamo prestamoActualizado) {
        Optional<Prestamo> existingPrestamo = prestamoRepository.findById(id);

        if (existingPrestamo.isPresent()) {
            Prestamo prestamoExistente = existingPrestamo.get();

            // Actualizar solo el campo 'estado'
            prestamoExistente.setEstado(prestamoActualizado.getEstado());

            return prestamoRepository.save(prestamoExistente);
        } else {
            return null; // O puedes lanzar una excepción indicando que el préstamo no existe
        }
    }
    public Prestamo obtenerUltimoPrestamoPorRut(String rut) {
        List<Prestamo> prestamos = prestamoRepository.findByIdProfesorOrderByFechaPrestamoDesc(rut);

        if (!prestamos.isEmpty()) {
            return prestamos.get(0);
        } else {
            return null; // o puedes lanzar una excepción indicando que no se encontraron préstamos para el rut dado
        }
    }



    public void eliminarPrestamo(Long id) {
        prestamoRepository.deleteById(id);
    }
}
