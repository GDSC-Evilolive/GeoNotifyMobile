import React from 'react';
import { View, Text, Dimensions, useColorScheme, Image } from 'react-native';
import { darkHomepage } from '../styleSheets/dark/darkHomepage';
import { lightHomepage } from '../styleSheets/light/lightHomepage';

const screenWidth = Dimensions.get('window').width;

const MapHomepage = ({ metadata }) => {
    const theme = useColorScheme();
    const isDarkTheme = theme === 'dark';
    const styles = isDarkTheme ? darkHomepage : lightHomepage;

    return (
        <View >
            <View style={[styles.mapFlex, { width: screenWidth + 150}]}>
                <View style={[styles.reminderFlex]}>
                    <Image
                        style={styles.logoMap}
                        source={isDarkTheme ? require('../assets/home-logo-dark.png') : require('../assets/home-logo-light.png')}
                    />
                </View>
                <View style={styles.reminderFlex}>
                    <View style={styles.dashboard}>
                        <View style={styles.dashboardFlex}>
                            <Image
                                style={styles.dashboardIcon}
                                source={require('../assets/today-icon.png')}
                                />
                            <Text style={[styles.dashboardText, {fontSize:20}, {fontWeight:'600'}]}> {metadata.numInactive} </Text>
                        </View>
                        <Text style={styles.dashboardText}> Today </Text>
                    </View>
                    <View style={styles.dashboard}>
                        <View style={styles.dashboardFlex}>
                            <Image
                                style={styles.dashboardIcon}
                                source={require('../assets/scheduled-icon.png')}
                                />
                            <Text style={[styles.dashboardText, {fontSize:20}, {fontWeight:'600'}]}> {metadata.numActive} </Text>
                        </View>
                        <Text style={styles.dashboardText}> Scheduled </Text>
                    </View>
                    <View style={styles.dashboard}>
                        <View style={styles.dashboardFlex}>
                            <Image
                                style={styles.dashboardIcon}
                                source={require('../assets/locations-icon.png')}
                                />
                            <Text style={[styles.dashboardText, {fontSize:20}, {fontWeight:'600'}]}> {metadata.numLocations} </Text>
                        </View>
                        <Text style={styles.dashboardText}> Locations</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default MapHomepage;