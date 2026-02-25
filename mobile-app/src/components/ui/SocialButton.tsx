import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Colors, FontSize, FontFamily, Spacing, BorderRadius } from '../../theme';
import Fontisto from '@expo/vector-icons/Fontisto';
interface SocialButtonProps {
  provider: 'Google' | 'Apple';
  onPress: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, onPress }) => {

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      {provider === 'Google' ? <Fontisto name="google" size={19} color="white" /> : <Fontisto name="apple" size={20} color="white" />}
      <Text style={styles.label}>{provider}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  icon: {
    fontSize: FontSize.md,
  },
  label: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.medium,
    color: Colors.textPrimary,
  },
});

export default SocialButton;
