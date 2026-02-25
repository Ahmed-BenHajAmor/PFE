import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, FontFamily, Spacing } from '../../theme';
import { APP_NAME, APP_TAGLINE, LOGO_SIZE } from '../../constants';

interface LogoProps {
  showTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ showTagline = true }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <View style={styles.soundWave}>
          {[8, 16, 24, 16, 8].map((height, i) => (
            <View key={i} style={[styles.bar, { height }]} />
          ))}
        </View>
      </View>
      <Text style={styles.appName}>{APP_NAME}</Text>
      {showTagline && <Text style={styles.tagline}>{APP_TAGLINE}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconWrapper: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: LOGO_SIZE / 2,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },
  soundWave: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bar: {
    width: 4,
    backgroundColor: Colors.white,
    borderRadius: 2,
  },
  appName: {
    fontSize: FontSize['2xl'],
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
  },
  tagline: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
  },
});

export default Logo;
