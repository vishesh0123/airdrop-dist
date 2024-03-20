import { useState } from 'react'
import './App.css'
import TokenTransferForm from './components/TokenTransferForm';
import ParseCsv from './components/ParseCsv';
import TokenTransferProcess from './components/TokenTransferProcess';
import DataFrame from './components/DataFrame';
import { Box } from '@mui/material';
import Progress from './components/Progress';

function App() {
  const [submitted, setSubmitted] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [txHash, setTxHash] = useState([]);

  return (
    <>
      <Box display='flex' justifyContent='space-evenly'>
        <Box display='flex' flexDirection='column'>
          <TokenTransferForm setSubmitted={setSubmitted} />
          {submitted &&
            <ParseCsv
              csvFile={submitted.csvFile}
              setCsvData={setCsvData}
            />
          }
          {csvData &&
            <TokenTransferProcess csvData={csvData} privateKey={submitted.privateKey} token={submitted.tokenAddress} txHash={txHash} setTxHash={setTxHash} />}
          {txHash.length > 0 && <Progress txHash={txHash} total={csvData.length} />}
        </Box>
        {csvData && <DataFrame transferResults={csvData} txHash={txHash} />}
      </Box>
    </>
  );
}

export default App
