import { Typography } from '@mui/material'
import React from 'react'

function Progress({ txHash, total }) {
    return (
        <>
            <Typography sx={{ 'color': 'black' }}>PROGRESS: {txHash.length} / {total}</Typography>
        </>
    )
}

export default Progress