package com.example.ejerciso8spring.dao;

import com.example.ejerciso8spring.model.Alumno;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public class AlumnoDAOImpl implements AlumnoDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Alumno save(Alumno alumno) {
        if (alumno.getId() == null) {
            entityManager.persist(alumno);
            return alumno;
        } else {
            return entityManager.merge(alumno);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Alumno> findAll() {
        TypedQuery<Alumno> query = entityManager.createQuery(
                "SELECT a FROM Alumno a ORDER BY a.apellido, a.nombre", Alumno.class);
        return query.getResultList();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Alumno> findById(Long id) {
        Alumno alumno = entityManager.find(Alumno.class, id);
        return Optional.ofNullable(alumno);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Alumno> findByCarrera(String carrera) {
        TypedQuery<Alumno> query = entityManager.createQuery(
                "SELECT a FROM Alumno a WHERE a.carrera = :carrera ORDER BY a.apellido", Alumno.class);
        query.setParameter("carrera", carrera);
        return query.getResultList();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Alumno> findByEmail(String email) {
        TypedQuery<Alumno> query = entityManager.createQuery(
                "SELECT a FROM Alumno a WHERE a.email = :email", Alumno.class);
        query.setParameter("email", email);
        List<Alumno> results = query.getResultList();
        return results.isEmpty() ? Optional.empty() : Optional.of(results.get(0));
    }

    @Override
    public Optional<Alumno> update(Long id, Alumno alumnoActualizado) {
        Optional<Alumno> optionalAlumno = findById(id);
        if (optionalAlumno.isPresent()) {
            Alumno alumnoExistente = optionalAlumno.get();
            alumnoExistente.setNombre(alumnoActualizado.getNombre());
            alumnoExistente.setApellido(alumnoActualizado.getApellido());
            alumnoExistente.setEmail(alumnoActualizado.getEmail());
            alumnoExistente.setCarrera(alumnoActualizado.getCarrera());
            alumnoExistente.setEdad(alumnoActualizado.getEdad());
            return Optional.of(entityManager.merge(alumnoExistente));
        }
        return Optional.empty();
    }

    @Override
    public boolean deleteById(Long id) {
        Optional<Alumno> optionalAlumno = findById(id);
        if (optionalAlumno.isPresent()) {
            entityManager.remove(optionalAlumno.get());
            return true;
        }
        return false;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        TypedQuery<Long> query = entityManager.createQuery(
                "SELECT COUNT(a) FROM Alumno a WHERE a.email = :email", Long.class);
        query.setParameter("email", email);
        return query.getSingleResult() > 0;
    }

    @Override
    @Transactional(readOnly = true)
    public long count() {
        TypedQuery<Long> query = entityManager.createQuery(
                "SELECT COUNT(a) FROM Alumno a", Long.class);
        return query.getSingleResult();
    }
}
