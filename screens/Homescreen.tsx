import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import Svg, { Path, Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather'; // For navbar
import FAIcon from 'react-native-vector-icons/FontAwesome'; // For search

const months = [
  'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
];

const dropdownMonths = [
  { label: 'this month', value: 'this month' },
  { label: 'jan', value: 'jan' },
  { label: 'feb', value: 'feb' },
  { label: 'mar', value: 'mar' },
  { label: 'apr', value: 'apr' },
  { label: 'may', value: 'may' },
  { label: 'jun', value: 'jun' },
  { label: 'jul', value: 'jul' },
  { label: 'aug', value: 'aug' },
  { label: 'sep', value: 'sep' },
  { label: 'oct', value: 'oct' },
  { label: 'nov', value: 'nov' },
  { label: 'dec', value: 'dec' },
];

const expenses = [
  {
    id: '1',
    icon: '🐶',
    category: 'pet care',
    merchant: 'petco',
    amount: 179.99,
  },
  {
    id: '2',
    icon: '☕️',
    category: 'coffee',
    merchant: 'starbucks',
    amount: 8.95,
  },
  {
    id: '3',
    icon: '🛠️',
    category: 'house repair',
    merchant: 'jude contractor',
    amount: 75.00,
  },
  {
    id: '4',
    icon: '🚕',
    category: 'commute',
    merchant: 'uber',
    amount: 15.00,
  },
];

export default function HomeScreen() {
  const [selectedMonth, setSelectedMonth] = useState(dropdownMonths[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      {/* Dropdown and Search */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setDropdownOpen(!dropdownOpen)}
          activeOpacity={0.7}
        >
          <Text style={styles.dropdownText}>{selectedMonth.label}</Text>
          <Icon name={dropdownOpen ? "chevron-up" : "chevron-down"} size={18} color="#232323" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchIcon} activeOpacity={0.7}>
          <FAIcon name="search" size={22} color="#232323" />
        </TouchableOpacity>
      </View>
      {dropdownOpen && (
        <View style={styles.dropdownList}>
          {dropdownMonths.map((month) => (
            <TouchableOpacity
              key={month.value}
              onPress={() => {
                setSelectedMonth(month);
                setDropdownOpen(false);
              }}
              style={styles.dropdownItem}
            >
              <Text style={[
                styles.dropdownText,
                month.value === selectedMonth.value && { fontWeight: '700', color: '#232323' }
              ]}>{month.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Amount */}
      <Text style={styles.amount}>$301.95</Text>

      {/* Graph */}
      <View style={styles.graphContainer}>
        <Svg width="100%" height="110" viewBox="0 0 320 110">
          <Path
            d="M0,90 Q40,20 80,70 Q120,110 160,60 Q200,20 240,60 Q280,110 320,90"
            stroke="#232323"
            strokeWidth="3"
            fill="none"
          />
          {/* Highlight circle for current month */}
          <Circle cx="160" cy="60" r="13" fill="#fff" stroke="#232323" strokeWidth="3" />
        </Svg>
      </View>

      {/* Months Row */}
      <View style={styles.monthsRow}>
        {months.map((m) => (
          <Text
            key={m}
            style={[
              styles.monthLabel,
              m === 'oct' && styles.monthLabelActive
            ]}
          >
            {m}
          </Text>
        ))}
      </View>

      {/* Expenses */}
      <FlatList
        style={{ flex: 1, width: '100%' }}
        data={expenses}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <>
            <View style={styles.expenseHeader}>
              <Text style={styles.expenseHeaderText}>today</Text>
              <Text style={styles.expenseHeaderText}>-${308.89.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.expenseRow}>
            <Text style={styles.expenseIcon}>{item.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.expenseCategory}>{item.category}</Text>
              <Text style={styles.expenseMerchant}>{item.merchant}</Text>
            </View>
            <Text style={styles.expenseAmount}>-${item.amount.toFixed(2)}</Text>
          </View>
        )}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Icon name="home" size={28} color="#232323" />
        <Icon name="shopping-bag" size={28} color="#232323" />
        <View style={styles.plusButton}>
          <Icon name="plus" size={30} color="#fff" />
        </View>
        <Icon name="bar-chart-2" size={28} color="#232323" />
        <Icon name="settings" size={28} color="#232323" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 64,
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 50,
    zIndex: 10,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#eaeaea',
    minWidth: 150,
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  dropdownText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 17,
    color: '#232323',
    textTransform: 'lowercase',
  },
  searchIcon: {
    // No background, no border, just the icon
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    padding: 0,
  },
  dropdownList: {
    position: 'absolute',
    top: 105,
    left: '25%',
    width: '50%',
    backgroundColor: '#fff',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    zIndex: 20,
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  amount: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 48,
    color: '#232323',
    marginVertical: 8,
    textAlign: 'center',
  },
  graphContainer: {
    width: '92%',
    height: 110,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthsRow: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginBottom: 12,
  },
  monthLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#bdbdbd',
    textTransform: 'lowercase',
  },
  monthLabelActive: {
    color: '#232323',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 2,
  },
  expenseHeaderText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: '#bdbdbd',
  },
  divider: {
    height: 1,
    backgroundColor: '#eaeaea',
    marginHorizontal: 24,
    marginBottom: 2,
  },
  expenseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  expenseIcon: {
    fontSize: 28,
    marginRight: 18,
  },
  expenseCategory: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 17,
    color: '#232323',
    textTransform: 'lowercase',
  },
  expenseMerchant: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: '#bdbdbd',
    marginTop: -2,
    textTransform: 'lowercase',
  },
  expenseAmount: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 17,
    color: '#232323',
    marginLeft: 12,
  },
  bottomNav: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 28, // Raised above the very bottom
    left: '5%',
    right: '5%',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
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
