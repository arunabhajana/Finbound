import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import FAIcon from 'react-native-vector-icons/FontAwesome';

export default function RegisterScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Image
          source={require('../assets/main.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join Finbound and start budgeting smartly</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#bdbdbd"
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#bdbdbd"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#bdbdbd"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#bdbdbd"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.signUpButton} activeOpacity={0.85}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.orRow}>
          <View style={styles.orDivider} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.orDivider} />
        </View>

        <TouchableOpacity style={styles.googleButton} activeOpacity={0.85}>
          <FAIcon name="google" size={24} color="#EA4335" style={{ marginRight: 10 }} />
          <Text style={styles.googleButtonText}>Sign up with Google</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 28,
    paddingTop: 50,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 28,
    color: '#232323',
    letterSpacing: 1.2,
    marginBottom: 4,
    marginTop: 8,
  },
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: '#777',
    marginBottom: 28,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    backgroundColor: '#f7f7f7',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#232323',
    borderWidth: 1.2,
    borderColor: '#eaeaea',
    marginBottom: 14,
  },
  signUpButton: {
    width: '100%',
    backgroundColor: '#232323',
    borderRadius: 22,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  signUpButtonText: {
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  orRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  orDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#eaeaea',
  },
  orText: {
    marginHorizontal: 12,
    color: '#bdbdbd',
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: '#eaeaea',
    paddingVertical: 14,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  googleButtonText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#232323',
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  loginText: {
    color: '#777',
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
  },
  loginLink: {
    color: '#232323',
    fontFamily: 'Poppins_700Bold',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
