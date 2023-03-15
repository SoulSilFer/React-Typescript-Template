import React, { useState } from 'react';
import axios from 'axios';

import { Box, Typography, styled, Stack } from '@mui/material';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';

import {
  FormatedTempInitialState,
  FormatedTempObj,
  LocationInitialState,
  LocationType,
  WeatherApiResponseType
} from 'pages/home/types&utils';

const WeatherInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  alignItems: 'center'
}));

const Weather: React.FC = () => {
  const [location, setLocation] = useState<LocationType>(LocationInitialState);
  const [apiRes, setApiRes] = useState<WeatherApiResponseType | null>(null);
  const [formatedObj, setFormatedObj] = useState<FormatedTempObj>(
    FormatedTempInitialState
  );

  useEnhancedEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEnhancedEffect(() => {
    if (location) {
      const url = 'http://api.weatherapi.com/v1/current.json?';
      const key = 'e1927ff47ec54be1961202133231303';
      const query = `key=${key}&q=${location.latitude},${location.longitude}`;

      axios.get(`${url}${query}`).then((res) => {
        setApiRes(res.data);
      });
    }
  }, [location]);

  useEnhancedEffect(() => {
    if (apiRes) {
      setFormatedObj({
        fullTemp: `${apiRes.current.temp_c}°C / ${apiRes.current.temp_f}°F`,
        tempC: `${apiRes.current.temp_c}°C`,
        tempF: `${apiRes.current.temp_f}°F`,
        feelsLike: `${apiRes.current.feelslike_c}°C / ${apiRes.current.feelslike_f}°F`,
        fullWind: `${apiRes.current.wind_kph} kph / ${apiRes.current.wind_mph} mph`,
        humidity: `${apiRes.current.humidity}%`,
        city: apiRes.location.name,
        country: apiRes.location.country,
        state: apiRes.location.region,
        icon: apiRes.current.condition.icon,
        text: apiRes.current.condition.text
      });
    }
  }, [apiRes]);

  return (
    <Box
      sx={{
        placeSelf: 'flex-end',
        bgcolor: 'transparent',
        maxWidth: '400px',
        minWidth: '300px'
      }}
    >
      <Box
        sx={{
          bgcolor: 'primary.dark',
          borderRadius: 1,
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
          boxShadow: '0px 0px 25px 0px rgba(0, 0, 0, 0.75)'
        }}
      >
        <Stack direction="row" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {formatedObj.city},
          </Typography>

          <Typography ml={1}>{formatedObj.state}</Typography>
        </Stack>
        <Typography>{formatedObj.country}</Typography>
      </Box>

      <Box
        sx={{
          bgcolor: 'primary.light',
          borderRadius: 1,
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          transform: 'translate(0, -10%)',
          boxShadow: '0px 0px 25px 0px rgba(0, 0, 0, 0.75)'
        }}
      >
        <WeatherInfoContainer mt={2}>
          <Box
            sx={{
              width: '45px',
              height: '45px'
            }}
          >
            <img
              alt="icon"
              src={formatedObj.icon}
              style={{
                width: '100%'
              }}
            />
          </Box>

          <Typography variant="h6" ml={3}>
            {formatedObj.text}
          </Typography>

          <Typography variant="h6" ml={3}>
            {formatedObj.fullTemp}
          </Typography>
        </WeatherInfoContainer>

        <Box>
          <WeatherInfoContainer>
            <Typography variant="h6">Feels like:</Typography>

            <Typography ml={1}>{formatedObj.feelsLike}</Typography>
          </WeatherInfoContainer>

          <WeatherInfoContainer>
            <Typography variant="h6">Wind:</Typography>

            <Typography ml={1}>{formatedObj.fullWind}</Typography>
          </WeatherInfoContainer>

          <WeatherInfoContainer>
            <Typography variant="h6">Humidity:</Typography>

            <Typography ml={1}>{formatedObj.humidity}</Typography>
          </WeatherInfoContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Weather;
