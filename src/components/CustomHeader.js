// components/CustomHeader.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Using standard RN vector icons
import colors from '../constants/colors';

const CustomHeader = ({ title, navigation, showBackButton = false }) => {
  return (
    <View style={[
      styles.header, 
      Platform.OS === 'android' && { paddingTop: StatusBar.currentHeight }
    ]}>
      {showBackButton && (
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'android' ? 60 + StatusBar.currentHeight : 60,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
});

export default CustomHeader;