import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AnimatedWeatherIcon from './AnimatedWeatherIcon';
import colors from '../constants/colors';

const CurrentWeather = ({ weather }) => {
  if (!weather) return null;

  const { main, weather: weatherDetails } = weather;
  const condition = weatherDetails[0]?.main;
  console.log('Current Weather:', weather);
  console.log('Weather Details:', weatherDetails);

  return (
    <View style={styles.container}>
      <Text style={styles.temperature}>{weather.name}</Text>
      <AnimatedWeatherIcon condition={condition} size={80} />
      <Text style={styles.temperature}>{Math.round(main.temp)}°C</Text>
      <Text style={styles.condition}>{weatherDetails[0]?.description}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{main.humidity}%</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Wind</Text>
          <Text style={styles.detailValue}>{weather.wind?.speed} m/s</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Pressure</Text>
          <Text style={styles.detailValue}>{main.pressure} hPa</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent', // Removed background color as parent now handles it
    borderRadius: 10,
    margin: 0, // Removed margin as parent now handles it
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 10,
  },
  condition: {
    fontSize: 20,
    color: colors.white,
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10, // Added horizontal padding for better spacing
  },
  detailItem: {
    alignItems: 'center',
    flex: 1, // Distribute items evenly
  },
  detailLabel: {
    color: colors.white,
    fontSize: 14,
    opacity: 0.8,
  },
  detailValue: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CurrentWeather;
