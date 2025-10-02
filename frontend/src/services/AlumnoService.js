import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/alumnos';

// Configurar axios
const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000 // 10 segundos
});

class AlumnoService {
    // Obtener todos los alumnos
    getAll() {
        return client.get('');
    }

    // Obtener alumno por ID
    getById(id) {
        return client.get(`/${id}`);
    }

    // Crear nuevo alumno
    create(alumno) {
        return client.post('', alumno);
    }

    // Actualizar alumno
    update(id, alumno) {
        return client.put(`/${id}`, alumno);
    }

    // Eliminar alumno
    delete(id) {
        return client.delete(`/${id}`);
    }

    // Buscar por carrera
    getByCarrera(carrera) {
        return client.get(`/carrera/${encodeURIComponent(carrera)}`);
    }

    // Buscar por email
    getByEmail(email) {
        return client.get(`/email/${encodeURIComponent(email)}`);
    }

    // Obtener estadísticas
    getEstadisticas() {
        return client.get('/estadisticas');
    }
}

export default new AlumnoService();
