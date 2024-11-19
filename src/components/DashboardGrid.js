// src/components/DashboardGrid.js
// src/components/DashboardGrid.js
import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import ChartContainer from './charts/ChartContainer';
import 'react-grid-layout/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardGrid = ({ charts, onEdit, onDelete }) => {
  const layout = charts.map((chart, index) => ({
    i: chart.id.toString(),
    x: index % 4, // Distribuir las gráficas en columnas
    y: Math.floor(index / 4), // Filas automáticas
    w: 2, // Ancho predeterminado
    h: 3, // Altura predeterminada
  }));

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={150}
      draggableHandle=".chart-header"
    >
      {charts.map((chart) => (
        <div key={chart.id} data-grid={layout.find((l) => l.i === chart.id.toString())}>
          <ChartContainer
            chartData={chart.config}
            onEdit={() => onEdit(chart)}
            onDelete={() => onDelete(chart.id)}
          />
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default DashboardGrid;
// src/components/Dashboard.js