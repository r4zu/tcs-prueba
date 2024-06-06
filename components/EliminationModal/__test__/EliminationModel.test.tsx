import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { EliminationModal } from '../EliminationModal';
import { useLocalSearchParams } from 'expo-router';
import { useGetProducts } from '../../../hooks';

jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(),
}));

jest.mock('../../../hooks', () => ({
  useGetProducts: jest.fn(),
}));

describe('EliminationModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when visible', () => {
    useLocalSearchParams.mockReturnValue({ id: '1' });
    useGetProducts.mockReturnValue({
      products: [{ id: '1', name: 'Product 1' }],
    });

    const { getByText } = render(
      <EliminationModal
        visible={true}
        onClose={jest.fn()}
        onConfirm={jest.fn()}
      />
    );

    expect(
      getByText('¿Estás seguro de eliminar el producto Product 1?')
    ).toBeTruthy();
    expect(getByText('Confirmar')).toBeTruthy();
    expect(getByText('Cancelar')).toBeTruthy();
  });

  it('renders correctly with default text when product is not found', () => {
    useLocalSearchParams.mockReturnValue({ id: '2' });
    useGetProducts.mockReturnValue({
      products: [{ id: '1', name: 'Product 1' }],
    });

    const { getByText } = render(
      <EliminationModal
        visible={true}
        onClose={jest.fn()}
        onConfirm={jest.fn()}
      />
    );

    expect(
      getByText('¿Estás seguro de eliminar el producto [Nombre - registrado]?')
    ).toBeTruthy();
  });

  it('calls onClose when Cancel button is pressed', () => {
    useLocalSearchParams.mockReturnValue({ id: '1' });
    useGetProducts.mockReturnValue({
      products: [{ id: '1', name: 'Product 1' }],
    });

    const onCloseMock = jest.fn();
    const { getByText } = render(
      <EliminationModal
        visible={true}
        onClose={onCloseMock}
        onConfirm={jest.fn()}
      />
    );

    fireEvent.press(getByText('Cancelar'));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('calls onConfirm when Confirm button is pressed', () => {
    useLocalSearchParams.mockReturnValue({ id: '1' });
    useGetProducts.mockReturnValue({
      products: [{ id: '1', name: 'Product 1' }],
    });

    const onConfirmMock = jest.fn();
    const { getByText } = render(
      <EliminationModal
        visible={true}
        onClose={jest.fn()}
        onConfirm={onConfirmMock}
      />
    );

    fireEvent.press(getByText('Confirmar'));
    expect(onConfirmMock).toHaveBeenCalled();
  });

  it('does not render when not visible', () => {
    useLocalSearchParams.mockReturnValue({ id: '1' });
    useGetProducts.mockReturnValue({
      products: [{ id: '1', name: 'Product 1' }],
    });

    const { queryByText } = render(
      <EliminationModal
        visible={false}
        onClose={jest.fn()}
        onConfirm={jest.fn()}
      />
    );

    expect(
      queryByText('¿Estás seguro de eliminar el producto Product 1?')
    ).toBeNull();
    expect(queryByText('Confirmar')).toBeNull();
    expect(queryByText('Cancelar')).toBeNull();
  });
});
