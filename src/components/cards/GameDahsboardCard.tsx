import { Box, Typography } from '@mui/material';
import React from 'react';

type Props = {
  title: string;
  onClick: () => void;
  imgSrc?: string;
};

const GameDashboardCard: React.FC<Props> = ({ title, onClick, imgSrc }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        border: '1px solid black',
        width: 300,
        height: 300,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '10px 10px 27px -10px rgba(0,0,0,0.75)',
          height: 500,
          cursor: 'pointer'
        }
      }}
      onClick={onClick}
    >
      <Typography
        variant="h4"
        sx={{
          color: 'primary.main',
          fontWeight: 'bold',
          mt: 2,
          mb: 2
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        {imgSrc && (
          <img
            src="https://cdn-icons-png.flaticon.com/512/2911/2911124.png"
            alt="team logo"
            width="50%"
          />
        )}
      </Box>
    </Box>
  );
};

export default GameDashboardCard;
