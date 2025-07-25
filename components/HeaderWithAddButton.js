import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HeaderWithAddButton({ title, onAddPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.addButton} onPress={onAddPress} activeOpacity={0.7}>
        <Ionicons name="add" size={28} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 28,
    color: '#000',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});
