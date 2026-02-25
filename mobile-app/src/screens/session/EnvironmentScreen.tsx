import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors, FontSize, FontFamily, Spacing } from '../../theme';
import TagChip from '../../components/ui/TagChip';
import NavArrow from '../../components/ui/NavArrow';
import { ENVIRONMENTS } from '../../constants';
import type { Environment } from '../../constants';
import type { SessionStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<SessionStackParamList, 'Environments'>;

const EnvironmentScreen: React.FC<Props> = ({ navigation, route }) => {
  const { duration, moods } = route.params;

  // use an array to store multiple selected environments
  const [selectedEnv, setSelectedEnv] = useState<Environment[]>([]);

  const toggleEnv = (env: Environment) => {
    setSelectedEnv((prev) =>
      prev.includes(env) ? prev.filter((e) => e !== env) : [...prev, env]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Environment</Text>
        <Text style={styles.subtitle}>WHERE DO YOU WANT TO FEEL?</Text>
      </View>

      <View style={styles.tagsContainer}>
        <View style={styles.tagsGrid}>
          {ENVIRONMENTS.map((env) => (
            <TagChip
              key={env}
              label={env}
              selected={selectedEnv.includes(env)}
              onPress={() => toggleEnv(env)}
            />
          ))}
        </View>
      </View>

      <View style={styles.navRow}>
        <NavArrow direction="left" onPress={() => navigation.goBack()} />
        <NavArrow
          direction="right"
          onPress={() =>
            navigation.navigate('Activities', {
              duration,
              moods,
              environments: selectedEnv
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

export default EnvironmentScreen;