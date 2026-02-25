import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { useAppFonts } from './src/theme/typography'; // your font hook

export default function App() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return null; // Wait until fonts are loaded
  }

  return (
    <>
      <StatusBar style="light" />
      <AppNavigator />
    </>
  );
}