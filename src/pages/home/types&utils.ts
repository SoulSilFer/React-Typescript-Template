export type LocationType = {
  latitude: number;
  longitude: number;
};

export const LocationInitialState: LocationType = {
  latitude: 0,
  longitude: 0
};

export type WeatherApiResponseType = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string; // Date and time
  };
  current: {
    last_updated_epoch: number;
    last_updated: string; // Date and time
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string; // url
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
};

export type ArticleApiType = {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string; // date type
  source: {
    name: string;
    url: string;
  };
};

export type NewsApiResponseType = {
  articles: ArticleApiType[];
};

export type FormatedTempObj = {
  fullTemp: string;
  tempC: string;
  tempF: string;
  feelsLike: string;
  fullWind: string;
  humidity: string;
  city: string;
  country: string;
  state: string;
  icon: string;
  text: string;
};

export const FormatedTempInitialState: FormatedTempObj = {
  fullTemp: `0°C / 0°F`,
  tempC: `0°C`,
  tempF: `0°F`,
  feelsLike: `0°C / 0°F`,
  fullWind: `0 kph / 0 mph`,
  humidity: `0%`,
  city: '',
  country: '',
  state: '',
  icon: '//cdn.weatherapi.com/weather/64x64/day/302.png',
  text: ''
};
