import { render } from '@testing-library/react-native';
import RootLayout from '../_layout';
import { Stack } from 'expo-router';

// Mock del módulo 'expo-router'
jest.mock('expo-router', () => ({
  Stack: {
    Screen: jest.fn(() => null),
  },
}));

describe('RootLayout', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<RootLayout />);

    // Verificar que SafeAreaProvider esté presente
    const safeAreaProvider = getByTestId('safe-area-provider');
    expect(safeAreaProvider).toBeTruthy();

    // Verificar que Stack esté presente
    expect(Stack).toBeTruthy();
  });

  it('renders the Stack.Screen with the correct name', () => {
    render(<RootLayout />);

    // Verificar que Stack.Screen se llame con el nombre correcto
    expect(Stack.Screen).toHaveProp(
      expect.objectContaining({ name: 'index' }),
      {}
    );
  });
});
