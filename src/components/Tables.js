// src/components/Tables.js
// src/components/Tables.js
import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { 
  Plus, 
  Folder, 
  Calendar, 
  MoreVertical,
  Edit2,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Tables = () => {
  const [projects, setProjects] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  // Cargar proyectos guardados
  useEffect(() => {
    const savedProjects = localStorage.getItem('dashboardProjects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  // En Tables.js, modifica handleOpenProject
const handleOpenProject = (project) => {
    navigate('/dashboard', { state: { openProject: project } });
  };

  const handleDeleteProject = (projectId) => {
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('dashboardProjects', JSON.stringify(updatedProjects));
    setShowDeleteConfirm(null);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium text-gray-900">Mis Proyectos</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            <span>Nuevo Proyecto</span>
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Folder className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay proyectos guardados</h3>
            <p className="text-gray-500">Crea un nuevo proyecto para comenzar</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg border border-gray-200 p-4 relative group">
                {/* Menú de opciones */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="relative">
                    <button
                      onClick={() => setShowDeleteConfirm(project.id)}
                      className="p-1 hover:bg-red-100 rounded text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Contenido del proyecto */}
                <div 
                  className="cursor-pointer"
                  onClick={() => handleOpenProject(project)}
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{project.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(project.createdAt)}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {project.charts.length} componentes
                  </div>
                </div>

                {/* Modal de confirmación de eliminación */}
                {showDeleteConfirm === project.id && (
                  <div className="absolute inset-0 bg-white bg-opacity-90 rounded-lg flex items-center justify-center z-10">
                    <div className="text-center p-4">
                      <h3 className="text-lg font-medium mb-2">¿Eliminar proyecto?</h3>
                      <p className="text-sm text-gray-500 mb-4">Esta acción no se puede deshacer</p>
                      <div className="flex space-x-2 justify-center">
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Eliminar
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(null)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tables;