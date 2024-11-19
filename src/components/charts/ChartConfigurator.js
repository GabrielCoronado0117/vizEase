// src/components/charts/ChartConfigurator.js
import React, { useState } from 'react';

const ChartConfigurator = ({ data, columns, onCreate, onEdit, initialConfig, onClose }) => {
  const [config, setConfig] = useState(
    initialConfig || { type: 'bar', xAxis: '', yAxis: '', color: '#8884d8', title: '', realTime: false }
  );

  const handleChange = (key, value) => {
    setConfig((prevConfig) => ({ ...prevConfig, [key]: value }));
  };

  const handleSave = () => {
    if (initialConfig) {
      onEdit(config);
    } else {
      onCreate(config);
    }
  };

  return (
    <div className="chart-configurator">
      <h2>{initialConfig ? 'Editar Gráfica' : 'Nueva Gráfica'}</h2>
      <label>
        Tipo de Gráfica:
        <select value={config.type} onChange={(e) => handleChange('type', e.target.value)}>
          <option value="bar">Barras</option>
          <option value="line">Líneas</option>
          <option value="pie">Circular</option>
          <option value="area">Áreas</option>
          <option value="scatter">Dispersión</option>
        </select>
      </label>
      <label>
        Eje X:
        <select value={config.xAxis} onChange={(e) => handleChange('xAxis', e.target.value)}>
          {columns.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
      </label>
      <label>
        Eje Y:
        <select value={config.yAxis} onChange={(e) => handleChange('yAxis', e.target.value)}>
          {columns.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
      </label>
      <label>
        Título del Gráfico:
        <input
          type="text"
          value={config.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Ej. Ventas por Región"
        />
      </label>
      <label>
        Color:
        <input type="color" value={config.color} onChange={(e) => handleChange('color', e.target.value)} />
      </label>
      <label>
        Usar Datos en Tiempo Real:
        <input
          type="checkbox"
          checked={config.realTime}
          onChange={(e) => handleChange('realTime', e.target.checked)}
        />
      </label>
      <button onClick={handleSave}>Guardar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default ChartConfigurator;
