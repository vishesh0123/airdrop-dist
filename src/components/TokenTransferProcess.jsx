import { Button, Typography } from '@mui/material'
import React from 'react'
import { ethers } from "ethers";

function TokenTransferProcess({ csvData, privateKey, token, txHash, setTxHash }) {

    const handleTokenTransfer = async () => {
        try {
            const erc20Abi = [
                "function transfer(address to, uint amount) returns (bool success)",
                "function decimals() view returns (uint8)"
            ];

            const provider = new ethers.JsonRpcProvider('https://base-rpc.publicnode.com')
            const wallet = new ethers.Wallet(privateKey, provider)
            const erc20 = new ethers.Contract(token, erc20Abi, wallet)
            const decimals = await erc20.decimals()
            let startingNonce = await wallet.getNonce()
            for (let i = 0; i < csvData.length; i++) {
                const address = csvData[i];
                const amount = ethers.parseUnits(address.amount, decimals);
                const txnonce = startingNonce + i;

                try {
                    const tx = await erc20.transfer(address.address, amount, { nonce: txnonce });
                    setTxHash(prevTxHash => [...prevTxHash, tx.hash]);
                } catch (error) {
                    console.error(`Error with transaction for ${address.address}:`, error);
                }
            }

        } catch (error) {
            window.alert(error.message);

        }



    }



    return (
        <>
            <Typography
                sx={{
                    'color': 'black',
                    fontSize: 30,
                    fontWeight: 'bold',
                    mt: 5
                }}>{csvData.length} Total addresses found</Typography>
            <Button sx={{ mt: 2 }} variant="contained" onClick={handleTokenTransfer}>
                START TOKEN TRANSFER PROCESS
            </Button>
        </>
    )
}

export default TokenTransferProcess