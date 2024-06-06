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
    <SafeAreaView style={styles.container} testID="safe-area-view">
      <View style={styles.content} testID="content-view">
        <View style={styles.header} testID="header-view">
          <View testID="font-awesome-icon">
            <FontAwesome6 name="money-bills" size={24} color="#182F63" />
          </View>
          <Text style={styles.text} testID="header-text">
            BANCO
          </Text>
        </View>
        <View style={styles.separator} testID="separator-view" />
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
