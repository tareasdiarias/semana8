package com.example.ejerciso8spring.dao;

import com.example.ejerciso8spring.model.Alumno;
import java.util.List;
import java.util.Optional;

public interface AlumnoDAO {
    Alumno save(Alumno alumno);
    List<Alumno> findAll();
    Optional<Alumno> findById(Long id);
    List<Alumno> findByCarrera(String carrera);
    Optional<Alumno> findByEmail(String email);
    Optional<Alumno> update(Long id, Alumno alumno);
    boolean deleteById(Long id);
    boolean existsByEmail(String email);
    long count();
}
