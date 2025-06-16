import React from 'react';
import { View, StyleSheet } from 'react-native';

// Import SVGs as React components
import Day from '../assets/icons/animated/day.svg';
import Cloudy from '../assets/icons/animated/cloudy.svg';
import Rainy3 from '../assets/icons/animated/rainy-3.svg';
import Snowy3 from '../assets/icons/animated/snowy-3.svg';
import Thunder from '../assets/icons/animated/thunder.svg';
import Rainy1 from '../assets/icons/animated/rainy-1.svg';
import CloudyDay1 from '../assets/icons/animated/cloudy-day-1.svg';
import CloudyDay2 from '../assets/icons/animated/cloudy-day-2.svg';
import CloudyDay3 from '../assets/icons/animated/cloudy-day-3.svg';
import CloudyNight1 from '../assets/icons/animated/cloudy-night-1.svg';
import CloudyNight2 from '../assets/icons/animated/cloudy-night-2.svg';
import CloudyNight3 from '../assets/icons/animated/cloudy-night-3.svg';
import Weather from '../assets/icons/animated/weather.svg';

// Map weather conditions to imported SVGs
const conditionToSvg = {
  Clear: Day,
  Clouds: Cloudy,
  Rain: Rainy3,
  Snow: Snowy3,
  Thunderstorm: Thunder,
  Drizzle: Rainy1,
  Mist: CloudyDay1,
  Smoke: CloudyDay2,
  Haze: CloudyDay3,
  Dust: Cloudy,
  Fog: CloudyNight1,
  Sand: CloudyNight2,
  Ash: CloudyNight3,
  Squall: Cloudy,
  Tornado: Weather,
};

const AnimatedWeatherIcon = ({ condition = 'Clear', size = 80 }) => {
  const IconComponent = conditionToSvg[condition] || Day;
  return (
    <View style={[styles.container, { width: size, height: size }]}> 
      <IconComponent width={size} height={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AnimatedWeatherIcon;
