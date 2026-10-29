import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signIn(email, password);
      navigation.navigate('Home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bitkisel Tedavi </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Giriş Yap</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>Hesabınız yok mu? <Text style={styles.registerBold}>Kayıt Olun</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#0f0f0f', // أسود أنيق
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFD700', // ذهبي فخم
    marginBottom: 40,
    letterSpacing: 2,
    textShadowColor: '#222',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  input: {
    height: 55,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#1c1c1c',
    color: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  error: {
    color: '#FF4C4C',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 14,
  },
  loginButton: {
    height: 55,
    backgroundColor: '#FFD700', // ذهبي فاخر
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginTop: 10,
    transform: [{ scale: 1 }],
  },
  loginButtonText: {
    color: '#0f0f0f',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  registerLink: {
    marginTop: 25,
    alignItems: 'center',
  },
  registerText: {
    color: '#ccc',
    fontSize: 14,
  },
  registerBold: {
    fontWeight: 'bold',
    color: '#FFD700',
  },
});

export default LoginScreen;