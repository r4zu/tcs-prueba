import { Text, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');

interface ButtonNavigationProps {
  href: string;
  color?: string;
  text: string;
  textColor?: string;
}

export const ButtonNavigation: React.FC<ButtonNavigationProps> = ({
  href,
  color = '#E9ECF3',
  text,
  textColor = '#364A77',
}) => {
  return (
    <Link href={href} style={[styles.button, { backgroundColor: color }]}>
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </Link>
  );
};

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: width - 50,
    maxWidth: 400,
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
