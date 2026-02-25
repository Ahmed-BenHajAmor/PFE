import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Colors, Spacing } from '../../theme';
import Feather from '@expo/vector-icons/Feather';interface NavArrowProps {
  direction: 'left' | 'right';
  onPress: () => void;
}

const NavArrow: React.FC<NavArrowProps> = ({ direction, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      {direction === 'left' ? <Feather name="arrow-left" size={24} color="white" /> : <Feather name="arrow-right" size={24} color="white" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    color: Colors.textPrimary,
    fontSize: 20,
  },
});

export default NavArrow;
