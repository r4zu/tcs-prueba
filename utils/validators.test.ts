import productSchema from './validators';

describe('productSchema', () => {
  it('should validate a valid product', () => {
    const validProduct = {
      id: 'abc123',
      name: 'Valid Product',
      description: 'This is a valid description',
      logo: 'logo.png',
      date_release: '2024-12-31',
    };

    expect(() => productSchema.parse(validProduct)).not.toThrow();
  });

  it('should throw an error if id is too short', () => {
    const invalidProduct = {
      id: 'ab',
      name: 'Valid Product',
      description: 'This is a valid description',
      logo: 'logo.png',
      date_release: '2024-12-31',
    };

    expect(() => productSchema.parse(invalidProduct)).toThrow(
      'El Id debe tener al menos 3 caracteres'
    );
  });

  it('should throw an error if name is too short', () => {
    const invalidProduct = {
      id: 'abc123',
      name: 'Prod',
      description: 'This is a valid description',
      logo: 'logo.png',
      date_release: '2024-12-31',
    };

    expect(() => productSchema.parse(invalidProduct)).toThrow(
      'El Nombre debe tener al menos 5 caracteres'
    );
  });

  it('should throw an error if logo is empty', () => {
    const invalidProduct = {
      id: 'abc123',
      name: 'Valid Product',
      description: 'This is a valid description',
      logo: '',
      date_release: '2024-12-31',
    };

    expect(() => productSchema.parse(invalidProduct)).toThrow(
      'El Logo es requerido'
    );
  });

  it('should throw an error if date_release is in the past', () => {
    const invalidProduct = {
      id: 'abc123',
      name: 'Valid Product',
      description: 'This is a valid description',
      logo: 'logo.png',
      date_release: '2020-01-01',
    };

    expect(() => productSchema.parse(invalidProduct)).toThrow(
      'La Fecha de Liberación debe ser hoy o en el futuro'
    );
  });

  it('should throw an error if date_release format is incorrect', () => {
    const invalidProduct = {
      id: 'abc123',
      name: 'Valid Product',
      description: 'This is a valid description',
      logo: 'logo.png',
      date_release: '31-12-2024',
    };

    expect(() => productSchema.parse(invalidProduct)).toThrow(
      'La fecha debe estar en el formato YYYY-MM-DD'
    );
  });
});
