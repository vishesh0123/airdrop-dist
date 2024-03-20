import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Button } from '@mui/material';

const ParseCsv = ({ csvFile , setCsvData }) => {

  // Function to parse the CSV file and set the transfers data
  const parseCSV = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        const data = result.data.map(row => ({
          address: row[0],
          amount: row[1]
        }));
        setCsvData(data);
      },
      header: false,
      skipEmptyLines: "greedy",
    });
  };

  useEffect(() => {
    
    if (csvFile) {
      parseCSV(csvFile);
    }
  }, [csvFile]);

  return (
    <div>
      {/* <Button>
        Start Token Transfer
      </Button> */}
    </div>
  );
};

export default ParseCsv;