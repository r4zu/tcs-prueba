import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Button, HeaderContainer } from '../../components';

const { width } = Dimensions.get('window');

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <HeaderContainer>
        <View style={styles.contain}>
          <View style={styles.box1}>
            <Text style={styles.textId}>ID: {id}</Text>
            <Text style={styles.parseItems}>Información extra</Text>
          </View>

          <View style={styles.box2}>
            <View style={styles.parseInfo}>
              <Text style={styles.parseItems}>Nombre</Text>
              <Text style={styles.parseFrontItems}>[Nombre-registrado]</Text>
            </View>

            <View style={styles.parseInfo}>
              <Text style={styles.parseItems}>Descripción</Text>
              <Text style={styles.parseFrontItems}>
                [Descripción-registrada]
              </Text>
            </View>

            <Text style={styles.parseItems}>Logo</Text>
            <Image
              source={{
                uri: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
              }}
              style={styles.image}
            />

            <View style={styles.parseInfo}>
              <Text style={styles.parseItems}>Fecha liberación</Text>
              <Text style={styles.parseFrontItems}>[Fecha-liberación]</Text>
            </View>

            <View style={styles.parseInfo}>
              <Text style={styles.parseItems}>Fecha revisión</Text>
              <Text style={styles.parseFrontItems}>[Fecha-revisión]</Text>
            </View>
          </View>

          <View>
            <Button onPress={() => {}} text="Editar" />
            <Button
              onPress={() => {}}
              color="red"
              text="Eliminar"
              textColor="white"
            />
          </View>
        </View>
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
  contain: {
    flex: 1,
    justifyContent: 'space-between',
    width: width - 40,
  },
  box1: {
    marginTop: 50,
  },
  box2: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 70,
  },
  parseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parseItems: {
    fontSize: 16,
    color: '#58585B',
  },
  parseFrontItems: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#58585B',
  },
  textId: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#58585B',
  },
  image: {
    height: 150,
    resizeMode: 'cover',
  },
});
