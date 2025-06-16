import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors';

const WeatherIcon = ({ condition, size = 40 }) => {
  let iconName;
  
  switch (condition) {
    case 'Clear':
      iconName = 'weather-sunny';
      break;
    case 'Clouds':
      iconName = 'weather-cloudy';
      break;
    case 'Rain':
      iconName = 'weather-rainy';
      break;
    case 'Snow':
      iconName = 'weather-snowy';
      break;
    case 'Thunderstorm':
      iconName = 'weather-lightning';
      break;
    case 'Drizzle':
      iconName = 'weather-pouring';
      break;
    case 'Mist':
    case 'Smoke':
    case 'Haze':
    case 'Dust':
    case 'Fog':
    case 'Sand':
    case 'Ash':
    case 'Squall':
    case 'Tornado':
      iconName = 'weather-fog';
      break;
    default:
      iconName = 'weather-cloudy';
  }

  return (
    <View style={styles.container}>
      <Icon name={iconName} size={size} color={colors.white} /> {/* Ensure icon color is white for visibility */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WeatherIcon;
