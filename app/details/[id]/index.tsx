import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';

import {
  Button,
  ButtonNavigation,
  EliminationModal,
  HeaderContainer,
} from '../../../components';
import { URL, callUrl, useGetProducts } from '../../../hooks';

const { width } = Dimensions.get('window');

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const { products, setProducts } = useGetProducts();
  const { navigate, addListener } = useNavigation<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const filterProduct = products?.filter((p) => p.id === id);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${URL}?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorId: '43',
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      setModalVisible(false);
      navigate('index');
      Alert.alert('Eliminado', 'El producto ha sido eliminado exitosamente.');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      Alert.alert(
        'Error',
        'Ocurrió un error al intentar eliminar el producto.'
      );
    }
  };

  const handleRefreshApplication = useCallback(() => {
    callUrl().then((d) => {
      setProducts(d);
      setLoading(false);
    });
    // setProducts(dummyDatabase);
  }, [callUrl]);

  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      handleRefreshApplication();
    });
    return unsubscribe;
  }, [addListener, handleRefreshApplication]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFDD00" />
      </View>
    );
  }

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
              <Text style={styles.parseFrontItems}>
                {filterProduct
                  ? filterProduct[0].name
                  : '[Nombre - registrado]'}
              </Text>
            </View>

            <View style={styles.parseInfo}>
              <Text style={styles.parseItems}>Descripción</Text>
              <Text style={styles.parseFrontItems}>
                {filterProduct
                  ? filterProduct[0].description
                  : '[Descripción - registrada]'}
              </Text>
            </View>

            <Text style={styles.parseItems}>Logo</Text>
            <Image
              source={{
                uri: filterProduct
                  ? filterProduct[0].logo
                  : 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
              }}
              style={styles.image}
            />

            <View style={styles.parseInfo}>
              <Text style={styles.parseItems}>Fecha liberación</Text>
              <Text style={styles.parseFrontItems}>
                {filterProduct
                  ? `${filterProduct[0].date_release}`.split('T')[0]
                  : '[Fecha-liberación]'}
              </Text>
            </View>

            <View style={styles.parseInfo}>
              <Text style={styles.parseItems}>Fecha revisión</Text>
              <Text style={styles.parseFrontItems}>
                {filterProduct
                  ? `${filterProduct[0].date_revision}`.split('T')[0]
                  : '[Fecha-revisión]'}
              </Text>
            </View>
          </View>

          <View>
            <ButtonNavigation
              href={`/details/${id}/editProduct`}
              text="Editar"
            />
            <Button
              onPress={() => setModalVisible(true)}
              color="red"
              text="Eliminar"
              textColor="white"
            />
          </View>
        </View>
      </HeaderContainer>

      <EliminationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDelete}
      />
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
    marginHorizontal: 30,
  },
  box2: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 100,
    marginHorizontal: 30,
  },
  parseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parseItems: {
    fontSize: 12,
    color: '#58585B',
  },
  parseFrontItems: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#58585B',
    marginLeft: 40,
    width: 150,
  },
  textId: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#58585B',
  },
  image: {
    height: 100,
    width: 200,
    resizeMode: 'cover',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
