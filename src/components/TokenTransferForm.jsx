import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

const TokenTransferForm = ({ setSubmitted }) => {
    const [privateKey, setPrivateKey] = useState('');
    const [tokenAddress, setTokenAddress] = useState('');
    const [csvFile, setCsvFile] = useState(null);

    const handlePrivateKeyChange = (event) => {
        setPrivateKey(event.target.value);
    };

    const handleTokenAddressChange = (event) => {
        setTokenAddress(event.target.value);
    };

    const handleFileChange = (event) => {
        setCsvFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!privateKey || !tokenAddress || !csvFile) {
            alert('All fields are required!');
            return;
        }
        setSubmitted({ privateKey, tokenAddress, csvFile });
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <TextField
                label="Private Key"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={handlePrivateKeyChange}
                value={privateKey}
                required
            />
            <TextField
                label="ERC20 Token Address"
                variant="outlined"
                onChange={handleTokenAddressChange}
                value={tokenAddress}
                required
            />
            <Button
                variant="contained"
                component="label"
            >
                Upload CSV
                <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    accept=".csv"
                />
            </Button>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
            >
                GO
            </Button>
        </Box>
    );
};

export default TokenTransferForm;
