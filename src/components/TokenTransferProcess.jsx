import { Button, Typography } from '@mui/material'
import React from 'react'
import { ethers } from "ethers";

function TokenTransferProcess({ csvData, privateKey, token, txHash, setTxHash }) {

    function chunkArray(array, chunkSize) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            chunks.push(chunk);
        }
        return chunks;
    }

    const handleTokenTransfer = async () => {
        try {
            const erc20Abi = [
                "function transfer(address to, uint amount) returns (bool success)",
                "function decimals() view returns (uint8)"
            ];

            const provider = new ethers.JsonRpcProvider('https://base-rpc.publicnode.com')
            // const provider = new ethers.JsonRpcProvider('https://base-sepolia-rpc.publicnode.com')

            const wallet = new ethers.Wallet(privateKey, provider)
            const erc20 = new ethers.Contract(token, erc20Abi, wallet)
            const decimals = await erc20.decimals()
            let startingNonce = await wallet.getNonce()

            // csvData.forEach(async (address, index) => {
            //     const amount = ethers.parseUnits(address.amount, decimals);
            //     const nonce = startingNonce + index;

            //     try {
            //         const tx = await erc20.transfer(address.address, amount, { nonce });
            //         setTxHash(prevTxHash => [...prevTxHash, tx.hash]);
            //     } catch (error) {
            //         console.error(`Error with transaction for ${address.address}:`, error);
            //     }
            // });

            // for (let i = 0; i < csvData.length; i++) {
            //     const address = csvData[i];
            //     const amount = ethers.parseUnits(address.amount, decimals);
            //     const txnonce = startingNonce + i;

            //     try {
            //         const tx = await erc20.transfer(address.address, amount, { nonce: txnonce });
            //         setTxHash(prevTxHash => [...prevTxHash, tx.hash]);
            //     } catch (error) {
            //         console.error(`Error with transaction for ${address.address}:`, error);
            //     }
            // }

            const chunkSize = 3;
            const transactionChunks = chunkArray(csvData, chunkSize);

            for (let i = 0; i < transactionChunks.length; i++) {
                const chunk = transactionChunks[i];
                const transactionPromises = chunk.map((address, chunkIndex) => {
                    const amount = ethers.parseUnits(address.amount, decimals);
                    const txnonce = startingNonce + i * chunkSize + chunkIndex;
                    return erc20.transfer(address.address, amount, { nonce: txnonce })
                        .then(tx => {
                            return tx.hash;
                        })
                        .catch(error => {
                            return null;
                        });
                });

                try {
                    const results = await Promise.all(transactionPromises);
                    const successfulHashes = results.filter(hash => hash !== null);
                    setTxHash(prevTxHash => [...prevTxHash, ...successfulHashes]);
                } catch (error) {
                    console.error("Unexpected error processing transaction chunk:", error);
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