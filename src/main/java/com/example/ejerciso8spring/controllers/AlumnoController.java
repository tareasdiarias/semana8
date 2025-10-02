package com.example.ejerciso8spring.controllers;

import com.example.ejerciso8spring.model.Alumno;
import com.example.ejerciso8spring.servis.AlumnoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/alumnos")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class AlumnoController {

    private final AlumnoService alumnoService;

    public AlumnoController(AlumnoService alumnoService) {
        this.alumnoService = alumnoService;
    }

    @GetMapping
    public ResponseEntity<List<Alumno>> obtenerTodos() {
        List<Alumno> alumnos = alumnoService.obtenerTodosLosAlumnos();
        return ResponseEntity.ok(alumnos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alumno> obtenerPorId(@PathVariable Long id) {
        Optional<Alumno> alumno = alumnoService.obtenerAlumnoPorId(id);
        return alumno.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Alumno alumno) {
        try {
            Alumno nuevoAlumno = alumnoService.crearAlumno(alumno);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoAlumno);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Alumno alumno) {
        try {
            Optional<Alumno> alumnoActualizado = alumnoService.actualizarAlumno(id, alumno);
            return alumnoActualizado.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        boolean eliminado = alumnoService.eliminarAlumno(id);
        return eliminado ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/carrera/{carrera}")
    public ResponseEntity<List<Alumno>> obtenerPorCarrera(@PathVariable String carrera) {
        List<Alumno> alumnos = alumnoService.obtenerAlumnosPorCarrera(carrera);
        return ResponseEntity.ok(alumnos);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Alumno> obtenerPorEmail(@PathVariable String email) {
        Optional<Alumno> alumno = alumnoService.obtenerAlumnoPorEmail(email);
        return alumno.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/estadisticas")
    public ResponseEntity<String> obtenerEstadisticas() {
        long totalAlumnos = alumnoService.contarAlumnos();
        return ResponseEntity.ok("Total de alumnos registrados: " + totalAlumnos);
    }
}
