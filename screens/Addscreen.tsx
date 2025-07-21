import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import BottomNav from '../components/BottomNav';

// Sample 3-day window
const days = [
  { day: 21, label: 'mon' },
  { day: 22, label: 'tue' },
  { day: 23, label: 'wed' }
];

export default function AddScreen({ navigation }) {
  const [type, setType] = useState('expenses');
  const [amount, setAmount] = useState('20.00');
  const [selectedDay, setSelectedDay] = useState(22);
  const [emoji] = useState('🍔');
  const [label, setLabel] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) return null;

  const handleKey = (key) => {
    if (key === '.') {
      if (!amount.includes('.')) setAmount(amount + '.');
      return;
    }
    if (key === 'del') {
      setAmount(prev => (prev.length > 1 ? prev.slice(0, -1) : ''));
      return;
    }
    if (key === 'check') {
      navigation.goBack();
      return;
    }
    if (amount === '0.00' || amount === '') setAmount(key);
    else if (amount.length < 10) setAmount(amount + key);
  };

  const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', 'check'];

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* Type Toggle */}
          <View style={styles.toggleRow}>
            {['expenses', 'income'].map(item => (
              <TouchableOpacity
                key={item}
                style={[styles.toggleBtn, type === item && styles.toggleActive]}
                onPress={() => setType(item)}
              >
                <Text style={[styles.toggleText, type === item && styles.toggleTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Date Row and Picker */}
          <View style={styles.dateRowWrapper}>
            <View style={styles.dateRow}>
              {days.map(({ day, label }) => (
                <TouchableOpacity key={day} onPress={() => setSelectedDay(day)}>
                  <View style={day === selectedDay ? styles.dateActiveContainer : styles.dateInactiveContainer}>
                    <Text style={day === selectedDay ? styles.dateActive : styles.dateInactive}>
                      {day}
                      <Text style={styles.dateSub}> {label}</Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerIcon}>
              <Icon name="calendar" size={22} color="#232323" />
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          {/* Amount Field */}
          <Text style={styles.amountText}>${amount || '0.00'}</Text>

          {/* Emoji + Label */}
          <View style={styles.inputsRow}>
            <View style={styles.emojiBox}>
              <Text style={styles.staticEmoji}>{emoji}</Text>
            </View>
            <TextInput
              style={styles.labelInput}
              placeholder="Type category..."
              value={label}
              onChangeText={setLabel}
              placeholderTextColor="#888"
            />
          </View>

          {/* Custom Keypad */}
          <View style={styles.keypad}>
            {KEYS.map((key) => (
              <TouchableOpacity key={key} style={styles.keypadBtn} onPress={() => handleKey(key)}>
                {key === 'check' ? (
                  <Icon name="check" size={28} color="#232323" />
                ) : key === 'del' ? (
                  <Icon name="delete" size={24} color="#232323" />
                ) : (
                  <Text style={styles.keypadText}>{key}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </KeyboardAvoidingView>

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    paddingTop: 50,
  },
  toggleRow: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  toggleBtn: {
    minWidth: 110,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#232323',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#232323',
  },
  toggleText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    color: '#232323',
  },
  toggleTextActive: {
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
  },
  dateRowWrapper: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  dateRow: {
    flexDirection: 'row',
  },
  dateActiveContainer: {
    backgroundColor: '#232323',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 50,
    marginHorizontal: 6,
  },
  dateInactiveContainer: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  dateActive: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
  },
  dateInactive: {
    color: '#232323',
    opacity: 0.6,
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
  },
  dateSub: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  datePickerIcon: {
    padding: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 50,
  },
  amountText: {
    fontSize: 42,
    fontFamily: 'Poppins_700Bold',
    color: '#232323',
    marginVertical: 12,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '84%',
    marginTop: 10,
  },
  emojiBox: {
    padding: 12,
    backgroundColor: '#f3f3f3',
    borderRadius: 18,
    marginRight: 12,
  },
  staticEmoji: {
    fontSize: 28,
  },
  labelInput: {
    flex: 1,
    height: 48,
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    paddingHorizontal: 16,
    color: '#232323',
  },
  keypad: {
    width: '92%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 16,
  },
  keypadBtn: {
    width: '28%',
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  keypadText: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    color: '#232323',
  },
});
