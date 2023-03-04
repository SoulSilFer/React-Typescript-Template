import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Box, styled } from '@mui/material';

import { DashboardMainCard } from 'components/cards';
import { useWindowDimensions } from 'utils/getWindowDimensions';
import { CalculateBody, ConvertBody, GetRandomBody } from './cardsInfo';
import { BaseButton } from 'components/buttons';

const StyledContainer = styled(Box)(({ theme }) => ({
  marginTop: '1rem',
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'space-between',
  justifyContent: 'space-between',
  padding: '0.5rem',
  marginBottom: '1rem'
}));

const FunctionalitiesHomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const windowWidth = useWindowDimensions().width;

  const getRandom = GetRandomBody(t);
  const calculate = CalculateBody(t);
  const convert = ConvertBody(t);

  if (windowWidth > 350) {
    return (
      <Box
        sx={{
          display: 'flex',
          height: 'fit-content',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <DashboardMainCard
          mainIcon={getRandom.mainIcon}
          stackButtonsLength={getRandom.stackButtons.length}
          stackButtons={getRandom.stackButtons.map((item) => ({
            icon: item.icon,
            title: item.title,
            onClick: () =>
              navigate(item.onClick.to, { state: item.onClick.state })
          }))}
          title={getRandom.title}
          onClick={() =>
            navigate(getRandom.onClick.to, { state: getRandom.onClick.state })
          }
        />

        <DashboardMainCard
          mainIcon={calculate.mainIcon}
          stackButtonsLength={calculate.stackButtons.length}
          stackButtons={calculate.stackButtons.map((item) => ({
            icon: item.icon,
            title: item.title,
            onClick: () => navigate(item.onClick.to)
          }))}
          title={calculate.title}
          onClick={() => navigate(calculate.onClick.to)}
        />

        <DashboardMainCard
          mainIcon={convert.mainIcon}
          stackButtonsLength={convert.stackButtons.length}
          stackButtons={convert.stackButtons.map((item) => ({
            icon: item.icon,
            title: item.title,
            onClick: () => navigate(item.onClick.to)
          }))}
          title={convert.title}
          onClick={() => navigate(convert.onClick.to)}
        />
      </Box>
    );
  } else {
    return (
      <StyledContainer>
        <BaseButton
          onClick={() =>
            navigate(getRandom.onClick.to, {
              state: getRandom.onClick.state
            })
          }
          title={getRandom.title}
          startIcon={getRandom.mainIcon}
          sx={{ mb: 1 }}
        />

        {getRandom.stackButtons.map((item, index) => (
          <BaseButton
            key={index}
            onClick={() =>
              navigate(item.onClick.to, { state: item.onClick.state })
            }
            title={item.title}
            startIcon={item.icon}
            sx={{ mb: 1 }}
          />
        ))}

        <BaseButton
          onClick={() => navigate(calculate.onClick.to)}
          title={calculate.title}
          startIcon={calculate.mainIcon}
          sx={{ mb: 1 }}
        />

        {calculate.stackButtons.map((item, index) => (
          <BaseButton
            key={index}
            onClick={() => navigate(item.onClick.to)}
            title={item.title}
            startIcon={item.icon}
            sx={{ mb: 1 }}
          />
        ))}

        <BaseButton
          onClick={() => navigate(convert.onClick.to)}
          title={convert.title}
          startIcon={convert.mainIcon}
          sx={{ mb: 1 }}
        />

        {convert.stackButtons.map((item, index) => (
          <BaseButton
            key={index}
            onClick={() => navigate(item.onClick.to)}
            title={item.title}
            startIcon={item.icon}
            sx={{ mb: 1 }}
          />
        ))}
      </StyledContainer>
    );
  }
};

export default FunctionalitiesHomePage;
