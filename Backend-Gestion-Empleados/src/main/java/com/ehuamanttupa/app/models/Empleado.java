package com.ehuamanttupa.app.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="empleados")
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre", length = 60, nullable = false)
    private String nombre;

    @Column(name="apellido", length = 60, nullable = false)
    private String apellido;

    @Column(name="email", length = 60, nullable = false, unique = true)
    private String email;

}
