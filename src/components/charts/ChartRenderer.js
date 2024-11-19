// src/components/charts/ChartRenderer.js
// src/components/charts/ChartRenderer.js
import React from 'react';
import {
  ResponsiveContainer,
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie,
  AreaChart, Area,
  ScatterChart, Scatter,
  XAxis, YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Cell
} from 'recharts';

// Colores para las gráficas
const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe',
  '#00c49f', '#ffbb28', '#ff8042', '#a4de6c', '#d0ed57'
];

// Configuración de animaciones
const getAnimationConfig = (config) => ({
  isAnimationActive: config?.animations?.enabled ?? true,
  animationDuration: config?.animations?.duration ?? 500,
  animationBegin: 0,
});

const ChartRenderer = ({ type, data, config }) => {
  const renderCartesianChart = (ChartComponent, DataComponent) => (
    <ResponsiveContainer width="100%" height="100%">
      <ChartComponent data={data} {...getAnimationConfig(config)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey={config.xAxis}
          label={{ value: config.xAxisLabel, position: 'bottom' }}
        />
        <YAxis
          label={{ value: config.yAxisLabel, angle: -90, position: 'left' }}
        />
        <Tooltip />
        {config.showLegend && <Legend />}
        {config.yAxis.map((axis, index) => (
          <DataComponent
            key={axis}
            dataKey={axis}
            fill={COLORS[index % COLORS.length]}
            stroke={COLORS[index % COLORS.length]}
            {...(type === 'line' && {
              type: config.options?.smooth ? "monotone" : "linear",
              strokeWidth: 2,
              dot: { r: 4 },
              activeDot: { r: 6 }
            })}
            {...(type === 'area' && {
              type: config.options?.smooth ? "monotone" : "linear",
              fillOpacity: config.options?.fillOpacity || 0.6
            })}
            {...(config.options?.stacked && { stackId: "stack" })}
          />
        ))}
      </ChartComponent>
    </ResponsiveContainer>
  );

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart {...getAnimationConfig(config)}>
        <Pie
          data={data}
          dataKey={config.yAxis[0]}
          nameKey={config.xAxis}
          cx="50%"
          cy="50%"
          innerRadius={config.options?.donut ? "60%" : 0}
          outerRadius="80%"
          label={config.options?.showLabels !== false}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[index % COLORS.length]} 
            />
          ))}
        </Pie>
        <Tooltip />
        {config.showLegend && <Legend />}
      </PieChart>
    </ResponsiveContainer>
  );

  const renderScatterChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart {...getAnimationConfig(config)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="x" 
          name={config.xAxisLabel}
          type="number"
        />
        <YAxis 
          dataKey="y" 
          name={config.yAxisLabel}
          type="number"
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        {config.showLegend && <Legend />}
        <Scatter
          name={config.title || "Datos"}
          data={data}
          fill={COLORS[0]}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );

  const renderTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {config.columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {config.columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {row[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  switch (type) {
    case 'line':
      return renderCartesianChart(LineChart, Line);
    case 'bar':
      return renderCartesianChart(BarChart, Bar);
    case 'area':
      return renderCartesianChart(AreaChart, Area);
    case 'pie':
      return renderPieChart();
    case 'scatter':
      return renderScatterChart();
    case 'table':
      return renderTable();
    default:
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          Tipo de gráfica no soportado
        </div>
      );
  }
};

export default ChartRenderer;