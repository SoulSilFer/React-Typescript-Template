import React from 'react';

import { Box, Grid, Typography, Button, SxProps } from '@mui/material';

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
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: {
    width?: string;
    height?: string;
  };
  startIcon?: React.ReactNode;
  sx?: SxProps;
};

const BaseButton: React.FC<Props> = ({
  type = 'button',
  variant = 'contained',
  color = 'primary',
  title,
  onClick,
  disabled,
  fullWidth,
  size,
  startIcon,
  sx,
  ...rest
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      sx={{
        borderRadius: '0.75rem',
        textTransform: 'none',
        minWidth: '50px',
        width: size && size.width,
        height: size && size.height,

        ...sx
      }}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      startIcon={startIcon}
      {...rest}
    >
      {title}
    </Button>
  );
};

export default BaseButton;
