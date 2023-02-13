import React from 'react'
import { Box, CssBaseline } from '@mui/material'
import { Outlet } from 'react-router-dom'

const AuthLayout: React.FC = () => {
  return (
    <Box
      sx={{ minHeight: '100vh' }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <CssBaseline />
      <Outlet />
    </Box>
  )
}

export default AuthLayout
