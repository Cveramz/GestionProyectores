package com.example.proyector.controller;

import com.example.proyector.entity.Proyector;
import com.example.proyector.service.ProyectorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/proyectores")
public class ProyectorController {

    @Autowired
    private ProyectorService proyectorService;

    @GetMapping
    public List<Proyector> obtenerProyectores() {
        return proyectorService.obtenerTodosLosProyectores();
    }

    @GetMapping("/{id}")
    public Proyector obtenerProyectorPorId(@PathVariable Long id) {
        return proyectorService.obtenerProyectorPorId(id).orElse(null);
    }

    @PostMapping
    public Proyector agregarProyector(@RequestBody Proyector proyector) {
        return proyectorService.agregarProyector(proyector);
    }

}
