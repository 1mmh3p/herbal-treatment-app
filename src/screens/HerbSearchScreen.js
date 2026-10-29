import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { herbsData } from '../data/herbsData'; // You'll need to create this data file

const HerbSearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHerbs, setFilteredHerbs] = useState(herbsData);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filtered = herbsData.filter(herb =>
        herb.name.toLowerCase().includes(text.toLowerCase()) ||
        herb.scientificName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredHerbs(filtered);
    } else {
      setFilteredHerbs(herbsData);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.herbItem}
      onPress={() => navigation.navigate('HerbDetail', { herb: item })}
    >
      <Image source={item.image} style={styles.herbImage} />
      <View style={styles.herbInfo}>
        <Text style={styles.herbName}>{item.name}</Text>
        <Text style={styles.herbScientific}>{item.scientificName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Bitki ara..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      
      <FlatList
        data={filteredHerbs}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 50,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  herbItem: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f5f7fa',
    borderRadius: 10,
    alignItems: 'center',
  },
  herbImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  herbInfo: {
    flex: 1,
  },
  herbName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  herbScientific: {
    fontSize: 14,
    color: '#718096',
    fontStyle: 'italic',
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default HerbSearchScreen;