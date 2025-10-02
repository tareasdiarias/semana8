import React, { useState, useEffect } from 'react';
import AlumnoService from '../services/AlumnoService';

const AlumnoList = ({ onEdit, refreshTrigger }) => {
    const [alumnos, setAlumnos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarAlumnos();
    }, [refreshTrigger]);

    const cargarAlumnos = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await AlumnoService.getAll();
            setAlumnos(response.data || []);
        } catch (error) {
            console.error('Error:', error);
            setError('Error al cargar alumnos: ' + (error.message || 'Error desconocido'));
            setAlumnos([]);
        } finally {
            setLoading(false);
        }
    };

    const eliminarAlumno = async (id, nombre) => {
        if (window.confirm(`¿Eliminar a ${nombre}?`)) {
            try {
                await AlumnoService.delete(id);
                alert('Alumno eliminado correctamente');
                cargarAlumnos();
            } catch (error) {
                alert('Error al eliminar: ' + error.message);
            }
        }
    };

    if (loading) {
        return (
            <div className="text-center p-4">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                {error}
                <button
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={cargarAlumnos}
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="mb-0">📚 Lista de Alumnos</h4>
                <span className="badge bg-primary">{alumnos.length} alumnos</span>
            </div>
            <div className="card-body">
                {alumnos.length === 0 ? (
                    <div className="text-center p-4">
                        <h5>No hay alumnos registrados</h5>
                        <p className="text-muted">Agrega el primer alumno usando el formulario</p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Carrera</th>
                                <th>Edad</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {alumnos.map(alumno => (
                                <tr key={alumno.id}>
                                    <td><span className="badge bg-secondary">{alumno.id}</span></td>
                                    <td><strong>{alumno.nombre}</strong></td>
                                    <td>{alumno.apellido}</td>
                                    <td>
                                        <a href={`mailto:${alumno.email}`} className="text-decoration-none">
                                            {alumno.email}
                                        </a>
                                    </td>
                                    <td>
                                        <small className="text-muted">{alumno.carrera}</small>
                                    </td>
                                    <td>{alumno.edad} años</td>
                                    <td>
                                        <div className="btn-group" role="group">
                                            <button
                                                className="btn btn-sm btn-warning"
                                                onClick={() => onEdit(alumno)}
                                                title="Editar"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => eliminarAlumno(alumno.id, `${alumno.nombre} ${alumno.apellido}`)}
                                                title="Eliminar"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlumnoList;
