import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors, FontSize, FontFamily, Spacing, BorderRadius } from '../../theme';
import Logo from '../../components/ui/Logo';
import type { MainStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '@/contexts/AuthContext';

type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  // const {logout} = useAuth() 
  // useEffect(()=>{
  //   logout()
  // }, [])
  return (
    <View style={styles.container}>
      {/* Header row */}
      <TouchableOpacity
        style={styles.premiumBadge}
        onPress={() => navigation.navigate('Premium')}
      >
        <Text style={styles.premiumText}>✦ Premium</Text>
      </TouchableOpacity>

      <View style={styles.centerContent}>
        <Logo />
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('SessionLength')}
        activeOpacity={0.85}
      >
        <Text style={styles.startLabel}>Start Session  ▶</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing['3xl'],
    paddingBottom: Spacing['4xl'],
  },
  premiumBadge: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primaryGlow,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  premiumText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.semiBold,
    color: Colors.primary,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 10,
  },
  startLabel: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
});

export default HomeScreen;
