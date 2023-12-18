package com.example.proyector.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
public class Proyector {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProyector;

    private String marca;

    private String estado;
}
