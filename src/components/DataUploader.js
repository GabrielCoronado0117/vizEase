// src/components/DataUploader.js
import React, { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

const DataUploader = ({ onDataLoad, onError }) => {
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.type;
    setFileName(file.name);

    // Leer archivo según su tipo
    if (fileType === 'application/json') {
      readJSONFile(file);
    } else if (fileType === 'text/csv') {
      readCSVFile(file);
    } else if (
      fileType ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      readExcelFile(file);
    } else {
      onError('Formato de archivo no soportado. Por favor, sube un archivo CSV, JSON o Excel.');
    }
  };

  const readCSVFile = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        if (result.errors.length > 0) {
          onError('Error al procesar el archivo CSV.');
        } else {
          const columns = Object.keys(result.data[0]);
          onDataLoad({ columns, data: result.data });
        }
      },
    });
  };

  const readJSONFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        const columns = Object.keys(jsonData[0]);
        onDataLoad({ columns, data: jsonData });
      } catch (error) {
        onError('Error al procesar el archivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  const readExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);
        const columns = Object.keys(data[0]);
        onDataLoad({ columns, data });
      } catch (error) {
        onError('Error al procesar el archivo Excel.');
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="data-uploader">
      <h2 className="text-lg font-medium">Carga de Datos</h2>
      <input
        type="file"
        accept=".csv, .json, .xlsx"
        onChange={handleFileUpload}
        className="file-input"
      />
      {fileName && <p className="mt-2">Archivo cargado: {fileName}</p>}
    </div>
  );
};

export default DataUploader;
