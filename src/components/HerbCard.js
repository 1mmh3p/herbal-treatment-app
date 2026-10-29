import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';

const HerbCard = ({ herb, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient 
        colors={['#fff', '#f7fafc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.imageContainer}>
          {herb.image_url ? (
            <Image source={{ uri: herb.image_url }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Icon name="spa" size={40} color="#a0aec0" />
            </View>
          )}
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>{herb.name_tr}</Text>
          <Text style={styles.subtitle} numberOfLines={2}>{herb.description_tr}</Text>
          
          <View style={styles.footer}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{herb.category}</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#a0aec0" />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  imageContainer: {
    marginRight: 15,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#edf2f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: '#e6fffa',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#38b2ac',
    fontWeight: '600',
  },
});

export default HerbCard;