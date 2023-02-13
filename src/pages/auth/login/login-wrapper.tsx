import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import LoginPresenter from './login-presenter'

const LoginWrapper: React.FC = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
  }

  const handleSubmit = (): void => {}

  return (
    <LoginPresenter handleSubmit={handleSubmit} handleChange={handleChange} />
  )
}

export default LoginWrapper
