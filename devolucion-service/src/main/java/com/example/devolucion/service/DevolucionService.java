package com.example.devolucion.service;

import com.example.devolucion.entity.Devolucion;
import com.example.devolucion.repository.DevolucionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DevolucionService {

    @Autowired
    private DevolucionRepository devolucionRepository;

    public List<Devolucion> obtenerTodasLasDevoluciones() {
        return devolucionRepository.findAll();
    }

    public Devolucion obtenerDevolucionPorId(Long id) {
        return devolucionRepository.findById(id).orElse(null);
    }

    public Devolucion agregarDevolucion(Devolucion devolucion) {
        return devolucionRepository.save(devolucion);
    }

    public Devolucion actualizarDevolucion(Long id, Devolucion devolucion) {
        Optional<Devolucion> existingDevolucion = devolucionRepository.findById(id);

        if (existingDevolucion.isPresent()) {
            devolucion.setIdDevolucion(id);
            return devolucionRepository.save(devolucion);
        } else {
            return null; // O puedes lanzar una excepción indicando que la devolución no existe
        }
    }

    public void eliminarDevolucion(Long id) {
        devolucionRepository.deleteById(id);
    }
}
