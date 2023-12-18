package com.example.devolucion.controller;

import com.example.devolucion.entity.Devolucion;
import com.example.devolucion.service.DevolucionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/devoluciones")
public class DevolucionController {

    @Autowired
    private DevolucionService devolucionService;

    @GetMapping
    public List<Devolucion> obtenerDevoluciones() {
        return devolucionService.obtenerTodasLasDevoluciones();
    }

    @GetMapping("/{id}")
    public Devolucion obtenerDevolucionPorId(@PathVariable Long id) {
        return devolucionService.obtenerDevolucionPorId(id);
    }

    @PostMapping
    public Devolucion agregarDevolucion(@RequestBody Devolucion devolucion) {
        return devolucionService.agregarDevolucion(devolucion);
    }

    @PutMapping("/{id}")
    public Devolucion actualizarDevolucion(@PathVariable Long id, @RequestBody Devolucion devolucion) {
        return devolucionService.actualizarDevolucion(id, devolucion);
    }

    @DeleteMapping("/{id}")
    public void eliminarDevolucion(@PathVariable Long id) {
        devolucionService.eliminarDevolucion(id);
    }
}
