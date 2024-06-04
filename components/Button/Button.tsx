import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface ButtonProps {
  onPress: () => void;
  color?: string;
  text: string;
  textColor?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  color = '#E9ECF3',
  text,
  textColor = '#364A77',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: color }]}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
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
