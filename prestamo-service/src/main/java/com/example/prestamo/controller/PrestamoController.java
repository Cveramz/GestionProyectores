package com.example.prestamo.controller;

import com.example.prestamo.entity.Prestamo;
import com.example.prestamo.service.PrestamoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prestamos")
public class PrestamoController {

    @Autowired
    private PrestamoService prestamoService;

    @GetMapping
    public List<Prestamo> obtenerPrestamos() {
        return prestamoService.obtenerTodosLosPrestamos();
    }

    @GetMapping("/{id}")
    public Prestamo obtenerPrestamoPorId(@PathVariable Long id) {
        return prestamoService.obtenerPrestamoPorId(id);
    }

    @PostMapping
    public Prestamo agregarPrestamo(@RequestBody Prestamo prestamo) {
        return prestamoService.agregarPrestamo(prestamo);
    }

    @PutMapping("/{id}")
    public Prestamo actualizarPrestamo(@PathVariable Long id, @RequestBody Prestamo prestamo) {
        return prestamoService.actualizarPrestamo(id, prestamo);
    }

    @DeleteMapping("/{id}")
    public void eliminarPrestamo(@PathVariable Long id) {
        prestamoService.eliminarPrestamo(id);
    }
}
