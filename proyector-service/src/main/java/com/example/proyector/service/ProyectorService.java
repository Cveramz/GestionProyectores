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

}
