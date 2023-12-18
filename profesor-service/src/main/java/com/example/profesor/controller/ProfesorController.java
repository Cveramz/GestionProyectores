package com.example.profesor.controller;

import com.example.profesor.entity.Profesor;
import com.example.profesor.service.ProfesorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profesores")
public class ProfesorController {

    @Autowired
    private ProfesorService profesorService;

    @GetMapping
    public List<Profesor> obtenerProfesores() {
        return profesorService.obtenerTodosLosProfesores();
    }

    @GetMapping("/{id}")
    public Profesor obtenerProfesorPorId(@PathVariable Long id) {
        return profesorService.obtenerProfesorPorId(id).orElse(null);
    }

    @PostMapping
    public Profesor agregarProfesor(@RequestBody Profesor profesor) {
        return profesorService.agregarProfesor(profesor);
    }

    @PutMapping("/{id}")
    public Profesor actualizarProfesor(@PathVariable Long id, @RequestBody Profesor profesorActualizado) {
        return profesorService.actualizarProfesor(id, profesorActualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminarProfesor(@PathVariable Long id) {
        profesorService.eliminarProfesor(id);
    }
}
