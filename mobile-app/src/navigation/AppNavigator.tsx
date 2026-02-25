import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';
import type { Mood, Environment, Activity } from '../constants';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { Colors } from '../theme';

// ─── Param Lists ─────────────────────────────────────────────────────────────

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type SessionStackParamList = {
  SessionLength: undefined;
  Moods: { duration: number };
  Environments: { duration: number; moods: Mood[] };
  Activities: { duration: number; moods: Mood[]; environments: Environment[] };
  CustomVibe: { duration: number; moods: Mood[]; environments: Environment[]; activities: Activity[] };
  ActiveSession: {
    duration: number;
    moods: Mood[];
    environments: Environment[];
    activities: Activity[];
    vibe: string;
    sessionId : string;
  };
  SessionCompleted: { duration: number; mood: string, sessionId : string };
};

export type MainStackParamList = {
  Home: undefined;
  Premium: undefined;
  SessionLength: undefined;
  Moods: { duration: number };
  Environments: { duration: number; moods: Mood[] };
  Activities: { duration: number; moods: Mood[]; environments: Environment[] };
  CustomVibe: { duration: number; moods: Mood[]; environments: Environment[]; activities: Activity[] };
  ActiveSession: {
    duration: number;
    moods: Mood[];
    environments: Environment[];
    vibe: string;
    sessionId : string;
  };
  SessionCompleted: { duration: number; mood: string, sessionId : string };
};

// ─── Screen Imports ───────────────────────────────────────────────────────────

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/main/HomeScreen';
import PremiumScreen from '../screens/main/PremiumScreen';
import SessionLengthScreen from '../screens/session/SessionLengthScreen';
import MoodScreen from '../screens/session/MoodScreen';
import EnvironmentScreen from '../screens/session/EnvironmentScreen';
import CustomVibeScreen from '../screens/session/CustomVibeScreen';
import ActiveSessionScreen from '../screens/session/ActiveSessionScreen';
import SessionCompletedScreen from '../screens/session/SessionCompletedScreen';

import ActivityScreen from '../screens/session/ActivityScreen';

// ─── Stacks ───────────────────────────────────────────────────────────────────

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();
const RootStack = createNativeStackNavigator();

const defaultScreenOptions = {
  headerShown: false,
  animation: 'slide_from_right' as const,
};

const AuthNavigator: React.FC = () => (
  <AuthStack.Navigator screenOptions={defaultScreenOptions}>
    
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

const MainNavigator: React.FC = () => (
  <MainStack.Navigator screenOptions={defaultScreenOptions}>
    <MainStack.Screen name="Home" component={HomeScreen} />
    <MainStack.Screen name="Premium" component={PremiumScreen} />
    <MainStack.Screen name="SessionLength" component={SessionLengthScreen} />
    <MainStack.Screen name="Moods" component={MoodScreen} />
    <MainStack.Screen name="Environments" component={EnvironmentScreen} />
    <MainStack.Screen name="Activities" component={ActivityScreen} />
    <MainStack.Screen name="CustomVibe" component={CustomVibeScreen} />
    <MainStack.Screen name="ActiveSession" component={ActiveSessionScreen} />
    <MainStack.Screen name="SessionCompleted" component={SessionCompletedScreen} />
  </MainStack.Navigator>
);

// ─── Root (checks auth state) ─────────────────────────────────────────────────

const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="Main" component={MainNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

// ─── Root wrapped with AuthProvider ──────────────────────────────────────────

const Root: React.FC = () => (
  <AuthProvider>
    <AppNavigator />
  </AuthProvider>
);

export default Root;