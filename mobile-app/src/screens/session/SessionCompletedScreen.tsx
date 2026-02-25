import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
  ActivityIndicator,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors, FontSize, FontFamily, Spacing, BorderRadius } from '../../theme';
import { SESSION_RATINGS } from '../../constants';
import type { SessionRating } from '../../constants';
import type { SessionStackParamList } from '../../navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_GATEWAY_API } from '@env';
import { useAuth } from '@/contexts/AuthContext';

type Props = NativeStackScreenProps<SessionStackParamList, 'SessionCompleted'>;

const SessionCompletedScreen: React.FC<Props> = ({ navigation, route }) => {
  const { duration, mood, sessionId } = route.params;
  const [rating, setRating] = useState<SessionRating | null>('Excellent');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false)
  const {logout} = useAuth()
  const body = {
    sessionId,
    feeling: rating,
    description : feedback
  }
  const handleSave = async () => {
    const token = await AsyncStorage.getItem('access_token');
    setLoading(true)
    try {
      const response = await fetch(`${API_GATEWAY_API}/management/sessions-feedbacks`, {
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
        
        
        Alert.alert('Session Creation Failed Invalid yRequest');
        setLoading(false)
        return;
      }
      setLoading(false)
      
      navigation.navigate('Home' as any);
      
    } catch (error) {
      setLoading(false)
      Alert.alert('Network Error', 'Could not connect to the server. Please try again.');
    } 
  };

  const handleSkip = () => {
    navigation.navigate('Home' as any);
  };

  const durationFormatted = `${duration}:00`;

  return (
    <View style={styles.container}>
      {/* Completion indicator */}
      <View style={styles.successSection}>
        <View style={styles.outerRing}>
          <View style={styles.middleRing}>
            <View style={styles.checkCircle}>
              <Text style={styles.checkIcon}>✓</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Title */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Session Completed</Text>
        <Text style={styles.meta}>
          {mood} • {durationFormatted}
        </Text>
      </View>

      {/* Rating */}
      <View style={styles.ratingSection}>
        <Text style={styles.ratingLabel}>HOW WAS YOUR SESSION?</Text>
        <View style={styles.ratingRow}>
          {SESSION_RATINGS.map((r) => (
            <TouchableOpacity
              key={r}
              style={[styles.ratingChip, rating === r && styles.ratingChipActive]}
              onPress={() => setRating(r)}
              activeOpacity={0.8}
            >
              <Text style={[styles.ratingText, rating === r && styles.ratingTextActive]}>
                {r}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Feedback */}
      <TextInput
        style={styles.feedbackInput}
        placeholder="Any thoughts on this session?..."
        placeholderTextColor={Colors.textMuted}
        value={feedback}
        onChangeText={setFeedback}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      {/* Actions */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
        {loading ? <ActivityIndicator color={Colors.white} /> :
        <>
          <Text style={styles.heartIcon}>♥</Text>
          <Text style={styles.saveBtnText}>Save Feedback</Text>
        </>
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSkip}>
        <Text style={styles.skipText}>Maybe later</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing['4xl'],
    paddingBottom: Spacing['3xl'],
    gap: Spacing.xl,
  },
  successSection: {
    alignItems: 'center',
  },
  outerRing: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1,
    borderColor: 'rgba(76, 184, 245, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(76, 184, 245, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6b4fe8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    color: Colors.white,
    fontSize: FontSize.xl,
    fontFamily: FontFamily.bold,
  },
  titleSection: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    fontSize: FontSize['2xl'],
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  meta: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
  },
  ratingSection: {
    gap: Spacing.md,
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  ratingChip: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ratingChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  ratingText: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
  },
  ratingTextActive: {
    color: Colors.textPrimary,
  },
  feedbackInput: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    color: Colors.textPrimary,
    fontSize: FontSize.base,
    fontFamily: FontFamily.regular,
    height: 130,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    shadowColor: Colors.accentBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  heartIcon: {
    color: Colors.white,
    fontSize: FontSize.base,
  },
  saveBtnText: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  skipText: {
    textAlign: 'center',
    fontSize: FontSize.base,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
  },
});

export default SessionCompletedScreen;
