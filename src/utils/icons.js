import Icon from 'react-native-vector-icons/MaterialIcons';

export const getHerbIcon = (category) => {
  switch (category) {
    case 'içecek': return 'local-drink';
    case 'yiyecek': return 'fastfood';
    case 'tedavi': return 'healing';
    default: return 'spa';
  }
};

export const getCategoryName = (category) => {
  switch (category) {
    case 'içecek': return 'İçecek';
    case 'yiyecek': return 'Yiyecek';
    case 'tedavi': return 'Tedavi';
    default: return 'Diğer';
  }
};