import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors, FontSize, FontFamily, Spacing } from '../../theme';
import TagChip from '../../components/ui/TagChip';
import NavArrow from '../../components/ui/NavArrow';
import { ACTIVITY, ENVIRONMENTS } from '../../constants';
import type { Activity } from '../../constants';
import type { SessionStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<SessionStackParamList, 'Activities'>;

const ActivityScreen: React.FC<Props> = ({ navigation, route }) => {
  const { duration, moods, environments } = route.params;

  // now an array to hold multiple selected activities
  const [selectedActs, setSelectedActs] = useState<Activity[]>([]);

  const toggleAct = (act: Activity) => {
    setSelectedActs((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Activity</Text>
        <Text style={styles.subtitle}>WHAT ARE YOU DOING?</Text>
      </View>

      <View style={styles.tagsContainer}>
        <View style={styles.tagsGrid}>
          {ACTIVITY.map((act) => (
            <TagChip
              key={act}
              label={act}
              selected={selectedActs.includes(act)}
              onPress={() => toggleAct(act)}
            />
          ))}
        </View>
      </View>

      <View style={styles.navRow}>
        <NavArrow direction="left" onPress={() => navigation.goBack()} />
        <NavArrow
          direction="right"
          onPress={() =>
            navigation.navigate('CustomVibe', {
              duration,
              moods,
              environments,
              activities: selectedActs, 
            })
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
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.sm,
  },
});

export default ActivityScreen;