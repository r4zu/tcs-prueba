import { View, StyleSheet } from 'react-native';
import { HeaderContainer, ProductList, Searcher } from '../components';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <HeaderContainer>
        <Searcher />

        <ProductList />
      </HeaderContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
