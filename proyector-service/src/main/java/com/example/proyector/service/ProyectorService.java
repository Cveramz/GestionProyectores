package com.example.proyector.service;

import com.example.proyector.entity.Proyector;
import com.example.proyector.repository.ProyectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProyectorService {

    @Autowired
    private ProyectorRepository proyectorRepository;

    public List<Proyector> obtenerTodosLosProyectores() {
        return proyectorRepository.findAll();
    }

    public Optional<Proyector> obtenerProyectorPorId(Long id) {
        return proyectorRepository.findById(id);
    }

    public Proyector agregarProyector(Proyector proyector) {
        return proyectorRepository.save(proyector);
    }

    public Proyector actualizarProyector(Long id, Proyector proyectorActualizado) {
        Optional<Proyector> existingProyector = proyectorRepository.findById(id);

        if (existingProyector.isPresent()) {
            Proyector proyectorExistente = existingProyector.get();

            // Actualizar solo los campos necesarios
            proyectorExistente.setEstado(proyectorActualizado.getEstado());
            // Otros campos que puedan necesitar actualización

            return proyectorRepository.save(proyectorExistente);
        } else {
            return null; // O puedes lanzar una excepción indicando que el proyector no existe
        }
    }



}
