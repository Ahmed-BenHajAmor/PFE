import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors, FontSize, FontFamily, Spacing, BorderRadius } from '../../theme';
import NavArrow from '../../components/ui/NavArrow';
import type { MainStackParamList, SessionStackParamList } from '../../navigation/AppNavigator';
import { API_GATEWAY_API } from '@env';
import { useAuth } from '@/contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<MainStackParamList, 'CustomVibe'>;

const CustomVibeScreen: React.FC<Props> = ({ navigation, route }) => {
  const { duration, moods, environments, activities } = route.params;
  const [vibe, setVibe] = useState('');
  const now = new Date();
  const end = new Date(now.getTime() + duration * 60 * 1000);
  const { logout } = useAuth();


  const getTimeOfDay = (hour: number) => {
    if (hour >= 5 && hour < 12) return 'MORNING';
    if (hour >= 12 && hour < 17) return 'AFTERNOON';
    if (hour >= 17 && hour < 21) return 'EVENING';
    return 'NIGHT';
  };

  const getSeason = (month: number): string[] => {
    if (month >= 2 && month <= 4) return ['SPRING'];
    if (month >= 5 && month <= 7) return ['SUMMER'];
    if (month >= 8 && month <= 10) return ['AUTUMN'];
    return ['WINTER'];
  };

  const body = {
    startTime: now.toISOString(),
    endTime: end.toISOString(),
    date: now.toISOString().split('T')[0],
    prompt: vibe,
    chosenDuration: duration,
    timeOfDay: getTimeOfDay(now.getHours()),
    mood: moods.map((m) => m.toUpperCase()),
    activity: activities.map((a) => a.toUpperCase()),
    environment: environments.map((e) => e.toUpperCase()),
    temperature: 20,
    temperatureUnit: 'CELSIUS',
    season: getSeason(now.getMonth()),
  };
  const handleStart = async () => {
    const token = await AsyncStorage.getItem('access_token');

    try {
      const response = await fetch(`${API_GATEWAY_API}/management/inputted-sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if(response.status === 401){
        await logout();
      }

      if (!response.ok) {
        console.log(data?.message);
        
        Alert.alert('Session Creation Failed Invalid yRequest');
        return;
      }
      console.log(data);
      
      navigation.navigate('ActiveSession', {
        duration,
        moods,
        environments,
        vibe,
        sessionId : data.id,
      });
      
    } catch (error) {
      console.log(error);
      
      Alert.alert('Network Error', 'Could not connect to the server. Please try again.');
    } 
 
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Custom Vibe Prompt</Text>
          <Text style={styles.subtitle}>ANY SPECIFIC VIBE IN MIND?</Text>
        </View>

        <View style={styles.inputSection}>
          <TextInput
            style={styles.textArea}
            placeholder="ANY SPECIFIC VIBE IN MIND?"
            placeholderTextColor={Colors.textMuted}
            value={vibe}
            onChangeText={setVibe}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.startBtn} onPress={handleStart} activeOpacity={0.85}>
          <Text style={styles.heartIcon}>♥</Text>
          <Text style={styles.startText}>Start Listening</Text>
        </TouchableOpacity>

        <View style={styles.navRow}>
          <NavArrow direction="left" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing['6xl'],
    paddingBottom: Spacing['3xl'],
    gap: Spacing['2xl'],
  },
  headerSection: {
    alignItems: 'center',
  },
  title: {
    fontSize: FontSize['2xl'],
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
    letterSpacing: 2,
    marginTop: Spacing.xs,
  },
  inputSection: {
    flex: 1,
  },
  textArea: {
    backgroundColor: Colors.inputBg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    letterSpacing: 1.5,
    height: 140,
  },
  startBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    shadowColor: Colors.accentBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  heartIcon: {
    color: Colors.white,
    fontSize: FontSize.md,
  },
  startText: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  navRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.sm,
  },
});

export default CustomVibeScreen;