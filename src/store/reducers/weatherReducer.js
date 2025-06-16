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
} from '../actions/types';

const initialState = {
  loading: false,
  weather: null,
  forecast: null,
  cities: [],
  selectedCity: null,
  forecastDays: 3,
  error: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
    case FETCH_FORECAST_REQUEST:
    case SEARCH_CITIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        loading: false,
        weather: action.payload,
        error: null,
      };
    case FETCH_FORECAST_SUCCESS:
      return {
        ...state,
        loading: false,
        forecast: action.payload,
        error: null,
      };
    case SEARCH_CITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        cities: action.payload,
        error: null,
      };
    case FETCH_WEATHER_FAILURE:
    case FETCH_FORECAST_FAILURE:
    case SEARCH_CITIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_SELECTED_CITY:
      return {
        ...state,
        selectedCity: action.payload,
      };
    case SET_FORECAST_DAYS:
      return {
        ...state,
        forecastDays: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;