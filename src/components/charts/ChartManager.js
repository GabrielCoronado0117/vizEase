// src/components/charts/ChartManager.js
import React, { useState } from 'react';
import {
  LineChart,
  BarChart,
  ScatterChart,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  Bar,
  Scatter,
  Area,
} from 'recharts';
import ChartConfigurator from './ChartConfigurator';
import DashboardGrid from '../DashboardGrid';

const ChartManager = ({ data, columns, charts, setCharts }) => {
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [editingChart, setEditingChart] = useState(null);

  const handleCreateChart = (config) => {
    const newChart = {
      id: Date.now(),
      config,
    };
    setCharts((prevCharts) => [...prevCharts, newChart]);
    setShowConfigurator(false);
  };

  const handleEditChart = (config) => {
    setCharts((prevCharts) =>
      prevCharts.map((chart) =>
        chart.id === editingChart.id ? { ...chart, config } : chart
      )
    );
    setEditingChart(null);
    setShowConfigurator(false);
  };

  const handleDeleteChart = (chartId) => {
    setCharts((prevCharts) => prevCharts.filter((chart) => chart.id !== chartId));
  };

  const renderChart = (chart) => {
    const { type, xAxis, yAxis } = chart.config;
    const ChartComponent = {
      line: LineChart,
      bar: BarChart,
      scatter: ScatterChart,
      area: AreaChart,
    }[type];

    return (
      <ChartComponent
        key={chart.id}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        width={600}
        height={400}
      >
        <XAxis dataKey={xAxis} />
        <YAxis />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        {type === 'line' && <Line type="monotone" dataKey={yAxis} stroke="#8884d8" />}
        {type === 'bar' && <Bar dataKey={yAxis} fill="#82ca9d" />}
        {type === 'scatter' && <Scatter dataKey={yAxis} fill="#8884d8" />}
        {type === 'area' && <Area dataKey={yAxis} fill="#82ca9d" stroke="#8884d8" />}
      </ChartComponent>
    );
  };

  return (
    <div className="chart-manager">
      <button
        className="new-chart-button"
        onClick={() => setShowConfigurator(true)}
      >
        Nueva Gráfica
      </button>
      {showConfigurator && (
        <ChartConfigurator
          columns={columns}
          onCreate={handleCreateChart}
          onEdit={handleEditChart}
          initialConfig={editingChart?.config || null}
          onClose={() => {
            setShowConfigurator(false);
            setEditingChart(null);
          }}
        />
      )}
      <DashboardGrid>
        {charts.map((chart) => (
          <div key={chart.id} className="chart-container">
            {renderChart(chart)}
            <button onClick={() => setEditingChart(chart.config)}>Editar</button>
            <button onClick={() => handleDeleteChart(chart.id)}>Eliminar</button>
          </div>
        ))}
      </DashboardGrid>
    </div>
  );
};

export default ChartManager;
