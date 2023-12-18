package com.example.proyector.entity;

import lombok.Data;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@Data
public class Proyector {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProyector;

    private String marca;

    private String estado;
}
