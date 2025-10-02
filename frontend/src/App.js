import React, { useState } from 'react';
import AlumnoList from './components/AlumnoList';
import AlumnoForm from './components/AlumnoForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [alumnoToEdit, setAlumnoToEdit] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleEdit = (alumno) => {
        setAlumnoToEdit(alumno);
    };

    const handleSuccess = () => {
        setAlumnoToEdit(null);
        setRefreshTrigger(prev => prev + 1); // Trigger para actualizar lista
    };

    const handleCancel = () => {
        setAlumnoToEdit(null);
    };

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-12">
                    <div className="text-center mb-4">
                        <h1 className="display-4">🎓 Sistema de Gestión de Alumnos</h1>
                        <p className="lead text-muted">CRUD con Spring Boot + React + PostgreSQL</p>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <AlumnoForm
                        alumnoToEdit={alumnoToEdit}
                        onSuccess={handleSuccess}
                        onCancel={handleCancel}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <AlumnoList
                        onEdit={handleEdit}
                        refreshTrigger={refreshTrigger}
                    />
                </div>
            </div>

            <footer className="text-center mt-5 pt-4 border-top">
                <small className="text-muted">
                    💻 Desarrollado con Spring Boot + React + PostgreSQL
                </small>
            </footer>
        </div>
    );
}

export default App;
