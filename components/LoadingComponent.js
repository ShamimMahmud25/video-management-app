import { Button, Grid } from '@mui/material'
import React from 'react'

export default function LoadingComponent({message}) {
  return (
    <Grid container className="success-message-container">
      <Grid item className="success-message-item-container">
        <Grid>
            <p className='text-2xl'>`{message}`</p>
        </Grid>
        </Grid>
      </Grid>
  )
}
