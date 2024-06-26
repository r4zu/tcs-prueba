import { View, StyleSheet } from 'react-native';
import { ButtonNavigation, HeaderContainer, ProductList } from '../components';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <HeaderContainer>
        <ProductList />

        <ButtonNavigation
          href={`/addProduct`}
          color="#FFDD00"
          text="Agregar"
          textColor="#475145"
        />
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
