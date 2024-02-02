import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, useColorScheme} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import Homepage from './screens/Homepage';

const App = () => {
  const [loadingProgress] = useState(new Animated.Value(0));
  const [animationDone, setAnimationDone] = useState(false);
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    Animated.timing(loadingProgress, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
      delay: 600,
    }).start(() => {
      setAnimationDone(true);
    });
  }, []);

  const darkLayer = <View style={[StyleSheet.absoluteFill, { backgroundColor: '#181823' }]} />;
  const lightLayer = <View style={[StyleSheet.absoluteFill, { backgroundColor: '#EFF3F5' }]} />;
  
  const logoSource = isDarkMode ? require('./assets/geonotify-logo-dark.png') : require('./assets/geonotify-logo-light.png');

  const imageScale = {
    transform: [
      {
        scale: loadingProgress.interpolate({
          inputRange: [0, 15, 100],
          outputRange: [0.1, 0.05, 15],
        }),
      },
    ],
  };
  const opacity = {
    opacity: loadingProgress.interpolate({
      inputRange: [0, 25, 50],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    }),
  };

  return (
    <View style={{ flex: 1 }}>
      {isDarkMode ? lightLayer : darkLayer}
      <MaskedView style={{ flex: 1 }} maskElement={
        <View style={styles.centered}>
          <Animated.Image
            source={logoSource}
            style={[{ width: 1000 }, imageScale]}
            resizeMode="contain"
          />
        </View>
      }>
        {isDarkMode ? darkLayer : lightLayer}
        <Animated.View style={[styles.centered, opacity]}>
          <Homepage />
        </Animated.View>
      </MaskedView>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
