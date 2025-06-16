import axios from 'axios';
import { API_KEY, BASE_URL, GEOCODING_URL } from '../constants/config';

export const fetchCurrentWeather = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchForecast = async (lat, lon, days = 3) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
        cnt: days * 8, // 3-hour intervals for 3 days
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchCities = async (query) => {
  try {
    const response = await axios.get(GEOCODING_URL, {
      params: {
        q: query,
        limit: 5,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};