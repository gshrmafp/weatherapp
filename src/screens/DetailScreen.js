import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native';
import WeatherIcon from '../components/WeatherIcon';
import moment from 'moment';
import colors from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient';

// Using a single placeholder image as the background will be handled by WeatherBackground component
const defaultBackgroundImage = 'https://images.unsplash.com/photo-1724477437269-9229b5b48dbc?q=80&w=2736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';


const DetailScreen = ({ route }) => {
  const { forecastItem } = route.params;
  const weatherCondition = forecastItem.weather[0]?.main;
  console.log('Forecast Item:', forecastItem);
  // In a real app, you might fetch a more specific image or use a default one
  // For this example, we'll just use a default static background for the detail screen
  const backgroundImage = defaultBackgroundImage;

  return (
    <ImageBackground 
      source={{ uri: backgroundImage }}
      style={styles.backgroundImage}
      blurRadius={3} // Slightly increased blur for consistency
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)']}
        style={styles.gradientOverlay}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            <WeatherIcon condition={weatherCondition} size={100} />
            <Text style={styles.date}>
              {moment.unix(forecastItem.dt).format('dddd, MMMM Do, YYYY')} {/* Added year for clarity */}
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
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/8106/8106812.png' }} 
                  style={styles.detailIcon}
                  onError={(e) => console.log('Image load error:', e.nativeEvent.error)} // Error handling
                />
                <Text style={styles.detailLabel}>High</Text>
                <Text style={styles.detailValue}>
                  {Math.round(forecastItem.main.temp_max)}°C
                </Text>
              </View>
              
              <View style={styles.detailItem}>
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5118/5118028.png' }} 
                  style={styles.detailIcon}
                  onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
                />
                <Text style={styles.detailLabel}>Low</Text>
                <Text style={styles.detailValue}>
                  {Math.round(forecastItem.main.temp_min)}°C
                </Text>
              </View>
              
              <View style={styles.detailItem}>
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/9290/9290540.png' }} 
                  style={styles.detailIcon}
                  onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
                />
                <Text style={styles.detailLabel}>Humidity</Text>
                <Text style={styles.detailValue}>
                  {forecastItem.main.humidity}%
                </Text>
              </View>
              
              <View style={styles.detailItem}>
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2676/2676004.png' }} 
                  style={styles.detailIcon}
                  onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
                />
                <Text style={styles.detailLabel}>Pressure</Text>
                <Text style={styles.detailValue}>
                  {forecastItem.main.pressure} hPa
                </Text>
              </View>
              
              <View style={styles.detailItem}>
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/966/966390.png' }} 
                  style={styles.detailIcon}
                  onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
                />
                <Text style={styles.detailLabel}>Wind</Text>
                <Text style={styles.detailValue}>
                  {forecastItem.wind?.speed || 'N/A'} m/s {/* Added 'N/A' for undefined */}
                </Text>
              </View>
              
              <View style={styles.detailItem}>
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5263/5263154.png' }} 
                  style={styles.detailIcon}
                  onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
                />
                <Text style={styles.detailLabel}>Visibility</Text>
                <Text style={styles.detailValue}>
                  {forecastItem.visibility ? `${(forecastItem.visibility / 1000).toFixed(1)} km` : 'N/A'} {/* Added 'N/A' */}
                </Text>
              </View>
            </View>
          </View>

          {/* Additional Info Section */}
          <View style={[styles.card, { marginTop: 20 }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Additional Information</Text>
            </View>
            
            <View style={styles.additionalInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Sunrise</Text>
                <Text style={styles.infoValue}>
                  {forecastItem.sys?.sunrise ? moment.unix(forecastItem.sys.sunrise).format('h:mm A') : 'N/A'}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Sunset</Text>
                <Text style={styles.infoValue}>
                  {forecastItem.sys?.sunset ? moment.unix(forecastItem.sys.sunset).format('h:mm A') : 'N/A'}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Feels Like</Text>
                <Text style={styles.infoValue}>
                  {forecastItem.main?.feels_like ? `${Math.round(forecastItem.main.feels_like)}°C` : 'N/A'}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
};

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
    marginBottom: 30,
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
    // backdropFilter: 'blur(10px)', // React Native doesn't support backdrop-filter directly on View
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
    width: 30,
    height: 30,
    marginBottom: 8,
    tintColor: colors.white,
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
  additionalInfo: {
    paddingHorizontal: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  infoLabel: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.8,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});

export default DetailScreen;
