import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants/Colors';

const ProfileScreen = () => {
  const { user, signOut } = useAuth();

  const userName = user?.name || 'Belirtilmedi';
  const userEmail = user?.email || 'Belirtilmedi';

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={{
            uri: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.email}>{userEmail}</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Icon name="logout" size={20} color="#fff" />
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background || '#F6F8FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.textPrimary || '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: Colors.textSecondary || '#666',
    marginBottom: 25,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    gap: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
