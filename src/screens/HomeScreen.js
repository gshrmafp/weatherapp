import React, { useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  ActivityIndicator, 
  Alert, 
  SafeAreaView, 
  StatusBar, 
  Text 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWeather,
  fetchWeatherForecast,
  setForecastDays,
} from '../store/actions/weatherActions';
import SearchBar from '../components/SearchBar';
import CurrentWeather from '../components/CurrentWeather';
import ForecastList from '../components/ForecastList';
import colors from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import WeatherBackground from '../components/WeatherBackground'; // Now handles dynamic effects with Animated API
import AnimatedWeatherIcon from '../components/AnimatedWeatherIcon';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    weather,
    forecast,
    selectedCity,
    forecastDays,
    loading,
    error,
  } = useSelector((state) => state.weather);

  useEffect(() => {
    if (selectedCity) {
      dispatch(fetchWeather(selectedCity.lat, selectedCity.lon));
      dispatch(fetchWeatherForecast(selectedCity.lat, selectedCity.lon, forecastDays));
    }
  }, [selectedCity, forecastDays, dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const handleForecastPress = (forecastItem) => {
    navigation.navigate('Detail', { forecastItem });
  };

  const weatherCondition = weather?.weather?.[0]?.main || 'Clear'; // Get current weather condition

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {/* Animated SVG Weather Icon as Background */}
      <View style={styles.animatedIconBg} pointerEvents="none">
        <AnimatedWeatherIcon condition={weatherCondition} size={340} />
      </View>
      {/* Dynamic Weather Background and Effects */}
      <WeatherBackground condition={weatherCondition} />
      {/* Optional: A subtle gradient overlay for better readability */}
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.1)']} // Darker gradient for contrast
        style={styles.gradientOverlay}
      />

      <View style={styles.safeArea}>
        <View style={styles.innerContainer}>
          <View style={styles.searchBarContainer}>
            <SearchBar />
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.white} /> {/* Changed color for contrast */}
              <Text style={styles.loadingText}>Loading weather data...</Text>
            </View>
          ) : (
            <ScrollView 
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              {weather && (
                <View style={styles.currentWeatherCard}>
                  <CurrentWeather weather={weather} />
                </View>
              )}

              {forecast && (
                <View style={styles.forecastWrapper}>
                  <Text style={styles.sectionTitle}>3-Day Forecast</Text>
                  <ForecastList 
                    forecastData={forecast} 
                    onForecastPress={handleForecastPress} 
                  />
                </View>
              )}

              {!selectedCity && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    Search for a city to view weather information
                  </Text>
                </View>
              )}
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, // Fixed primary background color
  },
  safeArea: {
    flex: 1,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  innerContainer: {
    flex: 1,
    paddingTop: 16,
  },
  searchBarContainer: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  scrollContainer: {
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  currentWeatherCard: {
    backgroundColor: 'rgba(255,255,255,0.2)', // More translucent
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,

  },
  forecastWrapper: {
    backgroundColor: 'rgba(255,255,255,0.2)', // More translucent
    borderRadius: 16,
    padding: 16,

  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white, // Changed to white for contrast
    marginBottom: 12,
    paddingLeft: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Darker translucent background
    borderRadius: 16,
    margin: 16,
  },
  loadingText: {
    marginTop: 16,
    color: colors.white, // Changed to white for contrast
    fontSize: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    backgroundColor: 'rgba(0,0,0,0.6)', // Slightly darker for better visibility
    padding: 16,
    borderRadius: 12,

  },
  animatedIconBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.18, // Subtle effect
    zIndex: 0,
  },
});

export default HomeScreen;
