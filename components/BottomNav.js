// BottomNav.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function BottomNav() {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomNav}>
      <Icon name="home" size={28} color="#232323" />
      <Icon name="shopping-bag" size={28} color="#232323" />
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => navigation.navigate('Add')}
        activeOpacity={0.85}
      >
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
      <Icon name="bar-chart-2" size={28} color="#232323" />
      <Icon name="settings" size={28} color="#232323" />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 28,
    left: '5%',
    right: '5%',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    zIndex: 10,
  },
  plusButton: {
    backgroundColor: '#232323',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -32,
    shadowColor: '#000',
    shadowOpacity: 0.11,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
});
