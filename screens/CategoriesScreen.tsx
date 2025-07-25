import React, { useState } from 'react';
import { View, FlatList, Alert, StyleSheet } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';

import BottomNav from '../components/BottomNav';
import HeaderWithAddButton from '../components/HeaderWithAddButton';
import CategoryCard from '../components/CategoryCard';
import AddCategoryModal from '../components/AddCategoryModal';

// Sample initial data with transactions
const sampleCategoriesInitial = [
  {
    id: '1',
    emoji: '🍔',
    name: 'Food',
    transactions: [
      { id: 't1', description: 'Pizza', amount: 300, type: 'Expense', date: '2025-07-24' },
      { id: 't2', description: 'Coffee', amount: 150, type: 'Expense', date: '2025-07-22' },
      { id: 't3', description: 'Grocery', amount: 850, type: 'Expense', date: '2025-07-20' },
      { id: 't4', description: 'Snacks', amount: 200, type: 'Expense', date: '2025-07-15' },
    ],
  },
  {
    id: '2',
    emoji: '💰',
    name: 'Salary',
    transactions: [
      { id: 't5', description: 'July Salary', amount: 50000, type: 'Income', date: '2025-07-01' },
      { id: 't6', description: 'Bonus', amount: 5000, type: 'Income', date: '2025-06-15' },
    ],
  },
  {
    id: '3',
    emoji: '💡',
    name: 'Utilities',
    transactions: [
      { id: 't7', description: 'Electricity Bill', amount: 3000, type: 'Expense', date: '2025-07-20' },
      { id: 't8', description: 'Water Bill', amount: 500, type: 'Expense', date: '2025-06-28' },
    ],
  },
  {
    id: '4',
    emoji: '🖥️',
    name: 'Freelance',
    transactions: [
      { id: 't9', description: 'Project A', amount: 10000, type: 'Income', date: '2025-07-18' },
      { id: 't10', description: 'Project B', amount: 8000, type: 'Income', date: '2025-06-20' },
    ],
  },
];

export default function CategoriesScreen() {
  const [fontsLoaded] = useFonts({ Poppins_700Bold, Poppins_400Regular });
  const [categories, setCategories] = useState(sampleCategoriesInitial);
  const [modalVisible, setModalVisible] = useState(false);

  if (!fontsLoaded) return null;

  const handleEdit = (item) => {
    Alert.alert('Edit Category', `Edit ${item.name}`);
    // Extend this to actual navigation if needed
  };

  const handleDelete = (id) => {
    Alert.alert('Delete Category', 'Are you sure you want to delete this category?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: () => setCategories(categories.filter((c) => c.id !== id)),
        style: 'destructive',
      },
    ]);
  };

  const handleAddCategory = (newCategory) => {
    setCategories([
      ...categories,
      {
        ...newCategory,
        id: (categories.length + 1).toString(),
        transactions: [],
      },
    ]);
    setModalVisible(false);
  };

  return (
    <View style={styles.screen}>
      <HeaderWithAddButton title="Categories" onAddPress={() => setModalVisible(true)} />

      <View style={{ height: 70 }} />

      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />

      <AddCategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddCategory={handleAddCategory}
      />

      <View style={styles.bottomNavWrapper}>
        <BottomNav />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 114, 
    paddingHorizontal: 20,
  },
  bottomNavWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    elevation: 10,
  },
});
