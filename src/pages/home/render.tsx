import React from 'react';

import { Box } from '@mui/material';

import { NewsCard, WeatherCard } from 'components/cards';

const HomeRender: React.FC = () => {
  return (
    <Box
      display="grid"
      className="container"
      sx={{
        gridTemplateColumns: '1.5fr 0.5fr',
        gridTemplateAreas: '"myInfo weather"',
        color: 'primary.contrastText'
      }}
      p={3}
    >
      <Box
        sx={{
          width: '90%',
          gridArea: 'myInfo',
          position: 'relative',
          boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.75)',
          borderRadius: '5px'
        }}
      >
        <NewsCard />
      </Box>

      <Box gridArea="weather">
        <WeatherCard />
      </Box>
    </Box>
  );
};

export default HomeRender;
