import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, FontFamily, Spacing, BorderRadius } from '../../theme';

interface TagChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const TagChip: React.FC<TagChipProps> = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.chip, selected ? styles.selected : styles.unselected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.label, selected ? styles.selectedText : styles.unselectedText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: '30%', // ~3 items per row with some margin
    marginBottom: Spacing.md,
  },
  selected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  unselected: {
    backgroundColor: Colors.tagUnselected,
    borderColor: Colors.tagBorderUnselected,
  },
  label: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.medium,
  },
  selectedText: {
    color: Colors.textPrimary,
  },
  unselectedText: {
    color: Colors.textSecondary,
  },
});

export default TagChip;
