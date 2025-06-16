import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AnimatedWeatherIcon from './AnimatedWeatherIcon';
import colors from '../constants/colors';
import moment from 'moment';

const DailyForecast = ({ forecast, onPress }) => {
  if (!forecast) return null;

  const { dt, main, weather } = forecast;
  const date = moment.unix(dt).format('ddd, MMM D');
  const condition = weather[0]?.main;

  return (
    <TouchableOpacity onPress={onPress} style={styles.touchableContainer}> {/* Added touchable style */}
      <View style={styles.container}>
        <Text style={styles.date}>{date}</Text>
        <AnimatedWeatherIcon condition={condition} size={40} />
        <View style={styles.tempContainer}>
          <Text style={styles.tempMax}>{Math.round(main.temp_max)}°</Text>
          <Text style={styles.tempMin}>{Math.round(main.temp_min)}°</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableContainer: {
    borderRadius: 10, // Apply border radius to the touchable area
    overflow: 'hidden', // Ensures content respects border radius
    marginBottom: 5, // Spacing between items
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.1)', // More translucent background
    borderRadius: 10, // Ensure individual item also has rounded corners
    borderBottomWidth: 0, // Removed redundant border, now handled by container background
  },
  date: {
    flex: 1,
    color: colors.white, // Adjusted for new background
    fontSize: 16,
    fontWeight: '500', // Slightly bolder
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
    justifyContent: 'space-between',
  },
  tempMax: {
    color: colors.white, // Adjusted for new background
    fontSize: 16,
    fontWeight: 'bold',
  },
  tempMin: {
    color: colors.white, // Adjusted for new background
    fontSize: 16,
    opacity: 0.7,
  },
});

export default DailyForecast;
