import React, { useState } from 'react';
import axios from 'axios';

import { Box, SelectChangeEvent, Stack, Typography } from '@mui/material';

import { NewsApiResponseType } from 'pages/home/types&utils';
import { BaseSelect, BaseTextField } from 'components/fields';
import { BaseButton } from 'components/buttons';

const categoryItems: [string, string][] = [
  ['general', 'general'],
  ['world', 'world'],
  ['nation', 'nation'],
  ['business', 'business'],
  ['technology', 'technology'],
  ['entertainment', 'entertainment'],
  ['sports', 'sports'],
  ['science', 'science'],
  ['health', 'health']
];

const countryItems: [string, string][] = [
  ['Australia', 'au'],
  ['Brazil', 'br'],
  ['Canada', 'ca'],
  ['China', 'cn'],
  ['Egypt', 'eg'],
  ['France', 'fr'],
  ['Germany', 'de'],
  ['Greece', 'gr'],
  ['Hong Kong', 'hk'],
  ['India', 'in'],
  ['Ireland', 'ie'],
  ['Israel', 'il'],
  ['Italy', 'it'],
  ['Japan', 'jp'],
  ['Netherlands', 'nl'],
  ['Norway', 'no'],
  ['Pakistan', 'pk'],
  ['Peru', 'pe'],
  ['Philippines', 'ph'],
  ['Portugal', 'pt'],
  ['Romania', 'ro'],
  ['Russian Federation', 'ru'],
  ['Singapore', 'sg'],
  ['Spain', 'es'],
  ['Sweden', 'se'],
  ['Switzerland', 'ch'],
  ['Taiwan', 'tw'],
  ['Ukraine', 'ua'],
  ['United Kingdom', 'gb'],
  ['United States', 'us'],
  ['General', 'general']
];

enum CategoryValues {
  general = 'general',
  world = 'world',
  nation = 'nation',
  business = 'business',
  technology = 'technology',
  entertainment = 'entertainment',
  sports = 'sports',
  science = 'science',
  health = 'health'
}

enum CountryValues {
  Australia = 'au',
  Brazil = 'br',
  Canada = 'ca',
  China = 'cn',
  Egypt = 'eg',
  France = 'fr',
  Germany = 'de',
  Greece = 'gr',
  HongKong = 'hk',
  India = 'in',
  Ireland = 'ie',
  Israel = 'il',
  Italy = 'it',
  Japan = 'jp',
  Netherlands = 'nl',
  Norway = 'no',
  Pakistan = 'pk',
  Peru = 'pe',
  Philippines = 'ph',
  Portugal = 'pt',
  Romania = 'ro',
  RussianFederation = 'ru',
  Singapore = 'sg',
  Spain = 'es',
  Sweden = 'se',
  Switzerland = 'ch',
  Taiwan = 'tw',
  Ukraine = 'ua',
  UnitedKingdom = 'gb',
  UnitedStates = 'us',
  General = 'general'
}

type ValuesType = {
  category: CategoryValues;
  country: CountryValues;
  search: string;
};

const InitialValues: ValuesType = {
  category: CategoryValues.general,
  country: CountryValues.Brazil,
  search: ''
};

const NewsCard: React.FC = () => {
  const [newsDisplay, setNewsDisplay] = useState<number>(0);
  const [values, setValues] = useState<ValuesType>(InitialValues);
  const [apiResponse, setApiResponse] = useState<NewsApiResponseType | null>(
    null
  );

  const contentToShow = apiResponse && apiResponse.articles[newsDisplay];

  const handleSelectChange = (event: SelectChangeEvent<unknown>): void => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });
  };

  const apikey = '016920beea68f179917a56295f693358';

  const handleRequest = async () => {
    setNewsDisplay(0);
    let subparams = '';
    const baseUrl = 'https://gnews.io/api/v4/top-headlines';

    if (values.category) {
      subparams =
        subparams.length === 0
          ? `?category=${values.category}`
          : `${subparams}&creator=${values.category}`;
    }

    if (values.country !== CountryValues.General) {
      subparams =
        subparams.length === 0
          ? `?country=${values.country}`
          : `${subparams}&country=${values.country}`;
    }

    const url = `${baseUrl}${subparams}&apikey=${apikey}`;

    const response = await axios.get(url);

    setApiResponse(response.data);
  };

  return (
    <Box p={2}>
      <Stack direction="row" gap={2}>
        <BaseSelect
          fullWidth
          id="category"
          label="Category"
          name="category"
          onChange={handleSelectChange}
          data={categoryItems.sort((a, b) => a[0].localeCompare(b[0]))}
          value={values.category}
          sx={{
            width: '25%'
          }}
        />

        <BaseSelect
          fullWidth
          id="country"
          label="Country"
          name="country"
          onChange={handleSelectChange}
          data={countryItems.sort((a, b) => a[0].localeCompare(b[0]))}
          value={values.country}
          sx={{
            width: '25%'
          }}
        />

        <BaseTextField
          label="Conteúdo"
          name="search"
          sx={{
            width: '35%'
          }}
          value={values.search}
          handleChange={handleInputChange}
        />

        <BaseButton title="Pesquisar" onClick={handleRequest} />
      </Stack>

      {contentToShow && (
        <Box
          sx={{
            border: '1px solid',
            bgcolor: 'primary.light',
            borderRadius: '5px',
            p: 1,
            display: 'grid',
            gridTemplateRows: '1fr',
            gridTemplateAreas: '"header" "description" "content"'
          }}
          mt={3}
        >
          <Box
            sx={{
              gridArea: 'header',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateAreas: '"image content" "image content"'
            }}
          >
            <img
              src={contentToShow.image}
              alt={contentToShow.title}
              style={{
                gridArea: 'image',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '5px'
              }}
            />

            <Box
              sx={{
                gridArea: 'content',
                p: 1,
                color: 'primary.contrastText'
              }}
            >
              <Typography variant="h5">{contentToShow.title}</Typography>

              <Typography variant="body1">
                {new Date(contentToShow.publishedAt).toLocaleDateString()}
              </Typography>

              <Typography variant="body1">
                {contentToShow.description}
              </Typography>

              <Typography variant="body1">{contentToShow.content}</Typography>
            </Box>
          </Box>

          <Stack
            direction="row"
            gap={2}
            sx={{
              placeSelf: 'center',
              alignItems: 'center'
            }}
            mt={2}
            mb={2}
          >
            <BaseButton
              title="Anterior"
              onClick={() => {
                if (newsDisplay === 0) {
                  setNewsDisplay(apiResponse.articles.length - 1);
                } else {
                  setNewsDisplay(newsDisplay - 1);
                }
              }}
            />

            <Typography variant="body1" sx={{ color: 'primary.contrastText' }}>
              {newsDisplay + 1} de {apiResponse?.articles.length}
            </Typography>

            <BaseButton
              title="Próximo"
              onClick={() => {
                if (newsDisplay === apiResponse.articles.length - 1) {
                  setNewsDisplay(0);
                } else {
                  setNewsDisplay(newsDisplay + 1);
                }
              }}
            />
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default NewsCard;
