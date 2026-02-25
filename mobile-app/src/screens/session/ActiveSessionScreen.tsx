import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors, FontSize, FontFamily, Spacing, BorderRadius } from '../../theme';
import type { MainStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<MainStackParamList, 'ActiveSession'>;

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const ActiveSessionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { duration, moods, environments, sessionId } = route.params;
  const totalSeconds = duration * 60;
  const [remaining, setRemaining] = useState(totalSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const sessionName = `${environments ?? 'Deep'} Forest Echo`;
  const primaryMood = moods && moods.length > 0 ? moods[0] : 'Focus';

  useEffect(() => {
    // Pulse animation
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 2000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  useEffect(() => {
    if (isPaused || remaining <= 0) return;
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigation.replace('SessionCompleted', { duration, mood: primaryMood, sessionId });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, remaining]);

  const handleStop = () => {
    navigation.replace('SessionCompleted', { duration, mood: primaryMood, sessionId });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.activeLabel}>ACTIVE SESSION</Text>
        <Text style={styles.sessionName}>{sessionName}</Text>
      </View>

      {/* Timer */}
      <View style={styles.timerSection}>
        <Animated.View style={[styles.outerRing, { transform: [{ scale: pulseAnim }] }]}>
          <View style={styles.middleRing}>
            <View style={styles.innerRing}>
              <Text style={styles.timeText}>{formatTime(remaining)}</Text>
              <Text style={styles.remainingLabel}>REMAINING</Text>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Volume */}
      <View style={styles.volumeContainer}>
        <Text style={styles.volIcon}>🔇</Text>
        <View style={styles.volumeTrack}>
          <View style={[styles.volumeFill, { width: `${volume * 100}%` }]} />
        </View>
        <Text style={styles.volIcon}>🔊</Text>
      </View>

      {/* Controls */}
      <View style={styles.controlsBar}>
        <TouchableOpacity onPress={handleStop} style={styles.stopBtn}>
          <Text style={styles.stopIcon}>✕</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pauseBtn}
          onPress={() => setIsPaused((p) => !p)}
          activeOpacity={0.8}
        >
          <Text style={styles.pauseIcon}>{isPaused ? '▶' : '⏸'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsBtn}>
          <Text style={styles.settingsIcon}>≡</Text>
        </TouchableOpacity>
      </View>
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
  },
  header: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  activeLabel: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
    color: Colors.accentBlue,
    letterSpacing: 3,
  },
  sessionName: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.regular,
    color: Colors.textPrimary,
  },
  timerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing: {
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 1,
    borderColor: 'rgba(76, 184, 245, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleRing: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: 'rgba(76, 184, 245, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerRing: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: 'rgba(76, 184, 245, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(10, 30, 60, 0.6)',
  },
  timeText: {
    fontSize: FontSize['4xl'],
    fontFamily: FontFamily.light,
    color: Colors.textPrimary,
    letterSpacing: 2,
  },
  remainingLabel: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
    letterSpacing: 3,
    marginTop: Spacing.xs,
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  volIcon: {
    fontSize: 18,
  },
  volumeTrack: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  volumeFill: {
    height: '100%',
    backgroundColor: Colors.accentBlue,
    borderRadius: 2,
  },
  controlsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing['2xl'],
    paddingVertical: Spacing.md,
  },
  stopBtn: {
    padding: Spacing.sm,
  },
  stopIcon: {
    color: Colors.error,
    fontSize: FontSize.lg,
    fontFamily: FontFamily.bold,
  },
  pauseBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseIcon: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
  },
  settingsBtn: {
    padding: Spacing.sm,
  },
  settingsIcon: {
    color: Colors.textSecondary,
    fontSize: FontSize.xl,
  },
});

export default ActiveSessionScreen;
