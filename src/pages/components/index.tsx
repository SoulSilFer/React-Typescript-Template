import { Box } from '@mui/material';
import { BaseTextField } from 'components/fields';
import React from 'react';

const ComponentsPage: React.FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      sx={{ height: '60vh' }}
    >
      <Box width="80%">
        <BaseTextField label="Teste" name="Vitor" handleChange={() => {}} />
      </Box>
    </Box>
  );
};

export default ComponentsPage;
