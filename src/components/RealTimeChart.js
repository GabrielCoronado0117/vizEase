// src/components/RealTimeChart.js
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import webSocketService from '../services/websocket';

const RealTimeChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleData = (newData) => {
      setData(currentData => [...currentData, newData].slice(-20)); // Mantener últimos 20 puntos
    };

    webSocketService.addListener(handleData);
    webSocketService.connect();

    return () => {
      webSocketService.removeListener(handleData);
    };
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-4">Datos en Tiempo Real</h2>
      <LineChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default RealTimeChart;