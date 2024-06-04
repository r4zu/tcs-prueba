import { Text, View, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';

interface HeaderContainerProps {
  children: React.ReactNode;
}

export const HeaderContainer: React.FC<HeaderContainerProps> = ({
  children,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <FontAwesome6 name="money-bills" size={24} color="#182F63" />
          <Text style={styles.text}>BANCO</Text>
        </View>
        <View style={styles.separator} />
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 10 : 0,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#182F63',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
  },
});
