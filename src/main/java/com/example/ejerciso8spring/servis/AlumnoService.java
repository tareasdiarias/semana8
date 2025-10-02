package com.example.ejerciso8spring.servis;

import com.example.ejerciso8spring.dao.AlumnoDAO;
import com.example.ejerciso8spring.model.Alumno;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AlumnoService {

    private final AlumnoDAO alumnoDAO;

    public AlumnoService(AlumnoDAO alumnoDAO) {
        this.alumnoDAO = alumnoDAO;
    }

    public Alumno crearAlumno(Alumno alumno) {
        if (alumnoDAO.existsByEmail(alumno.getEmail())) {
            throw new IllegalArgumentException("Ya existe un alumno con el email: " + alumno.getEmail());
        }
        return alumnoDAO.save(alumno);
    }

    public List<Alumno> obtenerTodosLosAlumnos() {
        return alumnoDAO.findAll();
    }

    public Optional<Alumno> obtenerAlumnoPorId(Long id) {
        return alumnoDAO.findById(id);
    }

    public List<Alumno> obtenerAlumnosPorCarrera(String carrera) {
        return alumnoDAO.findByCarrera(carrera);
    }

    public Optional<Alumno> obtenerAlumnoPorEmail(String email) {
        return alumnoDAO.findByEmail(email);
    }

    public Optional<Alumno> actualizarAlumno(Long id, Alumno alumnoActualizado) {
        Optional<Alumno> alumnoExistente = alumnoDAO.findById(id);
        if (alumnoExistente.isPresent()) {
            Optional<Alumno> alumnoConEmail = alumnoDAO.findByEmail(alumnoActualizado.getEmail());
            if (alumnoConEmail.isPresent() && !alumnoConEmail.get().getId().equals(id)) {
                throw new IllegalArgumentException("Ya existe otro alumno con el email: " + alumnoActualizado.getEmail());
            }
            return alumnoDAO.update(id, alumnoActualizado);
        }
        return Optional.empty();
    }

    public boolean eliminarAlumno(Long id) {
        return alumnoDAO.deleteById(id);
    }

    public long contarAlumnos() {
        return alumnoDAO.count();
    }
}
