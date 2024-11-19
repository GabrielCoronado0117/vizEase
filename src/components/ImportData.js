// src/components/ImportData.js
import React from 'react';
import Layout from './Layout';
import { Upload } from 'lucide-react';

const ImportData = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-medium text-gray-900 mb-6">Importar Datos</h1>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center py-12">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-lg font-medium">Arrastra y suelta archivos</h2>
          <p className="mt-2 text-gray-500">o</p>
          <input
            type="file"
            className="hidden"
            id="file-upload"
            multiple
            accept=".csv,.xlsx,.json"
          />
          <label
            htmlFor="file-upload"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            Seleccionar archivos
          </label>
          <p className="mt-2 text-sm text-gray-500">
            CSV, Excel, o JSON
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ImportData;