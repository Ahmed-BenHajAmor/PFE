import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors, FontSize, FontFamily, Spacing } from '../../theme';
import TagChip from '../../components/ui/TagChip';
import NavArrow from '../../components/ui/NavArrow';
import { MOODS } from '../../constants';
import type { Mood } from '../../constants';
import type { SessionStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<SessionStackParamList, 'Moods'>;

const MoodScreen: React.FC<Props> = ({ navigation, route }) => {
  const { duration } = route.params;
  const [selectedMoods, setSelectedMoods] = useState<Mood[]>([]);

  const toggleMood = (mood: Mood) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Mood</Text>
        <Text style={styles.subtitle}>HOW DO YOU FEEL?</Text>
      </View>

      <View style={styles.tagsContainer}>
        <View style={styles.tagsGrid}>
          {MOODS.map((mood) => (
            <TagChip
              key={mood}
              label={mood}
              selected={selectedMoods.includes(mood)}
              onPress={() => toggleMood(mood)}
            />
          ))}
        </View>
      </View>

      <View style={styles.navRow}>
        <NavArrow direction="left" onPress={() => navigation.goBack()} />
        <NavArrow
          direction="right"
          onPress={() =>
            navigation.navigate('Environments', { duration, moods: selectedMoods })
          }
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
    paddingTop: Spacing['6xl'],
    paddingBottom: Spacing['3xl'],
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: Spacing['4xl'],
  },
  title: {
    fontSize: FontSize['3xl'],
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
    letterSpacing: 2,
    marginTop: Spacing.xs,
  },
  tagsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    justifyContent: 'space-between',
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.sm,
  },
});

export default MoodScreen;
