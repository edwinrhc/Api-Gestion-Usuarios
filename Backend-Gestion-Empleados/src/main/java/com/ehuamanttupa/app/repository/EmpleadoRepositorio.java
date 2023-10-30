package com.ehuamanttupa.app.repository;

import com.ehuamanttupa.app.models.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpleadoRepositorio extends JpaRepository<Empleado, Long> {

    boolean existsByEmail(String email);
    boolean existsByEmailAndIdNot(String email,Long id);
}
