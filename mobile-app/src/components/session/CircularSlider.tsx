import React, { useCallback } from 'react';
import { View, Text, StyleSheet, PanResponder, Dimensions } from 'react-native';
import { Colors, FontSize, FontFamily } from '../../theme';
import {
  CIRCULAR_SLIDER_SIZE,
  CIRCULAR_SLIDER_STROKE,
  MIN_DURATION,
  MAX_DURATION,
} from '../../constants';

interface CircularSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const SIZE = CIRCULAR_SLIDER_SIZE;
const RADIUS = (SIZE - CIRCULAR_SLIDER_STROKE) / 2;
const CENTER = SIZE / 2;

const CircularSlider: React.FC<CircularSliderProps> = ({ value, onChange }) => {
  const progress = (value - MIN_DURATION) / (MAX_DURATION - MIN_DURATION);
  const angle = progress * 340 - 170; // map to arc degrees
  const angleRad = (angle * Math.PI) / 180;

  // Thumb position on circle (starting from top)
  const startAngleRad = ((progress * 340 - 85) * Math.PI) / 180;
  const thumbX = CENTER + RADIUS * Math.cos(startAngleRad);
  const thumbY = CENTER + RADIUS * Math.sin(startAngleRad);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const dx = gestureState.moveX - CENTER;
      const dy = gestureState.moveY - CENTER;
      let newAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      // Normalize
      newAngle = (newAngle + 360) % 360;
      const normalized = newAngle / 360;
      const newValue = Math.round(
        MIN_DURATION + normalized * (MAX_DURATION - MIN_DURATION)
      );
      onChange(Math.max(MIN_DURATION, Math.min(MAX_DURATION, newValue)));
    },
  });

  // Generate arc path for SVG-like visualization using View
  const segments = 60;
  const filledSegments = Math.round(progress * segments);

  return (
    <View style={styles.container}>
      <View style={styles.sliderWrapper} {...panResponder.panHandlers}>
        {/* Track ring */}
        <View style={styles.outerRing} />
        <View style={styles.innerRing} />

        {/* Filled arc overlay using rotation trick */}
        <View style={styles.filledArcContainer}>
          {Array.from({ length: segments }).map((_, i) => {
            const segAngle = (i / segments) * 360 - 90;
            const isFilled = i < filledSegments;
            const rad = (segAngle * Math.PI) / 180;
            const x = CENTER + RADIUS * Math.cos(rad) - 5;
            const y = CENTER + RADIUS * Math.sin(rad) - 5;
            return (
              <View
                key={i}
                style={[
                  styles.segment,
                  {
                    left: x,
                    top: y,
                    backgroundColor: isFilled ? Colors.primary : Colors.border,
                  },
                ]}
              />
            );
          })}
          {/* Thumb */}
          <View
            style={[
              styles.thumb,
              {
                left: thumbX - 10,
                top: thumbY - 10,
              },
            ]}
          />
        </View>

        {/* Center content */}
        <View style={styles.centerContent}>
          <Text style={styles.valueText}>{value}</Text>
          <Text style={styles.unitText}>min</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderWrapper: {
    width: SIZE,
    height: SIZE,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: CIRCULAR_SLIDER_STROKE,
    borderColor: Colors.border,
  },
  innerRing: {
    position: 'absolute',
    width: SIZE - 40,
    height: SIZE - 40,
    borderRadius: (SIZE - 40) / 2,
    borderWidth: CIRCULAR_SLIDER_STROKE - 4,
    borderColor: Colors.border,
    opacity: 0.3,
  },
  filledArcContainer: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
  },
  segment: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  thumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.white,
    shadowColor: Colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },
  centerContent: {
    alignItems: 'center',
  },
  valueText: {
    fontSize: FontSize['4xl'],
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
    lineHeight: FontSize['4xl'] * 1.1,
  },
  unitText: {
    fontSize: FontSize.md,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
  },
});

export default CircularSlider;
