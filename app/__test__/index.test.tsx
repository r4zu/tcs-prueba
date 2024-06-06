import { render } from '@testing-library/react-native';
import HomeScreen from '../index'; // Asegúrate de que la ruta sea correcta
import {
  ButtonNavigation,
  HeaderContainer,
  ProductList,
} from '../../components';

jest.mock('../components', () => ({
  ...jest.requireActual('../components'),
  ProductList: jest.fn(() => null), // Mock ProductList
}));

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<HomeScreen />);

    // Verificar que HeaderContainer esté presente
    const headerContainer = getByTestId('header-container');
    expect(headerContainer).toBeTruthy();

    // Verificar que ProductList esté presente
    expect(ProductList).toHaveBeenCalled();

    // Verificar que ButtonNavigation esté presente y con las props correctas
    const buttonNavigation = getByTestId('button-navigation');
    expect(buttonNavigation).toBeTruthy();
    expect(buttonNavigation.props.href).toBe('/addProduct');
    expect(buttonNavigation.props.color).toBe('#FFDD00');
    expect(buttonNavigation.props.text).toBe('Agregar');
    expect(buttonNavigation.props.textColor).toBe('#475145');
  });
});
