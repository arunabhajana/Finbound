import React, { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import DraggableTag from './components/DraggableTag'; // Custom component, see below

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

export default function App() {
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

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.illustrationContainer}>
        <Image
          source={require('./assets/main.png')} // Replace with your avatar outline image
          style={styles.avatar}
          resizeMode="contain"
        />
        {TAGS.map((tag, idx) => (
          <DraggableTag
            key={tag.label}
            label={tag.label}
            initialPosition={{ x: tag.x, y: tag.y }}
          />
        ))}
      </View>
      <Text style={styles.appName}>Finbound</Text>
      <Text style={styles.tagline}>your minimal budgeting app</Text>
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
    fontSize: 38,
    fontFamily: 'Poppins_700Bold',
    color: '#232323',
    letterSpacing: 1,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#777',
    marginBottom: 0,
  },
});
