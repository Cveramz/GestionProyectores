package com.example.profesor.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class Profesor {
    @Id
    private Long idProfesor;
    private String nombre;
    private String apellido;
}
