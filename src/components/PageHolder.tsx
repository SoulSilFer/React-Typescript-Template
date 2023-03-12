import { ArrowCircleLeft } from '@mui/icons-material';
import { Box, Grid, Typography, styled, SxProps } from '@mui/material';
import React from 'react';

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.primary.main}`,
  padding: '1rem',
  borderRadius: '0.75rem'
}));

type Props = {
  children: React.ReactNode;
  title: string;
  childrenAlign?: 'center' | 'flex-start' | 'flex-end';
  mainSx?: any;
  maxWidth?: number | string;
  mt?: number | string;
  noContainer?: boolean;
  styledContainerSx?: SxProps;
};

export const PageHolder: React.FC<Props> = ({
  children,
  title,
  childrenAlign,
  mainSx,
  maxWidth,
  mt,
  noContainer,
  styledContainerSx
}) => {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        ...mainSx
      }}
      mb={6}
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
          onClick={() => window.history.back()}
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
        {noContainer ? (
          children
        ) : (
          <StyledContainer
            sx={{
              maxWidth,
              mt: mt ? mt : 2,
              ...styledContainerSx
            }}
          >
            {children}
          </StyledContainer>
        )}
      </Box>
    </Grid>
  );
};
