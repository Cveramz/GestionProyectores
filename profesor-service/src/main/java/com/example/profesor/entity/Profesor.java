package com.example.profesor.entity;

import lombok.Data;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Data
@Entity
public class Profesor {
    @Id
    private String idProfesor;
    private String nombre;
    private String apellido;
}
