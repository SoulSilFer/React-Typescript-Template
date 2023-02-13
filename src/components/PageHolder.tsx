import { ArrowBack, ArrowCircleLeft } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
  onBackclick?: () => void;
  childrenAlign?: 'center' | 'flex-start' | 'flex-end';
};

export const PageHolder: React.FC<Props> = ({
  children,
  title,
  onBackclick,
  childrenAlign
}) => {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2
        }}
      >
        <ArrowCircleLeft
          sx={{
            width: '45px',
            height: '45px',
            color: 'primary.main',
            mr: 1,
            cursor: 'pointer',
            '&:hover': {
              color: 'primary.dark'
            },
            '&:active': {
              color: 'primary.light'
            }
          }}
          onClick={onBackclick}
        />

        <Typography
          variant="h2"
          sx={{
            color: 'primary.main'
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: childrenAlign,
          mb: 2
        }}
      >
        {children}
      </Box>
    </Grid>
  );
};
