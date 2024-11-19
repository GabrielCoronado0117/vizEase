// src/components/charts/chartTypes.js
import { 
    BarChart, LineChart, PieChart, AreaChart, 
    ScatterChart
  } from 'lucide-react';
  
  export const CHART_TYPES = [
    { 
      id: 'bar',
      name: 'Gráfico de Barras',
      icon: BarChart,
      supportedTypes: ['number'],
      requiresCategories: true,
      multipleValues: true,
      defaultOptions: {
        orientation: 'vertical',
        stacked: false,
        showValues: false,
        animations: {
          enabled: true,
          duration: 500
        }
      }
    },
    { 
      id: 'line',
      name: 'Gráfico de Líneas',
      icon: LineChart,
      supportedTypes: ['number'],
      requiresCategories: true,
      multipleValues: true,
      defaultOptions: {
        smooth: false,
        area: false,
        tension: 0.4,
        animations: {
          enabled: true,
          duration: 500
        }
      }
    },
    { 
      id: 'pie',
      name: 'Gráfico Circular',
      icon: PieChart,
      supportedTypes: ['number'],
      requiresCategories: true,
      multipleValues: false,
      defaultOptions: {
        donut: false,
        showPercentage: true,
        innerRadius: 0,
        animations: {
          enabled: true,
          duration: 500
        }
      }
    },
    { 
      id: 'area',
      name: 'Gráfico de Área',
      icon: AreaChart,
      supportedTypes: ['number'],
      requiresCategories: true,
      multipleValues: true,
      defaultOptions: {
        stacked: false,
        smooth: false,
        fillOpacity: 0.6,
        animations: {
          enabled: true,
          duration: 500
        }
      }
    },
    { 
      id: 'scatter',
      name: 'Gráfico de Dispersión',
      icon: ScatterChart,
      supportedTypes: ['number'],
      requiresCategories: false,
      multipleValues: false,
      defaultOptions: {
        showTrendline: false,
        pointSize: 5,
        animations: {
          enabled: true,
          duration: 500
        }
      }
    }
  ];
  
  export const getChartTypeById = (id) => {
    return CHART_TYPES.find(type => type.id === id);
  };
  
  export const getDefaultOptions = (chartType) => {
    const type = getChartTypeById(chartType);
    return type ? type.defaultOptions : {};
  };
  
  export default CHART_TYPES;