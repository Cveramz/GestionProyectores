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

    public Prestamo actualizarPrestamo(Long id, Prestamo prestamo) {
        Optional<Prestamo> existingPrestamo = prestamoRepository.findById(id);

        if (existingPrestamo.isPresent()) {
            prestamo.setIdPrestamo(id);
            return prestamoRepository.save(prestamo);
        } else {
            return null; // O puedes lanzar una excepción indicando que el préstamo no existe
        }
    }

    public void eliminarPrestamo(Long id) {
        prestamoRepository.deleteById(id);
    }
}
