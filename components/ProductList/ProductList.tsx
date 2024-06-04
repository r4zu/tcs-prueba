import { View, FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');

interface Product {
  id: number;
  name: string;
}

const initialProducts: Product[] = [
  { id: 123455, name: 'Nombre' },
  { id: 123456, name: 'Nombre' },
  { id: 123457, name: 'Nombre' },
  { id: 123458, name: 'Nombre' },
];

export const ProductList: React.FC = () => {
  const renderProductItem = ({
    item,
    index,
  }: {
    item: Product;
    index: number;
  }) => (
    <Link href={`/details/${item.id}`}>
      <View
        style={[
          styles.productItem,
          index === initialProducts.length - 1 && styles.lastItem,
        ]}
      >
        <View style={styles.productDisplay}>
          <View>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productId}>ID: {item.id}</Text>
          </View>
          <AntDesign name="right" size={20} color="#B8B8BA" />
        </View>
      </View>
    </Link>
  );

  return (
    <View>
      <FlatList
        data={initialProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={({ highlighted }) =>
          !highlighted && <View style={styles.separator} />
        }
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  productItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: width - 50,
    maxWidth: 400,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#58585B',
  },
  productId: {
    fontSize: 13,
    color: '#AFAFB2',
  },
});
