// src/components/DraggableChart.js
import React from 'react';
import { useDrag } from 'react-dnd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DraggableChart = ({ id, type, data, position }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'chart',
    item: { id, type, position },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        position: 'absolute',
        left: position.x,
        top: position.y
      }}
      className="bg-white p-4 rounded-lg shadow-lg"
    >
      <LineChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default DraggableChart;