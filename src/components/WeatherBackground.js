import React from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const weatherImages = {
  Clear: 'https://images.unsplash.com/photo-1650980331974-b6268d3be45f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Clouds: 'https://images.unsplash.com/photo-1720274706455-2145ebabf774?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Rain: 'https://images.unsplash.com/photo-1635823288719-93f2c8ac7f3f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UmFpbiUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D',
  Drizzle: 'https://images.unsplash.com/photo-1628534262701-0ada95e46152?q=80&w=3376&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Snow: 'https://images.unsplash.com/photo-1701852713630-ebcce1bd43fa?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Thunderstorm: 'https://images.unsplash.com/photo-1663876925648-7e4712cc9b44?q=80&w=2247&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Fog: 'https://images.unsplash.com/photo-1652733361035-39064dcfa063?q=80&w=3471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Mist: 'https://images.unsplash.com/photo-1604424288891-7f0871867e09?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Haze: 'https://plus.unsplash.com/premium_photo-1666258224619-a018ae456f86?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RHJpenpsZSUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D',
  Default: 'https://images.unsplash.com/photo-1724477437269-9229b5b48dbc?q=80&w=2736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

const WeatherBackground = ({ condition }) => {
  const imageUrl = weatherImages[condition] || weatherImages.Default;

  return (
    <ImageBackground
      source={{ uri: imageUrl }}
      style={styles.background}
      resizeMode="cover"
      blurRadius={1}
    />
  );
};

const styles = StyleSheet.create({
  background: {
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default WeatherBackground;
