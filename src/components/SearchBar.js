import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { searchCitiesAction, setSelectedCity } from '../store/actions/weatherActions';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const { cities } = useSelector((state) => state.weather);

  useEffect(() => {
    if (query.length > 2) {
      dispatch(searchCitiesAction(query));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query, dispatch]);

  const handleCitySelect = (city) => {
    setQuery(`${city.name}, ${city.country}`);
    dispatch(setSelectedCity(city));
    setShowSuggestions(false);
    Keyboard.dismiss(); // Dismiss keyboard after selection
  };

  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={colors.darkGray} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search for a city..."
          placeholderTextColor={colors.darkGray}
          value={query}
          onChangeText={setQuery}
          onFocus={() => query.length > 2 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Icon name="close" size={18} color={colors.darkGray} />
          </TouchableOpacity>
        )}
      </View>
      
      {showSuggestions && cities.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={cities}
            keyExtractor={(item) => `${item.lat}-${item.lon}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleCitySelect(item)}
              >
                <Icon name="location-on" size={18} color={colors.primary} style={styles.locationIcon} />
                <View>
                  <Text style={styles.cityText}>{item.name}</Text>
                  <Text style={styles.countryText}>{item.country}, {item.state || ''}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    zIndex: 100, // Ensure suggestions appear above other elements
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: '100%',
    marginLeft: 10,
    color: colors.darkGray,
    fontSize: 16,
  },
  searchIcon: {
    opacity: 0.6,
  },
  clearButton: {
    padding: 5,
  },
  suggestionsContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 10,
    maxHeight: 200,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  locationIcon: {
    marginRight: 10,
  },
  cityText: {
    fontSize: 16,
    color: colors.darkGray,
    fontWeight: '500',
  },
  countryText: {
    fontSize: 14,
    color: colors.darkGray,
    opacity: 0.7,
    marginTop: 2,
  },
});

export default SearchBar;
