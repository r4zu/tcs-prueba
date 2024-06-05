import { Modal, View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';

import { useGetProducts } from '../../hooks';
import { Button } from '../Button/Button';

interface EliminationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const EliminationModal: React.FC<EliminationModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const { id } = useLocalSearchParams();
  const { products } = useGetProducts();

  const filterProduct = products?.filter((p) => p.id === id);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            ¿Estás seguro de eliminar el producto{' '}
            {filterProduct ? filterProduct[0].name : '[Nombre - registrado]'}?
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              color="#FFDD00"
              text="Confirmar"
              textColor="#475145"
              onPress={onConfirm}
            />
            <Button text="Cancelar" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonCancel: {
    backgroundColor: '#2196F3',
  },
  buttonDelete: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
