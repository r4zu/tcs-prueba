import { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Searcher: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    console.log('Búsqueda realizada:', text);
    // implementar la logica de busqueda
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: width - 50,
    maxWidth: 400,
  },
  input: {
    height: 40,
    fontSize: 16,
  },
});
