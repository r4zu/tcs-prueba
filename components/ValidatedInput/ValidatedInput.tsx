import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface ValidatedInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  validate: (text: string) => string | null;
  error: string | null;
  editable?: boolean;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  validate,
  error,
  editable = true,
}) => {
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    setLocalError(validate(value));
  }, [value, validate]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, localError || error ? styles.inputError : null]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
      />
      {localError || error ? (
        <Text style={styles.errorText}>{localError || error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    marginHorizontal: 10,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    width: width - 50,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 14,
  },
});
