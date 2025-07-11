import React, { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import DraggableTag from '../components/DraggableTag';

SplashScreen.preventAutoHideAsync();

const TAGS = [
  { label: 'balance', x: 0, y: -150 },
  { label: 'income', x: -150, y: -90 },
  { label: 'expenses', x: 130, y: -90 },
  { label: 'fun', x: -180, y: -20 },
  { label: 'food', x: 160, y: -20 },
  { label: 'retire', x: -150, y: 50 },
  { label: 'travel', x: 130, y: 50 },
];

export default function SplashScreenComponent({ navigation }) {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Handler for button press
  const handleGetStarted = () => {
    navigation.replace('Home');
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../assets/main.png')}
          style={styles.avatar}
          resizeMode="contain"
        />
        {TAGS.map((tag) => (
          <DraggableTag
            key={tag.label}
            label={tag.label}
            initialPosition={{ x: tag.x, y: tag.y }}
          />
        ))}
      </View>
      <Text style={styles.appName}>Finbound</Text>
      <Text style={styles.tagline}>your minimal budgeting app</Text>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationContainer: {
    width: 300,
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 180,
    height: 220,
    position: 'absolute',
    top: 40,
    left: 60,
    opacity: 0.95,
  },
  appName: {
    fontSize: 48,
    fontFamily: 'Poppins_700Bold',
    color: '#232323',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#777',
    marginBottom: 24,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#232323',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 28,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    letterSpacing: 1,
  },
});

