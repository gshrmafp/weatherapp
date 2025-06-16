import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Animated, Easing } from 'react-native';
import AnimatedWeatherIcon from '../components/AnimatedWeatherIcon';
// Import SVGs for details
import HighIcon from '../assets/icons/animated/day.svg';
import LowIcon from '../assets/icons/animated/cloudy-night-1.svg';
import HumidityIcon from '../assets/icons/animated/rainy-1.svg';
import PressureIcon from '../assets/icons/animated/weather.svg';
import WindIcon from '../assets/icons/animated/cloudy.svg';
import VisibilityIcon from '../assets/icons/animated/cloudy-day-2.svg';
import moment from 'moment';
import colors from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient';

// Background images based on temperature ranges
const backgroundImages = {
  cold: 'https://images.unsplash.com/photo-1514632542677-48fae74a01b2?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  cool: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  mild: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  warm: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  hot: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

const getBackgroundImage = (temp) => {
  if (temp < 0) return backgroundImages.cold;
  if (temp < 10) return backgroundImages.cool;
  if (temp < 20) return backgroundImages.mild;
  if (temp < 40) return backgroundImages.warm;
  return backgroundImages.hot;
};

// Colorful icons mapping
const iconColors = {
  High: '#FF5252', // Red
  Low: '#2196F3', // Blue
  Humidity: '#4CAF50', // Green
  Pressure: '#9C27B0', // Purple
  Wind: '#FF9800', // Orange
  Visibility: '#00BCD4', // Cyan
};

const DetailScreen = ({ route }) => {
  const { forecastItem } = route.params;
  const weatherCondition = forecastItem.weather[0]?.main;
  const temperature = forecastItem.main.temp;
  const backgroundImage = getBackgroundImage(temperature);
  
  // Animation values
  const spinValue = new Animated.Value(0);
  const pulseValue = new Animated.Value(1);
  
  // Spin animation for weather icon
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();
  
  // Pulse animation for detail icons
  Animated.loop(
    Animated.sequence([
      Animated.timing(pulseValue, {
        toValue: 1.1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(pulseValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ])
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '10deg' ],
  });

  const pulse = pulseValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.2],
  });

  return (
    <ImageBackground 
      source={{ uri: backgroundImage }}
      style={styles.backgroundImage}
      blurRadius={3}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)']}
        style={styles.gradientOverlay}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <AnimatedWeatherIcon condition={weatherCondition} size={100} />
            </Animated.View>
            <Text style={styles.date}>
              {moment.unix(forecastItem.dt).format('dddd, MMMM Do, YYYY')}
            </Text>
            <Text style={styles.condition}>
              {forecastItem.weather[0]?.description}
            </Text>
            <Text style={styles.temperature}>
              {Math.round(forecastItem.main.temp)}°C
            </Text>
          </View>

          {/* Weather Details Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Weather Details</Text>
            </View>
            
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Animated.View style={{ transform: [{ scale: pulse }] }}>
                  <HighIcon width={40} height={40} />
                </Animated.View>
                <Text style={styles.detailLabel}>High</Text>
                <Text style={styles.detailValue}>
                  {Math.round(forecastItem.main.temp_max)}°C
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Animated.View style={{ transform: [{ scale: pulse }] }}>
                  <LowIcon width={40} height={40} />
                </Animated.View>
                <Text style={styles.detailLabel}>Low</Text>
                <Text style={styles.detailValue}>
                  {Math.round(forecastItem.main.temp_min)}°C
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Animated.View style={{ transform: [{ scale: pulse }] }}>
                  <HumidityIcon width={40} height={40} />
                </Animated.View>
                <Text style={styles.detailLabel}>Humidity</Text>
                <Text style={styles.detailValue}>
                  {forecastItem.main.humidity}%
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Animated.View style={{ transform: [{ scale: pulse }] }}>
                  <PressureIcon width={40} height={40} />
                </Animated.View>
                <Text style={styles.detailLabel}>Pressure</Text>
                <Text style={styles.detailValue}>
                  {forecastItem.main.pressure} hPa
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Animated.View style={{ transform: [{ scale: pulse }] }}>
                  <WindIcon width={40} height={40} />
                </Animated.View>
                <Text style={styles.detailLabel}>Wind</Text>
                <Text style={styles.detailValue}>
                  {forecastItem.wind?.speed || 'N/A'} m/s
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Animated.View style={{ transform: [{ scale: pulse }] }}>
                  <VisibilityIcon width={40} height={40} />
                </Animated.View>
                <Text style={styles.detailLabel}>Visibility</Text>
                <Text style={styles.detailValue}>
                  {forecastItem.visibility ? `${(forecastItem.visibility / 1000).toFixed(1)} km` : 'N/A'}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
};

// Styles remain the same as in your original file
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  gradientOverlay: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 20,
  },
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 10,
  },
  condition: {
    fontSize: 18,
    color: colors.white,
    textTransform: 'capitalize',
    marginBottom: 15,
  },
  temperature: {
    fontSize: 72,
    fontWeight: '200',
    color: colors.white,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    padding: 15,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    paddingBottom: 10,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  detailIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default DetailScreen;