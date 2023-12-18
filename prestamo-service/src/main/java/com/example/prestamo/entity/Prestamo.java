package com.example.prestamo.entity;

import lombok.Data;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class Prestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPrestamo;

    private LocalDateTime fechaPrestamo;

    private LocalDateTime horaPrestamo;

    private String uso; // Dictado de clases, Reuniones varias, Examen de título

    private String estado; // En curso, devuelto

    private Long idProyector; // Identificador del proyector relacionado

    private Long idProfesor; // Identificador del profesor relacionado


}
