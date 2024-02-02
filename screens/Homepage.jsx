import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Dimensions, Animated, PanResponder, StyleSheet, useColorScheme } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Homepage = () => {
    const [isModalVisible, setModalVisible] = useState(true);

    const translateY = new Animated.Value(screenHeight - 10);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            const newTranslateY = translateY._value + gestureState.dy;

            if (newTranslateY > screenHeight - 100) {
                translateY.setValue(screenHeight - 100);
            } else if (newTranslateY < screenHeight / 4) {
                translateY.setValue(screenHeight / 4);
            } else {
                translateY.setValue(newTranslateY);
            }
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.moveY > screenHeight - 100) {
                Animated.spring(translateY, {
                    toValue: screenHeight - 100,
                    useNativeDriver: false,
                }).start();
            }
            else if (gestureState.moveY < screenHeight / 4) {
                Animated.spring(translateY, {
                    toValue: screenHeight / 4,
                    useNativeDriver: false,
                }).start();
            }
        },
    });

    const closeModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        Animated.spring(translateY, {
            toValue: screenHeight - 200,
            useNativeDriver: false,
        }).start();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {isModalVisible && (
                <Animated.View
                    style={{
                        flex: 1,
                        width: screenWidth,
                        backgroundColor: 'white',
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        transform: [{ translateY }],
                        overflow: 'hidden',
                    }}
                    {...panResponder.panHandlers}
                >
                    <View style={{ padding: 16 }}>
                        <View style={styles.line} />
                        <Text>Hello</Text>
                        <Text>Reminders</Text>
                        <Text>Missed Reminders</Text>
                        {/* Additional content */}
                    </View>
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    line: {
        width: 200,
        height: 5,
        backgroundColor: 'black',
        alignSelf: 'center',
        marginVertical: 5,
        borderRadius: 5,
    },
});

export default Homepage;
