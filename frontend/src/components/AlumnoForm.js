import React, { useState, useEffect } from 'react';
import AlumnoService from '../services/AlumnoService';

const AlumnoForm = ({ alumnoToEdit, onSuccess, onCancel }) => {
    const [alumno, setAlumno] = useState({
        nombre: '',
        apellido: '',
        email: '',
        carrera: '',
        edad: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const carreras = [
        'Ingeniería de Sistemas',
        'Ingeniería Industrial',
        'Ingeniería Civil',
        'Ingeniería Electrónica',
        'Ingeniería Mecánica',
        'Administración de Empresas',
        'Contabilidad',
        'Marketing'
    ];

    useEffect(() => {
        if (alumnoToEdit) {
            setAlumno({
                nombre: alumnoToEdit.nombre || '',
                apellido: alumnoToEdit.apellido || '',
                email: alumnoToEdit.email || '',
                carrera: alumnoToEdit.carrera || '',
                edad: alumnoToEdit.edad?.toString() || ''
            });
        } else {
            resetForm();
        }
    }, [alumnoToEdit]);

    const resetForm = () => {
        setAlumno({
            nombre: '',
            apellido: '',
            email: '',
            carrera: '',
            edad: ''
        });
        setError('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlumno(prev => ({
            ...prev,
            [name]: value
        }));
        setError(''); // Limpiar error al escribir
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const alumnoData = {
                ...alumno,
                edad: parseInt(alumno.edad)
            };

            if (alumnoToEdit) {
                await AlumnoService.update(alumnoToEdit.id, alumnoData);
                alert('✅ Alumno actualizado correctamente');
            } else {
                await AlumnoService.create(alumnoData);
                alert('✅ Alumno creado correctamente');
                resetForm();
            }

            onSuccess();
        } catch (error) {
            console.error('Error:', error);
            const errorMsg = error.response?.data || error.message || 'Error desconocido';
            setError(`❌ Error: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card mb-4">
            <div className="card-header">
                <h4 className="mb-0">
                    {alumnoToEdit ? '✏️ Editar Alumno' : '➕ Agregar Nuevo Alumno'}
                </h4>
            </div>
            <div className="card-body">
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Nombre *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nombre"
                                    value={alumno.nombre}
                                    onChange={handleChange}
                                    placeholder="Ej: Juan Carlos"
                                    required
                                    minLength={2}
                                    maxLength={50}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Apellido *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="apellido"
                                    value={alumno.apellido}
                                    onChange={handleChange}
                                    placeholder="Ej: Pérez García"
                                    required
                                    minLength={2}
                                    maxLength={50}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email *</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={alumno.email}
                            onChange={handleChange}
                            placeholder="Ej: juan.perez@universidad.edu.pe"
                            required
                        />
                    </div>

                    <div className="row">
                        <div className="col-md-8">
                            <div className="mb-3">
                                <label className="form-label">Carrera *</label>
                                <select
                                    className="form-select"
                                    name="carrera"
                                    value={alumno.carrera}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecciona una carrera...</option>
                                    {carreras.map(carrera => (
                                        <option key={carrera} value={carrera}>
                                            {carrera}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label">Edad *</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="edad"
                                    value={alumno.edad}
                                    onChange={handleChange}
                                    placeholder="18"
                                    required
                                    min="16"
                                    max="100"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="d-flex gap-2">
                        <button
                            type="submit"
                            className={`btn ${alumnoToEdit ? 'btn-success' : 'btn-primary'}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    {alumnoToEdit ? 'Actualizando...' : 'Creando...'}
                                </>
                            ) : (
                                alumnoToEdit ? '✅ Actualizar' : '➕ Crear Alumno'
                            )}
                        </button>

                        {alumnoToEdit && (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onCancel}
                                disabled={loading}
                            >
                                ❌ Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AlumnoForm;
