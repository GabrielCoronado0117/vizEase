// src/components/AddComponents.js
import React from 'react';
import Layout from './Layout';
import { BarChart, LineChart, PieChart, Table2 } from 'lucide-react';

const AddComponents = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-medium text-gray-900 mb-6">Agregar Componentes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Componente de Gráfico de Barras */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-500 cursor-pointer transition-colors">
          <div className="flex justify-center mb-4">
            <BarChart className="h-12 w-12 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-center">Gráfico de Barras</h3>
          <p className="text-gray-500 text-sm text-center mt-2">
            Visualiza datos comparativos
          </p>
        </div>

        {/* Componente de Gráfico de Líneas */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-500 cursor-pointer transition-colors">
          <div className="flex justify-center mb-4">
            <LineChart className="h-12 w-12 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-center">Gráfico de Líneas</h3>
          <p className="text-gray-500 text-sm text-center mt-2">
            Muestra tendencias temporales
          </p>
        </div>

        {/* Componente de Gráfico Circular */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-500 cursor-pointer transition-colors">
          <div className="flex justify-center mb-4">
            <PieChart className="h-12 w-12 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-center">Gráfico Circular</h3>
          <p className="text-gray-500 text-sm text-center mt-2">
            Visualiza distribuciones
          </p>
        </div>

        {/* Componente de Tabla */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-500 cursor-pointer transition-colors">
          <div className="flex justify-center mb-4">
            <Table2 className="h-12 w-12 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-center">Tabla de Datos</h3>
          <p className="text-gray-500 text-sm text-center mt-2">
            Muestra datos tabulares
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AddComponents;