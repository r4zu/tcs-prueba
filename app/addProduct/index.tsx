import { View, Text, StyleSheet } from 'react-native';
import { HeaderContainer, ProductForm } from '../../components';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <HeaderContainer>
        <Text style={styles.headline}>Formulario de Registro</Text>

        <ProductForm />
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
  headline: {
    fontSize: 30,
    marginTop: 20,
  },
});
