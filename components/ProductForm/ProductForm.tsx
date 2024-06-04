import { useState } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import { z } from 'zod';

import { ValidatedInput } from '../ValidatedInput/ValidatedInput';
import { Button } from '../Button/Button';
import { URL } from '../../hooks';
import productSchema from '../../utils/validators';

const { height } = Dimensions.get('window');

export const ProductForm: React.FC = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [reviewDate, setReviewDate] = useState('');
  const [errors, setErrors] = useState<Product>();

  const handleSubmit = async () => {
    const formData: Product = {
      id,
      name,
      description,
      logo,
      date_release: releaseDate,
      date_revision: reviewDate,
    };

    try {
      productSchema.parse(formData);

      const res = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorId: '43',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);

      return data;

      // if (response.ok) {
      //   Alert.alert('Éxito', 'Los datos se han enviado correctamente');
      // } else {
      //   Alert.alert('Error', 'Fallo al enviar los datos');
      // }
    } catch (error) {
      // if (error instanceof z.ZodError) {
      //   const formattedErrors = error.errors.reduce((acc: any, curr) => {
      //     acc[curr.path[0]] = curr.message;
      //     return acc;
      //   }, {});
      //   setErrors(formattedErrors);
      // } else {
      //   console.log(error);

      //   Alert.alert('Error', 'Ocurrió un error inesperado');
      // }
      console.error('Failed to fetch products:', error);
      return [];
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <ValidatedInput
          label="ID"
          value={id}
          onChangeText={setId}
          validate={() => (errors ? errors.id : null)}
          error={errors ? errors.id : null}
        />
        <ValidatedInput
          label="Nombre"
          value={name}
          onChangeText={setName}
          validate={() => (errors ? errors.name : null)}
          error={errors ? errors.name : null}
        />
        <ValidatedInput
          label="Descripción"
          value={description}
          onChangeText={setDescription}
          validate={() => (errors ? errors.description : null)}
          error={errors ? errors.description : null}
        />
        <ValidatedInput
          label="Logo"
          value={logo}
          onChangeText={setLogo}
          validate={() => (errors ? errors.logo : null)}
          error={errors ? errors.logo : null}
        />
        <ValidatedInput
          label="Fecha Liberación"
          placeholder="YYYY/MM/DD"
          value={releaseDate}
          onChangeText={setReleaseDate}
          validate={() => (errors ? errors.date_release : null)}
          error={errors ? errors.date_release : null}
        />
        <ValidatedInput
          label="Fecha Revisión"
          value={reviewDate}
          validate={() => (errors ? errors.date_revision : null)}
          onChangeText={setReviewDate}
          error={errors ? errors.date_revision : null}
        />
      </View>
      <View>
        <Button
          onPress={handleSubmit}
          color="#FFDD00"
          text="Agregar"
          textColor="#475145"
        />
        <Button onPress={() => {}} text="Reiniciar" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    padding: 20,
    height: height - 175,
  },
});
