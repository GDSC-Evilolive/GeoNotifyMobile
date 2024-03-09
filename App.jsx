import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, Callout, Circle} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import DropDownPicker from 'react-native-dropdown-picker';
import _ from 'lodash';

const App = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [reminderMarkers, setReminderMarkers] = useState([]);
  const [yourLat, setYourLat] = useState(0.0); // your current lattitude
  const [yourLong, setYourLong] = useState(0.0); // your current longitude
  const [remindersInRange, setRemindersInRange] = useState([]); // stores all the reminders in the set range

  function handleSearchDebounced() {
    // _.debounce(handleSearch, 5); // Adjust the debounce delay as needed (e.g., 500 milliseconds)
    _.debounce(() => handleSearch(), 5)();
  }

  // Haversine Formula
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Distance in meters
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  // Debounce the update of remindersInRange state
  function updateRemindersInRangeDebounced(latitude, longitude) {
    _.debounce(() => updateRemindersInRange(latitude, longitude), 2000)();
  }

  function convertCoordinatesToAddressDebounced(latitude, longitude) {
    _.debounce(() => convertCoordinatesToAddress(latitude, longitude), 5)();
  }

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setYourLat(latitude);
        setYourLong(longitude);
        setPosition({
          latitude,
          longitude,
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421,
        });
        updateRemindersInRangeDebounced(latitude, longitude); // Update remindersInRange with debouncing
        // debouncedUpdate();
        // updateRemindersInRange(latitude, longitude);
        convertCoordinatesToAddressDebounced(latitude, longitude);

        // const intervalId = setInterval(() => {
        //   // updateRemindersInRangeDebounced(latitude, longitude);
        //   updateRemindersInRange(latitude, longitude);
        // }, 2000);
      },
      error => {
        console.error('Error getting location:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    // console.log('LL');
    return () => {
      Geolocation.clearWatch(watchId);
      clearInterval(intervalId);
    };
  }, []); // Only re-run the effect when the debounced function changes

  const updateRemindersInRange = (latitude, longitude) => {
    console.log('hi');
    const newRemindersInRange = reminderMarkers
      .map(marker => {
        console.log('marker:', marker);
        const distance = calculateDistance(
          latitude,
          longitude,
          marker.latitude,
          marker.longitude,
        );
        if (distance <= 100) {
          return marker;
        }
        return null;
      })
      .filter(marker => marker !== null);
    setRemindersInRange(newRemindersInRange);

    // console.log('newRemindersInRange:', newRemindersInRange);
  };

  const convertCoordinatesToAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_TEST_API`,
      );
      const data = await response.json();
      if (data.status === 'OK') {
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      console.error('Error converting coordinates to address:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchText}&key=YOUR_TEST_API&fields=name,formatted_address,geometry`,
      );
      const data = await response.json();
      console.log('data:', data);
      if (data.status === 'OK') {
        const addresses = data.results.map(result => ({
          address: result.formatted_address,
          name: result.name,
          location: result.geometry.location,
        }));
        // console.log('ADD:', addresses);
        setSearchResults(addresses);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching places:', error);
    }
  };

  const handleSelectedAddress = obj => {
    // console.log('Selected Address:', obj);
    const newReminderMarker = {
      latitude: obj.location.lat,
      longitude: obj.location.lng,
      title: 'Reminder', // Set the title as 'Reminder'
      description: obj.name, // Set the description as the reminder name
    };
    // Add the new reminder marker to the existing list of reminders
    setReminderMarkers(prevMarkers => [...prevMarkers, newReminderMarker]);
  };

  // const deleteReminder = index => {
  //   setReminderMarkers(prevMarkers => {
  //     const newMarkers = [...prevMarkers];
  //     newMarkers.splice(index, 1); // Remove the reminder at the specified index
  //     return newMarkers;
  //   });
  // };

  function deleteReminder(markerToDelete) {
    console.log('deleteReminder called:', markerToDelete);
    setReminderMarkers(prevMarkers => {
      const newMarkers = prevMarkers.filter(marker => {
        return (
          marker.latitude !== markerToDelete.latitude ||
          marker.longitude !== markerToDelete.longitude ||
          marker.title !== markerToDelete.title ||
          marker.description !== markerToDelete.description
        );
      });
      return newMarkers;
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={text => {
            setSearchText(text);
            // handleSearchDebounced(); // Call the debounced version of handleSearch
          }}
          onSubmitEditing={handleSearchDebounced}
        />
        {/* <FlatList
          data={searchResults}
          renderItem={({item}) => <Text>{item}</Text>} // Update this line
          keyExtractor={(item, index) => index.toString()} // Use index as key as place_id is not available
        /> */}
        <View style={styles.buttonContainer}>
          {searchResults.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => handleSelectedAddress(item)}>
              <Text style={styles.buttonText}>Name: {item.name}</Text>
              <Text style={styles.buttonText}>Address: {item.address}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.mapContainer}>
        {position && (
          <MapView
            style={styles.map}
            initialRegion={position}
            showsUserLocation={true}
            showsMyLocationButton={true}
            followsUserLocation={true}
            showsCompass={true}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}>
            <Marker
              title="Your Location"
              description={address || 'This is your current location'}
              coordinate={position}
            />
            <Circle
              center={{latitude: yourLat, longitude: yourLong}}
              radius={100}
              fillColor="rgba(0, 128, 255, 0.5)"
              strokeColor="rgba(0, 128, 255, 0.8)"
              strokeWidth={2}
            />
            {reminderMarkers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.title}
                description={marker.description}>
                <Callout>
                  <Text>{marker.title}:</Text>
                  <Text>{marker.description}</Text>
                  <TouchableOpacity onPress={() => deleteReminder(marker)}>
                    <Text>Delete Reminder</Text>
                  </TouchableOpacity>
                </Callout>
              </Marker>
            ))}
          </MapView>
        )}
        <Text>{remindersInRange.length}</Text>
        {remindersInRange.map((reminder, index) => (
          <Text key={index}>{reminder.title}</Text>
        ))}
      </View>
      {address ? <Text style={styles.address}>{address}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    marginVertical: 50,
    paddingHorizontal: 20,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  map: {
    width: '100%', // or specify a specific width
    height: 400, // specify the desired height
  },
  address: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 8,
    textAlign: 'center',
  },
});

export default App;
