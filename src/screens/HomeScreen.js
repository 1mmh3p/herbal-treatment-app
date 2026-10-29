import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { useAuth } from '../context/AuthContext';
import HerbCard from '../components/HerbCard';
import AdBanner from '../components/AdBanner';
import { supabase } from '../services/supabase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();

  const [herbs, setHerbs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // بيانات الفئات
  const categories = [
    { id: 'all', name: 'Tümü', icon: 'apps' },
    { id: 'içecek', name: 'İçecekler', icon: 'local-drink' },
    { id: 'yiyecek', name: 'Yiyecekler', icon: 'fastfood' },
    { id: 'tedavi', name: 'Tedaviler', icon: 'healing' },
  ];

  const fetchHerbs = async (category = 'all') => {
    setLoading(true);
    try {
      let query = supabase.from('herbs').select('*');
      if (category !== 'all') {
        query = query.eq('category', category);
      }
      const { data, error } = await query.order('name_tr', { ascending: true });
      if (error) throw error;
      setHerbs(data || []);
    } catch (error) {
      console.error('Error fetching herbs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHerbs(selectedCategory);
  }, [selectedCategory]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchHerbs(selectedCategory);
    setRefreshing(false);
  };

  return (
    <LinearGradient colors={['#f5f7fa', '#e4e8f0']} style={styles.container}>
      <StatusBar style="dark" />

      {/* رأس الصفحة */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Merhaba, {user?.email?.split('@')[0]}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="account-circle" size={30} color="#4a5568" />
        </TouchableOpacity>
      </View>

      {/* أزرار الفئات */}
      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryButton,
              selectedCategory === cat.id && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <Icon
              name={cat.icon}
              size={20}
              color={selectedCategory === cat.id ? '#fff' : '#4a5568'}
              style={styles.categoryIcon}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat.id && styles.selectedCategoryText,
              ]}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* المحتوى */}
      {loading && herbs.length === 0 ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : (
        <FlatList
          data={herbs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HerbCard
              herb={item}
              onPress={() => navigation.navigate('HerbDetail', { herb: item })}
            />
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="search-off" size={50} color="#a0aec0" />
              <Text style={styles.emptyText}>Bu kategoride bitki bulunamadı</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* إعلانات */}
      <AdBanner />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcome: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2d3748',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  categoryButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 3,
    flexDirection: 'column',
  },
  selectedCategory: {
    backgroundColor: '#4CAF50',
  },
  categoryIcon: {
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    color: '#4a5568',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginTop: 15,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default HomeScreen;