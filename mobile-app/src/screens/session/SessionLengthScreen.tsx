import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors, FontSize, FontFamily, Spacing, BorderRadius } from '../../theme';
import CircularSlider from '../../components/session/CircularSlider';
import NavArrow from '../../components/ui/NavArrow';
import { SESSION_DURATIONS, DEFAULT_DURATION } from '../../constants';
import type { SessionStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<SessionStackParamList, 'SessionLength'>;

const SessionLengthScreen: React.FC<Props> = ({ navigation }) => {
  const [duration, setDuration] = useState(DEFAULT_DURATION);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session Length</Text>
      <Text style={styles.subtitle}>SET YOUR DURATION</Text>

      <View style={styles.sliderSection}>
        <CircularSlider value={duration} onChange={setDuration} />
        <Text style={styles.dragHint}>Drag the slider to adjust</Text>
      </View>

      <View style={styles.presetRow}>
        {SESSION_DURATIONS.map((d) => (
          <TouchableOpacity
            key={d}
            style={[styles.preset, duration === d && styles.presetActive]}
            onPress={() => setDuration(d)}
            activeOpacity={0.8}
          >
            <Text style={[styles.presetText, duration === d && styles.presetTextActive]}>
              {d}m
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.navRow}>
        <NavArrow direction="left" onPress={() => navigation.goBack()} />
        <NavArrow
          direction="right"
          onPress={() => navigation.navigate('Moods', { duration })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing['5xl'],
    paddingBottom: Spacing['3xl'],
  },
  title: {
    fontSize: FontSize['3xl'],
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
    textAlign: 'center',
    letterSpacing: 2,
    marginTop: Spacing.xs,
  },
  sliderSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xl,
  },
  dragHint: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
  },
  presetRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    marginBottom: Spacing['3xl'],
  },
  preset: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface2,
    minWidth: 64,
    alignItems: 'center',
  },
  presetActive: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.primaryLight,
  },
  presetText: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
  },
  presetTextActive: {
    color: Colors.textPrimary,
    fontFamily: FontFamily.bold,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.sm,
  },
});

export default SessionLengthScreen;
