import { Button, Grid } from '@mui/material'
import React from 'react'

export default function ErrorComponent({message,onBtnClicked,buttonText}) {
  return (
    <Grid container className="success-message-container">
      <Grid item className="success-message-item-container">
        <Grid>
            <p className='text-red-700 text-2xl'>{message}</p>
        </Grid>
        <Grid>
            <Button onClick={onBtnClicked} variant="contained" className='text-white bg-blue-500 mt-8'>{buttonText} </Button>
        </Grid>
        </Grid>
      </Grid>
  )
}
