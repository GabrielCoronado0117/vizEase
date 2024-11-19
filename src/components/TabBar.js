// src/components/TabBar.js
import React from 'react';
import { X } from 'lucide-react';

const TabBar = ({ tabs, activeTab, onTabChange, onTabClose }) => {
  return (
    <div className="flex space-x-2 overflow-x-auto bg-white border-b p-2">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg cursor-pointer ${
            activeTab === tab.id
              ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span
            onClick={() => onTabChange(tab.id)}
            className="truncate max-w-xs"
          >
            {tab.name || 'Nuevo Dashboard'}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(tab.id);
            }}
            className="hover:bg-gray-200 rounded-full p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TabBar;