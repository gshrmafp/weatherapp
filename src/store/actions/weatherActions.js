import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  FETCH_FORECAST_REQUEST,
  FETCH_FORECAST_SUCCESS,
  FETCH_FORECAST_FAILURE,
  SEARCH_CITIES_REQUEST,
  SEARCH_CITIES_SUCCESS,
  SEARCH_CITIES_FAILURE,
  SET_SELECTED_CITY,
  SET_FORECAST_DAYS,
} from './types';
import {
  fetchCurrentWeather,
  fetchForecast,
  searchCities,
} from '../../services/weatherService';

export const setSelectedCity = (city) => ({
  type: SET_SELECTED_CITY,
  payload: city,
});

export const setForecastDays = (days) => ({
  type: SET_FORECAST_DAYS,
  payload: days,
});

export const fetchWeather = (lat, lon) => async (dispatch) => {
  dispatch({ type: FETCH_WEATHER_REQUEST });
  try {
    const weatherData = await fetchCurrentWeather(lat, lon);
    dispatch({
      type: FETCH_WEATHER_SUCCESS,
      payload: weatherData,
    });
  } catch (error) {
    dispatch({
      type: FETCH_WEATHER_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchWeatherForecast = (lat, lon, days) => async (dispatch) => {
  dispatch({ type: FETCH_FORECAST_REQUEST });
  try {
    const forecastData = await fetchForecast(lat, lon, days);
    dispatch({
      type: FETCH_FORECAST_SUCCESS,
      payload: forecastData,
    });
  } catch (error) {
    dispatch({
      type: FETCH_FORECAST_FAILURE,
      payload: error.message,
    });
  }
};

export const searchCitiesAction = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_CITIES_REQUEST });
  try {
    const cities = await searchCities(query);
    dispatch({
      type: SEARCH_CITIES_SUCCESS,
      payload: cities,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_CITIES_FAILURE,
      payload: error.message,
    });
  }
};