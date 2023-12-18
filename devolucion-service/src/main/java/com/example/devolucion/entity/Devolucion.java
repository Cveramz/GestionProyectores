package com.example.devolucion.entity;

import lombok.Data;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class Devolucion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDevolucion;

    private LocalDateTime fechaDevolucion;

    private LocalDateTime horaDevolucion;

    private String estadoDevolucion; // Buenas Condiciones, Con Daños

    private Long idPrestamo; // Identificador del préstamo relacionado


}
