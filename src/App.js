// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './components/Dashboard';
import Tables from './components/Tables';
import ImportData from './components/ImportData';
import ExportData from './components/ExportData';
import Profile from './components/Profile';
import Login from './components/Login';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/import" element={<ImportData />} />
            <Route path="/export" element={<ExportData />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/tables" element={<Tables />} />
          </Routes>
        </Router>
      </AuthProvider>
    </DndProvider>
  );
}

export default App;