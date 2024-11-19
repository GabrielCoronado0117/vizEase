// src/components/ExportData.js
import React from 'react';
import Layout from './Layout';
import { Download } from 'lucide-react';

const ExportData = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-medium text-gray-900 mb-6">Exportar Datos</h1>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-6">
          {/* Sección de selección de datos */}
          <div>
            <h2 className="text-lg font-medium mb-4">Seleccionar datos para exportar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Datos de usuarios</span>
                </label>
              </div>
              <div className="border rounded-lg p-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Estadísticas</span>
                </label>
              </div>
            </div>
          </div>

          {/* Sección de formato */}
          <div>
            <h2 className="text-lg font-medium mb-4">Formato de exportación</h2>
            <div className="flex space-x-4">
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50">CSV</button>
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50">Excel</button>
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50">JSON</button>
            </div>
          </div>

          {/* Botón de exportación */}
          <div className="flex justify-end">
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              <Download className="h-5 w-5" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExportData;