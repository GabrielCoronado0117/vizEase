import React, { useState, useEffect } from 'react';
import DataUploader from './DataUploader';
import ChartManager from './charts/ChartManager';
import DataPreview from './DataPreview';

// Componente personalizado Button
const Button = ({ children, variant = 'primary', onClick, className = '', ...props }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Componente personalizado Card
const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-sm p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Componente personalizado Input
const Input = ({ className = '', ...props }) => {
  return (
    <input 
      className={`px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

const Dashboard = () => {
  const [uploadedData, setUploadedData] = useState(null);
  const [charts, setCharts] = useState([]);
  const [dashboards, setDashboards] = useState([]);
  const [currentDashboard, setCurrentDashboard] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedDashboards = JSON.parse(localStorage.getItem('dashboards') || '[]');
    setDashboards(savedDashboards);
  }, []);

  const handleDataLoad = (data) => {
    setUploadedData(data);
    setError('');
  };

  const handleError = (message) => {
    setError(message);
  };

  const saveDashboard = () => {
    if (!currentDashboard.trim()) {
      setError('Por favor, ingresa un nombre para el dashboard');
      return;
    }

    const dashboard = {
      name: currentDashboard,
      charts,
      createdAt: new Date().toISOString(),
    };

    const updatedDashboards = [...dashboards, dashboard];
    setDashboards(updatedDashboards);
    localStorage.setItem('dashboards', JSON.stringify(updatedDashboards));
    setError('');
  };

  const loadDashboard = (name) => {
    const dashboard = dashboards.find((db) => db.name === name);
    if (dashboard) {
      setCharts(dashboard.charts);
      setCurrentDashboard(dashboard.name);
      setUploadedData(null);
    }
  };

  const deleteDashboard = (name) => {
    const updatedDashboards = dashboards.filter((db) => db.name !== name);
    setDashboards(updatedDashboards);
    localStorage.setItem('dashboards', JSON.stringify(updatedDashboards));
    if (currentDashboard === name) {
      setCurrentDashboard('');
      setCharts([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg 
              className="w-8 h-8 text-blue-600" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>
          
          {uploadedData && (
            <div className="flex items-center gap-3">
              <Input
                type="text"
                placeholder="Nombre del Dashboard"
                value={currentDashboard}
                onChange={(e) => setCurrentDashboard(e.target.value)}
                className="max-w-xs"
              />
              <Button onClick={saveDashboard}>
                <svg 
                  className="w-4 h-4" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Guardar Dashboard
              </Button>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-red-700">
              <svg 
                className="w-4 h-4" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12" y2="16" />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          {!uploadedData ? (
            <Card>
              <DataUploader onDataLoad={handleDataLoad} onError={handleError} />
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <svg 
                    className="w-5 h-5" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Vista Previa de Datos
                </h2>
                <DataPreview 
                  columns={uploadedData.columns} 
                  data={uploadedData.data} 
                />
              </Card>

              <Card>
                <ChartManager
                  data={uploadedData.data}
                  columns={uploadedData.columns}
                  charts={charts}
                  setCharts={setCharts}
                />
              </Card>
            </div>
          )}

          {/* Saved Dashboards */}
          {dashboards.length > 0 && (
            <Card>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <svg 
                  className="w-5 h-5" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                Dashboards Guardados
              </h2>
              <div className="grid gap-4">
                {dashboards.map((db) => (
                  <div 
                    key={db.name}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <svg 
                        className="w-5 h-5 text-gray-500" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                      </svg>
                      <div>
                        <h3 className="font-medium">{db.name}</h3>
                        <p className="text-sm text-gray-500">
                          Creado el {new Date(db.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => loadDashboard(db.name)}
                      >
                        <svg 
                          className="w-4 h-4" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Cargar
                      </Button>
                      <Button 
                        variant="danger"
                        onClick={() => deleteDashboard(db.name)}
                      >
                        <svg 
                          className="w-4 h-4" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;