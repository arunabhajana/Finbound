import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TransactionItem({ description, amount, type }) {
  const isIncome = type === 'Income';
  return (
    <View style={styles.transactionRow}>
      <Text style={styles.transactionDesc}>{description}</Text>
      <Text style={[styles.transactionAmount, isIncome ? styles.income : styles.expense]}>
        {isIncome ? '+ ' : '- '}
        <Text style={styles.amount}>₹{amount}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  transactionDesc: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: '#444',
    flexShrink: 1,
  },
  transactionAmount: {
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
  },
  amount: {
    fontFamily: 'Poppins_700Bold',
  },
  income: {
    color: '#444',
  },
  expense: {
    color: '#444',
  },
});
