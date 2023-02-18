import React from 'react';

import { Box, Grid, Typography, Button } from '@mui/material';

type Props = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | undefined;
  title: string;
  onClick: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: {
    width?: string;
    height?: string;
  };
};

const BaseButton: React.FC<Props> = ({
  type = 'button',
  variant = 'contained',
  color = 'primary',
  title,
  onClick,
  disabled,
  fullWidth,
  size
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      sx={{
        borderRadius: '0.75rem',
        textTransform: 'none',
        width: size && size.width,
        height: size && size.height
      }}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      {title}
    </Button>
  );
};

export default BaseButton;
