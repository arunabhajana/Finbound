import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Svg, { Path, Circle } from 'react-native-svg';

const months = ['jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const currentMonth = 'oct';

const transactions = [
  {
    id: '1',
    icon: 'dog',
    emoji: '🐶',
    title: 'pet care',
    subtitle: 'petco',
    amount: -179.99,
  },
  {
    id: '2',
    icon: 'coffee',
    emoji: '☕️',
    title: 'coffee',
    subtitle: 'starbucks',
    amount: -8.95,
  },
  {
    id: '3',
    icon: 'tools',
    emoji: '🛠️',
    title: 'house repair',
    subtitle: 'jude contractor',
    amount: -75.0,
  },
  {
    id: '4',
    icon: 'taxi',
    emoji: '🚕',
    title: 'commute',
    subtitle: 'uber',
    amount: -15.0,
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.monthSelector}>
          <Text style={styles.monthSelectorText}>this month</Text>
          <Feather name="chevron-down" size={18} color="#222" />
        </TouchableOpacity>
        <Feather name="search" size={22} color="#222" />
      </View>

      {/* Balance */}
      <Text style={styles.balance}>$301.95</Text>

      {/* Chart */}
      <View style={styles.chartWrapper}>
        <Svg height="80" width="100%" viewBox="0 0 320 80">
          <Path
            d="M0,70 Q40,10 80,40 Q120,70 160,40 Q200,10 240,40 Q280,70 320,40"
            stroke="#111"
            strokeWidth="3"
            fill="none"
          />
          {/* Circle at current month */}
          <Circle cx="160" cy="40" r="10" fill="#fff" stroke="#111" strokeWidth="3" />
        </Svg>
      </View>

      {/* Months Row */}
      <View style={styles.monthsRow}>
        {months.map((m) => (
          <Text
            key={m}
            style={[
              styles.monthText,
              m === currentMonth && styles.monthTextActive,
            ]}
          >
            {m}
          </Text>
        ))}
      </View>

      {/* Today's Summary */}
      <View style={styles.todayRow}>
        <Text style={styles.todayText}>today</Text>
        <Text style={styles.todayAmount}>-${308.89.toFixed(2)}</Text>
      </View>
      <View style={styles.divider} />

      {/* Transactions List */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionRow}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <View style={styles.transactionText}>
              <Text style={styles.transactionTitle}>{item.title}</Text>
              <Text style={styles.transactionSubtitle}>{item.subtitle}</Text>
            </View>
            <Text style={styles.transactionAmount}>
              {item.amount < 0 ? '-' : '+'}${Math.abs(item.amount).toFixed(2)}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={24} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="bar-chart-2" size={24} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <Feather name="plus" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="file-text" size={24} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="settings" size={24} color="#222" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60, paddingHorizontal: 20 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  monthSelectorText: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 6,
    color: '#222',
  },
  balance: {
    fontSize: 44,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginVertical: 8,
    letterSpacing: 1,
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  monthsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  monthText: {
    fontSize: 15,
    color: '#bbb',
    fontWeight: '500',
    textTransform: 'lowercase',
  },
  monthTextActive: {
    color: '#111',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  todayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 4,
    paddingHorizontal: 2,
  },
  todayText: {
    fontSize: 15,
    color: '#888',
    fontWeight: '500',
  },
  todayAmount: {
    fontSize: 15,
    color: '#888',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 6,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#f4f4f4',
  },
  emoji: {
    fontSize: 28,
    marginRight: 16,
  },
  transactionText: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textTransform: 'lowercase',
  },
  transactionSubtitle: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 2,
    textTransform: 'lowercase',
  },
  transactionAmount: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111',
    minWidth: 90,
    textAlign: 'right',
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    zIndex: 10,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});
