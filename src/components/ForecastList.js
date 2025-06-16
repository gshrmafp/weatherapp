import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import DailyForecast from './DailyForecast';
import colors from '../constants/colors';

const ForecastList = ({ forecastData, onForecastPress }) => {
  if (!forecastData) return null;

  // Group forecast by day
  const dailyForecasts = {};
  forecastData.list.forEach((item) => {
    // Using UTC date to avoid timezone issues when grouping by day
    const date = new Date(item.dt * 1000).toISOString().split('T')[0]; 
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = {
        dt: item.dt,
        main: {
          temp: item.main.temp,
          temp_max: item.main.temp_max,
          temp_min: item.main.temp_min,
        },
        weather: item.weather,
      };
    } else {
      // Update max and min temps for the day
      if (item.main.temp_max > dailyForecasts[date].main.temp_max) {
        dailyForecasts[date].main.temp_max = item.main.temp_max;
      }
      if (item.main.temp_min < dailyForecasts[date].main.temp_min) {
        dailyForecasts[date].main.temp_min = item.main.temp_min;
      }
    }
  });

  const forecastArray = Object.values(dailyForecasts);

  return (
    <View style={styles.container}>
    
      <FlatList
        data={forecastArray.slice(0, 3)} // Displaying only the next 3 days
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => (
          <DailyForecast forecast={item} onPress={() => onForecastPress(item)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    // Adjusted for new background
    borderRadius: 10,
    padding: 10,

  },

});

export default ForecastList;
