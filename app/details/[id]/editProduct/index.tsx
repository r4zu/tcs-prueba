import { View, Text, StyleSheet } from 'react-native';
import { EditProductForm, HeaderContainer } from '../../../../components';

export default function EditProduct() {
  return (
    <View style={styles.container}>
      <HeaderContainer>
        <Text style={styles.headline}>Actualizar Registro</Text>

        <EditProductForm />
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
