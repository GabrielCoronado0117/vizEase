// src/components/charts/ChartContainer.js
import React from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, CartesianGrid,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const ChartContainer = ({ chartData, onEdit, onDelete }) => {
  const renderChart = () => {
    switch (chartData.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={chartData.xAxis} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={chartData.yAxis} fill={chartData.color || '#8884d8'} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={chartData.xAxis} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={chartData.yAxis} stroke={chartData.color || '#82ca9d'} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.data}
                dataKey={chartData.yAxis}
                nameKey={chartData.xAxis}
                outerRadius={100}
                fill={chartData.color || '#ffc658'}
              >
                {chartData.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartData.color || '#ffc658'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return <p>Tipo de gráfica no soportada.</p>;
    }
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>{chartData.title || 'Gráfica Sin Título'}</h3>
        <button onClick={onEdit}>Editar</button>
        <button onClick={onDelete}>Eliminar</button>
      </div>
      {renderChart()}
    </div>
  );
};

export default ChartContainer;
// src/components/Dashboard.js