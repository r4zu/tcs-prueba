import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { Button } from '../Button';

describe('Button', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Button onPress={() => {}} text="Click me" />);

    const buttonText = getByText('Click me');
    expect(buttonText).toBeTruthy();
    expect(buttonText).toHaveStyle({ color: '#364A77' });
  });

  it('renders correctly with custom props', () => {
    const { getByText } = render(
      <Button
        onPress={() => {}}
        text="Click me"
        color="#123456"
        textColor="#abcdef"
      />
    );

    const buttonText = getByText('Click me');
    expect(buttonText).toBeTruthy();
    expect(buttonText).toHaveStyle({ color: '#abcdef' });
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button onPress={onPressMock} text="Click me" />
    );

    const button = getByText('Click me');
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
