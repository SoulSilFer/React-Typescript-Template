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
  // return (
  //   <Box
  //     display="flex"
  //     flexDirection="column"
  //     alignItems="center"
  //     sx={{
  //       bgcolor: 'background.paper',
  //       borderRadius: 2,
  //       boxShadow: 3,
  //       border: '1px solid black',
  //       width: '14rem',
  //       height: '11rem',
  //       transition: 'all 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55)',

  //       '&:hover': {
  //         boxShadow: '10px 10px 27px -10px rgba(0,0,0,0.75)',
  //         transform: 'scale(1.05)',
  //         height: stackButtons && stackButtons.length * 100 + 100,

  //         '& .stack': {
  //           animation: 'my-animation 1s ease-in-out',
  //           '@keyframes my-animation': {
  //             '0%': {
  //               opacity: 0,
  //               height: '20%'
  //             },
  //             '100%': {
  //               opacity: 1,
  //               height: '100%'
  //             }
  //           },

  //           opacity: 1
  //         }
  //       },

  //       '& .stack': {
  //         opacity: 0,
  //         display: 'flex',
  //         justifyContent: 'center',
  //         width: '80%',
  //         height: '100%'
  //       }
  //     }}
  //   >
  //     <Typography
  //       variant="h4"
  //       sx={{
  //         color: 'primary.main',
  //         fontWeight: 'bold',
  //         mt: 2,
  //         mb: 2
  //       }}
  //     >
  //       {title}
  //     </Typography>

  //     <Box
  //       sx={{
  //         display: 'flex',
  //         alignItems: 'flex-start',
  //         justifyContent: 'center',
  //         width: '100%'
  //       }}
  //     >
  //       {imgSrc && (
  //         <img
  //           src={imgSrc}
  //           alt="team logo"
  //           width="30%"
  //           style={{
  //             cursor: 'pointer'
  //           }}
  //           onClick={onClick}
  //         />
  //       )}
  //     </Box>

  //     {stackButtons && (
  //       <Stack direction="column" spacing={2} className="stack">
  //         {stackButtons.map((button, index) => (
  //           <BaseButton
  //             startIcon={button.icon}
  //             title={button.title}
  //             sx={{
  //               display: 'flex',
  //               justifyContent: 'flex-start',
  //               textTransform: 'none'
  //             }}
  //             onClick={button.onClick}
  //             key={index}
  //           />
  //         ))}
  //       </Stack>
  //     )}
  //   </Box>
  // );

  return (
    <Box
      sx={{
        width: 250,
        color: 'primary.contrastText',

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
            boxShadow: '10px 10px 27px -10px rgba(0,0,0,0.75)'
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
      <Box className="primaryCard" onClick={onClick}>
        {mainIcon}

        <Typography mt={2} variant="overline">
          {title}
        </Typography>
      </Box>

      {stackButtons && (
        <Box className="secondaryCard">
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
