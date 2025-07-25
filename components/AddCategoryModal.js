import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
} from 'react-native';

export default function AddCategoryModal({
  visible,
  onClose,
  onAddCategory,
  defaultType = 'Expense',
  loading = false,
}) {
  const [emoji, setEmoji] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState(defaultType);

  useEffect(() => {
    if (!visible) {
      setEmoji('');
      setCategoryName('');
      setCategoryType(defaultType);
    }
  }, [visible, defaultType]);

  const handleAdd = () => {
    if (!emoji.trim()) {
      Alert.alert('Validation', 'Please enter an emoji for the category.');
      return;
    }
    if (!categoryName.trim()) {
      Alert.alert('Validation', 'Please enter a category name.');
      return;
    }
    onAddCategory({
      emoji: emoji.trim(),
      name: categoryName.trim(),
      type: categoryType,
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
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
            {['Income', 'Expense'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  categoryType === type && styles.typeButtonSelected,
                ]}
                onPress={() => setCategoryType(type)}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    categoryType === type && styles.typeButtonTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.modalButtonsRow}>
            <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.modalButton, styles.addButtonModal]}
              onPress={handleAdd}
              disabled={loading}
            >
              <Text style={styles.addButtonTextModal}>Add</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingHorizontal: 20,
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    marginBottom: 12,
    color: '#000',
    textAlign: 'center',
  },
  inputLabel: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    marginTop: 12,
    marginBottom: 6,
    color: '#444',
  },
  input: {
    fontFamily: 'Poppins_400Regular',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
  },
  typeToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  typeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#666',
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  typeButtonSelected: {
    backgroundColor: '#444',
  },
  typeButtonText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: '#666',
  },
  typeButtonTextSelected: {
    color: '#fff',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#eee',
    marginRight: 12,
  },
  cancelButtonText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#444',
  },
  addButtonModal: {
    backgroundColor: '#444',
  },
  addButtonTextModal: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#fff',
  },
});
