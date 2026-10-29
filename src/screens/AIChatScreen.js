import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  LayoutAnimation,
  UIManager,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Colors = {
  primary: '#4CAF50',
  arkaplan: '#FAFAFA',
  ayraç: '#E0E0E0',
  metinPrimary: '#333',
  metinSecondary: '#777',
};

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HerbalChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Merhaba! Bitki Asistanınız olarak size doğal ve şifalı bitkiler hakkında yardımcı olmaya hazırım.',
      sender: 'ai',
    },
  ]);
  const [girdiMetni, setGirdiMetni] = useState('');
  const [yaziyor, setYaziyor] = useState(false);
  const flatListRef = useRef();

  const mesajGonder = () => {
    const metin = girdiMetni.trim();
    if (!metin) return;

    const kullaniciMesaji = {
      id: Date.now(),
      text: metin,
      sender: 'kullanici',
    };

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMessages(prev => [...prev, kullaniciMesaji]);
    setGirdiMetni('');
    setYaziyor(true);

    setTimeout(() => {
      const aiYaniti = generateHerbalResponse(metin);
      const aiMesaji = {
        id: Date.now() + 1,
        text: aiYaniti,
        sender: 'ai',
      };
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setMessages(prev => [...prev, aiMesaji]);
      setYaziyor(false);
    }, 1500);
  };

  const generateHerbalResponse = (text) => {
    const input = text.toLowerCase();

    if (input.includes('merhaba') || input.includes('selam')) {
      return 'Merhaba! Bitkiler ve şifalı çaylar hakkında nasıl yardımcı olabilirim?';
    } else if (input.includes('stres') || input.includes('rahatlama')) {
      return 'Papatya, lavanta ve melisa çayları stres ve anksiyete için harikadır.';
    } else if (input.includes('uyku') || input.includes('insomnia')) {
      return 'Kediotu, papatya veya şerbetçiotu çayı uyku kalitenizi artırabilir.';
    } else if (input.includes('hazımsızlık') || input.includes('mide')) {
      return 'Nane, zencefil ve rezene sindirimi kolaylaştırır ve gazları giderir.';
    } else if (input.includes('bağışıklık') || input.includes('koruma')) {
      return 'Ekinezya, zerdeçal ve mürver bağışıklık sisteminizi güçlendirebilir.';
    } else {
      return 'Daha fazla detay verir misiniz? Size en iyi şekilde yardımcı olmak isterim.';
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderItem = ({ item }) => {
    const kullaniciMi = item.sender === 'kullanici';
    return (
      <View style={[styles.mesajKapsayici, kullaniciMi ? styles.kullaniciYonu : styles.aiYonu]}>
        <View style={[styles.mesajBalonu, kullaniciMi ? styles.kullaniciBalonu : styles.aiBalonu]}>
          <Text style={[styles.mesajMetni, kullaniciMi ? styles.kullaniciMetni : styles.aiMetni]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.kontener}>
      {/* Üst Bilgi */}
      <View style={styles.baslik}>
        <Text style={styles.baslikBaslik}>🌿 Bitki Asistanı</Text>
        <View style={styles.altBaslikContainer}>
          <Icon name="eco" size={16} color={Colors.primary} />
          <Text style={styles.altBaslik}>Şifalı Bitkiler ve Çay Uzmanı</Text>
        </View>
      </View>

      {/* Mesaj Listesi */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.mesajlar}
      />

      {/* Yazıyor Göstergesi */}
      {yaziyor && (
        <View style={styles.yaziyorIndicator}>
          <ActivityIndicator size="small" color={Colors.primary} />
          <Text style={styles.yaziyorMetin}>Asistan yazıyor...</Text>
        </View>
      )}

      {/* Giriş Alanı */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.girdiKapsayici}
      >
        <TextInput
          style={styles.girdi}
          placeholder="Bitkiler ve şifalı çaylar hakkında sor..."
          placeholderTextColor={Colors.metinSecondary}
          multiline
          value={girdiMetni}
          onChangeText={setGirdiMetni}
        />
        <TouchableOpacity style={styles.gonderButton} onPress={mesajGonder}>
          <Icon name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  kontener: {
    flex: 1,
    backgroundColor: Colors.arkaplan,
  },
  baslik: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ayraç,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  baslikBaslik: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.metinPrimary,
  },
  altBaslikContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  altBaslik: {
    marginLeft: 6,
    fontSize: 14,
    color: Colors.metinSecondary,
  },
  mesajlar: {
    padding: 16,
    paddingBottom: 80,
  },
  mesajKapsayici: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  kullaniciYonu: {
    justifyContent: 'flex-end',
  },
  aiYonu: {
    justifyContent: 'flex-start',
  },
  mesajBalonu: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  kullaniciBalonu: {
    backgroundColor: Colors.primary,
    borderTopRightRadius: 0,
  },
  aiBalonu: {
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 0,
  },
  mesajMetni: {
    fontSize: 15,
  },
  kullaniciMetni: {
    color: '#fff',
  },
  aiMetni: {
    color: Colors.metinPrimary,
  },
  girdiKapsayici: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.ayraç,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  girdi: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 15,
    color: Colors.metinPrimary,
  },
  gonderButton: {
    width: 40,
    height: 40,
    marginLeft: 8,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  yaziyorIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  yaziyorMetin: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.metinSecondary,
    fontStyle: 'italic',
  },
});

export default HerbalChat;