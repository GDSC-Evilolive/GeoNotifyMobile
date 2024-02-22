import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Image, useColorScheme, Dimensions } from 'react-native';

const Landing = () => {
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

  const logoSource = isDarkMode
    ? require('../assets/geonotify-logo-dark.png')
    : require('../assets/geonotify-logo-light.png');

  const imageScale = {
    transform: [
      {
        scale: loadingProgress.interpolate({
          inputRange: [0, 15, 90],
          outputRange: [0.1, 0.05, 15],
        }),
      },
    ],
  };

  return (
    <View style={[StyleSheet.absoluteFill, isDarkMode ? styles.lightLayer : styles.darkLayer]}>
      <View style={styles.centered}>
        <Animated.Image
          source={logoSource}
          style={[{ width: 1000 }, imageScale]}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkLayer: {
    backgroundColor: '#181823',
  },
  lightLayer: {
    backgroundColor: '#EFF3F5',
  },
});

export default Landing;
