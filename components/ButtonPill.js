import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ButtonPill({ title, onPress, style, textStyle, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style, disabled && styles.disabled]}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#000',
  },
  disabled: {
    opacity: 0.5,
  },
});
