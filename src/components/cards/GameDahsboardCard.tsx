import React from 'react';

import { Box, Stack, Typography } from '@mui/material';
import { BaseButton } from 'components/buttons';

type Props = {
  title: string;
  onClick: () => void;
  mainIcon: JSX.Element;
  stackButtons?: {
    icon: JSX.Element;
    title: string;
    onClick: () => void;
  }[];
};

const GameDashboardCard: React.FC<Props> = ({
  title,
  onClick,
  mainIcon,
  stackButtons
}) => {
  return (
    <Box
      key={title}
      sx={{
        width: 250,
        flex: '0 0 250px',
        color: 'primary.contrastText',
        position: 'relative',
        margin: '40px',

        '& .primaryCard': {
          height: 110,
          bgcolor: 'primary.main',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
          boxShadow: 3,
          zIndex: 1,
          position: 'relative',
          p: 1,
          transition: 'all 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
          transform: 'translateY(40%)',
          cursor: 'pointer',

          '& .MuiSvgIcon-root': {
            width: 40,
            height: 40
          }
        },

        '& .secondaryCard': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0,
          visibility: 'hidden',
          bgcolor: 'secondary.main',
          borderRadius: 2
        },

        '&:hover': {
          '& .primaryCard': {
            transform: 'translateY(-10%)',
            // boxShadow: '10px 10px 27px -10px rgba(0,0,0,0.75)',
            boxShadow: '0px 0px 28px -10px primary.main'
          },

          '& .secondaryCard': {
            boxShadow: '10px 10px 27px -10px rgba(0,0,0,0.75)',
            visibility: 'visible',
            animation: 'topToBottom 0.3s ease-in-out',
            '@keyframes topToBottom': {
              '0%': {
                opacity: 0,
                transform: 'translateY(0%)'
              },
              '100%': {
                opacity: 1,
                transform: 'translateY(60%)'
              }
            },
            transform: 'translateY(60%)',
            height: 140,
            opacity: 1
          }
        }
      }}
      className="cardContainer"
    >
      <Box className="primaryCard" onClick={onClick} key={title}>
        {mainIcon}

        <Typography mt={2} variant="overline">
          {title}
        </Typography>
      </Box>

      {stackButtons && (
        <Box className="secondaryCard" key={title}>
          <Stack direction="column" spacing={2} mt={2}>
            {stackButtons.map((button, index) => (
              <BaseButton
                startIcon={button.icon}
                title={button.title}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  textTransform: 'none'
                }}
                onClick={button.onClick}
                key={index}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default GameDashboardCard;
