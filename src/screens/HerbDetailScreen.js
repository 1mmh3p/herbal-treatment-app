import React, { useState, useRef } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// استيراد LinearGradient بشكل صحيح حسب نوع المشروع
// إذا كنت تستخدم Expo:
import { LinearGradient } from 'expo-linear-gradient';
// إذا كنت تستخدم React Native CLI، استخدم:
 // import LinearGradient from 'react-native-linear-gradient';

import AdBanner from '../components/AdBanner';

const { width } = Dimensions.get('window');

const HerbDetailScreen = ({ route }) => {
  const { herb } = route.params;
  const [language, setLanguage] = useState('tr');

  // استخدم useRef بدلاً من Animated.Value
  const scrollY = useRef(new Animated.Value(0)).current;

  // التداخلات للارتفاع والشفافية
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [250, 100],
    extrapolate: 'clamp'
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'tr' ? 'en' : 'tr'));
  };

  const getIconName = () => {
    switch (herb.category) {
      case 'içecek': return 'local-drink';
      case 'yiyecek': return 'restaurant';
      case 'tedavi': return 'medical-services';
      default: return 'spa';
    }
  };

  const t = (trText, enText) => (language === 'tr' ? trText : enText);

  return (
    <View style={styles.container}>
      {/* رأس متحرك */}
      <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)', 'transparent']}
          style={styles.gradient}
        />
        <Animated.View style={[styles.headerContent, { opacity: headerOpacity }]}>
          <Icon 
            name={getIconName()} 
            size={60} 
            color="#FFF" 
            style={styles.icon} 
          />
          <Text style={styles.title}>
            {language === 'tr' ? herb.name_tr : herb.name}
          </Text>
          {language === 'tr' && herb.name && (
            <Text style={styles.latinName}>{herb.name}</Text>
          )}
        </Animated.View>
      </Animated.View>

      {/* Dil değiştirme butonu */}
      <TouchableOpacity 
        style={styles.languageButton}
        onPress={toggleLanguage}
      >
        <Text style={styles.languageText}>{language === 'tr' ? 'EN' : 'TR'}</Text>
      </TouchableOpacity>

      {/* ScrollView içeriği */}
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.contentSpacer} />

        {/* Bölümler */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t('Açıklama', 'Description')}</Text>
          <Text style={styles.sectionText}>
            {language === 'tr' ? (herb.description_tr || herb.description) : herb.description}
          </Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t('Faydaları', 'Benefits')}</Text>
          <Text style={styles.sectionText}>
            {language === 'tr' ? (herb.benefits_tr || herb.benefits) : herb.benefits}
          </Text>
        </View>
        
        {(herb.warnings || herb.warnings_tr) && (
          <View style={[styles.card, styles.warningCard]}>
            <View style={styles.warningHeader}>
              <Icon name="warning" size={24} color="#D32F2F" />
              <Text style={[styles.sectionTitle, styles.warningTitle]}>
                {t('Uyarılar', 'Warnings')}
              </Text>
            </View>
            <Text style={styles.sectionText}>
              {language === 'tr' ? (herb.warnings_tr || herb.warnings) : herb.warnings}
            </Text>
          </View>
        )}
        
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t('Kullanım Şekli', 'Usage')}</Text>
          <Text style={styles.sectionText}>
            {language === 'tr' ? (herb.usage_tr || herb.usage) : herb.usage}
          </Text>
        </View>

        <View style={styles.footerSpacer} />
      </Animated.ScrollView>

      {/* إعلان بانر */}
      <AdBanner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    overflow: 'hidden',
    zIndex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 15,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  latinName: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    fontStyle: 'italic',
    marginTop: 8,
  },
  scrollContainer: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  contentSpacer: {
    height: 250,
  },
  footerSpacer: {
    height: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#424242',
  },
  warningCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#D32F2F',
    backgroundColor: '#FFEBEE',
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  warningTitle: {
    color: '#D32F2F',
    marginLeft: 10,
  },
  languageButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    zIndex: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default HerbDetailScreen;