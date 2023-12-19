package com.example.profesor.service;

import com.example.profesor.entity.Profesor;
import com.example.profesor.repository.ProfesorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfesorService {

    @Autowired
    private ProfesorRepository profesorRepository;

    public List<Profesor> obtenerTodosLosProfesores() {
        return profesorRepository.findAll();
    }

    public Optional<Profesor> obtenerProfesorPorId(String id) {
        return profesorRepository.findById(id);
    }

    public Profesor agregarProfesor(Profesor profesor) {
        return profesorRepository.save(profesor);
    }

    public Profesor actualizarProfesor(String id, Profesor nuevoProfesor) {
        return profesorRepository.findById(id)
                .map(profesor -> {
                    profesor.setNombre(nuevoProfesor.getNombre());
                    profesor.setApellido(nuevoProfesor.getApellido());
                    return profesorRepository.save(profesor);
                })
                .orElse(null);
    }

    public void eliminarProfesor(String id) {
        profesorRepository.deleteById(id);
    }
}
