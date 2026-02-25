import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Colors, Spacing } from '../../theme';

interface VolumeSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔇</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor={Colors.accentBlue}
        maximumTrackTintColor={Colors.border}
        thumbTintColor={Colors.accentBlue}
      />
      <Text style={styles.icon}>🔊</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 40,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  icon: {
    fontSize: 18,
  },
});

export default VolumeSlider;
