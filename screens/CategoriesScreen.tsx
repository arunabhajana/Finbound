import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';

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

export default function CategoriesScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  const [categories, setCategories] = useState(sampleCategoriesInitial);
  const [modalVisible, setModalVisible] = useState(false);

  // Form states for Add Category Modal
  const [emoji, setEmoji] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState('Expense'); // or 'Income'

  // Helper: Compute total amount of category transactions (Income positive, Expense negative)
  const calcCategoryTotal = (transactions) =>
    transactions.reduce(
      (sum, tx) => sum + (tx.type === 'Expense' ? -tx.amount : tx.amount),
      0,
    );

  if (!fontsLoaded) return null;

  const handleEdit = (item) => {
    Alert.alert('Edit Category', `Edit ${item.name}`);
    // navigation.navigate('EditCategory', { category: item });
  };

  const handleDelete = (id) => {
    Alert.alert('Delete Category', `Are you sure you want to delete this category?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: () => {
          const updatedCategories = categories.filter((c) => c.id !== id);
          setCategories(updatedCategories);
        },
        style: 'destructive',
      },
    ]);
  };

  const renderCategory = ({ item }) => {
    const total = calcCategoryTotal(item.transactions);

    return (
      <View style={styles.categoryCard}>
        <Text style={styles.emoji}>{item.emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.categoryName}>{item.name}</Text>
          <Text style={total >= 0 ? styles.incomeText : styles.expenseText}>
            {/* Show + or - sign before amount */}
            {total >= 0 ? '+ ' : '- '}
            <Text style={styles.amount}>₹{Math.abs(total)}</Text>
          </Text>

          {/* Show 3 most recent transactions */}
          <View style={styles.transactionList}>
            {item.transactions
              .slice()
              // Sort descending by date
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 3)
              .map((tx) => (
                <View key={tx.id} style={styles.transactionRow}>
                  <Text style={styles.transactionDesc}>{tx.description}</Text>
                  <Text
                    style={[
                      styles.transactionAmount,
                      tx.type === 'Income' ? styles.incomeText : styles.expenseText,
                    ]}
                  >
                    {tx.type === 'Income' ? '+ ' : '- '}
                    <Text style={styles.amount}>₹{tx.amount}</Text>
                  </Text>
                </View>
              ))}
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => handleEdit(item)}>
            <Ionicons name="pencil" size={20} color={styles.iconColor.color} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ marginLeft: 12 }}>
            <Ionicons name="trash-bin" size={20} color={styles.iconColor.color} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const resetForm = () => {
    setEmoji('');
    setCategoryName('');
    setCategoryType('Expense');
  };

  const handleAddCategory = () => {
    // Basic validation for emoji and name
    if (!emoji.trim()) {
      Alert.alert('Validation', 'Please enter an emoji for the category.');
      return;
    }
    if (!categoryName.trim()) {
      Alert.alert('Validation', 'Please enter a category name.');
      return;
    }

    // New category starts with empty transactions array since no amount input
    const newCategory = {
      id: (categories.length + 1).toString(),
      emoji: emoji.trim(),
      name: categoryName.trim(),
      transactions: [],
    };

    setCategories([...categories, newCategory]);
    resetForm();
    setModalVisible(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Categories</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Spacer of 70px between header and category cards */}
      <View style={{ height: 70 }} />

      {/* Category List */}
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Category Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalCenteredView}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add a new category</Text>

            <Text style={styles.inputLabel}>Emoji</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 🍕"
              placeholderTextColor="#888"
              value={emoji}
              onChangeText={setEmoji}
              maxLength={2}
            />

            <Text style={styles.inputLabel}>Category Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Food"
              placeholderTextColor="#888"
              value={categoryName}
              onChangeText={setCategoryName}
            />

            <Text style={styles.inputLabel}>Type</Text>
            <View style={styles.typeToggleContainer}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  categoryType === 'Income' && styles.typeButtonSelected,
                ]}
                onPress={() => setCategoryType('Income')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    categoryType === 'Income' && styles.typeButtonTextSelected,
                  ]}
                >
                  Income
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  categoryType === 'Expense' && styles.typeButtonSelected,
                ]}
                onPress={() => setCategoryType('Expense')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    categoryType === 'Expense' && styles.typeButtonTextSelected,
                  ]}
                >
                  Expense
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalButtonsRow}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  resetForm();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, styles.addButtonModal]} onPress={handleAddCategory}>
                <Text style={styles.addButtonTextModal}>Add</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Bottom Navigation */}
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
    paddingTop: 114, // original 64 + 50px shift
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 28,
    color: '#000',
    // keep left aligned as button is at right
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // subtle shadow on Android
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  categoryCard: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  emoji: {
    fontSize: 32,
    marginRight: 14,
    marginTop: 6,
  },
  categoryName: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#000',
  },
  incomeText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#444',
  },
  expenseText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#444',
  },
  amount: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: '#000',
  },
  transactionList: {
    marginTop: 8,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  transactionDesc: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: '#444',
    flexShrink: 1,
  },
  transactionAmount: {
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    marginTop: 4,
  },
  iconColor: {
    color: '#333',
  },

  // Modal Styling
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingHorizontal: 20,
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
  },
  modalTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    marginBottom: 16,
    color: '#000',
    textAlign: 'center',
  },
  inputLabel: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 4,
    color: '#333',
  },
  input: {
    fontFamily: 'Poppins_400Regular',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },
  typeToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  typeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#444',
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 4,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  typeButtonSelected: {
    backgroundColor: '#444',
  },
  typeButtonText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: '#444',
  },
  typeButtonTextSelected: {
    color: '#fff',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
    marginRight: 12,
  },
  cancelButtonText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#333',
  },
  addButtonModal: {
    backgroundColor: '#444',
  },
  addButtonTextModal: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#fff',
  },

  // Bottom navigation
  bottomNavWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingBottom: 10,
    paddingTop: 4,
    elevation: 10,
  },
});
