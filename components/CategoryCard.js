import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TransactionItem from './TransactionItem';

export default function CategoryCard({ category, onEdit, onDelete }) {
  const { emoji, name, transactions } = category;

  const totalAmount = transactions.reduce(
    (sum, tx) => sum + (tx.type === 'Expense' ? -tx.amount : tx.amount),
    0,
  );
  const isIncome = totalAmount >= 0;

  // Sort transactions descending by date and pick top 3
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>{emoji}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={[styles.total, isIncome ? styles.income : styles.expense]}>
          {isIncome ? '+ ' : '- '}
          <Text style={styles.amount}>₹{Math.abs(totalAmount)}</Text>
        </Text>
        <View style={styles.transactionList}>
          {recentTransactions.map((tx) => (
            <TransactionItem
              key={tx.id}
              description={tx.description}
              amount={tx.amount}
              type={tx.type}
            />
          ))}
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Ionicons name="pencil" size={20} color="#444" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={{ marginLeft: 12 }}>
          <Ionicons name="trash-bin" size={20} color="#444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16, // Reduced gap here
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
  name: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#000',
  },
  total: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    marginVertical: 4,
  },
  amount: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: '#000',
  },
  income: {
    color: '#444',
  },
  expense: {
    color: '#444',
  },
  transactionList: {
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    marginTop: 4,
  },
});
