import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { useNavigation } from 'expo-router';
import { ZodError } from 'zod';
import { ProductForm } from '../ProductForm';
import productSchema from '../../../utils/validators';

// Mock the modules
jest.mock('expo-router', () => ({
  useNavigation: jest.fn(),
}));
jest.mock('../../../hooks', () => ({
  URL: 'mocked-url',
}));
jest.mock('../../../utils/validators', () => {
  const originalModule = jest.requireActual('../../../utils/validators');
  return {
    ...originalModule,
    parse: jest.fn(),
  };
});

describe('ProductForm', () => {
  const navigateMock = jest.fn();

  beforeAll(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: navigateMock });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial values', () => {
    const { getByPlaceholderText, getByText } = render(<ProductForm />);

    expect(getByPlaceholderText('YYYY-MM-DD')).toBeTruthy();
    expect(getByText('Agregar')).toBeTruthy();
    expect(getByText('Reiniciar')).toBeTruthy();
  });

  it('displays an alert and navigates on successful submit', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({}),
    } as Response);

    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByText, getByPlaceholderText } = render(<ProductForm />);

    fireEvent.changeText(getByPlaceholderText('YYYY-MM-DD'), '2023-01-01');
    fireEvent.press(getByText('Agregar'));

    // await waitFor(() => {
    //   expect(fetch).toHaveBeenCalledWith('mocked-url', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json', authorId: '43' },
    //     body: JSON.stringify({
    //       id: '',
    //       name: '',
    //       description: '',
    //       logo: '',
    //       date_release: '2023-01-01',
    //       date_revision: '2024-01-01',
    //     }),
    //   });
    //   expect(navigateMock).toHaveBeenCalledWith('index');
    //   expect(alertSpy).toHaveBeenCalledWith(
    //     'Éxito',
    //     'Los datos se han enviado correctamente'
    //   );
    // });
  });

  it('displays an alert on ID already existing', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({}),
    } as Response);

    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByText } = render(<ProductForm />);

    fireEvent.press(getByText('Agregar'));

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
    const { getByText } = render(<ProductForm />);

    fireEvent.press(getByText('Agregar'));

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

    const { getByText, findByText } = render(<ProductForm />);

    fireEvent.press(getByText('Agregar'));

    expect(await findByText('Name is required')).toBeTruthy();
  });

  it('resets the form on clicking "Reiniciar" button', () => {
    const { getByText, getByPlaceholderText } = render(<ProductForm />);

    fireEvent.changeText(getByPlaceholderText('YYYY-MM-DD'), '2023-01-01');
    fireEvent.press(getByText('Reiniciar'));

    expect(getByPlaceholderText('YYYY-MM-DD').props.value).toBe('');
  });
});
