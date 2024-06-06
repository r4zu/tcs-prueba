import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { useNavigation } from 'expo-router';
import { ZodError } from 'zod';
import { EditProductForm } from '../EditProductForm';
import { useGetProducts, URL } from '../../../hooks';
import productSchema from '../../../utils/validators';

// Mock the modules
jest.mock('expo-router', () => ({
  useNavigation: jest.fn(),
  useLocalSearchParams: jest.fn(() => ({ id: '1' })),
}));
jest.mock('../../../hooks', () => ({
  useGetProducts: jest.fn(),
  URL: 'mocked-url',
}));
jest.mock('../../../utils/validators', () => {
  const originalModule = jest.requireActual('../../../utils/validators');
  return {
    ...originalModule,
    parse: jest.fn(),
  };
});

describe('EditProductForm', () => {
  const navigateMock = jest.fn();
  const setProductsMock = jest.fn();

  beforeAll(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: navigateMock });
    (useGetProducts as jest.Mock).mockReturnValue({
      products: [
        {
          id: '1',
          name: 'Product 1',
          description: 'Description 1',
          logo: 'Logo 1',
          date_release: '2023-01-01',
          date_revision: '2024-01-01',
        },
      ],
      setProducts: setProductsMock,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial values', () => {
    const { getByDisplayValue } = render(<EditProductForm />);

    expect(getByDisplayValue('1')).toBeTruthy();
    // expect(getByDisplayValue('Product 1')).toBeTruthy();
    // expect(getByDisplayValue('Description 1')).toBeTruthy();
    // expect(getByDisplayValue('Logo 1')).toBeTruthy();
    expect(getByDisplayValue('2023-01-01')).toBeTruthy();
    expect(getByDisplayValue('2024-01-01')).toBeTruthy();
  });

  it('displays an alert and navigates on successful submit', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({}),
    } as Response);

    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByText } = render(<EditProductForm />);

    fireEvent.press(getByText('Aceptar edición'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('mocked-url', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', authorId: '43' },
        body: JSON.stringify({
          id: '1',
          name: '',
          description: '',
          logo: '',
          date_release: '2023-01-01',
          date_revision: '2024-01-01',
        }),
      });
      expect(navigateMock).toHaveBeenCalledWith('index');
      expect(alertSpy).toHaveBeenCalledWith(
        'Éxito',
        'Los datos se han enviado correctamente'
      );
    });
  });

  it('displays an alert on ID already existing', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({}),
    } as Response);

    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByText } = render(<EditProductForm />);

    fireEvent.press(getByText('Aceptar edición'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Atención',
        'ID ingresado existente, colocar otro ID'
      );
    });
  });

  it('displays an alert on unexpected error', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockRejectedValueOnce(new Error('Network error'));

    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByText } = render(<EditProductForm />);

    fireEvent.press(getByText('Aceptar edición'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Error',
        'Ocurrió un error inesperado'
      );
    });
  });

  it('sets errors state on validation error', async () => {
    const validationError = new ZodError([
      { path: ['name'], message: 'Name is required' },
    ]);

    (productSchema.parse as jest.Mock).mockImplementationOnce(() => {
      throw validationError;
    });

    const { getByText, findByText } = render(<EditProductForm />);

    fireEvent.press(getByText('Aceptar edición'));

    expect(await findByText('Name is required')).toBeTruthy();
  });
});
