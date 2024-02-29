import React from 'react';
import {View, Text, Dimensions, useColorScheme, Image} from 'react-native';
import {darkHomepage} from '../styleSheets/dark/darkHomepage';
import {lightHomepage} from '../styleSheets/light/lightHomepage';

const screenWidth = Dimensions.get('window').width;

const MapHomepage = () => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const styles = isDarkTheme ? darkHomepage : lightHomepage;

  return (
    <View style={{width: '100%'}}>
      <View style={[styles.mapFlex, {width: screenWidth}]}>
        <View style={[styles.reminderFlex]}>
          <Image
            style={styles.logoMap}
            source={
              isDarkTheme
                ? require('../assets/home-logo-dark.png')
                : require('../assets/home-logo-light.png')
            }
          />
        </View>
        <View style={styles.reminderFlex}>
          <View style={styles.dashboard}>
            <View style={styles.dashboardFlex}>
              <Image
                style={styles.dashboardIcon}
                source={require('../assets/today-icon.png')}
              />
              <Text> 0 </Text>
            </View>
            <Text> Today</Text>
          </View>
          <View style={styles.dashboard}>
            <View style={styles.dashboardFlex}>
              <Image
                style={styles.dashboardIcon}
                source={require('../assets/scheduled-icon.png')}
              />
              <Text> 0 </Text>
            </View>
            <Text> Scheduled </Text>
          </View>
          <View style={styles.dashboard}>
            <View style={styles.dashboardFlex}>
              <Image
                style={styles.dashboardIcon}
                source={require('../assets/locations-icon.png')}
              />
              <Text> 0 </Text>
            </View>
            <Text> Locations</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MapHomepage;
