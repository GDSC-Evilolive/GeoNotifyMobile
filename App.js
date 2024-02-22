import React, { useState, useEffect } from 'react';
import { View, Animated, Image, Dimensions, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import CreateReminderScreen from './screens/CreateReminderScreen';
import ProfileScreen from './screens/ProfileScreen';
import Landing from './screens/Landing';

const Tab = createBottomTabNavigator();
const screenWidth = Dimensions.get('window').width;

// Custom tab bar component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{flexDirection: 'row', backgroundColor: 'transparent', height: 80, width: screenWidth }}>
      {/* Render tab bar background image */}
      <Image
        source={require('./assets/tab-bar-background.png')}
        style={{ position: 'absolute', bottom: -40, left: 0, right: 0, width: screenWidth, height: 90, resizeMode: 'cover' }}
      />
      {/* Render individual tab buttons */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
        const isFocused = state.index === index;

        // Handle tab press
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={onPress}
            style={[
              { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 },
              route.name === 'Create Reminders' && {position: 'relative', bottom: 45 }
            ]}
            disabled={isFocused} // Disable touchable part if tab is active
          >
            {/* Render tab icon */}
            <View style={{ alignItems: 'center' }}>
              <Image
                source={isFocused ? options.activeIcon : options.inactiveIcon}
                style={[
                  { width: 30, height: 30 },
                  route.name === 'Create Reminders' && { width: 70, height: 70 }
                ]}
              />
              {route.name !== 'Create Reminders' && <Text style={{ color: isFocused ? '#537FE7' : '#FFFFFF' , marginTop: 5 }}>{label}</Text>}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const App = () => {
  const [showContent, setShowContent] = useState(false); 
  const opacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, marginBottom: 20 }}>
      <Landing />
      <Animated.View style={{ flex: 1, opacity }}>
        {showContent && (
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName="Home"
              tabBar={props => <CustomTabBar {...props} />}
            >
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  tabBarLabel: 'Home',
                  headerShown: false,
                  activeIcon: require('./assets/home-active.png'),
                  inactiveIcon: require('./assets/home-inactive.png'),
                }}
              />
              <Tab.Screen
                name="Create Reminders"
                component={CreateReminderScreen}
                options={{
                  tabBarLabel: 'Create Reminders',
                  headerShown: false,
                  activeIcon: require('./assets/create-icon.png'),
                  inactiveIcon: require('./assets/create-icon.png'),
                }}
              />
              <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                  tabBarLabel: 'Profile',
                  headerShown: false,
                  activeIcon: require('./assets/profile-active.png'),
                  inactiveIcon: require('./assets/profile-inactive.png'),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

export default App;