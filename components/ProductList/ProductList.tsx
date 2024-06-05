import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  RefreshControl,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

import { callUrl, useGetProducts } from '../../hooks';
// import { dummyDatabase } from '../../dummyDatabase';

const { width } = Dimensions.get('window');

interface ProductListProps {}

export const ProductList: React.FC<ProductListProps> = ({}) => {
  const { addListener } = useNavigation<any>();
  const [refreshing, setRefreshing] = useState(false);
  const [_, setSearchQuery] = useState('');
  const { products, setProducts } = useGetProducts();
  const [loading, setLoading] = useState(true);

  const handleRefreshApplication = useCallback(() => {
    callUrl().then((d) => {
      setProducts(d);
      setLoading(false);
    });
    // setProducts(dummyDatabase);
  }, [callUrl, setProducts]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      handleRefreshApplication();
      setRefreshing(false);
    }, 2000);
  }, [handleRefreshApplication]);

  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      handleRefreshApplication();
    });
    return unsubscribe;
  }, [addListener, handleRefreshApplication]);

  const handleFilter = (text: string) => {
    if (text) {
      const filteredList = products?.filter((product) =>
        product.id.toLowerCase().includes(text.toLowerCase())
      );
      setProducts(filteredList);
    } else {
      setProducts(products);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFDD00" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            onChangeText={(text) => {
              setSearchQuery(text);
              handleFilter(text);
            }}
          />
        </View>
      </View>

      <View style={styles.containerList}>
        <FlatList
          scrollEnabled
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
            />
          }
          data={products}
          renderItem={({ item, index }) => (
            <View>
              <Link href={`/details/${item.id}`}>
                <View style={styles.productItem}>
                  <View style={styles.productDisplay}>
                    <View>
                      <Text style={styles.productName}>{item.name}</Text>
                      <Text style={styles.productId}>ID: {item.id}</Text>
                    </View>
                    <AntDesign name="right" size={20} color="#B8B8BA" />
                  </View>
                </View>
              </Link>
              <View
                style={[
                  styles.separator,
                  products && index === products.length - 1 && styles.lastItem,
                ]}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  containerList: {
    marginTop: 40,
    height: 500,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
