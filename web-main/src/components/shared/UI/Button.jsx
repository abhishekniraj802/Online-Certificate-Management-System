import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';

const Button = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  onClick,
  loading = false,
  disabled = false,
  startIcon,
  endIcon,
  children,
  ...props
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      disabled={loading || disabled}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : startIcon}
      endIcon={endIcon}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </MuiButton>
  );
};

export default Button;